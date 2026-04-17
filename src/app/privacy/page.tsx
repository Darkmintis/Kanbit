export const metadata = {
  title: "Privacy Policy | AppRadar",
  description: "AppRadar privacy policy and data handling practices.",
};

export default function PrivacyPage() {
  return (
    <div className="container-shell py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-[#0f172a]">Privacy Policy</h1>
        <p className="mt-4 text-sm text-[#94a3b8]">Last updated: April 2026</p>

        <div className="mt-8 space-y-8">
          {/* Data Collection */}
          <section className="card p-6">
            <h2 className="text-2xl font-bold text-[#0f172a]">Data We Collect</h2>
            <p className="mt-3 text-[#475569]">
              When you use AppRadar, we collect minimal information:
            </p>
            <ul className="mt-4 space-y-2 text-[#475569] ml-6 list-disc">
              <li>App names or package names you search for</li>
              <li>General usage analytics (page views, timestamps)</li>
              <li>Anonymized browser information</li>
            </ul>
          </section>

          {/* How We Use Data */}
          <section className="card p-6">
            <h2 className="text-2xl font-bold text-[#0f172a]">How We Use Your Data</h2>
            <ul className="mt-4 space-y-2 text-[#475569] ml-6 list-disc">
              <li>To provide and improve AppRadar</li>
              <li>To understand how users interact with the tool</li>
              <li>To fix bugs and add new features</li>
            </ul>
            <p className="mt-4 text-[#475569]">
              We do <strong>not</strong> sell, share, or use your data for marketing or advertising purposes.
            </p>
          </section>

          {/* Data Storage */}
          <section className="card p-6">
            <h2 className="text-2xl font-bold text-[#0f172a]">Data Storage & Security</h2>
            <p className="mt-3 text-[#475569]">
              AppRadar does not require user accounts, login, or registration. Search queries are processed instantly and
              cached minimally. We use industry-standard security practices to protect any data we collect.
            </p>
          </section>

          {/* Third-Party Data */}
          <section className="card p-6">
            <h2 className="text-2xl font-bold text-[#0f172a]">Third-Party Data Sources</h2>
            <p className="mt-3 text-[#475569]">
              All analytics displayed are sourced from <strong>public Google Play Store data only</strong>. We do not access,
              store, or transmit any private app developer information.
            </p>
          </section>

          {/* Cookies */}
          <section className="card p-6">
            <h2 className="text-2xl font-bold text-[#0f172a]">Cookies & Tracking</h2>
            <p className="mt-3 text-[#475569]">
              AppRadar uses minimal cookies for basic functi onality (e.g., preferences). We do not use tracking pixels,
              fingerprinting, or invasive analytics.
            </p>
          </section>

          {/* Contact */}
          <section className="card accent-surface p-6">
            <h2 className="text-2xl font-bold text-[#0f172a]">Questions?</h2>
            <p className="mt-3 text-[#475569]">
              If you have privacy concerns or questions, reach out via{" "}
              <a href="https://darkmintis.dev" className="font-semibold text-[#0f766e] hover:underline">darkmintis.dev</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
