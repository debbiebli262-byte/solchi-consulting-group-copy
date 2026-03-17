import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/* =========================================================
   הגדרות בסיס
========================================================= */

export type Lang = "he" | "en";

const STORAGE_KEY = "site_lang";

/* =========================================================
   מאגר הטקסטים של האתר
   - עברית
   - אנגלית
========================================================= */

export const copy = {
  he: {
    /* ===================== ניווט עליון ===================== */
    nav: {
      home: "דף הבית",
      about: "אודות",
      electricity: "חטיבת חשמל",
      is: "מערכות מידע",
      contact: "צור קשר",
      language: "שפה",
    },

    /* ===================== כפתור החלפת שפה ===================== */
    switchTo: "English",

    /* ===================== דף הבית ===================== */
    home: {
      /* ---------- הירו / פתיחה ---------- */
      hero: {
        titlePrefix: "We Make",
        titleHighlight: "IT",
        titleSuffix: "Work",
        subtitle:
          "אנו ב-Solchi מבינים שאין שני עסקים זהים. נלווה אותך באופן אישי ליישום אסטרטגיות טכנולוגיות בהתאמה למטרות העסקיות הייחודיות ונבנה את התוכנית המתאימה ביותר לצורך הייחודי שלך.",
        ctaPrimary: "בואו נדבר",
        ctaSecondary: "מי אנחנו?",
      },

      /* ---------- בלוק פתיחה ---------- */
      intro: {
        title: "אנחנו לא רק מייעצים, אנחנו פותרים.",
        subtitle:
          "הידע והמומחיות העמוקים שלנו בתעשייה מבטיחים שתקבל ייעוץ מותאם ותוצאות מוחשיות. נשמח להיות ה-Trusted Advisors שלך",
      },

      /* ---------- בלוק עלינו ---------- */
      aboutBlock: {
        title: "עלינו",
        p1:
          "חברתנו מובילה שילוב ייחודי בין שני עולמות מקצועיים – הנדסת חשמל עתירת אנרגיה וניהול פרויקטי מערכות מידע מורכבים – ומספקת לארגונים פתרונות מקצה לקצה המבוססים על ניסיון רב־שנים, הבנה מערכתית עמוקה ויכולת מוכחת להוביל תהליכים מורכבים בהצלחה.",
        p2:
          "Solchi מתמחה בייעול תהליכים ושיפור ביצועים, התייעלות תפעולית וליווי ההנהלה. אנו מספקים מענה כולל לחברות וארגונים בתחומי הקמת מתקני ייצור, הולכה ואספקת חשמל פרטיים, מחשוב וטרנספורמציה דיגיטלית.",
      },

      /* ---------- שירותים ---------- */
      services: {
        title: "שירותי הייעוץ שלנו",
        subtitle:
          "בוטיק הייעוץ Solchi מתמחה בייעוץ וליווי אסטרטגי ועוסק בשני תחומים מרכזיים:",
        energy: {
          title: "מערכות עתירות אנרגיה",
          desc:
            "ייעוץ, תכנון ותיאום טכני להקמת מתקני ייצור, הולכה ואספקת חשמל ליצרנים וצרכנים פרטיים",
        },
        is: {
          title: "מערכות מידע",
          desc:
            "מתמחים במערכות מידע ובחיבור שלהם לתהליכי העבודה בארגון. אנחנו מייצרים את הפתרון הנכון ומלווים אתכם מקצה לקצה",
        },
      },

      /* ---------- תקציר חטיבת חשמל ---------- */
      electricity: {
        title: "מומחיות בהנדסת חשמל ומתקנים עתירי אנרגיה",
        subtitle:
          'בראש תחום זה עומד מהנדס חשמל בכיר בעל מעל 30 שנות ניסיון בתכנון, ניהול וליווי פרויקטים מורכבים עבור יצרני חשמל, משרדי ממשלה וארגונים עסקיים.',
        bullets: [
          "תכנון תחנות השנאה ומתקני הוצאת אנרגיה",
          "התמחות במסדרים מבודדי גז (GIS)",
          "שילוב מתקנים ברשת החשמל הארצית",
          'ניסיון כ"מורשה בכיר" בחברת החשמל',
        ],
        readMore: "קראו עוד על חטיבת החשמל",
      },

      /* ---------- תקציר מערכות מידע ---------- */
      is: {
        title: "מומחיות בניהול ויישום פרויקטי מערכות מידע",
        subtitle:
          "את תחום זה מובילה הילה כהן, בעלת ניסיון רב בליווי, ניהול ויישום פרויקטי מערכות מידע מורכבים בארגונים פיננסיים. אנו משלבים הבנה עסקית עמוקה עם יכולות טכנולוגיות מתקדמות.",
        bullets: [
          "ניהול פרויקטי IS מקצה לקצה",
          "התמחות מלאה בתהליכי אשראי",
          "התמחות בפרויקטי Salesforce",
          "בניית Roadmap אסטרטגי ו-KPI",
        ],
        readMore: "קראו עוד על מערכות מידע",
      },

      /* ---------- פילוסופיה ---------- */
      philosophy: {
        title: "הפילוסופיה שלנו",
        text:
          "היועצים והמתכננים ב-Solchi בעלי ניסיון רב המאפשר גיבוש אסטרטגיה עסקית וליווי מקצה לקצה בפרויקטים מורכבים. אנחנו חושבים פשוט, נותנים שירות בגובה העיניים ומחויבים לספק פתרונות אשר יאפשרו לכם לצמוח בסביבה הטכנולוגית המשתנה במהירות.",
        quote: '"אנחנו לא רק מייעצים, אנחנו פותרים"',
      },
    },

    /* ===================== עמוד אודות ===================== */
    about: {
      /* ---------- הירו ---------- */
      hero: {
        title: "קצת עלינו",
        subtitle:
          "בוטיק הייעוץ והתכנון Solchi מתמחה בייעוץ וליווי אסטרטגי ועוסק בשני תחומים מרכזיים המניעים את המשק המודרני.",
      },

      /* ---------- תוכן ---------- */
      content: {
        p1:
          "Solchi מתמחה בייעול תהליכים ושיפור ביצועים, התייעלות תפעולית וליווי ההנהלה. אנו מספקים מענה כולל לחברות וארגונים בתחומי הקמת מתקני יצור, הולכה ואספקת חשמל פרטיים, מחשוב וטרנספורמציה דיגיטלית.",
        p2:
          "היועצים ב-Solchi בעלי ניסיון רב בתעשייה בארץ, המאפשר גיבוש אסטרטגיה עסקית, ליווי מקצה לקצה בפרויקטים מורכבים המשלבים התמודדות עם אתגרים, ניהול פיננסי, הגדרה ובקרת תוכניות עבודה, ניהול עובדים וספקים ועוד.",
        p3:
          "אנחנו חושבים פשוט, נותנים שירות בגובה העיניים ומחויבים לספק פתרונות ושירותים אשר יאפשרו לכם לצמוח בסביבה הטכנולוגית המשתנה במהירות.",
      },

      /* ---------- חזון ומשימה ---------- */
      vision: {
        title: "חזון ומשימה",
        items: [
          "הובלת ארגונים לעבר מצוינות תפעולית באמצעות טכנולוגיה וחדשנות",
          "מתן פתרונות הנדסיים ומערכתיים המבטיחים צמיחה יציבה ובת קיימא",
          "להיות השותף האסטרטגי המועדף לניהול פרויקטים מורכבים ותשתיתיים",
        ],
      },
    },

    /* ===================== עמוד חטיבת חשמל ===================== */
    electricity: {
      /* ---------- כותרת עליונה ---------- */
      pageTag: "חטיבת החשמל",
      name: "יחיאל אמיר כהן",
      role:
        "מהנדס חשמל בכיר, יועץ ומנהל פרויקטים בתחום מערכות עתירות אנרגיה בכלל ותחנות השנאה/הוצאת אנרגיה בפרט.",
      lead: "מוביל הפעילות בחטיבת החשמל והאנרגיה",

      /* ---------- ניסיון ומומחיות ---------- */
      experienceTitle: "ניסיון ומומחיות",
      experienceP1:
        "בעל מעל 30 שנות ניסיון בכל הקשור לניהול פרויקטים עתירי אנרגיה לפיתוח מערכות מורכבות במתודולוגיות שונות וטכנולוגיות מגוונות מול יצרני חשמל, משרדי ממשלה וארגונים עסקיים.",
      experienceP2:
        "ניסיון רב בתכנון מערכי בדיקה ותהליכי הכנסה לניצול של פרויקטים עתירי אנרגיה.",
      experienceP3:
        'התמחות במסדרים מבודדי גז (GIS) מיצרנים שונים, ובעל היכרות מעמיקה של מערכת החשמל בישראל. בעל ניסיון של "מורשה בכיר" בחברת החשמל, כולל ליווי בתקלות ושחרור מתקנים ממתח.',
      experienceP4:
        "התמחות בתכנון מפורט לתחנות השנאה ותחנות כח.",

      /* ---------- תחומי התמחות ---------- */
      expertiseTitle: "תחומי התמחות מרכזיים:",
      expertise: [
        "התנעה והובלת פרויקטים אינטגרטיביים",
        "שילוב מערכות עתירות אנרגיה ברשת החשמל",
        "ביצוע תכנון מפורט של המתקן החשמלי, משלב היזום עד חיבור הגיד האחרון",
        "פיתוח ויישום מתודולוגיות תפעול ותחזוקה",
        "שמירה בלתי פוסקת על בטיחות והגנה על מתקנים",
        "מתן מענה לתקלות קריטיות בזמן אמת",
      ],

      /* ---------- שירותי ייעוץ ---------- */
      servicesTitle: "שירותי הייעוץ שלנו",
      services: [
        "ליווי מקצה לקצה: משלב הייזום והתכנון ועד ליישום מלא בראיה תפעולית ותחזוקתית",
        "אופטימיזציה: איתור פתרונות, בחינת חלופות וכדאיות פיננסית אל מול השקעה",
        'רגולציה: ליווי מול חברת החשמל ו-"נגה" באפיון המערכת ושילובה במשק',
        "בטיחות ותחזוקה: ליווי שוטף בהיבטי בטיחות לשחרור מתקן ממתח",
      ],

      /* ---------- שירותי תכנון ---------- */
      planningTitle: "שירותי התכנון שלנו",
      planningIntro:
        "ב-SOLCHI אנחנו לא רק מתכננים — אנחנו יוצרים פתרונות הנדסיים חכמים שמניעים פרויקטים קדימה. כל תהליך תכנון מבוסס על חשיבה מערכתית, חדשנות מקצועית וניסיון עשיר בליווי פרויקטים עתירי אנרגיה מהשלב הראשון ועד למסירה.",
      planningItems: [
        "תכנון עקרוני (Concept Design) המייצר תשתית מדויקת לפרויקט, כולל בחינת חלופות טכנו־כלכליות המובילות לקבלת החלטות מושכלת",
        "תכנון מפורט (Detail Design) לכל מערכות החשמל והעזר — חישובים, שרטוטים, מפרטים ותוצרים הנדסיים ברמת ביצוע",
        "הכנת מסמכי מכרז מלאים, המייצרים בהירות הנדסית ומבטיחים קבלת הצעות איכותיות ומדויקות מקבלנים",
        "ליווי הנדסי מלא משלב הייזום ועד המסירה, כולל תמיכה מקצועית בבדיקות FAT/SAT ו-Commissioning בשטח",
        "תיאום תכנון רב־תחומי, המבטיח אינטגרציה מלאה בין חשמל, מבנה, מכונות, בקרה, בטיחות וסביבה",
        "ביצוע חישובים הנדסיים מתקדמים, לרבות זרמים, קצר, הארקה, עומסים, סלקטיביות ואמינות — לשקט נפשי ולתכנון בטוח",
        "תכנון מערכות מתח על/עליון/גבוה/בינוני/נמוך, כולל לוחות, כבלים, ציוד הגנה ופתרונות בקרה מותאמים",
        "בקרת תכנון ותאימות לתקנים בינלאומיים ומקומיים (IEC, IEEE), המבטיחה עמידה מלאה בכל דרישות הפרויקט",
        "פתרונות מותאמים לפרויקטים מורכבים, בעלי מגבלות תשתית, צפיפות או דרישות אנרגיה גבוהות במיוחד",
        "אופטימיזציה של תכנון, לשיפור ביצועים, קיצור לוחות זמנים וצמצום עלויות — בלי להתפשר על איכות",
      ],

      /* ---------- לקוחות ---------- */
      clientsTitle: "הלקוחות שלנו בתחום האנרגיה",
      clients: [
        "יצרני חשמל פרטיים",
        "משרדי ממשלה",
        "חברות תשתיות",
        "ארגונים תעשייתיים",
      ],
    },

    /* ===================== עמוד מערכות מידע ===================== */
    isPage: {
      /* ---------- הירו ---------- */
      hero: {
        tag: "חטיבת מערכות מידע",
        name: "הילה כהן",
        subtitle:
          "מנכלית החברה ומובילת פעילות מערכות המידע. מומחית בליווי, ניהול ויישום פרויקטי מערכות מידע מורכבים עבור ארגונים.",
        badges: {
          salesforce: "Salesforce",
          fintech: "פינטק",
          processAutomation: "מיכון תהליכים",
        },
      },

      /* ---------- מומחיות וערך ---------- */
      expertise: {
        title: "מומחיות וערך מוסף",
        p1:
          "אנו מביאים ערך מוסף משמעותי לארגונים ממגוון תחומים, בזכות ניסיון מעשי בניהול והטמעה של מערכות מורכבות ובתהליכים ארגוניים מקצה לקצה. היכולת שלנו לחבר בין צרכים עסקיים מורכבים לפתרונות טכנולוגיים יציבים, מדויקים וישימים – היא הליבה של הפעילות שלנו.",
        p2:
          "ב-Solchi אנו מחויבים לצמצם מורכבות, לפשט תהליכים ולשפר את החוויה הארגונית והעסקית מקצה לקצה – משלב האפיון והייזום, דרך תכנון ויישום מלא של מערכות, ועד לניהול ספקים ובקרת ביצועים. אנו מתמקדים ביצירת תהליכים יעילים יותר, חיסכון במשאבים, שיפור מתמיד והתייעלות ארגונית שמייצרת ערך מדיד לאורך זמן.",
      },

      /* ---------- מערכות אשראי ופיננסים ---------- */
      credit: {
        title: "מערכות אשראי ופיננסים",
        items: [
          "הגשת בקשה וחיתום",
          "בחינת בקשה ותפעול הלוואה",
          "ניהול בקרות ודוחות",
          "תמיכה בציות ורגולציה",
          "אפיון תהליכים עסקיים",
          "אינטגרציה (ERP, CRM)",
        ],
      },

      /* ---------- תחומי התמחות נוספים ---------- */
      more: {
        title: "תחומי התמחות נוספים",
        items: [
          {
            title: "Roadmap אסטרטגי",
            desc:
              "בניית תוכנית עבודה למחשוב הארגון, קביעת KPI ובחינתם לאורך חיי הפרויקט",
          },
          {
            title: "מומחיות Salesforce",
            desc:
              "פיתוח מערכות ליבה על גבי הפלטפורמה וניהול פרויקטי Salesforce מורכבים",
          },
          {
            title: "ניהול Delivery",
            desc:
              "הובלת פרויקטי פיתוח פנימיים או במיקור חוץ משלב הייזום עד ליישום מלא",
          },
          {
            title: "ניתוח כדאיות",
            desc:
              "בחינת חלופות ליישום - עלות, אפקטיביות וכדאיות פיננסית ותפעולית",
          },
          {
            title: "כתיבת מכרזים",
            desc:
              "איתור ובחירת פתרונות ותשתיות, כולל כתיבת מכרזים וניהולם המקצועי",
          },
        ],
      },

      /* ---------- למה לבחור ב-Solchi ---------- */
      why: {
        title: "למה Solchi למערכות מידע?",
        items: [
          "הבנה פיננסית עמוקה לצד מומחיות טכנולוגית ללא פשרות",
          "ניסיון מוכח במערכות אשראי ובנקאות מהמובילות בישראל",
          "יכולת הובלה חוצת-ארגון מול מנהלים, ספקים ולקוחות קצה",
          "ראייה מערכתית וארוכת טווח המותאמת לצרכי הרגולציה",
        ],
      },
    },

    /* ===================== עמוד צור קשר ===================== */
    contact: {
      /* ---------- כותרות כלליות ---------- */
      pageTitle: "צור קשר",
      pageSubtitle:
        "אנחנו כאן כדי לענות על כל שאלה ולתאם פגישת היכרות מקצועית.",
      detailsTitle: "פרטי התקשרות",
      addressTitle: "כתובתנו",
      addressText: "הורד 544, מושב קידרון, ישראל",
      addressHint: "לחצו לניווט במפות",
      availabilityTitle: "זמינות שירות",
      availabilityHours: "ימי א' - ה' | בין השעות 08:30 - 18:00",
      formTitle: "שלחו לנו הודעה",

      /* ---------- אנשי קשר ---------- */
      peopleTitle: "אנשי קשר",
      people: {
        hila: {
          name: "הילה כהן",
          role: "מנהלת מערכות מידע",
          email: "hila@solchi.co.il",
        },
        yehiel: {
          name: "יחיאל אמיר כהן",
          role: "מנהל חטיבת החשמל",
          email: "yehiel@solchi.co.il",
        },
      },

      /* ---------- שדות טופס ---------- */
      fields: {
        fullName: "שם מלא",
        subject: "נושא הפנייה",
        email: 'דוא"ל',
        phone: "טלפון",
        message: "הודעה",
      },

      /* ---------- placeholders ---------- */
      placeholders: {
        fullName: "ישראל ישראלי",
        subject: "בחרו נושא",
        email: "name@company.com",
        phone: "05X-XXXXXXX",
        message: "תארו בקצרה את הצורך שלכם...",
      },

      /* ---------- אפשרויות נושא ---------- */
      subjectOptions: {
        electricalDivision: "חטיבת החשמל",
        informationSystems: "מערכות מידע",
      },

      /* ---------- הודעות ולידציה ---------- */
      validation: {
        nameRequired: "יש להזין שם מלא",
        nameLettersOnly: "השם יכול להכיל אותיות בלבד",
        emailRequired: 'יש להזין כתובת דוא"ל',
        emailInvalid: "יש להזין כתובת דוא״ל תקינה",
        emailNoSpaces: "כתובת דוא״ל לא יכולה להכיל רווחים",
        phoneRequired: "יש להזין מספר טלפון",
        phoneInvalid: "יש להזין מספר טלפון תקין",
        phoneInvalidIsrael: "בישראל מספר טלפון חייב להכיל 10 ספרות ולהתחיל ב-0",
      },

      /* ---------- הודעה במקרה שהטופס לא זמין ---------- */
      formUnavailable: "לא ניתן כרגע לשלוח פניות",
    },

    /* ===================== עמוד תודה ===================== */
    thankYou: {
      title: "הודעתכם התקבלה!",
      subtitle: "תודה שפניתם ל-Solchi. נציג מטעמנו יחזור אליכם בהקדם.",
      backHome: "חזרה לדף הבית",
    },

    /* ===================== פוטר ===================== */
    footer: {
      description:
        "בוטיק הייעוץ Solchi מתמחה בייעוץ וליווי אסטרטגי, שילוב מערכות עתירות אנרגיה וטרנספורמציה דיגיטלית במגזר הפיננסי והתשתיתי.",
      quickNav: "ניווט מהיר",
      nav: {
        home: "דף הבית",
        about: "אודות הקבוצה",
        electricity: "חטיבת חשמל",
        is: "מערכות מידע",
        contact: "צור קשר",
      },
      contactTitle: "צרו קשר",
      address: "הורד 544, מושב קידרון, ישראל",
      rights: "כל הזכויות שמורות.",
      accessibility: "הצהרת נגישות",
    },

    /* ===================== הצהרת נגישות ===================== */
    accessibility: {
      title: "הצהרת נגישות",
      updatedLine: "הצהרת נגישות אתר מעודכנת לתאריך 1.11.2023",
      intro:
        "מתן שירות לאנשים עם מוגבלויות הוא בחשיבות עליונה מבחינתנו, ואנו עושים ככל שמתאפשר לנו בעניין הנגשת האתר שלנו.",
      levelTitle: "רמת הנגישות באתר:",
      levelText:
        'עשינו כמיטב יכולתנו על מנת שהאתר יעמוד בתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג 2013 ברמת AA, ושהאתר יקיים את הוראות מסמך WCAG2.0 מאת ארגון W3C.',
      adjustmentsTitle: "התאמות הנגישות שביצענו:",
      adjustments: [
        "האתר מותאם לצפייה בדפדפנים הפופולריים גם באמצעות מחשב וגם באמצעות טלפון נייד.",
        "הניווט באתר פשוט, ידידותי וברור.",
        "תכני האתר כתובים בצורה מסודרת ובאופן ברור ומפורט.",
        "האתר מותאם למגוון גדלים של מסכים ורזולוציות.",
        "הדפים באתר בעלי מבנה פשוט וידידותי לגולשים.",
        "לתמונות באתר יש הסבר טקסטואלי חלופי (Alt Text).",
        "האתר מאפשר שינוי גודל תצוגה על ידי שימוש במקש Ctrl וגלגלת העכבר.",
        "אין באתר שימוש בטקסט מהבהב או באלמנטים לא ברורים.",
        "צבעי האתר מנוגדים בצורה מצוינת וברורה.",
      ],
      issueTitle: "נתקלתם בבעיה?",
      issueText:
        "למרות מאמצינו להנגיש את האתר, עלולים להיות פרטים שלא הונגשו בצורה מושלמת. אם נתקלתם בפרט כזה – אנא אל תהססו לפנות אלינו באמצעות כתובת הדואר האלקטרוני שנמצאת באתר.",
      businessArrangementsTitle: "הסדרי נגישות בבית העסק:",
      businessArrangements: [
        "קיימת גישה לבעלי מוגבלויות.",
        "קיימות חניות נכים בסביבה הקרובה וברחובות הסמוכים.",
        "קיימים שירותי נכים נגישים.",
        "קיימים שלטי זיהוי והכוונה.",
      ],
    },
  },

  en: {
    /* ===================== ניווט עליון ===================== */
    nav: {
      home: "Home",
      about: "About",
      electricity: "Electricity Division",
      is: "Information Systems",
      contact: "Contact",
      language: "Language",
    },

    /* ===================== כפתור החלפת שפה ===================== */
    switchTo: "עברית",

    /* ===================== דף הבית ===================== */
    home: {
      /* ---------- הירו / פתיחה ---------- */
      hero: {
        titlePrefix: "We make",
        titleHighlight: "IT",
        titleSuffix: "work",
        subtitle:
          "At Solchi, we understand that no two businesses are the same. We provide a personal, hands-on approach to implementing technology strategies aligned with your unique business goals—building the right plan for your specific needs.",
        ctaPrimary: "Let’s Talk",
        ctaSecondary: "Who We Are",
      },

      /* ---------- בלוק פתיחה ---------- */
      intro: {
        title: "We don’t just advise — we solve.",
        subtitle:
          "Our deep industry expertise ensures tailored guidance and measurable outcomes. We’d be happy to serve as your trusted advisors.",
      },

      /* ---------- בלוק עלינו ---------- */
      aboutBlock: {
        title: "About Us",
        p1:
          "We combine two high-impact worlds—high-energy electrical engineering and complex information systems project delivery—providing organizations with end-to-end solutions built on years of experience, systems-level thinking, and proven execution of complex processes.",
        p2:
          "Solchi specializes in process optimization, performance improvement, operational efficiency, and executive support. We deliver comprehensive solutions for private power generation, transmission and supply projects, as well as IT and digital transformation initiatives.",
      },

      /* ---------- שירותים ---------- */
      services: {
        title: "Our Consulting Services",
        subtitle:
          "Solchi is a boutique consultancy focused on strategic guidance across two core domains:",
        energy: {
          title: "High-Energy Systems",
          desc:
            "Consulting, planning, and technical coordination for establishing private power generation, transmission, and supply solutions for producers and private consumers",
        },
        is: {
          title: "Information Systems",
          desc:
            "We specialize in information systems and their connection to organizational workflows—designing the right solution and supporting you end-to-end",
        },
      },

      /* ---------- תקציר חטיבת חשמל ---------- */
      electricity: {
        title: "Expertise in Electrical Engineering & High-Energy Infrastructure",
        subtitle:
          "This domain is led by a senior electrical engineer with over 30 years of experience in planning, managing, and supporting complex projects for power producers, government offices, and business organizations.",
        bullets: [
          "Design of substations and power evacuation facilities",
          "Expertise in Gas-Insulated Switchgear (GIS)",
          "Grid integration of facilities into the national power network",
          "Experience as a senior authorized professional at the national electric company",
        ],
        readMore: "Read more about the Electricity Division",
      },

      /* ---------- תקציר מערכות מידע ---------- */
      is: {
        title: "Expertise in Managing & Implementing Information Systems Projects",
        subtitle:
          "This domain is led by Hila Cohen, with extensive experience managing and implementing complex IS projects in financial organizations. We combine strong business understanding with advanced technical capabilities.",
        bullets: [
          "End-to-end IS project management",
          "Deep expertise in credit processes",
          "Salesforce project specialization",
          "Strategic roadmap & KPI development",
        ],
        readMore: "Read more about Information Systems",
      },

      /* ---------- פילוסופיה ---------- */
      philosophy: {
        title: "Our Philosophy",
        text:
          "Solchi consultants bring extensive experience in shaping business strategy and delivering end-to-end support for complex projects. We keep things simple, provide clear and direct service, and are committed to solutions that help you grow in a fast-changing technological environment.",
        quote: '"We don’t just advise — we solve."',
      },
    },

    /* ===================== עמוד אודות ===================== */
    about: {
      /* ---------- הירו ---------- */
      hero: {
        title: "About Us",
        subtitle:
          "Solchi is a boutique consultancy specializing in strategic guidance and hands-on support across two core domains that drive the modern economy.",
      },

      /* ---------- תוכן ---------- */
      content: {
        p1:
          "Solchi specializes in process optimization, performance improvement, operational efficiency, and executive support. We provide comprehensive solutions for organizations in private power generation, transmission and supply projects, as well as IT and digital transformation.",
        p2:
          "Our consultants bring extensive industry experience, enabling the development of business strategy and end-to-end delivery of complex projects—combining challenge management, financial oversight, work-plan definition and control, and management of teams and vendors.",
        p3:
          "We keep things simple, speak clearly and directly, and are committed to delivering solutions and services that help you grow in a rapidly changing technological environment.",
      },

      /* ---------- חזון ומשימה ---------- */
      vision: {
        title: "Vision & Mission",
        items: [
          "Leading organizations toward operational excellence through technology and innovation.",
          "Delivering engineering and system solutions that enable stable, sustainable growth.",
          "Being the preferred strategic partner for managing complex and infrastructure-driven projects.",
        ],
      },
    },

    /* ===================== עמוד חטיבת חשמל ===================== */
    electricity: {
      /* ---------- כותרת עליונה ---------- */
      pageTag: "Electricity Division",
      name: "Yehiel Amir Cohen",
      role:
        "Senior electrical engineer, consultant and project manager specializing in high-energy systems, with a focus on substations and power evacuation facilities.",
      lead: "Head of the Electricity & Energy Division",

      /* ---------- ניסיון ומומחיות ---------- */
      experienceTitle: "Experience & Expertise",
      experienceP1:
        "Over 30 years of experience managing high-energy projects and developing complex systems across diverse methodologies and technologies, working with power producers, government offices, and business organizations.",
      experienceP2:
        "Extensive experience in designing testing frameworks and commissioning-to-operation processes for high-energy projects.",
      experienceP3:
        "Expertise in Gas-Insulated Switchgear (GIS) from multiple manufacturers, with deep familiarity with Israel’s power system. Former senior authorized professional at the national electric company, including fault support and energization and de-energization procedures.",
      experienceP4:
        "Specialization in detailed engineering design for substations and power stations.",

      /* ---------- תחומי התמחות ---------- */
      expertiseTitle: "Core Areas of Expertise:",
      expertise: [
        "Initiating and leading integrative projects",
        "Integrating high-energy systems into the power grid",
        "Detailed engineering design of electrical facilities, from project initiation through final conductor connection",
        "Developing and implementing operations & maintenance methodologies",
        "Continuous focus on safety and facility protection",
        "Real-time response to critical faults",
      ],

      /* ---------- שירותי ייעוץ ---------- */
      servicesTitle: "Our Consulting Services",
      services: [
        "End-to-end guidance: from initiation and planning through full implementation, with operational and maintenance perspective",
        "Optimization: identifying solutions, evaluating alternatives, and assessing financial feasibility versus investment",
        "Regulatory support: guidance with the national electric company and Noga in system definition and market integration",
        "Safety & maintenance: ongoing safety support, including procedures for de-energizing facilities",
      ],

      /* ---------- שירותי תכנון ---------- */
      planningTitle: "Our Engineering Design Services",
      planningIntro:
        "At SOLCHI, we don’t just design — we create intelligent engineering solutions that drive projects forward. Every planning process is built on systems thinking, professional innovation, and extensive experience supporting high-energy projects from initial concept through final delivery.",

      planningItems: [
        "Concept Design that establishes a precise project foundation, including techno-economic alternative analysis to enable informed decision-making",
        "Detailed Design for all electrical and auxiliary systems — calculations, drawings, specifications, and execution-level engineering deliverables",
        "Preparation of full tender documentation to ensure engineering clarity and high-quality, accurate contractor proposals",
        "Comprehensive engineering support from project initiation through delivery, including professional support during FAT, SAT, and on-site commissioning",
        "Multidisciplinary design coordination ensuring full integration between electrical, structural, mechanical, control, safety, and environmental systems",
        "Advanced engineering calculations including load flow, short-circuit, grounding, load analysis, selectivity, and reliability — ensuring safe and robust design",
        "Design of extra-high, high, medium, and low voltage systems, including panels, cables, protection equipment, and customized control solutions",
        "Design review and compliance with international and local standards (IEC, IEEE), ensuring full adherence to project requirements",
        "Tailored solutions for complex projects with infrastructure constraints, density limitations, or exceptionally high energy demands",
        "Design optimization to improve performance, shorten timelines, and reduce costs — without compromising quality",
      ],

      /* ---------- לקוחות ---------- */
      clientsTitle: "Our Energy Clients",
      clients: [
        "Private power producers",
        "Government offices",
        "Infrastructure companies",
        "Industrial organizations",
      ],
    },

    /* ===================== עמוד מערכות מידע ===================== */
    isPage: {
      /* ---------- הירו ---------- */
      hero: {
        tag: "Information Systems Division",
        name: "Hila Cohen",
        subtitle:
          "CEO and head of the Information Systems division. Expert in leading, managing, and delivering complex information systems projects for organizations.",
        badges: {
          salesforce: "Salesforce",
          fintech: "Fintech",
          processAutomation: "Process Automation",
        },
      },

      /* ---------- מומחיות וערך ---------- */
      expertise: {
        title: "Expertise & Value",
        p1:
          "We deliver significant added value to organizations across diverse industries, driven by hands-on experience in managing and implementing complex systems and end-to-end organizational processes. Our ability to translate complex business needs into stable, precise, and practical technological solutions lies at the core of our work.",
        p2:
          "At Solchi, we are committed to reducing complexity, streamlining processes, and enhancing the organizational and business experience from end to end — from initial analysis and initiation, through full system design and implementation, to vendor management and performance control. We focus on creating more efficient processes, optimizing resources, driving continuous improvement, and delivering measurable long-term value.",
      },

      /* ---------- מערכות אשראי ופיננסים ---------- */
      credit: {
        title: "Credit & Finance Systems",
        items: [
          "Underwriting",
          "Loan operations",
          "Reporting & controls",
          "Compliance",
          "Business analysis",
          "ERP/CRM integrations",
        ],
      },

      /* ---------- תחומי התמחות נוספים ---------- */
      more: {
        title: "Additional Expertise",
        items: [
          {
            title: "Strategic Roadmap",
            desc:
              "Building a comprehensive IT roadmap for the organization, defining KPIs, and monitoring them throughout the lifecycle of the project.",
          },
          {
            title: "Salesforce",
            desc:
              "Designing and developing core systems on the Salesforce platform and leading complex Salesforce implementation projects.",
          },
          {
            title: "Delivery",
            desc:
              "Leading internal and outsourced development projects from initial concept and planning through full implementation.",
          },
          {
            title: "Feasibility",
            desc:
              "Evaluating implementation alternatives, including cost, effectiveness, and financial and operational feasibility.",
          },
          {
            title: "RFPs",
            desc:
              "Identifying and selecting suitable solutions and infrastructures, including the preparation and professional management of tenders.",
          },
        ],
      },

      /* ---------- למה לבחור ב-Solchi ---------- */
      why: {
        title: "Why Solchi?",
        items: [
          "Deep Financial Understanding Combined with Strong Technological Expertise",
          "Proven Experience in Credit and Banking Systems",
          "Cross-organizational leadership",
          "Long-Term Systems Thinking Aligned with Regulatory Requirements",
        ],
      },
    },

    /* ===================== עמוד צור קשר ===================== */
    contact: {
      /* ---------- כותרות כלליות ---------- */
      pageTitle: "Contact",
      pageSubtitle:
        "We’re here to answer any question and schedule a professional introductory meeting.",
      detailsTitle: "Contact Details",
      addressTitle: "Our Address",
      addressText: "Ha-Vered 544, Kidron, Israel",
      addressHint: "Click to open in Maps",
      availabilityTitle: "Service Availability",
      availabilityHours: "Sunday–Thursday | 08:30–18:00",
      formTitle: "Send Us a Message",

      /* ---------- אנשי קשר ---------- */
      peopleTitle: "Contact People",
      people: {
        hila: {
          name: "Hila Cohen",
          role: "Information Systems Manager",
          email: "hila@solchi.co.il",
        },
        yehiel: {
          name: "Yehiel Amir Cohen",
          role: "Electricity Division Manager",
          email: "yehiel@solchi.co.il",
        },
      },

      /* ---------- שדות טופס ---------- */
      fields: {
        fullName: "Full Name",
        subject: "Inquiry Subject",
        email: "Email",
        phone: "Phone",
        message: "Message",
      },

      /* ---------- placeholders ---------- */
      placeholders: {
        fullName: "John Doe",
        subject: "Select a subject",
        email: "name@company.com",
        phone: "+972 5X XXX XXXX",
        message: "Briefly describe what you need...",
      },

      /* ---------- אפשרויות נושא ---------- */
      subjectOptions: {
        electricalDivision: "Electrical Division",
        informationSystems: "Information Systems",
      },

      /* ---------- הודעות ולידציה ---------- */
      validation: {
        nameRequired: "Full name is required",
        nameLettersOnly: "Name can contain letters only",
        emailRequired: "Email is required",
        emailInvalid: "Please enter a valid email address",
        emailNoSpaces: "Email cannot contain spaces",
        phoneRequired: "Phone number is required",
        phoneInvalid: "Please enter a valid phone number",
        phoneInvalidIsrael:
          "Israeli phone numbers must contain exactly 10 digits and start with 0",
      },

      /* ---------- הודעה במקרה שהטופס לא זמין ---------- */
      formUnavailable: "It is currently not possible to send inquiries",
    },

    /* ===================== עמוד תודה ===================== */
    thankYou: {
      title: "Message Received!",
      subtitle:
        "Thank you for contacting Solchi. Our team will get back to you shortly.",
      backHome: "Back to Home",
    },

    /* ===================== פוטר ===================== */
    footer: {
      description:
        "Solchi is a boutique consulting firm specializing in strategic advisory, high-energy systems integration, and digital transformation within financial and infrastructure sectors.",
      quickNav: "Quick Navigation",
      nav: {
        home: "Home",
        about: "About",
        electricity: "Electricity Division",
        is: "Information Systems",
        contact: "Contact",
      },
      contactTitle: "Contact",
      address: "Ha-Vered 544, Kidron, Israel",
      rights: "All rights reserved.",
      accessibility: "Accessibility Statement",
    },

    /* ===================== הצהרת נגישות ===================== */
    accessibility: {
      title: "Accessibility Statement",
      updatedLine: "Website accessibility statement updated on 01.11.2023",
      intro:
        "Providing accessible service for people with disabilities is a top priority for us, and we make every reasonable effort to ensure our website is accessible.",
      levelTitle: "Accessibility level:",
      levelText:
        "We have made our best efforts for the website to comply with the Equal Rights for Persons with Disabilities Regulations (Service Accessibility Adjustments), 2013, at AA level, and to follow the WCAG 2.0 guidelines published by the W3C.",
      adjustmentsTitle: "Accessibility adjustments we implemented:",
      adjustments: [
        "The website is optimized for popular browsers on both desktop and mobile devices.",
        "Site navigation is simple, clear, and user-friendly.",
        "Content is organized and written in a clear, detailed manner.",
        "The website supports a range of screen sizes and resolutions.",
        "Pages are designed with a simple and user-friendly structure.",
        "Images include alternative text (Alt Text).",
        "Users can adjust display size using Ctrl and the mouse wheel.",
        "No flashing text or unclear elements are used on the site.",
        "Color contrast is clear and highly readable.",
      ],
      issueTitle: "Found an issue?",
      issueText:
        "Despite our efforts, some parts of the website may not be perfectly accessible. If you encounter an accessibility issue, please contact us via the email address listed on the website.",
      businessArrangementsTitle:
        "Accessibility arrangements at our business:",
      businessArrangements: [
        "Accessible access is available.",
        "Accessible parking is available nearby and on adjacent streets.",
        "Accessible restroom facilities are available.",
        "Clear identification and directional signage are available.",
      ],
    },
  },
} as const;

