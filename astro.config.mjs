// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import pagefind from 'astro-pagefind';
import mdx from '@astrojs/mdx';

const siteBase = '/site-cpps';

/**
 * @param {string} basePath
 */
function normalizeBase(basePath) {
  if (!basePath || basePath === '/') {
    return '/';
  }
  return `/${basePath.replace(/^\/+|\/+$/g, '')}/`;
}

/**
 * @param {string} value
 * @param {string} basePath
 */
function rewriteRootRelativeValue(value, basePath) {
  if (typeof value !== 'string') return value;
  if (!value.startsWith('/') || value.startsWith('//')) return value;
  const normalizedBase = normalizeBase(basePath);
  if (normalizedBase === '/') return value;
  if (value.startsWith(normalizedBase)) return value;
  return `${normalizedBase}${value.replace(/^\//, '')}`.replace(/\/+/g, '/');
}

/**
 * @param {any} node
 * @param {string} basePath
 */
function rewriteNodeAttributes(node, basePath) {
  if (!node || typeof node !== 'object') return;

  if (node.type === 'element' && node.properties) {
    if (typeof node.properties.src === 'string') {
      node.properties.src = rewriteRootRelativeValue(node.properties.src, basePath);
    }
    if (typeof node.properties.href === 'string') {
      node.properties.href = rewriteRootRelativeValue(node.properties.href, basePath);
    }
  }

  if (
    (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') &&
    Array.isArray(node.attributes)
  ) {
    for (const attr of node.attributes) {
      if (!attr || attr.type !== 'mdxJsxAttribute') continue;
      if (attr.name !== 'src' && attr.name !== 'href') continue;
      if (typeof attr.value !== 'string') continue;
      attr.value = rewriteRootRelativeValue(attr.value, basePath);
    }
  }
}

/**
 * @param {any} node
 * @param {(node: any) => void} visitor
 */
function visitTree(node, visitor) {
  if (!node || typeof node !== 'object') return;
  visitor(node);
  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      visitTree(child, visitor);
    }
  }
}

/**
 * @param {string} basePath
 */
function rehypePrefixBaseUrls(basePath) {
  /** @param {any} tree */
  return (tree) => {
    visitTree(tree, (node) => rewriteNodeAttributes(node, basePath));
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://cpps-unesp.github.io',
  base: siteBase,
  output: 'static',
  markdown: {
    rehypePlugins: [[rehypePrefixBaseUrls, siteBase]],
  },
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [pagefind(), mdx()],
});
