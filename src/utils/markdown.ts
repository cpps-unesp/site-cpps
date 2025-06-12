import { marked, Renderer } from 'marked';

const renderer = new Renderer();

renderer.link = function (token) {
  const href = token.href;
  const title = token.title ? ` title="${token.title}"` : "";
  const text = token.text;

  return `<a href="${href}"${title} target="_blank" rel="noopener noreferrer">${text}</a>`;
};

export function renderMarkdown(content: string | undefined | null): string {
  if (!content) return '';
  return marked(content, { renderer });
}
