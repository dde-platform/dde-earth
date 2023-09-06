import { useRouter } from 'next/router';

export default {
  logo: <span>dde-earth</span>,
  project: {
    link: 'https://github.com/hongfaqiu/dde-earth',
  },
  gitTimestamp({ timestamp }) {
    const { locale } = useRouter();

    return (
      <>
        Last updated on
        <time dateTime={timestamp.toISOString()}>
          {timestamp.toLocaleDateString(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </time>
      </>
    );
  },
  i18n: [
    { locale: 'en-US', text: 'English' },
    { locale: 'zh-CN', text: '中文' },
  ],
};
