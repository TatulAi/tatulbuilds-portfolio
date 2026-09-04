export type Lang = "en" | "sk" | "am";

export const languageLabels: Record<Lang, string> = {
  en: "EN",
  sk: "SK",
  am: "AM",
};

export interface Translation {
  meta: {
    title: string;
  };
  nav: {
    about: string;
    skills: string;
    certifications: string;
    projects: string;
    contact: string;
  };
  hero: {
    eyebrow: string;
    greeting: string;
    subtext: string;
    ctaPrimary: string;
  };
  about: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  skills: {
    eyebrow: string;
    heading: string;
    categories: { title: string; items: string[] }[];
  };
  certifications: {
    eyebrow: string;
    heading: string;
    statusInProgress: string;
    statusCompleted: string;
    emptyState: string;
    viewCredential: string;
    items: Record<"claude101" | "claudeCode101", { name: string; description: string }>;
  };
  projects: {
    eyebrow: string;
    heading: string;
    viewLink: string;
    items: Record<"carscope" | "n8nLibrary" | "instant" | "lvg", { description: string }>;
  };
  contact: {
    eyebrow: string;
    heading: string;
    subtext: string;
    formName: string;
    formEmail: string;
    formMessage: string;
    formSubmit: string;
    formSending: string;
    formSuccess: string;
    formError: string;
    emailLabel: string;
    linkedinLabel: string;
    githubLabel: string;
    upworkLabel: string;
  };
  footer: {
    rights: string;
    backToTop: string;
  };
}

