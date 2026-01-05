// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import pagefind from "astro-pagefind";
import starlight from "@astrojs/starlight";
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: "https://cpps-unesp.github.io",
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    starlight({
      title: 'Documentação CPPS',
      sidebar: [
        {
          label: "Documentação",
          items: [
            {
              label: "Introdução",
              slug: "docs", 
            },
          ],
        },

        {
          label: "Projetos",
          items: [
            {
              label: "Introdução",
              slug: "docs/projetos", 
            },
            // --- DADOS ---
            {
              label: "Dados",
              items: [
                {
                  label: "Visão geral",
                  slug: "docs/projetos/dados",
                },
                // --- HEMEROTECA PEB ---
                {
                  label: "Hemeroteca PEB",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/dados/hemeroteca-peb",
                    },
                    {
                      label: "Equipe",
                      slug: "docs/projetos/dados/hemeroteca-peb/equipe",
                    },
                    {
                      label: "Atividades Realizadas",
                      slug: "docs/projetos/dados/hemeroteca-peb/atividades",
                    },
                    {
                      label: "Documentação",
                      items: [
                        {
                          label: "Introdução",
                          slug: "docs/projetos/dados/hemeroteca-peb/documentacao/introducao",
                        },
                        {
                          label: "Arquivo JSON",
                          slug: "docs/projetos/dados/hemeroteca-peb/documentacao/arquivo-json",
                        },
                        {
                          label: "Temas",
                          slug: "docs/projetos/dados/hemeroteca-peb/documentacao/temas",
                        },
                      ],
                    },
                    {
                      label: "Como citar Hemeroteca PEB",
                      slug: "docs/projetos/dados/hemeroteca-peb/como-citar",
                    },
                  ],
                },
                // --- NEWSCLOUD (ATUALIZADO AQUI) ---
                {
                  label: "NewsCloud",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/dados/newscloud",
                    },
                    {
                      label: "Equipe",
                      slug: "docs/projetos/dados/newscloud/equipe",
                    },
                    {
                      label: "Atividades Realizadas",
                      slug: "docs/projetos/dados/newscloud/atividades",
                    },
                    {
                      label: "Informações de Coleta",
                      slug: "docs/projetos/dados/newscloud/informacoes",
                    },
                    {
                      label: "Documentação",
                      items: [
                        {
                          label: "Introdução",
                          slug: "docs/projetos/dados/newscloud/documentacao/introducao",
                        },
                        {
                          label: "Elementos do Banco de Dados",
                          slug: "docs/projetos/dados/newscloud/documentacao/elementos-bd",
                        },
                        {
                          label: "Elementos Peru",
                          slug: "docs/projetos/dados/newscloud/documentacao/elementos-peru",
                        },
                        {
                          label: "Elementos Equador",
                          slug: "docs/projetos/dados/newscloud/documentacao/equador",
                        },
                        {
                          label: "Elementos Colômbia",
                          slug: "docs/projetos/dados/newscloud/documentacao/colombia",
                        },
                        {
                          label: "Elementos Brasil",
                          slug: "docs/projetos/dados/newscloud/documentacao/brasil",
                        },
                        {
                          label: "Fluxograma",
                          slug: "docs/projetos/dados/newscloud/documentacao/fluxograma",
                        },
                      ],
                    },
                    {
                      label: "Como citar",
                      slug: "docs/projetos/dados/newscloud/como-citar",
                    },
                  ],
                },
                 // --- DIÁRIOS BR (ATUALIZADO) ---
                {
                  label: "DiáriosBR",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/dados/diariosbr",
                    },
                    {
                      label: "Equipe",
                      slug: "docs/projetos/dados/diariosbr/equipe",
                    },
                    {
                      label: "Atividades Realizadas",
                      slug: "docs/projetos/dados/diariosbr/atividades",
                    },
                    {
                      label: "Documentação",
                      items: [
                        {
                          label: "Introdução",
                          slug: "docs/projetos/dados/diariosbr/documentacao/introducao",
                        },
                        {
                          label: "Dados e Metadados",
                          slug: "docs/projetos/dados/diariosbr/documentacao/dados",
                        },
                        {
                          label: "Localização e Conteúdo",
                          slug: "docs/projetos/dados/diariosbr/documentacao/localizacao",
                        },
                        {
                          label: "Banco de Termos",
                          slug: "docs/projetos/dados/diariosbr/documentacao/banco",
                        },
                        {
                          label: "Fluxograma",
                          slug: "docs/projetos/dados/diariosbr/documentacao/fluxograma",
                        },
                        
                      ],
                    },
                    {
                      label: "Como citar",
                      slug: "docs/projetos/dados/diariosbr/como-citar",
                    },
                  ],
                },
                // --- FULLTEXT (ATUALIZADO) ---
                {
                  label: "FullText",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/dados/fulltext",
                    },
                    {
                      label: "Equipe",
                      slug: "docs/projetos/dados/fulltext/equipe",
                    },
                    {
                      label: "Atividades Realizadas",
                      slug: "docs/projetos/dados/fulltext/atividades",
                    },
                    {
                      label: "Identidade Visual",
                      slug: "docs/projetos/dados/fulltext/identidade-visual",
                    },
                    {
                      label: "Como citar",
                      slug: "docs/projetos/dados/fulltext/citar",
                    },
                  ],
                },
                // --- MERCODOCS ---
                {
                  label: "Mercodocs",
                  items: [
                    {
                      label: "Apresentação",
                      // Aponta para o index.md
                      slug: "docs/projetos/dados/mercodocs",
                    },
                    {
                      label: "Equipe",
                      slug: "docs/projetos/dados/mercodocs/equipe",
                    },
                    {
                      label: "Atividades Realizadas",
                      slug: "docs/projetos/dados/mercodocs/atividades",
                    },
                    {
                      label: "Documentação",
                      slug: "docs/projetos/dados/mercodocs/documentacao",
                    },
                    {
                      label: "Como citar",
                      slug: "docs/projetos/dados/mercodocs/como-citar",
                    },
                  ],
                },
                {
                  label: "TweePiNa",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/dados/tweeplanta",
                    },
                    {
                      label: "Equipe",
                      slug: "docs/projetos/dados/tweeplanta/equipe",
                    },
                    {
                      label: "Atividades Realizadas",
                      slug: "docs/projetos/dados/tweeplanta/atividades",
                    },
                    {
                      label: "Documentação",
                      // autogenerate: false, // Caso precise desativar a geração automática
                      collapsed: false, // Define se o menu começa aberto ou fechado
                      items: [
                        {
                          label: "Introdução",
                          slug: "docs/projetos/dados/tweeplanta/infos/intro",
                        },
                        {
                          label: "Script com Caminhos Absolutos",
                          slug: "docs/projetos/dados/tweeplanta/infos/script",
                        },
                        {
                          label: "Variáveis",
                          slug: "docs/projetos/dados/tweeplanta/infos/variaveis",
                        },
                        {
                          label: "Fluxograma",
                          slug: "docs/projetos/dados/tweeplanta/infos/fluxograma",
                        },
                        {
                          label: "Identificação de Status",
                          slug: "docs/projetos/dados/tweeplanta/infos/identificacao",
                        },
                        {
                          label: "Projetos Semelhantes",
                          slug: "docs/projetos/dados/tweeplanta/infos/projetos",
                        },
                        {
                          label: "Bibliotecas",
                          slug: "docs/projetos/dados/tweeplanta/infos/biblioteca",
                        },
                      ],
                    },
                    {
                      label: "Identidade Visual",
                      slug: "docs/projetos/dados/tweeplanta/identidade-visual",
                    },
                    {
                      label: "Como citar",
                      slug: "docs/projetos/dados/tweeplanta/citar",
                    },
                  ],
                },
                {
                  label: "Acervo Rodalint",
                  items: [
                    {
                      label: "Apresentação",
                      // Aponta para o index.md
                      slug: "docs/projetos/dados/acervorodalint",
                    },
                    {
                      label: "Equipe",
                      slug: "docs/projetos/dados/acervorodalint/equipe",
                    },
                    {
                      label: "Atividades Realizadas",
                      slug: "docs/projetos/dados/acervorodalint/atividades",
                    },
                    {
                      label: "Documentação",
                      slug: "docs/projetos/dados/acervorodalint/documentacao",
                    },
                    {
                      label: "Como citar",
                      slug: "docs/projetos/dados/acervorodalint/citar",
                    },
                  ],
                },
                {
                  label: "IRJournalsBR",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/dados/irjournals",
                    },
                    {
                      label: "Equipe",
                      slug: "docs/projetos/dados/irjournals/equipe",
                    },
                    {
                      label: "Atividades Realizadas",
                      slug: "docs/projetos/dados/irjournals/atividades",
                    },
                    {
                      label: "Documentação",
                      collapsed: false,
                      items: [
                        {
                          label: "Introdução",
                          slug: "docs/projetos/dados/irjournals/documentacao/introducao",
                        },
                        {
                          label: "Metadados",
                          slug: "docs/projetos/dados/irjournals/documentacao/metadados",
                        },
                        {
                          label: "Código das Revistas",
                          slug: "docs/projetos/dados/irjournals/documentacao/revistas",
                        },
                        {
                          label: "Diretório Local",
                          slug: "docs/projetos/dados/irjournals/documentacao/loca",
                        },
                        {
                          label: "Pastas",
                          slug: "docs/projetos/dados/irjournals/documentacao/pastas",
                        },
                        {
                          label: "Arquivos de Controle",
                          slug: "docs/projetos/dados/irjournals/documentacao/arquivos",
                        },
                      ],
                    },
                    {
                      label: "Identidade Visual",
                      // Atenção: Seu arquivo parece estar nomeado como 'identidade.md.md' na imagem.
                      // Se for isso mesmo, o slug pode variar, mas geralmente o Astro limpa para:
                      slug: "docs/projetos/dados/irjournals/identidade", 
                    },
                    {
                      label: "Como citar",
                      slug: "docs/projetos/dados/irjournals/citar",
                    },
                  ],
                },
                {
                  label: "GovLatinAmerica",
                  items: [
                    {
                      label: "Apresentação",
                      // Aponta para o index.md
                      slug: "docs/projetos/dados/govlatinamerica",
                    },
                    {
                      label: "Equipe",
                      slug: "docs/projetos/dados/govlatinamerica/equipe",
                    },
                    {
                      label: "Atividades Realizadas",
                      slug: "docs/projetos/dados/govlatinamerica/atividades",
                    },
                    {
                      label: "Dados",
                      slug: "docs/projetos/dados/govlatinamerica/dados",
                    },
                    {
                      label: "Documentação",
                      slug: "docs/projetos/dados/govlatinamerica/documentacao",
                    },
                    {
                      label: "Identidade Visual",
                      slug: "docs/projetos/dados/govlatinamerica/identidade",
                    },
                    {
                      label: "Como citar",
                      slug: "docs/projetos/dados/govlatinamerica/citar",
                    },
                  ],
                },
                {
                  label: "Internet e Relações Internacionais",
                  items: [
                    {
                      label: "Apresentação",
                      // Aponta para o index.md dentro da nova pasta internetri
                      slug: "docs/projetos/dados/internetri",
                    },
                    {
                      label: "Equipe",
                      slug: "docs/projetos/dados/internetri/equipe",
                    },
                    {
                      label: "Atividades Realizadas",
                      slug: "docs/projetos/dados/internetri/atividades",
                    },
                    {
                      label: "Documentação",
                      slug: "docs/projetos/dados/internetri/documentacao",
                    },
                    {
                      label: "Como citar",
                      slug: "docs/projetos/dados/internetri/citar",
                    },
                  ],
                },
                {
                  label: "ThesisBR",
                  items: [
                    {
                      label: "Conheça o projeto",
                      link: "https://cpps-unesp.github.io/thesisbr/", 
                    },
                  ],
                },
              ],
            },

            // --- ENSINO ---
            {
              label: "Ensino",
              items: [
                {
                  label: "Visão geral",
                  slug: "docs/projetos/ensino",
                },
                // --- TFDT (Trilhas de Fundamentos) - CORRIGIDO ---
                {
                  label: "Trilhas de Fundamentos (TFDT)",
                  items: [
                    {
                      label: "Ambiente de Desenvolvimento",
                      items: [
                        {
                          label: "Introdução",
                          slug: "docs/projetos/ensino/tfdt/ambiente/01-intro",
                        },
                        // SUBPASTA MARKDOWN
                        {
                          label: "Markdown",
                          items: [
                            {
                              label: "01 - Noções Gerais",
                              slug: "docs/projetos/ensino/tfdt/ambiente/markdown/01-nocoes-gerais",
                            },
                            {
                              label: "02 - Sintaxe",
                              slug: "docs/projetos/ensino/tfdt/ambiente/markdown/02-sintaxe",
                            },
                            {
                              label: "03 - Criar GitHub Profile",
                              slug: "docs/projetos/ensino/tfdt/ambiente/markdown/03-criar-github-profile",
                            },
                          ],
                        },
                        // SUBPASTA VERSIONAMENTO
                        {
                          label: "Versionamento",
                          items: [
                            { label: "01a - Noções Gerais", slug: "docs/projetos/ensino/tfdt/ambiente/versionamento/01a-nocoes_gerais" },
                            { label: "02a - Dinâmica Versionamento", slug: "docs/projetos/ensino/tfdt/ambiente/versionamento/02a-dinamica_versionamento" },
                            { label: "03a - Tipos Licenças", slug: "docs/projetos/ensino/tfdt/ambiente/versionamento/03a-tipos_licencas" },
                            { label: "03b - Criar Repositório", slug: "docs/projetos/ensino/tfdt/ambiente/versionamento/03b-criar_repositorio" },
                            { label: "03c - Acessar Repositório", slug: "docs/projetos/ensino/tfdt/ambiente/versionamento/03c-acessar_repositorio" },
                            { label: "04a - Git Básico", slug: "docs/projetos/ensino/tfdt/ambiente/versionamento/04a-git_basico" },
                            { label: "05b - Acesso SSH", slug: "docs/projetos/ensino/tfdt/ambiente/versionamento/05b-acesso-ssh" },
                            { label: "05c - Integrar Branches", slug: "docs/projetos/ensino/tfdt/ambiente/versionamento/05c-integrar-branches" },
                          ],
                        },
                        // ARQUIVOS SOLTOS NA PASTA AMBIENTE
                        {
                          label: "04 - Comandos Linux",
                          slug: "docs/projetos/ensino/tfdt/ambiente/04-comandos-linux",
                        },
                        {
                          label: "05 - Editor de Código",
                          slug: "docs/projetos/ensino/tfdt/ambiente/05-editor-codigo",
                        },
                        {
                          label: "06 - Ambiente Virtual",
                          slug: "docs/projetos/ensino/tfdt/ambiente/06-ambiente-virtual",
                        },
                        {
                          label: "07 - Certificação",
                          slug: "docs/projetos/ensino/tfdt/ambiente/07-certificacao",
                        },
                      ],
                    },
                  ],
                },
                // --- TECNOLOGIAS DIGITAIS ---
                {
                  label: "Tecnologias Digitais",
                  items: [
                    // Arquivos soltos na raiz da pasta
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/ensino/tecnologiasdigitais/intro",
                    },
                    {
                      label: "Identidade Visual",
                      slug: "docs/projetos/ensino/tecnologiasdigitais/id-visual",
                    },
                    // Pastas (Apontando para o arquivo intro.md dentro de cada uma)
                    {
                      label: "Anotações",
                      slug: "docs/projetos/ensino/tecnologiasdigitais/anotacoes/intro",
                    },
                    {
                      label: "Áudio",
                      slug: "docs/projetos/ensino/tecnologiasdigitais/audio/intro",
                    },
                    {
                      label: "Buscadores",
                      slug: "docs/projetos/ensino/tecnologiasdigitais/buscadores/intro",
                    },
                    {
                      label: "Conhecimentos",
                      slug: "docs/projetos/ensino/tecnologiasdigitais/conhecimentos/intro",
                    },
                    {
                      label: "Edição de Texto",
                      slug: "docs/projetos/ensino/tecnologiasdigitais/edicao-texto/intro",
                    },
                    {
                      label: "Google Docs",
                      slug: "docs/projetos/ensino/tecnologiasdigitais/google-docs/intro",
                    },
                    {
                      label: "Mapas Mentais",
                      slug: "docs/projetos/ensino/tecnologiasdigitais/mapas-mentais/intro",
                    },
                  ],
                },
                {
                  label: "Processar imagens que contém texto",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/ensino/processarimagens",
                    },
                  ],
                },
                {
                  label: "Processar imagens que contém texto",
                  items: [
                    {
                      label: "Introdução",
                      // O erro estava aqui: precisa apontar para '01-intro'
                      slug: "docs/projetos/ensino/processarimagens",
                    },
                    {
                      label: "Formatos",
                      slug: "docs/projetos/ensino/processarimagens/02-formatos",
                    },
                    {
                      label: "OCR",
                      slug: "docs/projetos/ensino/processarimagens/03-ocr",
                    },
                    {
                      label: "Scanners",
                      items: [
                        {
                          label: "Avision",
                          slug: "docs/projetos/ensino/processarimagens/scanners/avision",
                        },
                        {
                          label: "HP LaserJet",
                          slug: "docs/projetos/ensino/processarimagens/scanners/hp-laserjet",
                        },
                        {
                          label: "Plustek 3000",
                          slug: "docs/projetos/ensino/processarimagens/scanners/plustek-3800",
                        },
                        {
                          label: "Plustek PS286",
                          slug: "docs/projetos/ensino/processarimagens/scanners/plustek-ps286",
                        },
                      ],
                    },
                  ],
                },
                // --- ACESSO REMOTO 
                {
                  label: "Acesso Remoto",
                  items: [
                    {
                      label: "Introdução",
                      slug: "docs/projetos/ensino/acessoremoto", // Aponta para index.md
                    },
                    {
                      label: "Explicação",
                      slug: "docs/projetos/ensino/acessoremoto/explicar",
                    },
                    {
                      label: "Instruções",
                      slug: "docs/projetos/ensino/acessoremoto/instruir",
                    },
                    {
                      label: "Solicitar Acesso",
                      slug: "docs/projetos/ensino/acessoremoto/solicitar-acesso",
                    },
                    {
                      label: "Tutoriais",
                      slug: "docs/projetos/ensino/acessoremoto/tutoriais",
                    },
                  ],
                },
                // --- RECOLL  ---
                {
                  label: "Recoll",
                  items: [
                    {
                      label: "Apresentação",
                      // Aponta para o index.md
                      slug: "docs/projetos/ensino/recoll",
                    },
                    {
                      label: "Colaboradores",
                      slug: "docs/projetos/ensino/recoll/02-colaboradores",
                    },
                    {
                      label: "Atividades Realizadas",
                      slug: "docs/projetos/ensino/recoll/03-atividades",
                    },
                    {
                      label: "Documentação",
                      slug: "docs/projetos/ensino/recoll/04-doc",
                    },
                    {
                      label: "Conceitos",
                      slug: "docs/projetos/ensino/recoll/05-conceitos",
                    },
                    {
                      label: "Configurando",
                      slug: "docs/projetos/ensino/recoll/06-configurando",
                    },
                    {
                      label: "Utilizando",
                      slug: "docs/projetos/ensino/recoll/07-utilizando",
                    },
                    {
                      label: "Pesquisas",
                      slug: "docs/projetos/ensino/recoll/08-pesquisas",
                    },
                  ],
                },
                // --- FILEZILLA (ATUALIZADO) ---
                {
                  label: "FileZilla",
                  items: [
                    {
                      label: "Apresentação",
                      // Aponta para o index.md
                      slug: "docs/projetos/ensino/filezilla",
                    },
                    {
                      label: "Configuração",
                      slug: "docs/projetos/ensino/filezilla/configuracao",
                    },
                  ],
                },
                // --- MATERIAL BIBLIOGRÁFICO (ATUALIZADO) ---
                {
                  label: "Material Bibliográfico",
                  items: [
                    {
                      label: "Apresentação",
                      // Aponta para o index.md
                      slug: "docs/projetos/ensino/materialbibliografico",
                    },
                    {
                      label: "Clássicos IPRI",
                      slug: "docs/projetos/ensino/materialbibliografico/classicos-ipri",
                    },
                    {
                      label: "Dicas Base de Dados",
                      slug: "docs/projetos/ensino/materialbibliografico/dicas-base-de-dados",
                    },
                    {
                      label: "Mapas",
                      slug: "docs/projetos/ensino/materialbibliografico/mapas",
                    },
                  ],
                },
                {
                  label: "Curso: Governança da Internet",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/ensino/curso",
                    },
                  ],
                },
              ],
            },

            // --- SISTEMAS ---
            {
              label: "Sistemas",
              items: [
                {
                  label: "Websites e Redes",
                  items: [
                    // Arquivos soltos na raiz da pasta websites
                    {
                      label: "01 - Introdução",
                      slug: "docs/projetos/sistemas/websites/01-intro-md", // Nota: Na imagem parece ter um erro de digitação no arquivo "01-intro.md.md"
                    },
                    {
                      label: "02 - Atividades",
                      slug: "docs/projetos/sistemas/websites/02-atividades",
                    },

                    // Pasta EDITAR
                    {
                      label: "Editar",
                      collapsed: true,
                      items: [
                        { label: "01 - Acessar", slug: "docs/projetos/sistemas/websites/editar/01-acessar" },
                        { label: "02 - Editar Páginas", slug: "docs/projetos/sistemas/websites/editar/02-editar-paginas" },
                        { label: "02 - Estrutura", slug: "docs/projetos/sistemas/websites/editar/02-estrutura" },
                        { label: "03 - Equipe", slug: "docs/projetos/sistemas/websites/editar/03-equipe" },
                        { label: "04 - Arquivos MD", slug: "docs/projetos/sistemas/websites/editar/04-arquivos-md" },
                        { label: "05 - Docusaurus", slug: "docs/projetos/sistemas/websites/editar/05-docusaurus" },
                        { label: "06 - Sidebar", slug: "docs/projetos/sistemas/websites/editar/06-sidebar" },
                        { label: "07 - Infos Estáticas", slug: "docs/projetos/sistemas/websites/editar/07-infos-estaticas" },
                        { label: "08 - Cadernos", slug: "docs/projetos/sistemas/websites/editar/08-cadernos" },
                        { label: "09 - Páginas JS", slug: "docs/projetos/sistemas/websites/editar/09-paginas-js" }, // Mantive o erro de digitação 'pagiunas' no slug para funcionar o link
                        { label: "GEPDAI", slug: "docs/projetos/sistemas/websites/editar/gepdai" },
                      ],
                    },

                    // Pasta MARKDOWN
                    {
                      label: "Markdown",
                      items: [
                        { label: "01 - Geral", slug: "docs/projetos/sistemas/websites/markdown/01-geral" },
                        { label: "02 - Específico", slug: "docs/projetos/sistemas/websites/markdown/02-especifico" },
                      ],
                    },
                  ],
                },
                {
                  label: "Infraestrutura Computacional",
                  collapsed: true, // Sugestão: deixe colapsado pois é muito grande
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/sistemas/infraestrutura",
                    },
                    // --- INFRA AS CODE ---
                    {
                      label: "Infra as Code",
                      items: [
                        {
                          label: "Ansible",
                          items: [
                             { label: "01 - Ansible", slug: "docs/projetos/sistemas/infraestrutura/infra-as-code/ansible/01-ansible" },
                             { label: "Apoio", slug: "docs/projetos/sistemas/infraestrutura/infra-as-code/ansible/apoio" },
                          ]
                        },
                        {
                          label: "Terraform",
                          items: [
                             { label: "02 - Terraform", slug: "docs/projetos/sistemas/infraestrutura/infra-as-code/terraform/02-terraform" },
                             { label: "Apoio", slug: "docs/projetos/sistemas/infraestrutura/infra-as-code/terraform/apoio" },
                          ]
                        },
                      ],
                    },
                    // --- INFRA LABRI UNESP ---
                    {
                      label: "Infra LabRI/Unesp",
                      items: [
                        {
                          label: "BIOS",
                          collapsed: true,
                          items: [
                            { label: "01 - Dell", slug: "docs/projetos/sistemas/infraestrutura/infra-labriunesp/bios/01-dell" },
                            { label: "02 - IBM", slug: "docs/projetos/sistemas/infraestrutura/infra-labriunesp/bios/02-ibm" },
                            { label: "03 - Ryzen", slug: "docs/projetos/sistemas/infraestrutura/infra-labriunesp/bios/03-ryzen" },
                            { label: "04 - 118", slug: "docs/projetos/sistemas/infraestrutura/infra-labriunesp/bios/04-118" },
                            { label: "05 - 119", slug: "docs/projetos/sistemas/infraestrutura/infra-labriunesp/bios/5-119" },
                            { label: "06 - HP ML30 Gen9", slug: "docs/projetos/sistemas/infraestrutura/infra-labriunesp/bios/06-hp-ml30-gen9" },
                            { label: "07 - 123", slug: "docs/projetos/sistemas/infraestrutura/infra-labriunesp/bios/07-123" },
                            { label: "08 - Itautec", slug: "docs/projetos/sistemas/infraestrutura/infra-labriunesp/bios/08-itautec" },
                            { label: "BIOS Geral", slug: "docs/projetos/sistemas/infraestrutura/infra-labriunesp/bios" },
                          ]
                        },
                        { label: "Dualboot", slug: "docs/projetos/sistemas/infraestrutura/infra-labriunesp/dualboot" },
                        { label: "Equipamentos", slug: "docs/projetos/sistemas/infraestrutura/infra-labriunesp/equipslabri" },
                        { label: "Scanners", slug: "docs/projetos/sistemas/infraestrutura/infra-labriunesp/scanners" },
                      ]
                    },
                    // --- INFRA IPRI UNESP ---
                    {
                        label: "Infra IPRI/Unesp",
                        items: [
                            { label: "Fapesp", slug: "docs/projetos/sistemas/infraestrutura/infraipriunesp/fapesp" },
                        ]
                    },
                    // --- LINUX ---
                    {
                      label: "Linux",
                      collapsed: true,
                      items: [
                        { label: "03 - Tela Preta", slug: "docs/projetos/sistemas/infraestrutura/linux/03-tela-preta" },
                        { label: "04 - Acesso Remoto", slug: "docs/projetos/sistemas/infraestrutura/linux/04-acesso-remoto" },
                        { label: "Alterar Nome PC", slug: "docs/projetos/sistemas/infraestrutura/linux/alterar-nome-pc" },
                        { label: "Atualizar", slug: "docs/projetos/sistemas/infraestrutura/linux/atualizar" },
                        { label: "Formatar HD", slug: "docs/projetos/sistemas/infraestrutura/linux/formatar-hd" },
                        { label: "Info Hardware", slug: "docs/projetos/sistemas/infraestrutura/linux/info-hardware" },
                        { label: "Initramfs Boot", slug: "docs/projetos/sistemas/infraestrutura/linux/initrafms-boot" },
                        { label: "Lock Screen", slug: "docs/projetos/sistemas/infraestrutura/linux/lock-screen" },
                        { label: "Rede (Rein-network)", slug: "docs/projetos/sistemas/infraestrutura/linux/rein-network" },
                        { label: "Reparar FSCK", slug: "docs/projetos/sistemas/infraestrutura/linux/reparar-fsck" },
                        { label: "Resolução de Erros", slug: "docs/projetos/sistemas/infraestrutura/linux/resolucao-erros" },
                        { label: "Senha Root", slug: "docs/projetos/sistemas/infraestrutura/linux/senha-root" },
                        { label: "Tutorial Pendrive", slug: "docs/projetos/sistemas/infraestrutura/linux/tutorial-pendrive" },
                        { label: "Ubuntu Initramfs", slug: "docs/projetos/sistemas/infraestrutura/linux/ubuntu-initrafms" },
                        { label: "Usuários", slug: "docs/projetos/sistemas/infraestrutura/linux/usuarios" },
                        { label: "Ventoy", slug: "docs/projetos/sistemas/infraestrutura/linux/ventoy" },
                        { label: "Verificar Linux", slug: "docs/projetos/sistemas/infraestrutura/linux/verificar-linux" },
                      ]
                    },
                    // --- REDES ---
                    {
                      label: "Redes",
                      collapsed: true,
                      items: [
                        {
                            label: "Container",
                            items: [
                                { label: "01 - Intro", slug: "docs/projetos/sistemas/infraestrutura/redes/container/01-intro" },
                                { label: "Apoio", slug: "docs/projetos/sistemas/infraestrutura/redes/container/apoio" },
                            ]
                        },
                        {
                            label: "Firewall",
                            items: [
                                { label: "01 - Intro", slug: "docs/projetos/sistemas/infraestrutura/redes/firewall/01-intro" },
                                { label: "Apoio", slug: "docs/projetos/sistemas/infraestrutura/redes/firewall/apoio" },
                            ]
                        },
                        {
                            label: "Kubernetes",
                            items: [
                                { label: "01 - Intro", slug: "docs/projetos/sistemas/infraestrutura/redes/kubernetes/01-intro" },
                                { label: "Apoio", slug: "docs/projetos/sistemas/infraestrutura/redes/kubernetes/apoio" },
                            ]
                        },
                        {
                            label: "Proxmox",
                            items: [
                                { label: "01 - Intro", slug: "docs/projetos/sistemas/infraestrutura/redes/proxmox/01-intro" },
                                { label: "02 - Instalação", slug: "docs/projetos/sistemas/infraestrutura/redes/proxmox/02-intalacao" },
                                { label: "06 - ZFS", slug: "docs/projetos/sistemas/infraestrutura/redes/proxmox/06-zfs" },
                                { label: "Storage", slug: "docs/projetos/sistemas/infraestrutura/redes/proxmox/storage" },
                                { label: "Apoio", slug: "docs/projetos/sistemas/infraestrutura/redes/proxmox/apoio" },
                            ]
                        },
                        {
                            label: "Rancher",
                            items: [
                                { label: "01 - Intro", slug: "docs/projetos/sistemas/infraestrutura/redes/rancher/01-intro" },
                                { label: "Google Authenticator", slug: "docs/projetos/sistemas/infraestrutura/redes/google-authenticador" },
                                { label: "Apoio", slug: "docs/projetos/sistemas/infraestrutura/redes/rancher/apoio" },
                            ]
                        },
                        { label: "Atividades", slug: "docs/projetos/sistemas/infraestrutura/atividades" },
                      ]
                    },
                  ],
                },
               // --- CADERNOS LABRI/UNESP (ATUALIZADO) ---
                {
                  label: "Cadernos LabRI/UNESP",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/sistemas/cadernoslabri", // Aponta para index.md
                    },
                    {
                      label: "01 - Cadernos",
                      slug: "docs/projetos/sistemas/cadernoslabri/01-cadernos",
                    },
                    {
                      label: "02 - Cadernos",
                      slug: "docs/projetos/sistemas/cadernoslabri/02-cadernos",
                    },
                    {
                      label: "02 - Próximos Passos",
                      slug: "docs/projetos/sistemas/cadernoslabri/02-proximos",
                    },
                    {
                      label: "03 - Cadernos",
                      slug: "docs/projetos/sistemas/cadernoslabri/03-cadernos",
                    },
                    {
                      label: "03 - Comandos Linux",
                      slug: "docs/projetos/sistemas/cadernoslabri/03-comandos-linux",
                    },
                    {
                      label: "04 - Cadernos",
                      slug: "docs/projetos/sistemas/cadernoslabri/04-cadernos",
                    },
                    {
                      label: "04 - Editor de Código",
                      slug: "docs/projetos/sistemas/cadernoslabri/04-editor-codigo",
                    },
                    {
                      label: "05 - Cadernos",
                      slug: "docs/projetos/sistemas/cadernoslabri/05-cadernos",
                    },
                    {
                      label: "05 - Versionamento",
                      slug: "docs/projetos/sistemas/cadernoslabri/05-versionamento",
                    },
                    {
                      label: "06 - Ambiente Virtual",
                      slug: "docs/projetos/sistemas/cadernoslabri/06-ambiente-virtual",
                    },
                    {
                      label: "07 - Ambiente Virtual Windows",
                      slug: "docs/projetos/sistemas/cadernoslabri/07-ambiente-virtual-windows",
                    },
                    {
                      label: "07 - Cadernos",
                      slug: "docs/projetos/sistemas/cadernoslabri/07-cadernos",
                    },
                    {
                      label: "07 - Tipos de Dados Básicos",
                      slug: "docs/projetos/sistemas/cadernoslabri/07-tipos-dados-basicos",
                    },
                    {
                      label: "08 - Cadernos",
                      slug: "docs/projetos/sistemas/cadernoslabri/08-cadernos",
                    },
                    {
                      label: "09 - Cadernos",
                      slug: "docs/projetos/sistemas/cadernoslabri/09-cadernos",
                    },
                    {
                      label: "10 - Cadernos",
                      slug: "docs/projetos/sistemas/cadernoslabri/10-cadernos",
                    },
                  ],
                },
                {
                  label: "Sistema de Confecção de Certificados",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/sistemas/sistemacertificados",
                    },
                  ],
                },
                {
                  label: "Sistema de OCR Automático",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/sistemas/ocr",
                    },
                  ],
                },
              ], 
            }, 

            // --- EXTENSÃO ---
            {
              label: "Extensão",
              items: [
                 {
                  label: "POD-RI ↗", // Adicionei a setinha para indicar que sai do site
                  link: "https://labriunesp.org/pod-ri",
                  attrs: { target: "_blank" }, // Isso faz abrir em nova aba
                },
                {
                  label: "Conhecer Para Acolher ↗",
                  link: "https://labriunesp.org/conhecer-para-acolher",
                  attrs: { target: "_blank" },
                },
                {
                  label: "Cidades Saudáveis e Sustentáveis ↗",
                  link: "https://labriunesp.org/cidades-sustentaveis",
                  attrs: { target: "_blank" },
                },
                 {
                  label: "As Relações Internacionais e o Novo Coronavírus",
                  items: [
                    {
                      label: "Apresentação",
                      // Aponta para o index.md
                      slug: "docs/projetos/extensao/ricoronavirus",
                    },
                    {
                      label: "Grupos de Trabalho",
                      slug: "docs/projetos/extensao/ricoronavirus/02-grupos-trabalho",
                    },
                    {
                      label: "Postagens",
                      slug: "docs/projetos/extensao/ricoronavirus/04-postagens",
                    },
                    {
                      label: "Identidade Visual",
                      slug: "docs/projetos/extensao/ricoronavirus/05-id-visual",
                    },
                  ],
                },
              ], 
            }, // Fim de Extensão
             
          ], // Fim de items (Projetos)
        }, // Fim de Projetos
      ],
    }),
    pagefind(),
    mdx(),
  ],
});