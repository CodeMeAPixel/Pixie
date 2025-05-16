"use client"

import { Calculator, Check, Copy, ChevronDown, ChevronUp, Info, ArrowRight, Lightbulb } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface MathCardProps {
  expression: string
  result: number | string
  steps?: string[]
  title?: string
  category?: string
  explanation?: string
  relatedFormulas?: Array<{
    name: string
    formula: string
  }>
}

export function MathCard({
  expression,
  result,
  steps = [],
  title = "Calculation",
  category,
  explanation,
  relatedFormulas = [],
}: MathCardProps) {
  const [copied, setCopied] = useState(false)
  const [showSteps, setShowSteps] = useState(true)
  const [showExplanation, setShowExplanation] = useState(false)
  const [showRelated, setShowRelated] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${expression} = ${result}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="w-full max-w-md overflow-hidden border-0 shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
              <Calculator className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">{title}</h2>
              {category && <p className="text-xs text-emerald-100">{category}</p>}
            </div>
          </div>
          <button
            onClick={copyToClipboard}
            className="p-2 rounded-lg hover:bg-white/20 transition-colors"
            aria-label="Copy result"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Main calculation */}
      <CardContent className="p-0">
        <div className="p-5 bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950/20 dark:to-background">
          <div className="flex flex-col items-center text-center">
            <div className="text-lg font-mono mb-2">{expression}</div>
            <div className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-emerald-500" />
              <div className="text-3xl font-bold font-mono text-emerald-600 dark:text-emerald-400">{result}</div>
            </div>
          </div>
        </div>

        {/* Steps section */}
        <div className="border-t border-border">
          <button
            onClick={() => setShowSteps(!showSteps)}
            className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-0"
              >
                Steps
              </Badge>
              <span className="font-medium">Solution Steps</span>
            </div>
            {showSteps ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>

          {showSteps && (
            <div className="px-4 pb-4">
              {steps.length > 0 ? (
                <div className="space-y-2 pl-2">
                  {steps.map((step, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <div className="flex-shrink-0 size-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-xs font-medium text-emerald-800 dark:text-emerald-400">
                        {index + 1}
                      </div>
                      <div className="text-sm font-mono pt-1">{step}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-3 text-sm text-muted-foreground">
                  No detailed steps available for this calculation.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Explanation section */}
        {explanation && (
          <div className="border-t border-border">
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-0"
                >
                  Explanation
                </Badge>
                <span className="font-medium">Concept Explanation</span>
              </div>
              {showExplanation ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>

            {showExplanation && (
              <div className="px-4 pb-4">
                <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-100 dark:border-blue-900/30">
                  <div className="flex gap-2 mb-2">
                    <Lightbulb className="h-5 w-5 text-blue-500 flex-shrink-0" />
                    <h3 className="font-medium text-blue-800 dark:text-blue-400">Understanding the Concept</h3>
                  </div>
                  <p className="text-sm text-blue-800/80 dark:text-blue-300/80">{explanation}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Related formulas */}
        {relatedFormulas.length > 0 && (
          <div className="border-t border-border">
            <button
              onClick={() => setShowRelated(!showRelated)}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-0"
                >
                  Related
                </Badge>
                <span className="font-medium">Related Formulas</span>
              </div>
              {showRelated ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>

            {showRelated && (
              <div className="px-4 pb-4">
                <div className="space-y-2">
                  {relatedFormulas.map((formula, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg border border-border">
                      <div className="text-sm font-medium">{formula.name}</div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="font-mono text-sm bg-muted/50 px-2 py-1 rounded flex items-center gap-1">
                              {formula.formula}
                              <Info className="h-3.5 w-3.5 text-muted-foreground" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Click to use this formula</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
