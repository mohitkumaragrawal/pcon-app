import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export default function Container({ className, children }: Props) {
  return (
    <div className={cn("mx-auto my-10 max-w-7xl px-4", className)}>
      {children}
    </div>
  );
}
