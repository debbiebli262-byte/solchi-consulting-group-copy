import React from "react";
import { useI18n } from "../i18n";

const About: React.FC = () => {
  const { t } = useI18n();

  const logoUrl = "/logo.png";

  return (
    <div className="bg-white min-h-screen animate-fade-in">
      {/* Hero Section */}
      <div className="bg-blue-50/70 py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/40 rounded-full -mr-32 -mt-32"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tech-font">
              {t("about.hero.title")}
            </h1>
            <p className="text-xl text-blue-700 font-bold max-w-2xl">
              {t("about.hero.subtitle")}
            </p>
          </div>

          <div className="flex-shrink-0">
            <img
              src={logoUrl}
              alt="Solchi Logo"
              className="h-40 w-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
            <p>{t("about.content.p1")}</p>
            <p>{t("about.content.p2")}</p>
            <p>{t("about.content.p3")}</p>
          </div>

          {/* Vision Card */}
          <div className="bg-slate-900 p-10 rounded-3xl text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/30 rounded-full -mr-16 -mt-16"></div>

            <h3 className="text-2xl font-bold mb-8 tech-font text-blue-400">
              {t("about.vision.title")}
            </h3>

            <ul className="space-y-6">
              {[0, 1, 2].map((i) => (
                <li key={i} className="flex gap-4">
                  <div className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-blue-500"></div>
                  <p>{t(`about.vision.items.${i}`)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
