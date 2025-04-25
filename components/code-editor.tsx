'use client';

import { EditorView } from '@codemirror/view';
import { EditorState, Transaction } from '@codemirror/state';
import { python } from '@codemirror/lang-python';
import { basicSetup } from 'codemirror';
import React, { memo, useEffect, useRef } from 'react';
import { Suggestion } from '@/lib/db/schema';

type EditorProps = {
  content: string;
  onSaveContent: (updatedContent: string, debounce: boolean) => void;
  status: 'streaming' | 'idle';
  isCurrentVersion: boolean;
  currentVersionIndex: number;
  suggestions: Array<Suggestion>;
};

function PureCodeEditor({ content, onSaveContent, status }: EditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (containerRef.current && !editorRef.current) {
      const customTheme = EditorView.theme({
        '&': {
          backgroundColor: 'hsl(var(--background))',
          height: '100%'
        },
        '.cm-content': {
          color: 'hsl(var(--foreground))',
          caretColor: 'hsl(var(--primary))',
        },
        '.cm-gutters': {
          backgroundColor: 'hsl(var(--card))',
          color: 'hsl(var(--muted-foreground))',
          borderRight: '1px solid hsl(var(--border))',
        },
        '.cm-activeLineGutter': {
          backgroundColor: 'hsl(var(--accent)/0.1)',
        },
        '.cm-lineNumbers': {
          color: 'hsl(var(--muted-foreground))',
        },
        '.cm-cursor': {
          borderLeftColor: 'hsl(var(--primary))',
        },
        '.cm-selectionBackground': {
          backgroundColor: 'hsl(var(--accent)/0.2)',
        },
        '.cm-focused .cm-selectionBackground': {
          backgroundColor: 'hsl(var(--accent)/0.3)',
        },
        '.cm-activeLine': {
          backgroundColor: 'hsl(var(--muted)/0.1)',
        },
        '.cm-searchMatch': {
          backgroundColor: 'hsl(var(--accent)/0.2)',
          outline: '1px solid hsl(var(--accent)/0.4)',
        },
      });

      const startState = EditorState.create({
        doc: content,
        extensions: [basicSetup, python(), customTheme],
      });

      editorRef.current = new EditorView({
        state: startState,
        parent: containerRef.current,
      });
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
    // NOTE: we only want to run this effect once
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      const updateListener = EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          const transaction = update.transactions.find(
            (tr) => !tr.annotation(Transaction.remote),
          );

          if (transaction) {
            const newContent = update.state.doc.toString();
            onSaveContent(newContent, true);
          }
        }
      });

      const currentSelection = editorRef.current.state.selection;

      const newState = EditorState.create({
        doc: editorRef.current.state.doc,
        extensions: [basicSetup, python(), updateListener],
        selection: currentSelection,
      });

      editorRef.current.setState(newState);
    }
  }, [onSaveContent]);

  useEffect(() => {
    if (editorRef.current && content) {
      const currentContent = editorRef.current.state.doc.toString();

      if (status === 'streaming' || currentContent !== content) {
        const transaction = editorRef.current.state.update({
          changes: {
            from: 0,
            to: currentContent.length,
            insert: content,
          },
          annotations: [Transaction.remote.of(true)],
        });

        editorRef.current.dispatch(transaction);
      }
    }
  }, [content, status]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-md border border-border bg-background text-foreground" ref={containerRef} />
  );
}

function areEqual(prevProps: EditorProps, nextProps: EditorProps) {
  if (prevProps.suggestions !== nextProps.suggestions) return false;
  if (prevProps.currentVersionIndex !== nextProps.currentVersionIndex)
    return false;
  if (prevProps.isCurrentVersion !== nextProps.isCurrentVersion) return false;
  if (prevProps.status === 'streaming' && nextProps.status === 'streaming')
    return false;
  if (prevProps.content !== nextProps.content) return false;

  return true;
}

export const CodeEditor = memo(PureCodeEditor, areEqual);
