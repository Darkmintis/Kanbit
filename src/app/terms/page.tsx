export const metadata = {
  title: "Terms of Service | AppRadar",
  description: "AppRadar terms of service and user agreement.",
};

export default function TermsPage() {
  return (
    <div className="container-shell py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-[#0f172a]">Terms of Service</h1>
        <p className="mt-4 text-sm text-[#94a3b8]">Last updated: April 2026</p>

        <div className="mt-8 space-y-8">
          {/* Acceptance */}
          <section className="card p-6">
            <h2 className="text-2xl font-bold text-[#0f172a]">Acceptance of Terms</h2>
            <p className="mt-3 text-[#475569]">
              By accessing and using AppRadar, you agree to be bound by these Terms of Service. If you do not agree, please
              do not use the service.
            </p>
          </section>

          {/* License */}
          <section className="card p-6">
            <h2 className="text-2xl font-bold text-[#0f172a]">License & Use</h2>
            <p className="mt-3 text-[#475569]">
              AppRadar grants you a limited, non-exclusive, non-transferable license to use the service for personal and
              commercial purposes. You may not reproduce, distribute, or resell the service without permission.
            </p>
          </section>

          {/* Disclaimer */}
          <section className="card p-6 border-2 border-amber-200 bg-amber-50">
            <h2 className="text-2xl font-bold text-amber-900">Disclaimer of Accuracy</h2>
            <p className="mt-3 font-semibold text-amber-900">
              AppRadar provides <strong>estimated analytics only</strong>.
            </p>
            <p className="mt-3 text-amber-800">
              All metrics, download numbers, ratings, and insights are estimates derived from public Play Store signals and
              are <strong>not official Google Play data</strong>. These estimates may contain inaccuracies and should not be
              relied upon for critical business decisions.
            </p>
          </section>

          {/* No Warranty */}
          <section className="card p-6">
            <h2 className="text-2xl font-bold text-[#0f172a]">No Warranty</h2>
            <p className="mt-3 text-[#475569]">
              AppRadar is provided &quot;as-is&quot; without warranties of any kind. We do not guarantee accuracy, availability, or
              suitability for any purpose. Use at your own risk.
            </p>
          </section>

          {/* Limitation */}
          <section className="card p-6">
            <h2 className="text-2xl font-bold text-[#0f172a]">Limitation of Liability</h2>
            <p className="mt-3 text-[#475569]">
              AppRadar and its creators are not liable for any indirect, incidental, or consequential damages resulting from
              use or inability to use the service.
            </p>
          </section>

          {/* Changes */}
          <section className="card p-6">
            <h2 className="text-2xl font-bold text-[#0f172a]">Changes to Service</h2>
            <p className="mt-3 text-[#475569]">
              We may update, modify, suspend, or discontinue AppRadar at any time without notice. Continued use implies
              acceptance of any changes.
            </p>
          </section>

          {/* Prohibited */}
          <section className="card p-6">
            <h2 className="text-2xl font-bold text-[#0f172a]">Prohibited Activities</h2>
            <p className="mt-3 text-[#475569]">You agree not to:</p>
            <ul className="mt-4 space-y-2 text-[#475569] ml-6 list-disc">
              <li>Attempt to hack or compromise AppRadar</li>
              <li>Reverse engineer or attempt to extract the code</li>
              <li>Use automated tools to scrape data excessively</li>
              <li>Engage in illegal or abusive behavior</li>
            </ul>
          </section>

          {/* Contact */}
          <section className="card p-6 bg-gradient-to-br from-[#0f766e]/5 to-[#f59e0b]/5">
            <h2 className="text-2xl font-bold text-[#0f172a]">Contact</h2>
            <p className="mt-3 text-[#475569]">
              For questions about these terms, contact us at{" "}
              <a href="https://darkmintis.dev" className="font-semibold text-[#0f766e] hover:underline">
                darkmintis.dev
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
