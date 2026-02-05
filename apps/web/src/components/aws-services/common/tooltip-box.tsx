import { Info } from 'lucide-react'

import ReactMarkdown from 'react-markdown'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export function TooltipBox({ content }: { content: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="text-muted-foreground h-4 w-4 cursor-help" />
        </TooltipTrigger>
        <TooltipContent className="text-left" side="right">
          <div className="markdown-content whitespace-pre-line">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
