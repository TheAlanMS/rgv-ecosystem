interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="font-heading text-xl font-bold text-text-primary">
        {title}
      </h1>
      {subtitle && (
        <p className="text-[13px] text-text-muted mt-1 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
