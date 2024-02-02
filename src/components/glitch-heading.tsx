export default function GlitchHeading({ className, children }) {
  return (
    <div className={className}>
      <p className="glitch">
        <span aria-hidden="true">{children}</span>
        {children}
        <span aria-hidden="true">{children}</span>
      </p>
    </div>
  );
}
