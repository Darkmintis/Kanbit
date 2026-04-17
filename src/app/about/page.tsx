import { CheckCircle, Info } from "lucide-react";

export const metadata = {
  title: "About AppRadar | Play Store Analytics",
  description: "Learn aboutAppRadar and how we analyze Google Play Store data.",
};

export default function AboutPage() {
  return (
    <div className="container-shell py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-[#0f172a]">About AppRadar</h1>
        <p className="mt-4 text-lg text-[#475569]">
          AppRadar is a modern analytics tool that helps app makers, marketers, and developers understand app performance on
          the Google Play Store.
        </p>

        {/* Mission */}
        <div className="mt-12 card p-8">
          <h2 className="text-2xl font-bold text-[#0f172a]">Our Mission</h2>
          <p className="mt-4 text-[#475569]">
            We believe app analytics should be simple, fast, and accessible to everyone. AppRadar removes the complexity and
            delivers crystal-clear insights in seconds.
          </p>
        </div>

        {/* How It Works */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-[#0f172a]">How It Works</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { title: "Search", desc: "Enter any app name or package from the Google Play Store" },
              { title: "Analyze", desc: "We pull public data and generate instant analytics" },
              { title: "Understand", desc: "Get charts, trends, ratings, and smart insights" },
            ].map((step, i) => (
              <div key={step.title} className="card p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary text-white font-bold">
                    {i + 1}
                  </div>
                  <h3 className="font-semibold text-[#0f172a]">{step.title}</h3>
                </div>
                <p className="mt-3 text-[#475569]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Data Source */}
        <div className="mt-12 rounded-lg border border-[#bfdbfe] bg-[#eff6ff] p-6">
          <div className="flex gap-3">
            <Info className="h-6 w-6 flex-shrink-0 text-[#1e40af]" />
            <div>
              <h3 className="font-semibold text-[#1e40af]">About Our Data</h3>
              <p className="mt-2 text-[#1e40af]">
                AppRadar uses <strong>public Play Store signals only</strong>. We do not access private Google Play Console
                data. All metrics are estimates based on publicly available information and should be treated as directional
                insights, not official figures.
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-[#0f172a]">Features</h2>
          <ul className="mt-8 space-y-4">
            {[
              "Download & install estimates",
              "Growth trends over time",
              "App ratings and review counts",
              "Comparative analytics",
              "Health score and risk assessment",
              "Instant insights and recommendations",
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 flex-shrink-0 text-[#10b981]" />
                <span className="text-[#475569]">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Creator */}
        <div className="mt-12 card p-8 bg-gradient-to-br from-[#0f766e]/5 to-[#f59e0b]/5">
          <h2 className="text-2xl font-bold text-[#0f172a]">Who Built This?</h2>
          <p className="mt-4 text-[#475569]">
            AppRadar is built by <a href="https://darkmintis.dev" className="font-semibold text-[#0f766e] hover:underline">Darkmintis</a> a passionate developer and maker focusing on clean,
            useful tools for the app ecosystem.
          </p>
          <div className="mt-4 flex gap-4">
            <a
              href="https://darkmintis.dev"
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-lg bg-[#0f766e] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#065f57]"
            >
              Visit Portfolio
            </a>
            <a
              href="https://github.com/Darkmintis"
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-lg border border-[#0f766e] px-4 py-2 text-sm font-semibold text-[#0f766e] transition hover:bg-[#0f766e]/5]"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
