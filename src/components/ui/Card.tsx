interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  as?: "div" | "article";
}

export function Card({
  children,
  className = "",
  onClick,
  as: Component = "div",
}: CardProps) {
  return (
    <Component
      className={`bg-surface border border-border-default rounded-[10px] p-3 transition-colors hover:border-border2 hover:bg-surface2 ${className}`}
      onClick={onClick}
    >
      {children}
    </Component>
  );
}
