import { createApp, h } from 'vue';
import MarkdownIt from 'markdown-it';
import 'github-markdown-css/github-markdown.css';
import './style.css';
import readme from '../README.md?raw';

const markdown = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

const content = markdown.render(readme);

createApp({
  render() {
    return h('main', { class: 'page-shell' }, [
      h('article', {
        class: 'markdown-body',
        innerHTML: content,
      }),
    ]);
  },
}).mount('#app');
