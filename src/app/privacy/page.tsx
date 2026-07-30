export const metadata = {
  title: "Privacy Policy | AppRadar",
  description: "AppRadar privacy policy and data handling practices.",
};

export default function PrivacyPage() {
  return (
    <div className="container-shell py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <p className="theme-muted mt-4 text-sm">Last updated: April 2026</p>

        <div className="mt-8 space-y-8">
          {/* Data Collection */}
          <section className="card p-6">
            <h2 className="text-2xl font-bold">Data We Collect</h2>
            <p className="theme-muted mt-3">
              When you use AppRadar, we collect minimal information:
            </p>
            <ul className="theme-muted mt-4 space-y-2 ml-6 list-disc">
              <li>App names or package IDs you search for (sent to our API to scrape Play Store)</li>
              <li>Standard server/hosting logs from your requests (IP, user agent) as provided by the host</li>
              <li>Theme preference and quick-app icon cache stored only in your browser (localStorage)</li>
            </ul>
          </section>

          {/* How We Use Data */}
          <section className="card p-6">
            <h2 className="text-2xl font-bold">How We Use Your Data</h2>
            <ul className="theme-muted mt-4 space-y-2 ml-6 list-disc">
              <li>To fetch and display public Play Store profiles you request</li>
              <li>To operate and secure the hosted service</li>
              <li>To remember your theme preference on your device</li>
            </ul>
            <p className="theme-muted mt-4">
              We do <strong>not</strong> sell, share, or use your data for marketing or advertising purposes.
            </p>
          </section>

          {/* Data Storage */}
          <section className="card p-6">
            <h2 className="text-2xl font-bold">Data Storage & Security</h2>
            <p className="theme-muted mt-3">
              AppRadar does not require user accounts, login, or registration. Search queries are processed instantly and
              cached minimally. We use industry-standard security practices to protect any data we collect.
            </p>
          </section>

          {/* Third-Party Data */}
          <section className="card p-6">
            <h2 className="text-2xl font-bold">Third-Party Data Sources</h2>
            <p className="theme-muted mt-3">
              All analytics displayed are sourced from <strong>public Google Play Store data only</strong>. We do not access,
              store, or transmit any private app developer information.
            </p>
          </section>

          {/* Cookies */}
          <section className="card p-6">
            <h2 className="text-2xl font-bold">Cookies & Tracking</h2>
            <p className="theme-muted mt-3">
              AppRadar uses minimal cookies for basic functionality (e.g., preferences). We do not use tracking pixels,
              fingerprinting, or invasive analytics.
            </p>
          </section>

          {/* Contact */}
          <section className="card accent-surface p-6">
            <h2 className="text-2xl font-bold">Questions?</h2>
            <p className="theme-muted mt-3">
              If you have privacy concerns or questions, reach out via{" "}
              <a href="https://darkmintis.dev" className="about-accent-link font-semibold hover:underline">darkmintis.dev</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
