import React, { useState, useEffect } from "react";
import { useI18n } from "../i18n";

const InformationSystems: React.FC = () => {
  const { lang, t } = useI18n();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (modalName: string) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeModal]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const modalContent = {
    salesforce: {
      title: t("isPage.hero.badges.salesforce"),
      text:
        lang === "he"
          ? `תכנון והובלת פרויקטי Salesforce מורכבים, כולל בניית תהליכים עסקיים, אינטגרציות, התאמות מערכת ויישום פתרונות מדויקים לצורכי הארגון.`
          : `Planning and leading complex Salesforce projects including business process design, integrations, system customization, and tailored solutions for organizational needs.`,
    },

    fintech: {
      title: t("isPage.hero.badges.fintech"),
      text:
        lang === "he"
          ? `ניסיון מעמיק במערכות פיננסיות, תהליכי אשראי, רגולציה, בקרה, דיווחים ואינטגרציה בין מערכות ליבה בארגון.`
          : `Extensive experience in financial systems including credit processes, regulation, controls, reporting and integration between core enterprise platforms.`,
    },

    processAutomation: {
      title:
        lang === "he"
          ? "מיכון תהליכים והתייעלות תפעולית (Operational Efficiency)"
          : "Process Automation & Operational Efficiency",

      text:
        lang === "he"
          ? `פחות "עבודה שחורה", יותר תוצאות: מומחית במיכון תהליכים

האם הארגון שלך עדיין נשען על אקסלים ידניים, מיילים אבודים ותהליכים מסורבלים?
המומחיות שלי היא לזהות את צווארי הבקבוק ולהפוך אותם לתהליכים אוטומטיים וחלקים.

איך אני עוזרת לארגון להתייעל?

• מיפוי ואבחון – ניתוח המצב הקיים ואיתור נקודות התורפה התפעוליות  
• תכנון ארכיטקטורת מידע – בחירת הכלים הנכונים למיכון המשימות הידניות  
• הטמעה וניהול שינוי – ליווי הצוותים במעבר לעבודה ממוכנת, יעילה ומדידה

למה זה כדאי?

• צמצום טעויות – המערכת עובדת בשבילך, לא להיפך  
• Scalability – היכולת לגדול בנפח הפעילות מבלי להגדיל את כוח האדם באותו יחס  
• שקיפות – דאשבורדים ודוחות בזמן אמת על ביצועי הארגון`

          : `Less manual work, more results: Process Automation Expert

Is your organization still relying on manual spreadsheets, lost emails and complex workflows?
My expertise is identifying operational bottlenecks and transforming them into smooth automated processes.

How I help organizations improve efficiency:

• Mapping & Diagnosis – analyzing the current operational structure and identifying weaknesses  
• Information Architecture – selecting the right systems to automate manual tasks  
• Implementation & Change Management – guiding teams into efficient and measurable automated workflows

Why it matters:

• Fewer errors – systems work for you, not the other way around  
• Scalability – grow operations without increasing manpower at the same rate  
• Transparency – real-time dashboards and performance reporting`,
    },
  };

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
                    onClick={() => openModal("salesforce")}
                    className="bg-indigo-500/10 backdrop-blur-md border border-indigo-500/30 px-4 py-2 rounded-lg text-indigo-200 text-sm font-bold hover:bg-indigo-500/20 transition"
                  >
                    {t("isPage.hero.badges.salesforce")}
                  </button>

                  <button
                    onClick={() => openModal("fintech")}
                    className="bg-indigo-500/10 backdrop-blur-md border border-indigo-500/30 px-4 py-2 rounded-lg text-indigo-200 text-sm font-bold hover:bg-indigo-500/20 transition"
                  >
                    {t("isPage.hero.badges.fintech")}
                  </button>

                  <button
                    onClick={() => openModal("processAutomation")}
                    className="bg-indigo-500/10 backdrop-blur-md border border-indigo-500/30 px-4 py-2 rounded-lg text-indigo-200 text-sm font-bold hover:bg-indigo-500/20 transition"
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
                </div>
              </div>
            </div>
          </div>
        </div>

        {activeModal && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/40 backdrop-blur-md px-4"
            onClick={closeModal}
          >
            <div
              className="relative w-full max-w-2xl rounded-[2rem] border border-indigo-400/30 bg-gradient-to-br from-slate-900 via-[#0d1433] to-indigo-950 p-8 md:p-10 text-white shadow-[0_20px_80px_rgba(0,0,0,0.55)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/10 bg-white/5 text-white text-xl hover:bg-white/10 transition"
              >
                ×
              </button>

              <span className="inline-block px-3 py-1 bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-bold rounded mb-4 uppercase tracking-widest tech-font">
                {t("isPage.hero.tag")}
              </span>

              <h3 className="text-3xl font-extrabold mb-6 tech-font">
                {modalContent[activeModal as keyof typeof modalContent].title}
              </h3>

              <p className="text-lg leading-relaxed text-indigo-100 whitespace-pre-line">
                {modalContent[activeModal as keyof typeof modalContent].text}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default InformationSystems;
