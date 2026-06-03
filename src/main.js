import { createApp, h, ref } from 'vue';
import MarkdownIt from 'markdown-it';
import 'github-markdown-css/github-markdown.css';
import './style.css';
import readmeEn from '../README.md?raw';
import readmeZh from '../README.zh-CN.md?raw';

const markdown = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

const readmeMap = {
  en: readmeEn,
  zh: readmeZh,
};

const getInitialLanguage = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('lang') === 'zh' ? 'zh' : 'en';
};

createApp({
  setup() {
    const language = ref(getInitialLanguage());

    const switchLanguage = (nextLanguage) => {
      language.value = nextLanguage;
      const url = new URL(window.location.href);

      if (nextLanguage === 'zh') {
        url.searchParams.set('lang', 'zh');
      } else {
        url.searchParams.delete('lang');
      }

      window.history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleClick = (event) => {
      const link = event.target.closest('a');

      if (!link) {
        return;
      }

      const href = link.getAttribute('href');

      if (href === 'README.zh-CN.md') {
        event.preventDefault();
        switchLanguage('zh');
      }

      if (href === 'README.md') {
        event.preventDefault();
        switchLanguage('en');
      }
    };

    window.addEventListener('popstate', () => {
      language.value = getInitialLanguage();
    });

    return () => h('main', { class: 'page-shell' }, [
      h('article', {
        class: 'markdown-body',
        innerHTML: markdown.render(readmeMap[language.value]),
        onClick: handleClick,
      }),
    ]);
  },
}).mount('#app');
