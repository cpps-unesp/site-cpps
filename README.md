# CPPS - Centro de Pesquisa Política e Social

<p align="center">
  <img src="public/imagens/logos/cpps/logo-cpps-01_rev_1.png" alt="Logo CPPS" width="300"/>
</p>

Site institucional do Centro de Pesquisa Política e Social da Faculdade de Ciências Humanas e Sociais (FCHS) da Universidade Estadual Paulista (UNESP), campus Franca.

## 🚀 Tecnologias

- **[Astro](https://astro.build/)** - Framework web moderno para sites rápidos
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript com tipagem estática
- **[Tailwind CSS](https://tailwindcss.com/)** + **[DaisyUI](https://daisyui.com/)** - Estilização e componentes UI
- **[MDX](https://mdxjs.com/)** - Markdown com componentes
- **[Pagefind](https://pagefind.app/)** - Busca estática no site

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn

## 🔧 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/cpps-unesp.git
cd cpps-unesp

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O site estará disponível em `http://localhost:4321`

## 📁 Estrutura do Projeto

```
cpps-unesp/
├── src/
│   ├── components/       # Componentes reutilizáveis
│   ├── content/         # Conteúdo em MDX
│   │   ├── membros/     # Perfis dos membros da equipe
│   │   ├── noticias/    # Posts de notícias
│   │   └── docs/        # Documentação
│   ├── i18n/           # Internacionalização
│   │   ├── locales/    # Arquivos de tradução (pt.json, en.json, es.json)
│   │   └── routes.ts   # Rotas traduzidas
│   ├── layouts/        # Layouts base
│   ├── pages/          # Páginas do site
│   │   └── [lang]/     # Páginas por idioma
│   ├── styles/         # Estilos globais
│   └── utils/          # Funções utilitárias
├── public/             # Assets estáticos
│   ├── imagens/        # Imagens do site
│   └── scripts/        # Scripts do cliente
├── astro.config.mjs    # Configuração do Astro
├── tailwind.config.mjs # Configuração do Tailwind
└── package.json
```

## 🌐 Internacionalização

O site suporta 3 idiomas:
- 🇧🇷 Português (pt)
- 🇺🇸 Inglês (en) 
- 🇪🇸 Espanhol (es)

### Adicionando traduções

1. Edite os arquivos em `src/i18n/locales/`
2. Adicione rotas traduzidas em `src/i18n/routes.ts`
3. Crie conteúdo específico por idioma em `src/content/`

## 👥 Gerenciando Membros da Equipe

### Adicionando um novo membro

1. Crie um arquivo MDX em `src/content/membros/`:
   ```
   nome-do-membro.pt.mdx  # Versão em português
   nome-do-membro.en.mdx  # Versão em inglês (opcional)
   nome-do-membro.es.mdx  # Versão em espanhol (opcional)
   ```

2. Use o seguinte template:
   ```mdx
   ---
   title: "Nome do Membro"
   lang: "pt"
   foto: "/imagens/equipe/foto.jpg"
   cargo: "Cargo do Membro"
   redes:
     - tipo: "lattes"
       url: "http://lattes.cnpq.br/..."
       icone: "/imagens/logos/lattes_icon.svg"
   contribuicao: "Descrição opcional"
   ---

   # Biografia

   Texto da biografia...
   ```

3. Adicione o membro no arquivo de equipe em `src/i18n/locales/pt.json`

## 📰 Gerenciando Notícias

### Criando uma notícia

1. Adicione um arquivo em `src/content/noticias/`:
   ```markdown
   ---
   title: "Título da Notícia"
   date: 2024-01-15
   resumo: "Resumo breve da notícia"
   tags: ["tag1", "tag2"]
   image: "/images/noticias/imagem.jpg"
   lang: "pt"
   ---

   Conteúdo da notícia...
   ```

## 🎨 Temas

O site suporta temas claro e escuro, com detecção automática do sistema. Os temas são configurados em `src/styles/global.css` usando DaisyUI.

## 🔍 Busca

A busca é implementada com Pagefind e indexa automaticamente todo o conteúdo do site durante o build.

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev           # Servidor de desenvolvimento

# Build
npm run build         # Build de produção
npm run preview       # Preview do build

# Linting
npm run lint          # Verifica erros de código
npm run format        # Formata o código
```

## 🚀 Deploy

### Build para produção

```bash
npm run build
```

Os arquivos estáticos serão gerados em `./dist/`

### Configurações importantes

- Atualize a URL base em `astro.config.mjs`
- Configure o sitemap em `pages/sitemap.xml.ts`
- Ajuste as meta tags em `layouts/BaseLayout.astro`

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).

## 📞 Contato

Centro de Pesquisa Política e Social - UNESP Franca

- Website: [cpps.franca.unesp.br](https://cpps.franca.unesp.br)
- Email: cpps@franca.unesp.br

## Agradecimentos

- @ArthurCarrenho - primeira versão do readme e otimizações iniciais
- @ligiadlsimplicio - inclusão as informações inciais no site

---

Desenvolvido com ❤️ pela equipe do CPPS - UNESP Franca

