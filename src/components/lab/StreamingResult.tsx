import { Suspense } from "react";
import { Card } from "@/components/ui/Card";

async function delay(milliseconds: number) {
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function StreamedCard({ label, delayMs }: { label: string; delayMs: number }) {
  await delay(delayMs);
  return (
    <Card className="min-h-32">
      <p className="text-sm text-[var(--muted-foreground)]">{label}</p>
      <p className="mt-5 font-mono text-xs">{new Date().toISOString()}</p>
    </Card>
  );
}

function LoadingCard({ label }: { label: string }) {
  return (
    <Card className="min-h-32 animate-pulse" aria-busy="true">
      <p className="text-sm text-[var(--muted-foreground)]">{label}</p>
      <div className="mt-5 h-3 w-2/3 bg-[var(--border)]" />
    </Card>
  );
}

export function StreamingResult({
  labels,
}: {
  labels: { instant: string; first: string; second: string; loading: string };
}) {
  return (
    <div className="grid gap-4">
      <Card className="min-h-32">
        <p className="text-sm text-[var(--muted-foreground)]">{labels.instant}</p>
        <p className="mt-5 font-mono text-xs">{new Date().toISOString()}</p>
      </Card>
      <Suspense fallback={<LoadingCard label={`${labels.first} · ${labels.loading}`} />}>
        <StreamedCard label={labels.first} delayMs={700} />
      </Suspense>
      <Suspense fallback={<LoadingCard label={`${labels.second} · ${labels.loading}`} />}>
        <StreamedCard label={labels.second} delayMs={1600} />
      </Suspense>
    </div>
  );
}
