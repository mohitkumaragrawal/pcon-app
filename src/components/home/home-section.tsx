import { cn } from "@/lib/utils";

export default function HomeSection(props: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative mt-8 rounded-none border-2 border-slate-700 p-5 sm:rounded-lg md:p-20",
        "bg-slate-600/[0.1] backdrop-blur-sm bg-dot-slate-800",
        "mx-0 sm:mx-3",
        props.className,
      )}
    >
      {props.children}
    </section>
  );
}
