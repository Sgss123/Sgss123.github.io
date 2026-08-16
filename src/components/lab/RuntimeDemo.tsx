"use client";

import { Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function RuntimeDemo({ endpoint }: { endpoint: string }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>();
  const [error, setError] = useState(false);
  const common = useTranslations("Common.actions");
  const t = useTranslations("Lab");

  async function run() {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(endpoint, { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const contentType = response.headers.get("content-type") ?? "";
      const value = contentType.includes("application/json")
        ? await response.json()
        : await response.text();
      setResult(typeof value === "string" ? value : JSON.stringify(value, null, 2));
    } catch {
      setResult(undefined);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border-y border-[var(--border)] py-6">
      <Button onClick={run} disabled={loading}>
        <Play className="size-4" /> {loading ? common("running") : common("runDemo")}
      </Button>
      {error ? (
        <p role="alert" className="mt-5 text-sm text-[var(--accent-text)]">
          {t("requestFailed")}
        </p>
      ) : null}
      {result ? (
        <pre className="mt-6 max-h-80 overflow-auto bg-[#1d2226] p-5 text-xs leading-6 text-[#f7e8c1]">
          {result}
        </pre>
      ) : null}
    </div>
  );
}
