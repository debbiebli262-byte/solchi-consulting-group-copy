import React, { useEffect, useMemo, useState } from "react";
import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  CountryCode,
} from "libphonenumber-js";
import { useI18n } from "../i18n";

type FormDataState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  country: CountryCode;
};

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
};

const DEFAULT_COUNTRY: CountryCode = "IL";

const Contact: React.FC = () => {
  const { t, lang } = useI18n();

  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    country: DEFAULT_COUNTRY,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const regionNames = useMemo(() => {
    try {
      return new Intl.DisplayNames(["en"], { type: "region" });
    } catch {
      return null;
    }
  }, []);

  const countries = useMemo(() => {
    return getCountries()
      .filter((code) => code.length === 2)
      .map((code) => ({
        code,
        callingCode: `+${getCountryCallingCode(code)}`,
        name: regionNames?.of(code) || code,
        flag: getFlagEmoji(code),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [regionNames]);

  const openMap = () => {
    window.open(
      "https://www.google.com/maps/place/Ha-Vered+St+544,+Kidron,+Israel",
      "_blank"
    );
  };

  const validateName = (value: string) => {
    const trimmed = value.trim();

    if (!trimmed) {
      return t("contact.validation.nameRequired");
    }

    const nameRegex = /^[A-Za-z\u0590-\u05FF\s'-]+$/;

    if (!nameRegex.test(trimmed)) {
      return t("contact.validation.nameLettersOnly");
    }

    return "";
  };

  const validateEmail = (value: string) => {
    const trimmed = value.trim();

    if (!trimmed) {
      return t("contact.validation.emailRequired");
    }

    if (/\s/.test(value)) {
      return t("contact.validation.emailNoSpaces");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmed)) {
      return t("contact.validation.emailInvalid");
    }

    return "";
  };

  const validatePhone = (value: string, country: CountryCode) => {
    const trimmed = value.trim();

    if (!trimmed) {
      return t("contact.validation.phoneRequired");
    }

    const digitsOnly = trimmed.replace(/[^\d]/g, "");

    if (!digitsOnly) {
      return t("contact.validation.phoneInvalid");
    }

    if (country === "IL") {
      if (!/^0\d{9}$/.test(digitsOnly)) {
        return t("contact.validation.phoneInvalidIsrael");
      }
      return "";
    }

    const fullInternationalNumber = `+${getCountryCallingCode(country)}${digitsOnly}`;
    const phoneNumber = parsePhoneNumberFromString(fullInternationalNumber);

    if (!phoneNumber || !phoneNumber.isValid()) {
      return t("contact.validation.phoneInvalid");
    }

    return "";
  };

  const validateField = (
    field: keyof FormDataState,
    value: string,
    countryOverride?: CountryCode
  ) => {
    switch (field) {
      case "name":
        return validateName(value);
      case "email":
        return validateEmail(value);
      case "phone":
        return validatePhone(value, countryOverride || formData.country);
      default:
        return "";
    }
  };

  const updateError = (field: keyof FormErrors, message: string) => {
    setErrors((prev) => ({
      ...prev,
      [field]: message || undefined,
    }));
  };

  const handleBlur = (field: keyof FormDataState) => {
    if (field === "name" || field === "email" || field === "phone") {
      const message = validateField(field, formData[field]);
      updateError(field, message);
    }
  };

  useEffect(() => {
    setErrors((prev) => ({
      name: prev.name ? validateName(formData.name) || undefined : undefined,
      email: prev.email ? validateEmail(formData.email) || undefined : undefined,
      phone: prev.phone
        ? validatePhone(formData.phone, formData.country) || undefined
        : undefined,
    }));
  }, [lang, formData.name, formData.email, formData.phone, formData.country]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors: FormErrors = {
      name: validateName(formData.name) || undefined,
      email: validateEmail(formData.email) || undefined,
      phone: validatePhone(formData.phone, formData.country) || undefined,
    };

    setErrors(nextErrors);

    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (hasErrors) return;

    // Sending is currently unavailable
  };

  return (
    <div className="min-h-screen bg-slate-50 py-24 animate-fade-in relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 blur-[100px] rounded-full -mr-48 -mt-48" />

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

                <div>
                  <h4 className="font-bold text-slate-900 text-lg mb-4">
                    {t("contact.peopleTitle")}
                  </h4>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:border-blue-200 transition">
                      <p className="font-semibold text-slate-900 text-base">
                        {t("contact.people.hila.name")}
                      </p>

                      <p className="text-sm text-slate-500 mt-1 mb-3">
                        {t("contact.people.hila.role")}
                      </p>

                      <a
                        href={`mailto:${t("contact.people.hila.email")}`}
                        className="text-blue-600 hover:text-blue-700 font-medium break-all"
                        dir="ltr"
                      >
                        {t("contact.people.hila.email")}
                      </a>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:border-blue-200 transition">
                      <p className="font-semibold text-slate-900 text-base">
                        {t("contact.people.yehiel.name")}
                      </p>

                      <p className="text-sm text-slate-500 mt-1 mb-3">
                        {t("contact.people.yehiel.role")}
                      </p>

                      <a
                        href={`mailto:${t("contact.people.yehiel.email")}`}
                        className="text-blue-600 hover:text-blue-700 font-medium break-all"
                        dir="ltr"
                      >
                        {t("contact.people.yehiel.email")}
                      </a>
                    </div>
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
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-600" />

            <h2 className="text-3xl font-bold mb-10 tech-font text-slate-900">
              {t("contact.formTitle")}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">
                  {t("contact.fields.fullName")}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData((prev) => ({ ...prev, name: value }));
                    if (errors.name) {
                      updateError("name", validateName(value));
                    }
                  }}
                  onBlur={() => handleBlur("name")}
                  className={`w-full px-5 py-4 rounded-2xl border outline-none transition-all bg-slate-50/50 ${
                    errors.name
                      ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                      : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  }`}
                  placeholder={t("contact.placeholders.fullName")}
                  dir={lang === "he" ? "rtl" : "ltr"}
                />
                {errors.name && (
                  <p className="text-sm text-red-600 font-medium">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">
                  {t("contact.fields.subject")}
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      subject: e.target.value,
                    }))
                  }
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all bg-slate-50/50 text-slate-700"
                  dir={lang === "he" ? "rtl" : "ltr"}
                >
                  <option value="">{t("contact.placeholders.subject")}</option>
                  <option value="electrical">
                    {t("contact.subjectOptions.electricalDivision")}
                  </option>
                  <option value="information_systems">
                    {t("contact.subjectOptions.informationSystems")}
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-700">
                    {t("contact.fields.email")}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData((prev) => ({ ...prev, email: value }));
                      if (errors.email) {
                        updateError("email", validateEmail(value));
                      }
                    }}
                    onBlur={() => handleBlur("email")}
                    className={`w-full px-5 py-4 rounded-2xl border outline-none transition-all bg-slate-50/50 ${
                      errors.email
                        ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                        : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    }`}
                    placeholder={t("contact.placeholders.email")}
                    dir="ltr"
                    inputMode="email"
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 font-medium">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2 min-w-0">
                  <label className="block text-sm font-bold text-slate-700">
                    {t("contact.fields.phone")}
                  </label>

                  <div className="flex flex-col gap-3 min-w-0">
                    <select
                      value={formData.country}
                      onChange={(e) => {
                        const nextCountry = e.target.value as CountryCode;
                        setFormData((prev) => ({
                          ...prev,
                          country: nextCountry,
                        }));

                        if (formData.phone) {
                          updateError(
                            "phone",
                            validatePhone(formData.phone, nextCountry)
                          );
                        }
                      }}
                      className="w-full min-w-0 px-4 py-4 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all bg-slate-50/50 text-slate-700"
                      dir="ltr"
                    >
                      {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.name} ({country.callingCode})
                        </option>
                      ))}
                    </select>

                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData((prev) => ({ ...prev, phone: value }));
                        if (errors.phone) {
                          updateError(
                            "phone",
                            validatePhone(value, formData.country)
                          );
                        }
                      }}
                      onBlur={() => handleBlur("phone")}
                      className={`w-full min-w-0 px-5 py-4 rounded-2xl border outline-none transition-all bg-slate-50/50 ${
                        errors.phone
                          ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                          : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      }`}
                      placeholder={t("contact.placeholders.phone")}
                      dir="ltr"
                      inputMode="tel"
                      autoComplete="tel"
                    />

                    {errors.phone && (
                      <p className="text-sm text-red-600 font-medium">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">
                  {t("contact.fields.message")}
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all bg-slate-50/50"
                  placeholder={t("contact.placeholders.message")}
                  dir={lang === "he" ? "rtl" : "ltr"}
                />
              </div>

              <div className="w-full bg-slate-200 text-slate-700 font-bold py-5 rounded-2xl flex items-center justify-center text-center px-4">
                {t("contact.formUnavailable")}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

function getFlagEmoji(countryCode: string) {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
}

export default Contact;
