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
        <TooltipContent className="max-w-xs text-center">
          <ReactMarkdown>{content}</ReactMarkdown>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