export const translations: Record<Lang, Translation> = {
  en: {
    meta: { title: "Tatul Ghazaryan — TatulBuilds" },
    nav: {
      about: "About",
      skills: "Skills",
      certifications: "Certifications",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      eyebrow: "AI Builder & AI-Assisted Developer",
      greeting: "Hi, I'm Tatul",
      subtext:
        "I'm an AI Builder and AI-assisted developer specializing in n8n workflow automation and modern web development. I build custom automations, websites, and web applications that solve real business problems, streamline operations, and turn ideas into reliable digital products.",
      ctaPrimary: "Get in touch",
    },
    about: {
      eyebrow: "About",
      heading: "A bit about me",
      paragraphs: [
        "As an AI Builder and AI-assisted developer, I pair fast, AI-assisted development with n8n automation to turn complex workflows into clean, maintainable software.",
        "My approach is built on structured thinking, strict attention to detail, and a systems-first mindset. I break complex business bottlenecks into practical digital solutions that just work.",
      ],
    },
    skills: {
      eyebrow: "Skills",
      heading: "What I work with",
      categories: [
        {
          title: "Automation & AI",
          items: [
            "n8n (workflow automation, integrations)",
            "AI agent design / LLM integration",
            "Claude Code (AI-assisted development)",
            "Prompt engineering",
          ],
        },
        {
          title: "Web development",
          items: ["React, Vite, TypeScript", "Tailwind CSS", "Supabase, Vercel deployment", "Git / GitHub"],
        },
        {
          title: "Working style",
          items: [
            "Systematic, detail-oriented problem-solving",
            "Clear technical documentation",
            "Methodical debugging and testing",
          ],
        },
      ],
    },
    certifications: {
      eyebrow: "Certifications",
      heading: "Certifications & courses",
      statusInProgress: "In progress",
      statusCompleted: "Completed",
      emptyState: "Certifications coming soon.",
      viewCredential: "View credential",
      items: {
        claude101: {
          name: "Claude 101",
          description: "Completed Anthropic's foundational course on working effectively with Claude.",
        },
        claudeCode101: {
          name: "Claude Code 101",
          description: "Completed Anthropic's course on AI-assisted development with Claude Code.",
        },
      },
    },
    projects: {
      eyebrow: "Projects",
      heading: "Some things I've built",
      viewLink: "View project",
      items: {
        carscope: {
          description:
            "An AI-powered tool that evaluates car listings, helping buyers spot red flags and fair pricing at a glance.",
        },
        n8nLibrary: {
          description:
            "A public collection of sanitized, reusable n8n automation workflows, including a Gmail AI triage agent.",
        },
        instant: {
          description:
            "An MJML-based responsive HTML email template system built for a client, keeping branding consistent across email clients.",
        },
        lvg: {
          description: "A professional SVG logo and brand mark designed for LVG Engineering.",
        },
      },
    },
    contact: {
      eyebrow: "Contact",
      heading: "Let's work together",
      subtext: "Have an automation idea or a web project in mind? I'd love to hear about it.",
      formName: "Name",
      formEmail: "Email",
      formMessage: "Message",
      formSubmit: "Send message",
      formSending: "Sending…",
      formSuccess: "Thanks — your message is on its way. I'll get back to you soon.",
      formError: "Something went wrong. Please try again or email me directly.",
      emailLabel: "Email",
      linkedinLabel: "LinkedIn",
      githubLabel: "GitHub",
      upworkLabel: "Upwork",
    },
    footer: {
      rights: "Tatul Ghazaryan. All rights reserved.",
      backToTop: "Back to top",
    },
  },
  sk: {
    meta: { title: "Tatul Ghazaryan — TatulBuilds" },
    nav: {
      about: "O mne",
      skills: "Zručnosti",
      certifications: "Certifikáty",
      projects: "Projekty",
      contact: "Kontakt",
    },
    hero: {
      eyebrow: "AI Builder & AI-Assisted Developer",
      greeting: "Ahoj, som Tatul",
      subtext:
        "Som AI Builder a AI-asistovaný vývojár so zameraním na automatizáciu workflowov v n8n a moderný webový vývoj. Vytváram automatizácie, webové stránky a webové aplikácie na mieru, ktoré riešia reálne potreby firiem, zjednodušujú procesy a premieňajú nápady na spoľahlivé digitálne riešenia.",
      ctaPrimary: "Kontaktujte ma",
    },
    about: {
      eyebrow: "O mne",
      heading: "Niečo o mne",
      paragraphs: [
        "Ako AI Builder a AI-asistovaný vývojár spájam rýchly vývoj s automatizáciou v n8n, aby som zložité workflow premenil na prehľadný, ľahko udržateľný softvér.",
        "Môj prístup je založený na štruktúrovanom myslení, dôraze na detail a systémovom mindsete. Zložité prekážky v biznise rozkladám na praktické digitálne riešenia, ktoré jednoducho fungujú.",
      ],
    },
    skills: {
      eyebrow: "Zručnosti",
      heading: "S čím pracujem",
      categories: [
        {
          title: "Automatizácia a AI",
          items: [
            "n8n (automatizácia workflow, integrácie)",
            "Návrh AI agentov / integrácia LLM",
            "Claude Code (AI-asistovaný vývoj)",
            "Prompt engineering",
          ],
        },
        {
          title: "Webový vývoj",
          items: ["React, Vite, TypeScript", "Tailwind CSS", "Supabase, nasadenie na Vercel", "Git / GitHub"],
        },
        {
          title: "Pracovný štýl",
          items: [
            "Systematické, dôkladné riešenie problémov",
            "Prehľadná technická dokumentácia",
            "Metodické ladenie a testovanie",
          ],
        },
      ],
    },
    certifications: {
      eyebrow: "Certifikáty",
      heading: "Certifikáty a kurzy",
      statusInProgress: "Prebieha",
      statusCompleted: "Dokončené",
      emptyState: "Certifikáty už čoskoro.",
      viewCredential: "Zobraziť certifikát",
      items: {
        claude101: {
          name: "Claude 101",
          description: "Absolvoval som základný kurz spoločnosti Anthropic o efektívnej práci s Claude.",
        },
        claudeCode101: {
          name: "Claude Code 101",
          description: "Absolvoval som kurz spoločnosti Anthropic o AI-asistovanom vývoji s Claude Code.",
        },
      },
    },
    projects: {
      eyebrow: "Projekty",
      heading: "Niečo, čo som vytvoril",
      viewLink: "Zobraziť projekt",
      items: {
        carscope: {
          description:
            "Nástroj poháňaný AI, ktorý vyhodnocuje inzeráty áut a pomáha kupujúcim na prvý pohľad odhaliť varovné signály aj férovú cenu.",
        },
        n8nLibrary: {
          description:
            "Verejná zbierka očistených, opakovane použiteľných n8n automatizačných workflow vrátane AI agenta na triedenie Gmailu.",
        },
        instant: {
          description:
            "Systém responzívnych HTML e-mailových šablón postavený na MJML pre klienta, zabezpečujúci konzistentný branding naprieč e-mailovými klientmi.",
        },
        lvg: {
          description: "Profesionálne SVG logo a značka navrhnuté pre spoločnosť LVG Engineering.",
        },
      },
    },
    contact: {
      eyebrow: "Kontakt",
      heading: "Poďme spolupracovať",
      subtext: "Máte nápad na automatizáciu alebo webový projekt? Rád si ho vypočujem.",
      formName: "Meno",
      formEmail: "E-mail",
      formMessage: "Správa",
      formSubmit: "Odoslať správu",
      formSending: "Odosielam…",
      formSuccess: "Ďakujem — správa je na ceste. Čoskoro sa vám ozvem.",
      formError: "Niečo sa pokazilo. Skúste to prosím znova alebo mi napíšte priamo.",
      emailLabel: "E-mail",
      linkedinLabel: "LinkedIn",
      githubLabel: "GitHub",
      upworkLabel: "Upwork",
    },
    footer: {
      rights: "Tatul Ghazaryan. Všetky práva vyhradené.",
      backToTop: "Späť na začiatok",
    },
  },
  am: {
    meta: { title: "Թաթուլ Ղազարյան — TatulBuilds" },
    nav: {
      about: "Իմ մասին",
      skills: "Հմտություններ",
      certifications: "Վկայագրեր",
      projects: "Նախագծեր",
      contact: "Կապ",
    },
    hero: {
      eyebrow: "AI Builder & AI-Assisted Developer",
      greeting: "Բարև, ես Թաթուլն եմ",
      subtext:
        "Ես AI Builder և AI-assisted developer եմ՝ մասնագիտացած n8n workflow ավտոմատացման և ժամանակակից կայքերի ու վեբ հավելվածների ստեղծման մեջ։ Ստեղծում եմ ավտոմատացված համակարգեր, կայքեր և թվային գործիքներ, որոնք լուծում են իրական բիզնես խնդիրներ՝ նվազեցնելով կրկնվող աշխատանքը, պարզեցնելով գործընթացները և օգնելով բիզնեսին ավելի արագ զարգանալ։",
      ctaPrimary: "Կապվել ինձ հետ",
    },
    about: {
      eyebrow: "Իմ մասին",
      heading: "Մի փոքր իմ մասին",
      paragraphs: [
        "Որպես AI Builder և AI-assisted developer՝ ես համատեղում եմ արագ ծրագրավորումը n8n ավտոմատացման հետ՝ բարդ workflow-ները վերածելով մաքուր, հեշտ պահպանվող ծրագրային ապահովման։",
        "Իմ մոտեցումը հիմնված է կառուցվածքային մտածողության, մանրուքների նկատմամբ խիստ ուշադրության և համակարգային մտածելակերպի վրա։ Ես բարդ բիզնես խոչընդոտները վերածում եմ գործնական թվային լուծումների, որոնք պարզապես աշխատում են։",
      ],
    },
    skills: {
      eyebrow: "Հմտություններ",
      heading: "Ինչի հետ եմ աշխատում",
      categories: [
        {
          title: "Ավտոմատացում և AI",
          items: [
            "n8n (workflow ավտոմատացում, ինտեգրումներ)",
            "AI գործակալների նախագծում / LLM ինտեգրում",
            "Claude Code (AI-աջակցվող ծրագրավորում)",
            "Prompt engineering",
          ],
        },
        {
          title: "Վեբ ծրագրավորում",
          items: ["React, Vite, TypeScript", "Tailwind CSS", "Supabase, Vercel deployment", "Git / GitHub"],
        },
        {
          title: "Աշխատանքային ոճ",
          items: [
            "Համակարգված, մանրակրկիտ խնդիրների լուծում",
            "Հստակ տեխնիկական փաստաթղթավորում",
            "Մեթոդական սխալազերծում և թեստավորում",
          ],
        },
      ],
    },
    certifications: {
      eyebrow: "Վկայագրեր",
      heading: "Վկայագրեր և դասընթացներ",
      statusInProgress: "Ընթացքի մեջ",
      statusCompleted: "Ավարտված",
      emptyState: "Վկայագրերը շուտով։",
      viewCredential: "Դիտել վկայագիրը",
      items: {
        claude101: {
          name: "Claude 101",
          description: "Ավարտել եմ Anthropic-ի հիմնական դասընթացը՝ Claude-ի հետ արդյունավետ աշխատելու վերաբերյալ։",
        },
        claudeCode101: {
          name: "Claude Code 101",
          description: "Ավարտել եմ Anthropic-ի դասընթացը՝ Claude Code-ով AI-աջակցվող ծրագրավորման վերաբերյալ։",
        },
      },
    },
    projects: {
      eyebrow: "Նախագծեր",
      heading: "Մի քանի բան, որ ես ստեղծել եմ",
      viewLink: "Դիտել նախագիծը",
      items: {
        carscope: {
          description:
            "AI-ով աշխատող գործիք, որը գնահատում է մեքենաների հայտարարությունները՝ օգնելով գնորդներին մեկ հայացքից նկատել խնդրահարույց նշաններ և արդար գին։",
        },
        n8nLibrary: {
          description:
            "n8n ավտոմատացման կրկնակի օգտագործման workflow-ների հանրային հավաքածու, այդ թվում՝ Gmail-ի AI տեսակավորման գործակալ։",
        },
        instant: {
          description:
            "MJML-ի վրա հիմնված արձագանքող HTML էլ. նամակների ձևանմուշների համակարգ՝ ստեղծված հաճախորդի համար, որը պահպանում է հետևողական բրենդինգ բոլոր էլ. փոստի հաճախորդների միջև։",
        },
        lvg: {
          description: "LVG Engineering ընկերության համար նախագծված պրոֆեսիոնալ SVG լոգո և բրենդային նշան։",
        },
      },
    },
    contact: {
      eyebrow: "Կապ",
      heading: "Աշխատենք միասին",
      subtext: "Ունե՞ք ավտոմատացման գաղափար կամ վեբ նախագիծ մտքում։ Հաճույքով կլսեմ դրա մասին։",
      formName: "Անուն",
      formEmail: "Էլ. փոստ",
      formMessage: "Հաղորդագրություն",
      formSubmit: "Ուղարկել հաղորդագրությունը",
      formSending: "Ուղարկվում է…",
      formSuccess: "Շնորհակալություն — ձեր հաղորդագրությունն ուղարկվեց։ Շուտով կպատասխանեմ։",
      formError: "Ինչ-որ բան այն չէ։ Փորձեք կրկին կամ գրեք ինձ ուղղակիորեն։",
      emailLabel: "Էլ. փոստ",
      linkedinLabel: "LinkedIn",
      githubLabel: "GitHub",
      upworkLabel: "Upwork",
    },
    footer: {
      rights: "Թաթուլ Ղազարյան։ Բոլոր իրավունքները պաշտպանված են։",
      backToTop: "Վերև",
    },
  },
};
