import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({
  content,
  className,
}: MarkdownRendererProps) {
  return (
    <div
      className={cn(
        "prose prose-lg max-w-none",
        "prose-headings:text-gray-900 prose-headings:font-bold",
        "prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-8",
        "prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-6",
        "prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-5",
        "prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4",
        "prose-strong:text-gray-900 prose-strong:font-semibold",
        "prose-em:text-gray-600 prose-em:italic",
        "prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:my-6",
        "prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-4",
        "prose-ol:list-decimal prose-ol:ml-6 prose-ol:mb-4",
        "prose-li:mb-2 prose-li:text-gray-700",
        "prose-a:text-purple-600 prose-a:no-underline hover:prose-a:text-purple-700 hover:prose-a:underline",
        "prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:text-gray-800",
        "prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto",
        "prose-img:rounded-lg prose-img:shadow-md prose-img:my-6",
        className
      )}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
