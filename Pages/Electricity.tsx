import React from "react";
import { useI18n } from "../i18n";

const Electricity: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="bg-white min-h-screen animate-fade-in">
      {/* Hero */}
      <div className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded mb-4 uppercase tracking-widest tech-font">
                {t("electricity.pageTag")}
              </span>

              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tech-font leading-tight">
                {t("electricity.name")}
              </h1>

              <p className="text-xl text-slate-300 leading-relaxed font-light border-r-4 border-blue-600 pr-6">
                {t("electricity.role")}
              </p>

              <p className="mt-6 text-slate-400">{t("electricity.lead")}</p>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-blue-600/30 blur-3xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-700"></div>

                <div className="relative w-64 h-80 md:w-80 md:h-[450px] bg-slate-800 rounded-[2rem] border-2 border-blue-500/50 overflow-hidden shadow-[0_0_50px_rgba(37,99,235,0.2)]">
                  <img
                    src="/yehielcohen.png"
                    alt={t("electricity.name")}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-4 border-l-4 border-blue-500 rounded-bl-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* LEFT STICKY COLUMN */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="sticky top-28 space-y-16">
              {/* שירותי הייעוץ */}
              <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-600/20">
                <h3 className="text-xl font-bold mb-8 tech-font">
                  {t("electricity.servicesTitle")}
                </h3>

                <ul className="space-y-6 text-sm">
                  {[0, 1, 2, 3].map((i) => (
                    <li
                      key={i}
                      className="border-b border-blue-400 pb-4 leading-relaxed flex gap-3"
                    >
                      <span className="font-bold text-blue-200">0{i + 1}</span>
                      <p>{t(`electricity.services.${i}`)}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* שירותי התכנון */}
              <div
                onClick={() => {
                  const section = document.getElementById("planning-services");
                  section?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-600/20 cursor-pointer hover:bg-blue-700 transition-colors"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    const section = document.getElementById("planning-services");
                    section?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <h3 className="text-xl font-bold mb-8 tech-font">
                  {t("electricity.planningTitle")}
                </h3>

                <ul className="space-y-6 text-sm">
                  {[0, 1, 2, 3].map((i) => (
                    <li
                      key={i}
                      className="border-b border-blue-400 pb-4 flex gap-3 leading-relaxed"
                    >
                      <span className="font-bold text-blue-200">0{i + 1}</span>
                      <p>{t(`electricity.planningItems.${i}`)}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 tech-font border-b-2 border-blue-600 pb-2 inline-block">
              {t("electricity.experienceTitle")}
            </h2>

            <div className="space-y-6 text-lg text-slate-700 leading-relaxed text-justify">
              <p>{t("electricity.experienceP1")}</p>
              <p>{t("electricity.experienceP2")}</p>
              <p>{t("electricity.experienceP3")}</p>
              <p>{t("electricity.experienceP4")}</p>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-16 mb-8 tech-font">
              {t("electricity.expertiseTitle")}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors group"
                >
                  <div className="w-3 h-3 rounded-full bg-blue-600 group-hover:scale-125 transition-transform"></div>
                  <span className="font-bold text-slate-800">
                    {t(`electricity.expertise.${i}`)}
                  </span>
                </div>
              ))}
            </div>

            {/* Planning Section Anchor */}
            <section id="planning-services" className="mt-20">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 tech-font">
                {t("electricity.planningTitle")}
              </h3>

              <div className="bg-slate-50 rounded-3xl border border-slate-100 p-8 md:p-10">
                <p className="text-slate-700 text-lg leading-relaxed mb-8">
                  {t("electricity.planningIntro")}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                    <div
                      key={i}
                      className="flex gap-4 p-5 bg-white rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors group"
                    >
                      <div className="mt-2 flex-shrink-0 w-2 h-2 rounded-full bg-blue-600 group-hover:scale-125 transition-transform"></div>
                      <p className="text-slate-700 leading-relaxed">
                        {t(`electricity.planningItems.${i}`)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16 tech-font">
            {t("electricity.clientsTitle")}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center">
              <img
                src="/logos/iec.png"
                alt="חברת החשמל לישראל"
                className="max-h-20 object-contain grayscale hover:grayscale-0 hover:scale-105 transition duration-300"
              />
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center">
              <img
                src="/logos/noga.png"
                alt="נגה ניהול מערכת חשמל"
                className="max-h-16 object-contain grayscale hover:grayscale-0 hover:scale-105 transition duration-300"
              />
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center">
              <img
                src="/logos/dalia.png"
                alt="דליה אנרגיות"
                className="max-h-16 object-contain grayscale hover:grayscale-0 hover:scale-105 transition duration-300"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Electricity;
