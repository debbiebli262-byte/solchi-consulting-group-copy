import React, { useEffect, useState } from "react";
import { useI18n } from "../i18n";

type ModalKey = "salesforce" | "fintech" | "automation" | null;

const InformationSystems: React.FC = () => {
  const { lang, t } = useI18n();
  const [activeModal, setActiveModal] = useState<ModalKey>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModal(null);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const modalContent =
    lang === "he"
      ? {
          salesforce: {
            badge: "Salesforce",
            title: "Salesforce כפלטפורמה לניהול וצמיחה",
            intro:
              "Salesforce היא הרבה מעבר למערכת CRM. אני מתמחה בתכנון ובהקמה של פתרונות מותאמים אישית על גבי הפלטפורמה, במטרה לייעל תהליכים עסקיים, לשפר בקרה ולתמוך בצמיחה ארגונית.",
            sectionTitle: "תחומי הפעילות כוללים",
            items: [
              "אוטומציה של תהליכי עבודה וזרימות נתונים",
              "הקמת פורטלים ותהליכי הרשמה",
              "ניהול הקצאות ומעקב בזמן אמת",
              "התאמה של מבני מידע, אובייקטים ותהליכים לצרכים הייחודיים של כל ארגון",
            ],
            valueTitle: "הערך לארגון",
            value:
              "מערכת מדויקת, יציבה וגמישה יותר, שמפחיתה עבודה ידנית, חוסכת זמן ומספקת תמונת מצב רחבה ואחידה של הפעילות העסקית.",
          },
          fintech: {
            badge: "Fintech",
            title: "פתרונות טכנולוגיים לעולמות פיננסיים מורכבים",
            intro:
              "עם ניסיון בעבודה מול מערכות פיננסיות ובנקאיות, אני מלווה ארגונים בתכנון ובהקמה של תשתיות ותהליכים המשלבים בין דרישות רגולטוריות, לוגיקה עסקית מורכבת וחוויית משתמש מתקדמת.",
            sectionTitle: "תחומי הפעילות כוללים",
            items: [
              "אפיון והקמה של מערכות לניהול אשראי והלוואות מקצה לקצה",
              "בניית פתרונות לניהול פיקדונות וחסכונות",
              "דיגיטציה של תהליכים פיננסיים",
              "התאמה למערכות קיימות ולסביבה טכנולוגית מתקדמת",
            ],
            valueTitle: "הערך לארגון",
            value:
              "שילוב בין הבנה עסקית־פיננסית עמוקה לבין יישום טכנולוגי מדויק, תוך גישור אפקטיבי בין צורכי הרגולציה, הסיכונים והפיתוח.",
          },
          automation: {
            badge: "Process Automation",
            title: "מיכון תהליכים והתייעלות תפעולית",
            intro:
              "אני מתמחה בזיהוי צווארי בקבוק תפעוליים ובהפיכת תהליכים ידניים, מורכבים או לא עקביים לתהליכים מסודרים, אוטומטיים ומדידים.",
            sectionTitle: "תחומי הפעילות כוללים",
            items: [
              "מיפוי ואבחון של תהליכי עבודה קיימים",
              "זיהוי נקודות חולשה וחוסר יעילות",
              "תכנון ארכיטקטורת מידע מתאימה",
              "הטמעת פתרונות שמאפשרים עבודה רציפה, מדויקת ושקופה יותר",
            ],
            valueTitle: "הערך לארגון",
            value:
              "צמצום טעויות אנוש, שיפור היעילות התפעולית, הגדלת יכולת הסקייל וקבלת תמונת מצב עדכנית באמצעות דוחות ודשבורדים בזמן אמת.",
          },
        }
      : {
          salesforce: {
            badge: "Salesforce",
            title: "Salesforce as a Platform for Growth",
            intro:
              "Salesforce is far more than a CRM system. I specialize in planning and implementing tailored solutions on top of the platform to streamline business processes, improve control, and support organizational growth.",
            sectionTitle: "Core areas of activity",
            items: [
              "Workflow and data flow automation",
              "Registration portals and user-facing processes",
              "Real-time assignment management and tracking",
              "Adapting data structures, objects, and processes to the specific needs of each organization",
            ],
            valueTitle: "Value for the organization",
            value:
              "A more accurate, stable, and flexible system that reduces manual work, saves time, and provides a broad, unified view of business activity.",
          },
          fintech: {
            badge: "Fintech",
            title: "Technology Solutions for Complex Financial Environments",
            intro:
              "With experience working with financial and banking systems, I support organizations in planning and implementing infrastructures and processes that combine regulatory requirements, complex business logic, and advanced user experience.",
            sectionTitle: "Core areas of activity",
            items: [
              "End-to-end credit and loan management systems",
              "Solutions for deposits and savings products",
              "Digitization of financial processes",
              "Integration with existing systems and modern technological environments",
            ],
            valueTitle: "Value for the organization",
            value:
              "A combination of deep financial-business understanding and precise technological implementation, bridging regulation, risk, and development needs.",
          },
          automation: {
            badge: "Process Automation",
            title: "Process Automation & Operational Efficiency",
            intro:
              "I specialize in identifying operational bottlenecks and turning manual, complex, or inconsistent workflows into structured, automated, and measurable processes.",
            sectionTitle: "Core areas of activity",
            items: [
              "Mapping and diagnosing existing workflows",
              "Identifying weak points and inefficiencies",
              "Designing the right information architecture",
              "Implementing solutions that enable continuous, accurate, and transparent operations",
            ],
            valueTitle: "Value for the organization",
            value:
              "Reduced human error, improved operational efficiency, better scalability, and a real-time view through reports and dashboards.",
          },
        };

  const activeContent = activeModal ? modalContent[activeModal] : null;

  return (
    <>
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

                <div className="mt-10 flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => setActiveModal("salesforce")}
                    className="bg-indigo-500/10 backdrop-blur-md border border-indigo-500/30 px-4 py-2 rounded-lg text-indigo-200 text-sm font-bold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:text-white hover:border-indigo-400 hover:bg-indigo-500/20 hover:shadow-[0_0_18px_rgba(99,102,241,0.35)] focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                  >
                    {t("isPage.hero.badges.salesforce")}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveModal("fintech")}
                    className="bg-indigo-500/10 backdrop-blur-md border border-indigo-500/30 px-4 py-2 rounded-lg text-indigo-200 text-sm font-bold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:text-white hover:border-indigo-400 hover:bg-indigo-500/20 hover:shadow-[0_0_18px_rgba(99,102,241,0.35)] focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                  >
                    {t("isPage.hero.badges.fintech")}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveModal("automation")}
                    className="bg-indigo-500/10 backdrop-blur-md border border-indigo-500/30 px-4 py-2 rounded-lg text-indigo-200 text-sm font-bold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:text-white hover:border-indigo-400 hover:bg-indigo-500/20 hover:shadow-[0_0_18px_rgba(99,102,241,0.35)] focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                  >
                    {t("isPage.hero.badges.processAutomation")}
                  </button>
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

      {activeModal && activeContent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm px-4"
          onClick={() => setActiveModal(null)}
        >
          <div
            className={`relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-indigo-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 shadow-[0_0_60px_rgba(79,70,229,0.18)] ${
              lang === "he" ? "text-right" : "text-left"
            }`}
            dir={lang === "he" ? "rtl" : "ltr"}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-600/20 blur-3xl rounded-full"></div>

            <div className="relative z-10 p-8 md:p-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded mb-4 uppercase tracking-widest tech-font">
                    {activeContent.badge}
                  </span>

                  <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-tight tech-font">
                    {activeContent.title}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all hover:text-white hover:border-indigo-400 hover:shadow-[0_0_18px_rgba(99,102,241,0.25)]"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              <p
                className={`mt-8 text-lg md:text-xl text-indigo-100 leading-relaxed font-light ${
                  lang === "he"
                    ? "border-r-4 border-indigo-500 pr-6"
                    : "border-l-4 border-indigo-500 pl-6"
                }`}
              >
                {activeContent.intro}
              </p>

              <div className="mt-10">
                <h3 className="text-lg font-bold text-indigo-300 mb-5">
                  {activeContent.sectionTitle}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeContent.items.map((item) => (
                    <div
                      key={item}
                      className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-indigo-400/40 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-2 w-2 h-2 rounded-full bg-indigo-400 flex-shrink-0"></div>
                        <p className="text-slate-200 leading-relaxed">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-3">
                  {activeContent.valueTitle}
                </h3>
                <p className="text-slate-200 leading-relaxed">
                  {activeContent.value}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InformationSystems;
