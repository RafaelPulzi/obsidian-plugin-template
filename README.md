# Obsidian Plugin Foundation Template

Template fundacional para criação de plugins do Obsidian com **TypeScript**, **Node.js** e **esbuild**, preparado para desenvolvimento local, versionamento no GitHub e publicação futura como **Community Plugin**.

## Visão geral

Este template foi pensado para servir como ponto de partida para qualquer plugin do ecossistema Obsidian. Ele já traz:

- Estrutura de projeto organizada
- Build com `esbuild`
- Código base em TypeScript
- Arquivo `manifest.json` pronto para personalização
- `versions.json` para compatibilidade entre versões do Obsidian
- Workflow de desenvolvimento local
- Workflows de CI e release com GitHub Actions
- Base para comandos, ribbon icon, notice e settings tab
- `styles.css` para customizações visuais
- Boas práticas iniciais de versionamento

---

## Estrutura do projeto

```text
obsidian-plugin-foundation-template/
├─ .github/
│  └─ workflows/
│     ├─ ci.yml
│     └─ release.yml
├─ src/
│  ├─ main.ts
│  └─ settings.ts
├─ .editorconfig
├─ .gitignore
├─ LICENSE
├─ README.md
├─ esbuild.config.mjs
├─ eslint.config.mts
├─ manifest.json
├─ package.json
├─ styles.css
├─ tsconfig.json
├─ version-bump.mjs
└─ versions.json
```

## O que cada arquivo faz

### `src/main.ts`
Arquivo principal do plugin. É nele que ficam:

- a classe principal que estende `Plugin`
- o ciclo de vida (`onload` e `onunload`)
- registro de comandos
- ribbon icons
- notices
- integração com a API do Obsidian

### `src/settings.ts`
Centraliza:

- interface de configurações
- valores padrão
- criação da aba de configurações do plugin

### `manifest.json`
Define os metadados do plugin, como:

- `id`
- `name`
- `version`
- `minAppVersion`
- `description`
- `author`
- `isDesktopOnly`

### `versions.json`
Controla compatibilidade entre versões do plugin e versões mínimas do Obsidian.

### `package.json`
Define:

- scripts do projeto
- dependências
- informações do pacote

### `tsconfig.json`
Configura o compilador TypeScript.

### `esbuild.config.mjs`
Responsável por gerar o `main.js` a partir do código TypeScript.

### `styles.css`
Arquivo de estilos do plugin.

### `version-bump.mjs`
Sincroniza a versão entre `package.json`, `manifest.json` e `versions.json`.

### `.github/workflows/ci.yml`
Valida lint e build em pushes e pull requests.

### `.github/workflows/release.yml`
Gera release no GitHub com os arquivos esperados pelo Obsidian.

---

## Requisitos

