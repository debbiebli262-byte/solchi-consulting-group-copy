import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../i18n";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const CONTACT_EMAILS: Record<string, string> = {
  electrical: "yehiel@solchi.co.il",
  information_systems: "hila@solchi.co.il",
};

const Contact: React.FC = () => {
  const { t, lang } = useI18n();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  const openMap = () => {
    window.open(
      "https://www.google.com/maps/place/Ha-Vered+St+544,+Kidron,+Israel",
      "_blank"
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const toEmail = CONTACT_EMAILS[formData.subject];

    if (!toEmail) {
      setError(t("contact.errors.subjectRequired"));
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      setError(t("contact.errors.requiredFields"));
      return;
    }

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setError(t("contact.errors.emailjsMissing"));
      return;
    }

    try {
      setIsSending(true);

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: toEmail,
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          subject:
            formData.subject === "electrical"
              ? t("contact.subjectOptions.electricalDivision")
              : t("contact.subjectOptions.informationSystems"),
          message: formData.message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      navigate("/thank-you");
    } catch (err) {
      console.error("EmailJS error:", err);
      setError(t("contact.errors.sendFailed"));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-24 animate-fade-in relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 blur-[100px] rounded-full -mr-48 -mt-48"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-slate-900 mb-6 tech-font">
            {t("contact.pageTitle")}
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light">
            {t("contact.pageSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col justify-between h-full">
            <div>
              <h2 className="text-2xl font-bold mb-10 tech-font text-blue-600">
                {t("contact.detailsTitle")}
              </h2>

              <div className="space-y-10">
                <div
                  onClick={openMap}
                  className="flex items-start gap-5 cursor-pointer group"
                >
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:scale-110 duration-300">
                    <svg
                      className="w-7 h-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-lg mb-1">
                      {t("contact.addressTitle")}
                    </h4>

                    <p className="text-slate-600 group-hover:text-blue-600 transition-colors">
                      {t("contact.addressText")}
                    </p>

                    <p className="text-xs font-bold text-blue-400 mt-1 uppercase tracking-wider">
                      {t("contact.addressHint")}
                    </p>
                  </div>
                </div>

                {/* אנשי קשר */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">
                      הילה כהן
                    </h4>
                    <p className="text-slate-600">מנהלת מערכות מידע</p>
                    <a
                      href="mailto:hila@solchi.co.il"
                      className="text-blue-600 hover:underline"
                    >
                      hila@solchi.co.il
                    </a>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">
                      יחיאל אמיר כהן
                    </h4>
                    <p className="text-slate-600">מנהל חטיבת החשמל</p>
                    <a
                      href="mailto:yehiel@solchi.co.il"
                      className="text-blue-600 hover:underline"
                    >
                      yehiel@solchi.co.il
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-10 border-t border-slate-50">
              <div className="flex items-center gap-3 text-slate-500 mb-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="font-bold text-sm uppercase tracking-wide">
                  {t("contact.availabilityTitle")}
                </p>
              </div>

              <p className="text-slate-800 font-medium">
                {t("contact.availabilityHours")}
              </p>
            </div>
          </div>

          <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl border border-blue-50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-600"></div>

            <h2 className="text-3xl font-bold mb-10 tech-font text-slate-900">
              {t("contact.formTitle")}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* שאר הטופס נשאר ללא שינוי */}
              ...
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
