import type { Locale } from "@components/use-locales-map";

export type Languages<T = string> = {
  [key in Locale]?: T;
};

export const languageMap: Languages = {
  "en-US": "English",
  "es-ES": "Español",
  "fr-FR": "Français",
  "pt-BR": "Português Brasileiro",
  "zh-CN": "简体中文",
  ja: "日本語",
  ko: "한국어",
  ru: "Русский",
};

export const titleMap: Languages = {
  "en-US": "Plugin based 3D earth SDK",
  "zh-CN": "插件化的三维地球可视化库",
};

export const featuresMap: {
  [K in keyof Languages]?: any;
} = {
  "en-US": {
    Lightwight: "Lightwight",
    plugin: "Plugin based",
    internal: "Internationalization",
    event: "Event subscription",
    layer: "Layer Manager",
    typescript: "TypeScript Ready",
  },
  "zh-CN": {
    Lightwight: "小巧轻量",
    plugin: "插件机制",
    internal: "国际化支持",
    event: "事件订阅",
    layer: "图层管理",
    typescript: "TypeScript完备",
  },
};

export const headDescriptionMap: Languages = {
  "en-US":
    "DDE-Earth is a 3D Earth framework based on cesium. Its plug-in core has strong expanding capacity.",
  "zh-CN":
    "DDE-Earth是一个基于cesium的三维地球框架，它的插件化核心拥有强大的拓展能力。",
};

export const feedbackLinkMap: Languages = {
  "en-US": "Question? Give us feedback →",
  "es-ES": "¿Dudas? Danos tu feedback →",
  "fr-FR": "Question? Donnez-nous votre avis →",
  "pt-BR": "Dúvidas? Nos dê feedback →",
  "zh-CN": "有疑问？给我们反馈 →",
  ko: "질문이 있으신가요? 피드백을 남겨주세요 →",
  ru: "Вопросы? Оставьте нам отзыв →",
};

export const editTextMap: Languages = {
  "en-US": "Edit this page on GitHub →",
  "es-ES": "Edite esta página en GitHub →",
  "fr-FR": "Modifier cette page sur GitHub →",
  "pt-BR": "Edite essa página no GitHub →",
  "zh-CN": "在 GitHub 上编辑本页 →",
  ja: "Github で編集する →",
  ko: "Github에서 이 페이지 편집하기 →",
  ru: "Редактировать эту страницу на GitHub →",
};

export const footerTextMap: Languages<Record<string, any>> = {
  "en-US": { utmSource: "dde-earth", text: "Powered by" },
  "es-ES": { utmSource: "dde-earth_es-es", text: "Desarrollado por" },
  "fr-FR": { utmSource: "dde-earth_fr-fr", text: "Propulsé par" },
  "pt-BR": { utmSource: "dde-earth_pt-br", text: "Desenvolvido por" },
  "zh-CN": { utmSource: "dde-earth_zh-cn", text: "由", suffix: "驱动" },
  ja: { utmSource: "dde-earth_ja", text: "提供" },
  ko: { utmSource: "dde-earth_ko", text: "Powered by" },
  ru: { utmSource: "dde-earth_ru", text: "Работает на" },
};

export const tableOfContentsTitleMap: Languages = {
  "en-US": "On This Page",
  "zh-CN": "本页目录",
  "es-ES": "En esta página",
  "fr-FR": "Sur cette page",
  "pt-BR": "Nessa página",
  ru: "На этой странице",
};

export const searchPlaceholderMap: Languages = {
  "en-US": "Search documentation...",
  "zh-CN": "搜索文档...",
  "es-ES": "Buscar documento...",
  "fr-FR": "Rechercher dans la doc...",
  "pt-BR": "Buscar documentação...",
  ko: "문서 검색...",
  ru: "Искать в документации...",
};

export const gitTimestampMap: Languages = {
  "en-US": "Last updated on",
  "fr-FR": "Dernière mise à jour le",
  ru: "Последнее обновление",
};
