import ptCommon from '../i18n/locales/pt.json';
import enCommon from '../i18n/locales/en.json';
import esCommon from '../i18n/locales/es.json';

// `home` é field-based no Tina (1 documento, cada campo de texto vira
// {pt,en,es} — ver src/lib/tina/pages.ts). Este módulo não lida com
// metadados de edição visual (não é consumido pelos componentes editáveis,
// só por título/meta de página e afins), então achatamos aqui mesmo.
import homeDoc from '../content/tina-pages/home/index.json';

type HomeLang = 'pt' | 'en' | 'es';
function flattenHome(lang: HomeLang) {
  return {
    titulo: homeDoc.titulo[lang],
    descricao: homeDoc.descricao[lang],
    identidade: homeDoc.identidade,
    hero: {
      title: homeDoc.hero.title[lang],
      description: homeDoc.hero.description[lang],
      link: homeDoc.hero.link,
      button: {
        text: homeDoc.hero.button.text[lang],
        url: homeDoc.hero.button.url,
      },
    },
  };
}

const pt = { ...ptCommon, ...flattenHome('pt') };
const en = { ...enCommon, ...flattenHome('en') };
const es = { ...esCommon, ...flattenHome('es') };

const translations = {
  pt,
  en,
  es,
};

/**
 * Deeply merges two objects, with special handling for arrays of objects.
 * The second object's properties override the first's.
 * For arrays of objects, it merges items based on a unique 'id' key.
 * If 'id' is not present, it falls back to 'nome' or 'titulo'.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepMerge(base: any, override: any): any {
  if (typeof base !== 'object' || base === null) {
    return override ?? base;
  }

  const result = { ...base };

  for (const key in override) {
    if (Object.prototype.hasOwnProperty.call(override, key)) {
      const overrideValue = override[key];
      const baseValue = base[key];

      const isEmptyObject =
        typeof overrideValue === 'object' &&
        overrideValue !== null &&
        !Array.isArray(overrideValue) &&
        Object.keys(overrideValue).length === 0;

      if (isEmptyObject) {
        continue;
      }

      if (
        typeof overrideValue === 'object' &&
        overrideValue !== null &&
        !Array.isArray(overrideValue) &&
        baseValue &&
        typeof baseValue === 'object' &&
        !Array.isArray(baseValue)
      ) {
        result[key] = deepMerge(baseValue, overrideValue);
      }
      // Lógica especial para arrays de objetos
      else if (
        Array.isArray(overrideValue) &&
        Array.isArray(baseValue) &&
        baseValue.length > 0 &&
        typeof baseValue[0] === 'object'
      ) {
        // Define a prioridade dos identificadores
        const identifier = baseValue[0].hasOwnProperty('id')
          ? 'id'
          : baseValue[0].hasOwnProperty('nome')
            ? 'nome'
            : baseValue[0].hasOwnProperty('titulo')
              ? 'titulo'
              : null;

        if (identifier) {
          const baseMap = new Map(baseValue.map((item) => [item[identifier], item]));
          const mergedArray = [...baseValue]; // Começa com uma cópia do array base

          overrideValue.forEach((overrideItem) => {
            const idValue = overrideItem[identifier];
            if (idValue && baseMap.has(idValue)) {
              const baseItem = baseMap.get(idValue);
              const targetIndex = mergedArray.findIndex((item) => item[identifier] === idValue);
              if (targetIndex !== -1) {
                mergedArray[targetIndex] = deepMerge(baseItem, overrideItem);
              }
            }
          });
          result[key] = mergedArray;
        } else {
          // Se não houver identificador, substitui (comportamento de fallback)
          result[key] = overrideValue.length > 0 ? overrideValue : baseValue;
        }
      } else {
        result[key] = overrideValue;
      }
    }
  }

  return result;
}

export type Language = 'pt' | 'en' | 'es';

export function getTranslations(lang: Language) {
  if (lang === 'pt' || !translations[lang]) {
    return pt;
  }
  return deepMerge(pt, translations[lang]);
}
