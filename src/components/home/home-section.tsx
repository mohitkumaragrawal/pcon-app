import { cn } from "@/lib/utils";

export default function HomeSection(props: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative p-5 md:p-20 border-2 rounded-none sm:rounded-lg mt-8 border-slate-700",
        "bg-slate-600/[0.1] bg-dot-slate-800 backdrop-blur-sm",
        "mx-0 sm:mx-3",
        props.className
      )}
    >
      {props.children}
    </section>
  );
}
