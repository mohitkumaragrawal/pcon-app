export default function HomeSection(props: { children: React.ReactNode }) {
  return (
    <section className="relative p-5 md:p-20 flex flex-col md:flex-row-reverse md:items-center gap-8 mt-20 border-3 rounded-lg mx-3 bg-dot-slate-700/[0.8] bg-black/[0.1] backdrop-blur-sm">
      {props.children}
    </section>
  );
}
