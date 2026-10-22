export const metadata = {
  title: "Terms of Service | Kanbit",
  description: "Kanbit terms of service and user agreement.",
  alternates: { canonical: "https://darkmintis.dev/kanbit/terms/" },
};

export default function TermsPage() {
  return (
    <div className="container-shell py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold">Terms of Service</h1>
        <p className="theme-muted mt-4 text-sm">Last updated: April 2026</p>

        <div className="mt-8 space-y-8">
          {/* Acceptance */}
          <section className="card p-6">
            <h2 className="text-2xl font-bold">Acceptance of Terms</h2>
            <p className="theme-muted mt-3">
              By accessing and using Kanbit, you agree to be bound by these Terms of Service. If you do not agree, please
              do not use the service.
            </p>
          </section>

          {/* License */}
          <section className="card p-6">
            <h2 className="text-2xl font-bold">License & Use</h2>
            <p className="theme-muted mt-3">
              Kanbit grants you a limited, non-exclusive, non-transferable license to use the service for personal and
              commercial purposes. You may not reproduce, distribute, or resell the service without permission.
            </p>
          </section>

          {/* Disclaimer */}
          <section className="card p-6 border-2 border-amber-500/20" style={{ background: "rgba(251, 191, 36, 0.05)" }}>
            <h2 className="text-2xl font-bold" style={{ color: "var(--color-heading)" }}>Disclaimer of Accuracy</h2>
            <p className="mt-3 font-semibold" style={{ color: "var(--color-text)" }}>
              Kanbit provides <strong>estimated analytics only</strong>.
            </p>
            <p className="theme-muted mt-3">
              All metrics, download numbers, ratings, scores, and scout notes are estimates or heuristics derived from public
              Play Store signals and are <strong>not official Google Play data</strong>. These estimates may contain
              inaccuracies and should not be relied upon for critical business decisions.
            </p>
          </section>

          {/* No Warranty */}
          <section className="card p-6">
            <h2 className="text-2xl font-bold">No Warranty</h2>
            <p className="theme-muted mt-3">
              Kanbit is provided &quot;as-is&quot; without warranties of any kind. We do not guarantee accuracy, availability, or
              suitability for any purpose. Use at your own risk.
            </p>
          </section>

          {/* Limitation */}
          <section className="card p-6">
            <h2 className="text-2xl font-bold">Limitation of Liability</h2>
            <p className="theme-muted mt-3">
              Kanbit and its creators are not liable for any indirect, incidental, or consequential damages resulting from
              use or inability to use the service.
            </p>
          </section>

          {/* Changes */}
          <section className="card p-6">
            <h2 className="text-2xl font-bold">Changes to Service</h2>
            <p className="theme-muted mt-3">
              We may update, modify, suspend, or discontinue Kanbit at any time without notice. Continued use implies
              acceptance of any changes.
            </p>
          </section>

          {/* Prohibited */}
          <section className="card p-6">
            <h2 className="text-2xl font-bold">Prohibited Activities</h2>
            <p className="theme-muted mt-3">You agree not to:</p>
            <ul className="theme-muted mt-4 space-y-2 ml-6 list-disc">
              <li>Attempt to hack or compromise Kanbit</li>
              <li>Reverse engineer or attempt to extract the code</li>
              <li>Use automated tools to scrape data excessively</li>
              <li>Engage in illegal or abusive behavior</li>
            </ul>
          </section>

          {/* Contact */}
          <section className="card accent-surface p-6">
            <h2 className="text-2xl font-bold">Contact</h2>
            <p className="theme-muted mt-3">
              For questions about these terms, contact us at{" "}
              <a href="https://darkmintis.dev" className="about-accent-link font-semibold hover:underline">darkmintis.dev</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
