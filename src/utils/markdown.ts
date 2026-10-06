import { marked, Renderer, type Tokens } from 'marked';
import { sanitizeHref } from 'emdash';

// O texto vem do admin do EmDash (parágrafos do Sobre) e pode ser escrito por
// qualquer pessoa com papel de autor. O marked não sanitiza: HTML cru e links
// `javascript:` iriam direto para o set:html, na mesma origem do admin. Por isso
// o HTML cru sai como texto, o link só aceita http(s), mailto, tel e caminho do
// site, e título e texto do link são escapados.

function escapar(texto: string): string {
  return texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const renderer = new Renderer();

renderer.html = ({ text }: Tokens.HTML | Tokens.Tag) => escapar(text);

renderer.link = function (this: Renderer, { href, title, tokens }: Tokens.Link) {
  const atributoTitulo = title ? ` title="${escapar(title)}"` : '';
  const texto = this.parser.parseInline(tokens);
  return `<a href="${escapar(sanitizeHref(href))}"${atributoTitulo} target="_blank" rel="noopener noreferrer">${texto}</a>`;
};

export function renderMarkdown(content: string | undefined | null): string {
  if (!content) return '';
  return marked.parse(content, { renderer, async: false }) as string;
}
