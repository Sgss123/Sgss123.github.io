interface DataRowsProps {
  rows: Array<{ label: string; value: string | number }>;
}

export function DataRows({ rows }: DataRowsProps) {
  return (
    <dl className="border-y border-[var(--border)]">
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid gap-2 border-b border-[var(--border)] py-4 last:border-0 sm:grid-cols-[10rem_1fr]"
        >
          <dt className="text-sm text-[var(--muted-foreground)]">{row.label}</dt>
          <dd className="break-all font-mono text-sm">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
