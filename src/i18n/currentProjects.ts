import type { Lang } from "./translations";

type Localized<T> = Record<Lang, T>;

export interface CurrentProjectLink {
  label: Localized<string>;
  href: string;
  external: boolean;
}

export interface CurrentProject {
  id: string;
  title: string;
  tagline: Localized<string>;
  status: Localized<string>;
  description: Localized<string>;
  highlights: Localized<string[]>;
  tags: string[];
  links: CurrentProjectLink[];
}

// To add the next project, append one more object to this array with the same shape, e.g.:
// {
//   id: "next-project",
//   title: "Next project",
//   tagline: { en: "…", sk: "…", am: "…" },
//   status: { en: "…", sk: "…", am: "…" },
//   description: { en: "…", sk: "…", am: "…" },
//   highlights: { en: ["…"], sk: ["…"], am: ["…"] },
//   tags: ["…"],
//   links: [{ label: { en: "…", sk: "…", am: "…" }, href: "https://…", external: true }],
// },
export const currentProjects: CurrentProject[] = [
  {
    id: "efaktura",
    title: "e-Faktúra 2027",
    tagline: {
      en: "E-invoicing automation for Slovak businesses",
      sk: "Automatizácia e-fakturácie pre slovenské firmy",
      am: "Էլեկտրոնային ֆակտուրաների ավտոմատացում սլովակական բիզնեսների համար",
    },
    status: {
      en: "Tested end-to-end in the provider's sandbox · preparing for production",
      sk: "Kompletne otestované v sandboxe poskytovateľa · príprava na produkčné nasadenie",
      am: "Ամբողջությամբ փորձարկված է մատակարարի sandbox միջավայրում · նախապատրաստվում է production-ի համար",
    },
    description: {
      en: "From 1 January 2027, VAT-registered businesses in Slovakia must exchange B2B invoices electronically over the Peppol network. Most accounting software will handle this on its own — businesses that invoice from an e-shop, Excel or their own system won't. I build the bridge: invoices flow automatically from the system they already use to their chosen Peppol access point (the “digital postman”), and incoming invoices land where their accountant needs them.",
      sk: "Od 1. januára 2027 si musia platitelia DPH na Slovensku vymieňať B2B faktúry elektronicky cez sieť Peppol. Väčšina účtovných programov to zvládne sama — firmy, ktoré fakturujú z e-shopu, Excelu alebo vlastného systému, však nie. Staviam pre ne most: faktúry automaticky putujú zo systému, ktorý už používajú, k zvolenému prístupovému bodu Peppol („digitálnemu poštárovi“) a prijaté faktúry sa dostanú tam, kde ich potrebuje ich účtovník.",
      am: "2027 թվականի հունվարի 1-ից Սլովակիայում ԱԱՀ վճարողները պարտավոր են B2B ֆակտուրաները փոխանակել էլեկտրոնային եղանակով՝ Peppol ցանցով։ Հաշվապահական ծրագրերի մեծ մասը դա կանի ինքնուրույն, բայց e-shop-ից, Excel-ից կամ սեփական համակարգից ֆակտուրա դուրս գրող բիզնեսները՝ ոչ։ Ես կառուցում եմ կամուրջը․ ֆակտուրաներն ավտոմատ կերպով անցնում են արդեն օգտագործվող համակարգից դեպի ընտրված Peppol access point («թվային փոստատար»), իսկ մուտքային ֆակտուրաները հասնում են այնտեղ, որտեղ դրանք պետք են հաշվապահին։",
    },
    highlights: {
      en: [
        "Validates required fields and checks the recipient in the Peppol network before an invoice is sent",
        "Stores the delivery confirmation and the moment the data was reported to the tax authority with every invoice",
        "Alerts with the exact reason when something fails — e.g. which field is missing",
        "Signed webhooks (HMAC), EU-hosted automation, no new software for the client",
      ],
      sk: [
        "Pred odoslaním faktúry overí povinné polia a skontroluje príjemcu v sieti Peppol",
        "Ku každej faktúre uloží potvrdenie o doručení aj čas nahlásenia údajov finančnej správe",
        "Pri chybe pošle upozornenie s presným dôvodom — napr. ktoré pole chýba",
        "Podpísané webhooky (HMAC), automatizácia hostovaná v EÚ, žiadny nový softvér pre klienta",
      ],
      am: [
        "Ֆակտուրան ուղարկելուց առաջ ստուգում է պարտադիր դաշտերը և ստացողի առկայությունը Peppol ցանցում",
        "Յուրաքանչյուր ֆակտուրայի հետ պահպանում է առաքման հաստատումը և հարկային մարմնին տվյալների հաղորդման պահը",
        "Խափանման դեպքում ծանուցում է ճշգրիտ պատճառով՝ օրինակ, թե որ դաշտն է բացակայում",
        "Ստորագրված webhook-ներ (HMAC), ԵՄ-ում հոստավորված ավտոմատացում, հաճախորդի համար ոչ մի նոր ծրագիր",
      ],
    },
    tags: ["n8n", "Peppol", "WooCommerce", "Excel", "REST API", "Webhooks"],
    links: [
      {
        label: {
          en: "Visit the e-Faktúra site (Slovak)",
          sk: "Navštíviť web e-Faktúra",
          am: "Այցելել e-Faktúra կայքը (սլովակերեն)",
        },
        href: "https://efaktura.tatulbuilds.dev",
        external: true,
      },
      {
        label: { en: "Get in touch", sk: "Kontaktujte ma", am: "Կապվել ինձ հետ" },
        href: "#contact",
        external: false,
      },
    ],
  },
];
