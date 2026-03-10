import React from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n";

const Footer: React.FC = () => {
  const { t } = useI18n();
  const logoUrl = "/logo.png";
  const googleMapsUrl = "https://maps.google.com/?q=Ha-Vered+544+Kidron";

  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

          <div className="md:col-span-5">
            <div className="bg-white/5 p-6 rounded-3xl backdrop-blur-sm border border-white/10 inline-block mb-8 transition-transform hover:scale-105 duration-300">
              <img
                src={logoUrl}
                alt="Solchi Logo"
                className="h-20 w-auto brightness-0 invert"
                loading="lazy"
              />
            </div>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
              {t("footer.description")}
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xl font-bold mb-8 tech-font text-blue-400">
              {t("footer.quickNav")}
            </h4>

            <ul className="space-y-4 text-slate-400">
              <li><Link to="/">{t("footer.nav.home")}</Link></li>
              <li><Link to="/about">{t("footer.nav.about")}</Link></li>
              <li><Link to="/electricity">{t("footer.nav.electricity")}</Link></li>
              <li><Link to="/is">{t("footer.nav.is")}</Link></li>
              <li><Link to="/contact">{t("footer.nav.contact")}</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-xl font-bold mb-8 tech-font text-blue-400">
              {t("footer.contactTitle")}
            </h4>

            <address className="not-italic text-slate-400 space-y-4">
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                {t("footer.address")}
              </a>
              <div>
                <a href="mailto:hila@solchi.co.il">
                  hila@solchi.co.il
                </a>
              </div>
            </address>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 gap-6">
          <p>
            © {new Date().getFullYear()} Solchi Consulting Group. {t("footer.rights")}
          </p>
          <div>
            <Link to="/accessibility">
              {t("footer.accessibility")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
