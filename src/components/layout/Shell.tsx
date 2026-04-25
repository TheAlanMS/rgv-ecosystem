interface ShellProps {
  children: React.ReactNode;
  className?: string;
}

export function Shell({ children, className = "" }: ShellProps) {
  return (
    <div className={`max-w-[980px] mx-auto px-5 ${className}`}>
      {children}
    </div>
  );
}
