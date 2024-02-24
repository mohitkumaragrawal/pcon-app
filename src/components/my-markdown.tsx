import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

interface MyMarkdownProps {
  children: string;
  className?: string;
}

export default function MyMarkdown({ className, children }: MyMarkdownProps) {
  return (
    <Markdown
      className={`markdown ${className}`}
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
    >
      {children}
    </Markdown>
  );
}
