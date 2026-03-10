import React from "react";
import { useI18n } from "../i18n";

const InformationSystems: React.FC = () => {
  const { lang, t } = useI18n();

  return (
    <div className="bg-white min-h-screen animate-fade-in">
      <div className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-indigo-600/20 blur-[120px] rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <span className="inline-block px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded mb-4 uppercase tracking-widest tech-font">
                {t("isPage.hero.tag")}
              </span>

              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tech-font leading-tight">
                {t("isPage.hero.name")}
              </h1>

              <p
                className={`text-xl text-indigo-100 leading-relaxed font-light pr-6 ${
                  lang === "he"
                    ? "border-r-4 border-indigo-500"
                    : "border-l-4 border-indigo-500 pl-6 pr-0"
                }`}
              >
                {t("isPage.hero.subtitle")}
              </p>

              <div className="mt-10 flex gap-4">
                <div className="bg-indigo-500/10 backdrop-blur-md border border-indigo-500/30 px-4 py-2 rounded-lg text-indigo-200 text-sm font-bold">
                  {t("isPage.hero.badges.salesforce")}
                </div>

                <div className="bg-indigo-500/10 backdrop-blur-md border border-indigo-500/30 px-4 py-2 rounded-lg text-indigo-200 text-sm font-bold">
                  {t("isPage.hero.badges.fintech")}
                </div>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-indigo-600/40 blur-3xl rounded-full scale-90 group-hover:scale-110 transition-transform duration-700"></div>

                <div className="relative w-64 h-80 md:w-80 md:h-[450px] bg-slate-800 rounded-[3rem] border-2 border-indigo-400/50 overflow-hidden shadow-[0_0_60px_rgba(79,70,229,0.3)] transform rotate-2 group-hover:rotate-0 transition-transform duration-500">
                  <img
                    src="/HilaCohen.png"
                    alt={t("isPage.hero.name")}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="absolute -top-6 -right-6 w-12 h-12 border-t-4 border-r-4 border-indigo-500 rounded-tr-2xl opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-10 tech-font border-b-2 border-indigo-600 pb-2 inline-block">
              {t("isPage.expertise.title")}
            </h2>

            <div className="prose prose-lg text-slate-700 leading-relaxed mb-12 text-justify">
              <p>{t("isPage.expertise.p1")}</p>
              <p>{t("isPage.expertise.p2")}</p>
            </div>

            <div className="bg-slate-900 text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden transition-all duration-500 hover:shadow-indigo-500/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 blur-3xl"></div>

              <h3 className="text-2xl font-bold mb-10 text-indigo-400 tech-font flex items-center gap-4">
                <div className="p-2 bg-indigo-500/20 rounded-lg">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                {t("isPage.credit.title")}
              </h3>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-slate-300">
                {[
                  "isPage.credit.items.0",
                  "isPage.credit.items.1",
                  "isPage.credit.items.2",
                  "isPage.credit.items.3",
                  "isPage.credit.items.4",
                  "isPage.credit.items.5",
                ].map((key) => (
                  <li
                    key={key}
                    className={`flex items-start gap-3 italic transition-colors hover:text-white ${
                      lang === "he"
                        ? "border-r border-indigo-500/30 pr-4"
                        : "border-l border-indigo-500/30 pl-4"
                    }`}
                  >
                    {t(key)}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 tech-font">
              {t("isPage.more.title")}
            </h2>

            <div className="grid grid-cols-1 gap-6">
              {Array.from({ length: 5 }).map((_, idx) => (
                <div
                  key={idx}
                  className="p-8 bg-slate-50 border border-slate-100 rounded-[2rem] hover:border-indigo-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
                >
                  <h4 className="font-bold text-slate-900 text-lg mb-3 group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                    <span className="text-indigo-400">#</span>
                    {t(`isPage.more.items.${idx}.title`)}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {t(`isPage.more.items.${idx}.desc`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-[5rem] mx-4 mb-24 overflow-hidden relative shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-16 tech-font">
            {t("isPage.why.title")}
          </h2>

          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-12 ${
              lang === "he" ? "text-right" : "text-left"
            }`}
          >
            {["0", "1", "2", "3"].map((i) => (
              <div
                key={i}
                className="flex gap-6 p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all group"
              >
                <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center flex-shrink-0 text-white font-bold text-xl group-hover:scale-110 transition-transform">
                  {Number(i) + 1}
                </div>
                <p className="font-medium text-lg text-indigo-50 self-center leading-relaxed">
                  {t(`isPage.why.items.${i}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default InformationSystems;
