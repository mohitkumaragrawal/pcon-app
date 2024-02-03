import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
// import remarkMath from "remark-math";

interface MyMarkdownProps {
  children: string;
  className?: string;
}

export default function MyMarkdown({ className, children }: MyMarkdownProps) {
  return (
    <Markdown className={`markdown ${className}`} remarkPlugins={[remarkGfm]}>
      {children}
    </Markdown>
  );
}
