export default function GrafanaPage() {
  const grafanaUrl =
    process.env.NEXT_PUBLIC_GRAFANA_EXTERNAL_URL ?? "http://localhost:3002";

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-8 font-sans">
      <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
        Grafana Verification
      </h1>
      <p className="mt-2 text-sm text-zinc-500">
        Open the dashboard in a new tab to verify run-linked metrics and logs.
      </p>
      <a
        href={grafanaUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-block rounded-md bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
      >
        Open Grafana
      </a>
    </main>
  );
}