Antes de começar, instale:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [Obsidian](https://obsidian.md/)
- Um editor como VS Code

---

## Como criar o seu próprio plugin a partir deste template

### 1. Clone ou use este template

Se estiver usando GitHub:

- Crie um novo repositório a partir deste template
- Ou clone este repositório e depois troque o remoto

```bash
git clone https://github.com/SEU-USUARIO/SEU-REPO.git
cd SEU-REPO
```

### 2. Edite o `manifest.json`

Troque os campos básicos:

```json
{
  "id": "meu-plugin",
  "name": "Meu Plugin",
  "version": "1.0.0",
  "minAppVersion": "1.5.0",
  "description": "Descrição curta do plugin.",
  "author": "Seu Nome",
  "authorUrl": "https://github.com/seu-usuario",
  "isDesktopOnly": false
}
```

### 3. Renomeie a pasta do plugin

A pasta dentro de `.obsidian/plugins/` deve ter o mesmo nome do campo `id` do `manifest.json`.

Exemplo:

```text
.obsidian/plugins/meu-plugin/
```

### 4. Ajuste o nome da classe principal

No `src/main.ts`, renomeie a classe para o nome do seu plugin.

Exemplo:

```ts
export default class MeuPlugin extends Plugin {
```

### 5. Personalize as configurações

No `src/settings.ts`, altere:

- interface de settings
- valores padrão
- controles da aba de configurações

### 6. Crie suas funcionalidades

Você pode usar este template para implementar, por exemplo:

- comandos para editar notas
- views customizadas
- modais
- automações de frontmatter
- integração com links, arquivos e metadata
- painéis ou dashboards dentro do Obsidian

---

## Como desenvolver localmente no Obsidian

> Recomendação: use **um vault separado apenas para desenvolvimento**, nunca o seu vault principal.

### Opção 1: colocar o projeto direto dentro do Vault

```bash
cd CAMINHO/DO/VAULT/.obsidian/plugins
git clone https://github.com/SEU-USUARIO/SEU-REPO.git meu-plugin
cd meu-plugin
npm install
npm run dev
```

### Opção 2: manter o projeto fora do Vault e usar link simbólico

No Windows:

```powershell
mklink /D "C:\CAMINHO\DO\VAULT\.obsidian\plugins\meu-plugin" "C:\dev\meu-plugin"
```

Depois:

```bash
cd C:/dev/meu-plugin
npm install
npm run dev
```

---

## Scripts disponíveis

```bash
npm install
npm run dev
npm run build
npm run lint
npm run release:patch
npm run release:minor
npm run release:major
```

### `npm run dev`
Compila em modo watch e atualiza o `main.js` a cada alteração.

### `npm run build`
Gera o bundle de produção.

### `npm run lint`
Executa o lint do projeto.

### `npm run release:patch|minor|major`
Incrementa a versão usando semver.

---

## Como ativar o plugin no Obsidian

1. Abra o Obsidian
2. Vá em **Settings**
3. Entre em **Community plugins**
4. Ative **Community plugins**
5. Localize o plugin instalado
6. Ative o toggle do plugin

Se você alterar o `manifest.json`, pode ser necessário **reiniciar o Obsidian** para refletir as mudanças de nome, ID ou metadados.

---

## Como modificar o template

## Adicionar novos comandos

No `src/main.ts`, dentro do `onload()`:

```ts
this.addCommand({
  id: "say-hello",
  name: "Say hello",
  callback: () => {
    new Notice("Hello!");
  }
});
```

## Adicionar um comando que escreve na nota atual

```ts
this.addCommand({
  id: "insert-snippet",
  name: "Insert snippet",
  editorCallback: (editor) => {
    editor.replaceSelection("## Meu snippet\n");
  }
});
```

## Adicionar um ribbon icon

```ts
this.addRibbonIcon("sparkles", "Meu comando", () => {
  new Notice("Ação executada!");
});
```

## Alterar a aba de configurações

Edite `src/settings.ts`.

### Exemplo de novo campo booleano

```ts
export interface FoundationPluginSettings {
  enableFeatureX: boolean;
}
```

```ts
export const DEFAULT_SETTINGS: FoundationPluginSettings = {
  enableFeatureX: true
};
```

Depois adicione o controle visual no `display()` da settings tab.

## Alterar o visual do plugin

Edite `styles.css`.

Exemplo:

```css
.meu-plugin__card {
  padding: 12px;
  border: 1px solid var(--background-modifier-border);
  border-radius: 12px;
}
```

Sempre prefira classes próprias do plugin para evitar conflito com a interface do Obsidian.

---

## `.gitignore` recomendado

É **altamente recomendável** criar e manter um `.gitignore` desde o início do projeto para evitar que arquivos gerados localmente ou dependências grandes sejam enviados ao repositório.

Exemplo recomendado:

```gitignore
node_modules/
main.js
data.json
.DS_Store
```

### Por que isso é importante?

- `node_modules/` não deve ser versionado
- `main.js` é um artefato de build local
- `data.json` pode conter dados gerados pelo plugin durante testes
- `.DS_Store` é lixo de sistema do macOS

### Também é recomendável versionar o lockfile

Depois do primeiro `npm install`, mantenha o arquivo abaixo versionado:

- `package-lock.json`

Isso ajuda a deixar o build reprodutível entre máquinas e pipelines.

---

## Boas práticas ao desenvolver plugins

- Prefira usar a API oficial do Obsidian
- Evite sobrescrever estilos globais do app
- Mantenha o CSS escopado com classes próprias
- Use typing forte em TypeScript
- Evite `any`
- Mantenha dependências no mínimo necessário
- Teste em um vault de desenvolvimento
- Sempre valide compatibilidade com desktop e mobile, se o plugin não for desktop-only
- Use README claro, com instruções de uso e limitações
- Tenha um `LICENSE` no repositório

---

## Como versionar no GitHub

### Inicializar o repositório

```bash
git init
git add .
git commit -m "chore: bootstrap obsidian plugin"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPO.git
git push -u origin main
```

### Criar uma nova versão

```bash
npm version patch
git push origin main --follow-tags
```

Você também pode usar:

```bash
npm version minor
npm version major
```

---

## Como preparar uma Release para o Obsidian

Para que o Obsidian consiga instalar o plugin corretamente, a release precisa conter os arquivos:

- `main.js`
- `manifest.json`
- `styles.css` (se existir)

A tag da release deve corresponder exatamente ao valor de `version` em `manifest.json`.

Exemplo:

```json
"version": "1.2.0"
```

A release deve usar a tag:

```text
1.2.0
```

Sem prefixo `v`.

---

## GitHub Actions para release automática

Este template já pode incluir um workflow de release.

Fluxo esperado:

1. Você faz push de uma tag semântica
2. O GitHub Actions roda o build
3. O workflow publica uma GitHub Release
4. Os arquivos `main.js`, `manifest.json` e `styles.css` são anexados

---

## Como enviar o plugin para publicação no Obsidian

Depois de ter o repositório pronto e ao menos uma release funcional, o envio para a lista oficial de Community Plugins é feito no repositório:

```text
obsidianmd/obsidian-releases
```

### Passo a passo

1. Faça fork do repositório `obsidianmd/obsidian-releases`
2. Edite o arquivo `community-plugins.json`
3. Adicione seu plugin **no final da lista**
4. Use o formato abaixo:

```json
{
  "id": "meu-plugin",
  "name": "Meu Plugin",
  "author": "Seu Nome",
  "description": "Descrição curta do plugin.",
  "repo": "seu-usuario/seu-repo"
}
```

5. Abra um Pull Request
6. No PR, preencha o checklist de submissão
7. Aguarde a validação automática e a revisão humana

---

## O que revisar antes de submeter

Checklist recomendado:

- [ ] O `id` no `manifest.json` é único e não usa a palavra `obsidian`
- [ ] O nome da pasta local do plugin combina com o `id`
- [ ] O repositório tem `README.md`
- [ ] O repositório tem `LICENSE`
- [ ] A GitHub Release contém `main.js`, `manifest.json` e `styles.css` se aplicável
- [ ] A tag da release é exatamente igual à versão do `manifest.json`
- [ ] O README explica propósito, instalação e uso
- [ ] O plugin foi testado no sistema operacional alvo
- [ ] O plugin respeita as políticas do desenvolvedor do Obsidian
- [ ] O `community-plugins.json` foi editado corretamente e a entrada foi adicionada ao final da lista

---

## Sobre o README do seu plugin

Quando você for transformar este template em um plugin real, o README ideal deve conter:

- Nome do plugin
- Descrição curta
- Motivação do projeto
- Funcionalidades
- Como instalar manualmente
- Como usar
- Capturas de tela ou GIFs
- Limitações conhecidas
- Compatibilidade
- Roadmap
- Como contribuir
- Licença
- Disclosures, se houver acesso a rede, contas, telemetria ou arquivos externos

---

## Fluxo recomendado de trabalho

1. Criar o plugin a partir do template
2. Ajustar `manifest.json`
3. Renomear a pasta para o `id`
4. Rodar `npm install`
5. Rodar `npm run dev`
6. Ativar o plugin no vault de desenvolvimento
7. Implementar funcionalidades
8. Rodar `npm run lint`
9. Rodar `npm run build`
10. Versionar com Git
11. Publicar GitHub Release
12. Submeter ao `obsidianmd/obsidian-releases`
