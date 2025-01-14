import useLocalesMap from "@components/use-locales-map";
import { useRouter } from "next/router";
import { useConfig } from "nextra-theme-docs";
import {
  editTextMap,
  feedbackLinkMap,
  headDescriptionMap,
  searchPlaceholderMap,
  tableOfContentsTitleMap,
  titleMap,
} from "translations/text";

export default {
  logo: (
    <>
      <svg
        width="36"
        height="36"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30.7683 1.52573C33.0535 1.52573 35.2778 1.78001 37.4205 2.25466L37.7525 0.766266C35.5044 0.267868 33.1687 0 30.7683 0C16.1996 0 3.89901 9.72038 0 23.0279L1.46475 23.4585C5.17727 10.7816 16.8912 1.52573 30.7683 1.52573Z"
          fill="black"
        />
        <path
          d="M30.7664 5.91861C31.6004 5.91861 32.4243 5.96275 33.2346 6.03732L33.5804 2.40273C32.6549 2.31466 31.7157 2.27052 30.7664 2.27052C17.2284 2.27052 5.80257 11.3027 2.17822 23.6675L5.68395 24.6949C8.86418 13.8455 18.8863 5.91861 30.7664 5.91861Z"
          fill="black"
        />
        <path
          d="M29.7389 8.30735C19.3844 8.74812 10.7524 15.8071 7.95193 25.3647C7.32812 27.4871 6.98902 29.7349 6.98902 32.0608C6.98902 33.3458 7.09414 34.6071 7.29078 35.8412L5.71766 36.092C5.50742 34.78 5.39551 33.4339 5.39551 32.0608C5.39551 29.579 5.75825 27.1819 6.42284 24.9138C9.40978 14.7187 18.625 7.18514 29.6711 6.71729L29.7389 8.30735Z"
          fill="#FAAF40"
        />
        <path
          d="M30.0351 15.1075C22.6473 15.4228 16.4835 20.461 14.4865 27.2792C14.0424 28.7947 13.7983 30.3984 13.7983 32.0597C13.7983 32.9785 13.8728 33.877 14.0153 34.7551L8.03788 35.718C7.84469 34.528 7.74292 33.304 7.74292 32.0597C7.74292 29.8051 8.07177 27.6318 8.67529 25.5737C11.3877 16.3213 19.7485 9.48621 29.774 9.05894L30.0351 15.1075Z"
          fill="#F6921E"
        />
        <path
          d="M19.76 28.8286C19.4616 29.8524 19.2955 30.9374 19.2955 32.0596C19.2955 32.6801 19.3464 33.287 19.4413 33.8837C19.6617 35.2467 20.1194 36.5316 20.7738 37.6912L16.6781 40C15.7525 38.3658 15.1049 36.5554 14.7964 34.6295C14.6641 33.7921 14.593 32.9344 14.593 32.0596C14.593 30.4763 14.8235 28.9506 15.2474 27.5028C16.7899 22.2341 20.9467 18.0808 26.2154 16.5382L27.541 21.0508C23.8014 22.146 20.8552 25.0889 19.76 28.8286Z"
          fill="#F05A28"
        />
        <path
          d="M27.2525 31.0274C27.1542 31.3563 27.1032 31.7021 27.1032 32.0615C27.1032 32.2581 27.1236 32.4514 27.1542 32.6413C27.222 33.0786 27.3678 33.4888 27.5745 33.8584L21.8651 37.0794C21.2819 36.0452 20.8716 34.9027 20.675 33.6855C20.5903 33.1566 20.5461 32.6142 20.5461 32.0615C20.5461 31.0613 20.6919 30.095 20.9598 29.183C21.9362 25.8536 24.5604 23.2294 27.8899 22.2529L29.7342 28.5456C28.5408 28.8949 27.6016 29.8339 27.2525 31.0274Z"
          fill="#EE4036"
        />
      </svg>
      <span style={{ marginLeft: ".4em", fontWeight: 800 }}>DDE-Earth</span>
    </>
  ),
  project: {
    link: "https://github.com/dde-platform/dde-earth",
  },
  docsRepositoryBase: "https://github.com/dde-platform/dde-earth/tree/main/doc",
  toc: {
    float: true,
    title: () => useLocalesMap(tableOfContentsTitleMap),
  },
  search: {
    placeholder: () => useLocalesMap(searchPlaceholderMap),
  },
  editLink: {
    text: () => useLocalesMap(editTextMap),
  },
  feedback: {
    content: () => useLocalesMap(feedbackLinkMap),
  },
  useNextSeoProps() {
    return {
      titleTemplate: "%s – DDE-Earth",
    };
  },
  gitTimestamp({ timestamp }) {
    const { locale } = useRouter();

    return (
      <>
        Last updated on
        <time dateTime={timestamp.toISOString()}>
          {timestamp.toLocaleDateString(locale, {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
      </>
    );
  },
  i18n: [
    { locale: "en-US", text: "English" },
    { locale: "zh-CN", text: "中文" },
  ],
  head: () => {
    const { frontMatter, title } = useConfig();
    const titleSuffix = useLocalesMap(titleMap);
    const description = useLocalesMap(headDescriptionMap);
    const ogTitle = title
      ? `${title} – DDE-Earth`
      : `DDE-Earth: ${titleSuffix}`;
    const ogDescription = frontMatter.description || description;

    return (
      <>
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
      </>
    );
  },
};
