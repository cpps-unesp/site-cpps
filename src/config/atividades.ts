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
      { label: "Introdução", url: "/atividades" },
      { label: "Editar Site", url: "/editar-site" },
    ],
  },
  {
    label: "Projetos de Dados",
    items: [
      { label: "Visão Geral", url: "/atividades/projetos/dados" },
      {
        label: "Hemeroteca PEB",
        items: [
          { label: "Apresentação", url: "/atividades/projetos/dados/hemeroteca-peb" },
          { label: "Equipe", url: "/atividades/projetos/dados/hemeroteca-peb/equipe" },
          { label: "Atividades", url: "/atividades/projetos/dados/hemeroteca-peb/atividades" },
          { label: "Como citar", url: "/atividades/projetos/dados/hemeroteca-peb/como-citar" },
        ],
      },
      {
        label: "NewsCloud",
        items: [
          { label: "Apresentação", url: "/atividades/projetos/dados/newscloud" },
          { label: "Equipe", url: "/atividades/projetos/dados/newscloud/equipe" },
          { label: "Coleta", url: "/atividades/projetos/dados/newscloud/informacoes" },
        ],
      },
    ],
  },
  {
    label: "Ensino",
    items: [
      { label: "Visão Geral", url: "/atividades/projetos/ensino" },
      {
        label: "Trilha de Dados (Python)",
        items: [
          { label: "Introdução", url: "/atividades/projetos/ensino/tfdt" },
          { label: "Ambiente", url: "/atividades/projetos/ensino/tfdt/trilha/paradas/ambiente/01-intro" },
          { label: "Fundamentos", url: "/atividades/projetos/ensino/tfdt/trilha/paradas/fundamentos-python/01-intro" },
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
          { label: "Introdução", url: "/atividades/projetos/sistemas/websites/01-intro-md" },
          { label: "Editar Páginas", url: "/atividades/projetos/sistemas/websites/editar/02-editar-paginas" },
        ],
      },
      {
        label: "Infraestrutura",
        items: [
          { label: "Apresentação", url: "/atividades/projetos/sistemas/infraestrutura" },
          { label: "Linux", url: "/atividades/projetos/sistemas/infraestrutura/linux/atualizar" },
          { label: "Proxmox", url: "/atividades/projetos/sistemas/infraestrutura/redes/proxmox/01-intro" },
        ],
      },
    ],
  },
];
