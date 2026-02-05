export interface SidebarItem {
  label: string;
  url?: string;
  items?: SidebarItem[];
  collapsed?: boolean;
}

export const sidebar: SidebarItem[] = [
  {
    label: "Geral",
    items: [
      { label: "Introdução", url: "/docs" },
      { label: "Guia de Edição", url: "/docs/guia-edicao" },
    ],
  },
  {
    label: "Projetos de Dados",
    collapsed: true,
    items: [
      { label: "Visão Geral", url: "/docs/projetos/dados" },
      {
        label: "Hemeroteca PEB",
        items: [
          { label: "Apresentação", url: "/docs/projetos/dados/hemeroteca-peb" },
          { label: "Equipe", url: "/docs/projetos/dados/hemeroteca-peb/equipe" },
          { label: "Atividades", url: "/docs/projetos/dados/hemeroteca-peb/atividades" },
          { label: "Como citar", url: "/docs/projetos/dados/hemeroteca-peb/como-citar" },
        ],
      },
      {
        label: "NewsCloud",
        items: [
          { label: "Apresentação", url: "/docs/projetos/dados/newscloud" },
          { label: "Equipe", url: "/docs/projetos/dados/newscloud/equipe" },
          { label: "Coleta", url: "/docs/projetos/dados/newscloud/informacoes" },
        ],
      },
    ],
  },
  {
    label: "Ensino",
    collapsed: true,
    items: [
      { label: "Visão Geral", url: "/docs/projetos/ensino" },
      {
        label: "Trilha de Dados (Python)",
        items: [
          { label: "Introdução", url: "/docs/projetos/ensino/tfdt" },
          { label: "Ambiente", url: "/docs/projetos/ensino/tfdt/trilha/paradas/ambiente/01-intro" },
          { label: "Fundamentos", url: "/docs/projetos/ensino/tfdt/trilha/paradas/fundamentos-python/01-intro" },
        ],
      },
    ],
  },
  {
    label: "Recursos Externos",
    items: [
      { label: "Lantri Hub", url: "https://lantri.org" },
      { label: "GitHub Org", url: "https://github.com/cpps-unesp" },
    ]
  },
  {
    label: "Sistemas",
    items: [
      {
        label: "Websites",
        items: [
          { label: "Introdução", url: "/docs/projetos/sistemas/websites/01-intro-md" },
          { label: "Editar Páginas", url: "/docs/projetos/sistemas/websites/editar/02-editar-paginas" },
        ],
      },
      {
        label: "Infraestrutura",
        items: [
          { label: "Apresentação", url: "/docs/projetos/sistemas/infraestrutura" },
          { label: "Linux", url: "/docs/projetos/sistemas/infraestrutura/linux/atualizar" },
          { label: "Proxmox", url: "/docs/projetos/sistemas/infraestrutura/redes/proxmox/01-intro" },
        ],
      },
    ],
  },
];
