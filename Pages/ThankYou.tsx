import React from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n";

const ThankYou: React.FC = () => {
  const { t } = useI18n();
  const logoUrl = "/logo.png";

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center relative">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <div className="bg-white p-4 rounded-full shadow-lg border border-blue-50">
            <img src={logoUrl} alt="Solchi Logo" className="h-20 w-auto" />
          </div>
        </div>

        <div className="pt-12">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            {t("thankYou.title")}
          </h1>

          <p className="text-slate-600 mb-8">
            {t("thankYou.subtitle")}
          </p>

          <Link
            to="/"
            className="inline-block w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors"
          >
            {t("thankYou.backHome")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
