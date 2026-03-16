import React, { useEffect, useMemo, useState } from "react";
import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  CountryCode,
} from "libphonenumber-js";
import emailjs from "@emailjs/browser";
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
    if (!trimmed) return t("contact.validation.nameRequired");

    const nameRegex = /^[A-Za-z\u0590-\u05FF\s'-]+$/;

    if (!nameRegex.test(trimmed))
      return t("contact.validation.nameLettersOnly");

    return "";
  };

  const validateEmail = (value: string) => {
    const trimmed = value.trim();

    if (!trimmed) return t("contact.validation.emailRequired");

    if (/\s/.test(value)) return t("contact.validation.emailNoSpaces");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmed))
      return t("contact.validation.emailInvalid");

    return "";
  };

  const validatePhone = (value: string, country: CountryCode) => {
    const trimmed = value.trim();

    if (!trimmed) return t("contact.validation.phoneRequired");

    const digitsOnly = trimmed.replace(/[^\d]/g, "");

    if (!digitsOnly) return t("contact.validation.phoneInvalid");

    if (country === "IL") {
      if (!/^0\d{9}$/.test(digitsOnly))
        return t("contact.validation.phoneInvalidIsrael");
      return "";
    }

    const fullInternationalNumber = `+${getCountryCallingCode(country)}${digitsOnly}`;
    const phoneNumber = parsePhoneNumberFromString(fullInternationalNumber);

    if (!phoneNumber || !phoneNumber.isValid())
      return t("contact.validation.phoneInvalid");

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
  }, [lang]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors: FormErrors = {
      name: validateName(formData.name) || undefined,
      email: validateEmail(formData.email) || undefined,
      phone: validatePhone(formData.phone, formData.country) || undefined,
    };

    setErrors(nextErrors);

    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (hasErrors) return;

    const toEmail =
      formData.subject === "electrical"
        ? "yehiel@solchi.co.il"
        : "hila@solchi.co.il";

    try {
      await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {
          name: formData.name,
          email: formData.email,
          phone: `+${getCountryCallingCode(formData.country)} ${formData.phone}`,
          title:
            formData.subject === "electrical"
              ? "חטיבת החשמל"
              : "מערכות מידע",
          message: formData.message,
          to_email: toEmail,
        },
        "YOUR_PUBLIC_KEY"
      );

      window.location.hash = "#/thank-you";
    } catch (error) {
      console.error("EmailJS error:", error);
      alert("אירעה שגיאה בשליחת הטופס");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-24">
      {/* ... כל הקוד של העמוד נשאר בדיוק כמו אצלך ... */}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>

        {/* כל השדות שלך נשארים אותו דבר */}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl transition-all"
        >
          {t("contact.send")}
        </button>

      </form>

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
