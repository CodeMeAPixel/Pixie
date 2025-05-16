'use client';

import React, { memo, useEffect, useMemo, useState } from 'react';
import DataGrid, { textEditor } from 'react-data-grid';
import { parse, unparse } from 'papaparse';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

import 'react-data-grid/lib/styles.css';

type SheetEditorProps = {
  content: string;
  saveContent: (content: string, isCurrentVersion: boolean) => void;
  status: string;
  isCurrentVersion: boolean;
  currentVersionIndex: number;
};

const MIN_ROWS = 50;
const MIN_COLS = 26;

const PureSpreadsheetEditor = ({ content, saveContent, status }: SheetEditorProps) => {
  const { theme } = useTheme();

  const parseData = useMemo(() => {
    if (!content) return Array(MIN_ROWS).fill(Array(MIN_COLS).fill(''));
    const result = parse<string[]>(content, { skipEmptyLines: true });

    const paddedData = result.data.map((row) => {
      const paddedRow = [...row];
      while (paddedRow.length < MIN_COLS) {
        paddedRow.push('');
      }
      return paddedRow;
    });

    while (paddedData.length < MIN_ROWS) {
      paddedData.push(Array(MIN_COLS).fill(''));
    }

    return paddedData;
  }, [content]);

  const columns = useMemo(() => {
    const baseHeaderClass = cn(
      "border-t border-border bg-muted/50",
      "text-muted-foreground font-medium"
    );

    const baseCellClass = cn(
      "border-t border-border",
      "bg-background text-foreground"
    );

    const rowNumberColumn = {
      key: 'rowNumber',
      name: '',
      frozen: true,
      width: 50,
      renderCell: ({ rowIdx }: { rowIdx: number }) => rowIdx + 1,
      cellClass: cn(baseCellClass, "border-r text-muted-foreground text-right pr-2"),
      headerCellClass: cn(baseHeaderClass, "border-r"),
    };

    const dataColumns = Array.from({ length: MIN_COLS }, (_, i) => ({
      key: i.toString(),
      name: String.fromCharCode(65 + i),
      renderEditCell: textEditor,
      width: 120,
      cellClass: cn('border-t', {
        'bg-background text-foreground': true,
        'border-l': i !== 0,
      }),
      headerCellClass: cn('border-t', {
        'bg-muted text-muted-foreground': true,
        'border-l': i !== 0,
      }),
    }));

    return [rowNumberColumn, ...dataColumns];
  }, []);

  const initialRows = useMemo(() => {
    return parseData.map((row, rowIndex) => {
      const rowData: any = {
        id: rowIndex,
        rowNumber: rowIndex + 1,
      };

      columns.slice(1).forEach((col, colIndex) => {
        rowData[col.key] = row[colIndex] || '';
      });

      return rowData;
    });
  }, [parseData, columns]);

  const [localRows, setLocalRows] = useState(initialRows);

  useEffect(() => {
    setLocalRows(initialRows);
  }, [initialRows]);

  const generateCsv = (data: any[][]) => {
    return unparse(data);
  };

  const handleRowsChange = (newRows: any[]) => {
    setLocalRows(newRows);

    const updatedData = newRows.map((row) => {
      return columns.slice(1).map((col) => row[col.key] || '');
    });

    const newCsvContent = generateCsv(updatedData);
    saveContent(newCsvContent, true);
  };

  return (
    <DataGrid
      className={cn(
        "rdg-light border-border", 
        theme === 'dark' && "rdg-dark"
      )}
      columns={columns}
      rows={localRows}
      enableVirtualization
      onRowsChange={handleRowsChange}
      onCellClick={(args) => {
        if (args.column.key !== 'rowNumber') {
          args.selectCell(true);
        }
      }}
      style={{ 
        height: '100%',
        "--rdg-color": "hsl(var(--foreground))",
        "--rdg-border-color": "hsl(var(--border))",
        "--rdg-background-color": "hsl(var(--background))",
        "--rdg-header-background-color": "hsl(var(--muted))",
        "--rdg-row-hover-background-color": "hsl(var(--accent)/0.1)",
        "--rdg-selection-color": "hsl(var(--primary))",
      } as React.CSSProperties}
      defaultColumnOptions={{
        resizable: true,
        sortable: true,
      }}
    />
  );
};

function areEqual(prevProps: SheetEditorProps, nextProps: SheetEditorProps) {
  return (
    prevProps.currentVersionIndex === nextProps.currentVersionIndex &&
    prevProps.isCurrentVersion === nextProps.isCurrentVersion &&
    !(prevProps.status === 'streaming' && nextProps.status === 'streaming') &&
    prevProps.content === nextProps.content &&
    prevProps.saveContent === nextProps.saveContent
  );
}

export const SpreadsheetEditor = memo(PureSpreadsheetEditor, areEqual);
