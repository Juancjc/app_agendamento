# App Agendamento 👋

Projeto [Expo](https://expo.dev) + [React Native](https://reactnative.dev), criado com `create-expo-app`.

Este README reúne o passo a passo de instalação e os conceitos mais importantes do projeto para quem está aprendendo React Native.

## Pré-requisitos

Antes de começar, instale:

- **[Node.js](https://nodejs.org/)** (versão LTS mais recente)
- **npm** (já vem junto com o Node.js)
- **Git**
- **[Expo Go](https://expo.dev/go)** no celular (Android/iOS) — forma mais rápida de testar o app sem precisar instalar Android Studio ou Xcode
- Opcional, para emuladores:
  - **[Android Studio](https://docs.expo.dev/workflow/android-studio-emulator/)** (emulador Android)
  - **[Xcode](https://docs.expo.dev/workflow/ios-simulator/)** (simulador iOS, somente em Mac)

## Instalação

1. Clone o repositório:

   ```bash
   git clone <url-do-repositorio>
   cd app_agendamento
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o projeto:

   ```bash
   npx expo start
   ```

4. No terminal vai aparecer um QR Code e algumas opções de onde abrir o app:

   - Escaneando o QR Code com o app **Expo Go** no celular
   - Pressionando `a` para abrir no emulador Android
   - Pressionando `i` para abrir no simulador iOS (somente Mac)
   - Pressionando `w` para abrir no navegador (web)

## Estrutura do projeto

```
src/
├── app/            → telas e rotas do app (file-based routing)
│   ├── _layout.tsx → layout raiz, define a navegação (abas, tema, etc.)
│   ├── index.tsx   → rota "/" (tela inicial)
│   └── explore.tsx → rota "/explore"
├── components/     → componentes reutilizáveis
├── constants/       → cores, temas e outras constantes
├── hooks/           → hooks customizados
```

## Como funcionam as rotas (Expo Router)

Este projeto usa **file-based routing** (roteamento por arquivos), fornecido pelo [`expo-router`](https://docs.expo.dev/router/introduction/). Isso significa que **cada arquivo dentro de `src/app/` vira uma rota automaticamente**, sem precisar configurar nada manualmente:

| Arquivo                  | Rota        |
| ------------------------- | ----------- |
| `src/app/index.tsx`       | `/`         |
| `src/app/explore.tsx`     | `/explore`  |
| `src/app/_layout.tsx`     | layout raiz (não é uma rota, e sim o "molde" que envolve as rotas) |

### Onde vejo a lista de rotas?

Basta olhar os arquivos dentro de `src/app/`. Cada novo arquivo criado ali (ex: `agenda.tsx`) já vira automaticamente a rota `/agenda`.

### Qual tela abre primeiro?

O app usa abas nativas (`NativeTabs`), configuradas em `src/components/app-tabs.tsx`. A ordem das abas — e qual delas abre primeiro — é definida pela ordem dos blocos `<NativeTabs.Trigger>` dentro desse arquivo:

```tsx
<NativeTabs>
  <NativeTabs.Trigger name="index">   {/* abre primeiro */}
    ...
  </NativeTabs.Trigger>

  <NativeTabs.Trigger name="explore">
    ...
  </NativeTabs.Trigger>
</NativeTabs>
```

A primeira `NativeTabs.Trigger` da lista (`index`) é a aba inicial. Para mudar qual aba abre por padrão, basta reordenar esses blocos.

## Ícones

O projeto usa o pacote [`@react-native-vector-icons/material-design-icons`](https://github.com/oblador/react-native-vector-icons), com cerca de 7 mil ícones da família **Material Design Icons**. Os ícones são carregados de uma fonte, então não precisam de `react-native-svg`, funcionam offline e rodam direto no **Expo Go**, sem build nativo.

> Outra opção já instalada é o `expo-symbols` (SF Symbols no iOS / Material Symbols no Android), usado na tela de login.

### Instalação

```bash
npx expo install @react-native-vector-icons/material-design-icons
```

> Sempre use `npx expo install` (e não `npm install`) para pacotes do Expo/React Native, porque ele escolhe a versão compatível com o SDK do projeto.

### Como usar em uma tela

```tsx
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

<MaterialDesignIcons name="calendar-clock" size={24} color="#1A7FE8" />
```

- O import é **com chaves** (`{ MaterialDesignIcons }`), porque é um export nomeado.
- Props principais: `name` (nome do ícone), `size`, `color` e `style`.
- O `name` é tipado: se você digitar um nome que não existe, o TypeScript avisa.

### Como achar o nome de um ícone

Pesquise em **https://pictogrammers.com/library/mdi/** e copie o nome exatamente como aparece, em kebab-case (ex.: `account-heart`, `stethoscope`, `bell`).
Quase todos os ícones têm uma versão **preenchida** (`calendar`) e uma de **contorno** (`calendar-outline`).

### Como trocar os ícones das abas (tabs)

As abas ficam em `src/components/app-tabs.tsx`. Hoje cada aba usa um PNG de `assets/images/tabIcons/`:

```tsx
<NativeTabs.Trigger name="home">
  <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
  <NativeTabs.Trigger.Icon
    src={require('@/assets/images/tabIcons/home.png')}
    renderingMode="template"
  />
</NativeTabs.Trigger>
```

A barra nativa (`NativeTabs`) não aceita um componente como ícone, só uma **imagem**. Por isso, o ícone é convertido em imagem com `getImageSourceSync(nome, tamanho, cor)`. Para trocar, substitua o `src` do PNG pelos ícones do pacote:

```tsx
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

<NativeTabs.Trigger name="home">
  <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
  <NativeTabs.Trigger.Icon
    src={{
      default: MaterialDesignIcons.getImageSourceSync('home-outline', 24, 'black'), // aba inativa
      selected: MaterialDesignIcons.getImageSourceSync('home', 24, 'black'), // aba ativa
    }}
  />
</NativeTabs.Trigger>
```

- `default` é o ícone da aba **não selecionada** e `selected` o da aba **selecionada**. Usar `-outline` no `default` e o preenchido no `selected` é o padrão mais comum.
- A cor passada (`'black'`) não importa: a barra pinta o ícone com as cores definidas nas props do `<NativeTabs>` (`iconColor`, `tintColor` etc.).
- O `getImageSourceSync` precisa do `expo-font`, que já está instalado no projeto.
- Para trocar o ícone de outra aba, repita o mesmo padrão no `<NativeTabs.Trigger>` dela (ex.: `compass-outline` / `compass` para a aba `explore`).
- A versão web das abas fica em `src/components/app-tabs.web.tsx`. Ela usa botões de texto, então nela basta colocar um `<MaterialDesignIcons ... />` dentro do `TabButton`, se quiser ícones.

## Conceitos importantes de React Native / Expo

- **Componentes nativos**: no React Native não usamos `<div>`, `<span>`, `<p>` como na web. Usamos componentes como `<View>` (equivalente a uma `div`) e `<Text>` (para qualquer texto — todo texto precisa estar dentro de um `<Text>`).
- **Estilização**: não existe CSS tradicional. Usamos o `StyleSheet.create({...})` ou bibliotecas como NativeWind, com propriedades parecidas com CSS mas em `camelCase` (ex: `backgroundColor` em vez de `background-color`).
- **Flexbox por padrão**: todo layout no React Native usa Flexbox, e o eixo principal (`flexDirection`) é `column` por padrão (diferente da web, que é `row`).
- **Hot Reload / Fast Refresh**: ao salvar um arquivo, o app atualiza sozinho no celular/emulador sem precisar recompilar tudo.
- **Expo Router**: sistema de navegação baseado em arquivos (explicado acima). Cada pasta/arquivo em `src/app/` define uma rota.
- **Plataformas (`.web.tsx`, `.ios.tsx`, `.android.tsx`)**: é possível ter versões diferentes de um mesmo componente por plataforma. Por exemplo, `app-tabs.tsx` e `app-tabs.web.tsx` — o Expo escolhe automaticamente o arquivo certo dependendo de onde o app está rodando.
- **Assets (imagens, fontes, ícones)**: ficam na pasta `assets/` e são importados com `require('./caminho/imagem.png')`.
- **TypeScript**: o projeto usa TypeScript (arquivos `.tsx`), o que ajuda a evitar erros de tipos durante o desenvolvimento.

## Comandos úteis

```bash
npx expo start        # inicia o servidor de desenvolvimento
npx expo start --web  # abre a versão web
npm run android        # roda diretamente no emulador/dispositivo Android
npm run ios            # roda diretamente no simulador iOS
npm run lint           # roda o linter (ESLint)
npm run reset-project   # reseta o projeto para um estado inicial limpo
```

## Aprender mais

- [Documentação do Expo](https://docs.expo.dev/)
- [Documentação do Expo Router](https://docs.expo.dev/router/introduction/)
- [Documentação do React Native](https://reactnative.dev/docs/getting-started)
- [Tutorial oficial do Expo](https://docs.expo.dev/tutorial/introduction/)

## Comunidade

- [Expo no GitHub](https://github.com/expo/expo)
- [Discord do Expo](https://chat.expo.dev)
