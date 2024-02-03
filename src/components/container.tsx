import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export default function Container({ className, children }: Props) {
  return (
    <div className={cn("max-w-7xl my-10 mx-auto px-4", className)}>
      {children}
    </div>
  );
}