/* =========================================================
   טיפוסים
========================================================= */

type Copy = typeof copy.he;

type I18nContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  t: (key: string) => string;
};

/* =========================================================
   יצירת Context
========================================================= */

const I18nContext = createContext<I18nContextValue | null>(null);

/* =========================================================
   פונקציות עזר
========================================================= */

/* ---------- שפת ברירת מחדל ---------- */
function getDefaultLang(): Lang {
  const saved = (typeof window !== "undefined" &&
    localStorage.getItem(STORAGE_KEY)) as Lang | null;
  if (saved === "he" || saved === "en") return saved;

  return "he";
}

/* ---------- שליפת ערך מתוך אובייקט לפי path ---------- */
function getValueByPath(obj: any, path: string): any {
  return path.split(".").reduce((acc, part) => {
    if (acc == null) return undefined;
    return acc[part];
  }, obj);
}

/* =========================================================
   Provider של השפה
========================================================= */

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLangState] = useState<Lang>(() => getDefaultLang());

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, l);
      document.documentElement.lang = l;
      document.documentElement.dir = l === "he" ? "rtl" : "ltr";
    }
  };

  const toggleLang = () => setLang(lang === "he" ? "en" : "he");

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
      localStorage.setItem(STORAGE_KEY, lang);
    }
  }, [lang]);

  const t = (key: string) => {
    const current = copy[lang] as unknown as Copy;
    const value = getValueByPath(current, key);
    return typeof value === "string" ? value : key;
  };

  const value = useMemo(() => ({ lang, setLang, toggleLang, t }), [lang]);

  return React.createElement(I18nContext.Provider, { value }, children);
};

/* =========================================================
   Hook לשימוש בתרגומים
========================================================= */

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <LanguageProvider>");
  return ctx;
}
