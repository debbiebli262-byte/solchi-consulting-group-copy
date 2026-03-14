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

  const modalContent = {
    salesforce: {
      title: t("isPage.hero.badges.salesforce"),
      text:
        lang === "he"
          ? `תכנון והובלת פרויקטי Salesforce מורכבים, כולל בניית תהליכים עסקיים, אינטגרציות והתאמות מערכת לצורכי הארגון.`
          : `Planning and leading complex Salesforce projects including business process design, integrations and system customization.`,
    },

    fintech: {
      title: t("isPage.hero.badges.fintech"),
      text:
        lang === "he"
          ? `ניסיון מעמיק במערכות פיננסיות, תהליכי אשראי, רגולציה, בקרה ודיווחים.`
          : `Extensive experience in financial systems including credit processes, regulation and reporting.`,
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
• Scalability – היכולת לגדול בנפח הפעילות מבלי להגדיל כוח אדם באותו יחס  
• שקיפות – דאשבורדים ודוחות בזמן אמת`

          : `Less manual work, more results: Process Automation Expert

Is your organization still relying on manual spreadsheets, lost emails and complex workflows?
My expertise is identifying operational bottlenecks and transforming them into smooth automated processes.

How I help organizations improve efficiency:

• Mapping & Diagnosis – analyzing current processes  
• Information Architecture – selecting the right tools  
• Implementation & Change Management – guiding teams into automated workflows

Why it matters:

• Fewer errors  
• Scalability without increasing manpower  
• Real-time dashboards and transparency`,
    },
  };

  return (
    <>
      <div className="bg-white min-h-screen animate-fade-in">
        <div className="bg-slate-900 py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20"></div>

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
                    className="bg-indigo-500/10 border border-indigo-500/30 px-4 py-2 rounded-lg text-indigo-200 text-sm font-bold hover:bg-indigo-500/20 transition"
                  >
                    {t("isPage.hero.badges.salesforce")}
                  </button>

                  <button
                    onClick={() => openModal("fintech")}
                    className="bg-indigo-500/10 border border-indigo-500/30 px-4 py-2 rounded-lg text-indigo-200 text-sm font-bold hover:bg-indigo-500/20 transition"
                  >
                    {t("isPage.hero.badges.fintech")}
                  </button>

                  <button
                    onClick={() => openModal("processAutomation")}
                    className="bg-indigo-500/10 border border-indigo-500/30 px-4 py-2 rounded-lg text-indigo-200 text-sm font-bold hover:bg-indigo-500/20 transition"
                  >
                    {t("isPage.hero.badges.processAutomation")}
                  </button>
                </div>
              </div>

              <div className="md:w-1/2 flex justify-center">
                <img
                  src="/HilaCohen.png"
                  alt={t("isPage.hero.name")}
                  className="w-64 md:w-80 rounded-3xl border-2 border-indigo-400 shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>

        {activeModal && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-md px-4"
            onClick={closeModal}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-3xl border border-indigo-200 bg-white p-10 text-slate-800 shadow-2xl animate-[fadeIn_0.35s_ease]"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-2xl text-slate-500 hover:text-slate-800"
              >
                ×
              </button>

              <h3 className="text-3xl font-bold mb-6">
                {modalContent[activeModal as keyof typeof modalContent].title}
              </h3>

              <p className="leading-relaxed whitespace-pre-line text-lg">
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
