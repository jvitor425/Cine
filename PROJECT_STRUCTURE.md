# Estrutura do Projeto 

## Visão Geral
Aplicação React completa, construída com Next.js seguindo os princípios do Atomic Design, implementando autenticação, painel de controle com gráficos e operações CRUD completas.

## Pilha de Tecnologias
- **Framework**: React com Next.js
- **Roteamento**: React Router v7
- **Gerenciamento de Estado**: Context API + Services
- **Autenticação**: JWT (Implementação de Mock)
- **Componentes de UI**: Radix UI + shadcn/ui
- **Gráficos**: Recharts
- **Estilização**: Tailwind CSS v4
- **Manipulação de Formulários**: React Hook Form
- **Notificações**: Sonner

## Estrutura do Projeto

```
src/app/
├── App.tsx # Aplicativo principal com roteamento
├── contexts/
│ └── AuthContext.tsx # Contexto de autenticação com JWT
├── services/
│ └── mockApi.ts # API de mock para CRUD operações
├── provedores/
│ └── ThemeProvider.tsx # Provedor de tema para modo claro/escuro
├── componentes/
│ ├── ProtectedRoute.tsx # HOC de proteção de rota
│ ├── átomos/ # Design Atômico - Átomos
│ │ └── Logo.tsx
│ ├── moléculas/ # Design Atômico - Moléculas
│ │ ├── FormField.tsx # Entrada + Rótulo + Erro
│ │ ├── SearchFilter.tsx # Busca com ícone
│ │ └── PaginationControl.tsx # Controles de paginação
│ ├── organisms/ # Design Atômico - Organismos
│ │ ├── Header.tsx # Cabeçalho de navegação
│ │ ├── AuthForm.tsx # Formulário de login/cadastro
│ │ ├── MovieCard.tsx # Cartão de exibição de filme
│ │ ├── MovieDialog.tsx # Diálogo de criação/edição/visualização
│ │ └── DeleteDialog.tsx # Confirmação de exclusão
│ └── ui/ # Componentes básicos da interface do usuário (shadcn/ui)
├── pages/ # Páginas do aplicativo
│ ├── HomePage.tsx # / - Página inicial
│ ├── LoginPage.tsx # /login - Autenticação
│ ├── RegisterPage.tsx # /register - Cadastro de usuário
│ ├── DashboardPage.tsx # /dashboard - Protegido com gráficos
│ └── CrudPage.tsx # /crud - Operações CRUD completas
```

## Implementação de Recursos

### ✅ Autenticação (JWT)
- Login com e-mail/senha
- Cadastro de usuário
- Armazenamento de token JWT no localStorage
- Rotas protegidas (Painel, CRUD)
- Redirecionamento automático se não autenticado
- Funcionalidade de logout

### ✅ Painel (/dashboard) - Protegido
- Cartões de estatísticas (Total de Filmes, Avaliação Média, Ano Mais Recente, Gêneros)
- Gráfico de Pizza: Filmes por Gênero
- Gráfico de Barras: Filmes por Década
- Gráfico de Linhas: Top 10 Filmes por Classificação
- Utiliza a biblioteca Recharts

### ✅ Operações CRUD (/crud)
**Tema**: Banco de Dados de Filmes

#### Criar ✅
- Formulário de diálogo com todos os campos
- Título, Diretor, Ano, Gênero, Classificação
- Validação e tratamento de erros
- Notificação de sucesso

#### Ler/Listar ✅
- Layout em grade com cartões de filmes
- Exibe todos os detalhes do filme
- Estado vazio com chamada para ação
- Exibição da contagem de itens

#### Ver Detalhes ✅
- Diálogo somente leitura
- Todos os campos, incluindo a data de criação
- Botão Fechar

#### Atualizar ✅
- Diálogo de edição preenchido previamente com dados
- Funcionalidade de salvar alterações
- Notificação de sucesso

#### Excluir ✅
- Diálogo de confirmação
- Excluir por ID
- Notificação de sucesso com o filme Nome

### ✅ Filtros
1. **Filtro de Busca**: Por título, diretor ou gênero
2. **Filtro de Data**:

- Todas as datas

- Mais recentes primeiro (por data de criação)

- Mais antigos primeiro (por data de criação)

### ✅ Paginação
- Itens por página: 6, 12 ou 24
- Navegação entre páginas (Anterior/Próximo)
- Exibição da página atual
- Cálculo do total de páginas
- Ajuste automático de páginas quando os filtros são alterados

## Arquitetura de Design Atômico

### Átomos
- `Logo.tsx`: Logotipo do aplicativo com ícone

### Moléculas
- `FormField.tsx`: Rótulo + Entrada + Mensagem de erro
- `SearchFilter.tsx`: Campo de busca com ícone
- `PaginationControl.tsx`: Paginação com seletor de tamanho de página

### Organismos
- `Header.tsx`: Cabeçalho de navegação completo com autenticação Estado
- `AuthForm.tsx`: Formulário completo de login/cadastro
- `MovieCard.tsx`: Exibição de filmes com ações
- `MovieDialog.tsx`: Modal para criar/editar/visualizar
- `DeleteDialog.tsx`: Diálogo de confirmação

### Templates
- Os componentes da página atuam como templates

### Páginas
- Página Inicial, Página de Login, Página de Cadastro, Página do Painel, Página CRUD

## Gerenciamento de Estado

### API de Contexto
- **AuthContext**: Estado de autenticação do usuário, token, funções de login/cadastro/logout
- Autenticação persistente (localStorage)
- Estado de autenticação global disponível em todo o aplicativo

### Serviços
- **mockApi.ts**: Simula a API de backend

- Operações CRUD

- Persistência de dados via localStorage

- Inserção de dados de exemplo

- Interface de filmes com TypeScript

## Rotas

| Rota | Acesso | Descrição |

|-------|--------|-------------|
| `/` | Público | Página inicial com visão geral dos recursos |

| `/login` | Público | Formulário de login |

| `/register` | Público | Formulário de registro |

| `/dashboard` | Protegido | Painel de análise com gráficos |

| `/crud` | Protegido | Operações CRUD de filmes |

## Modelo de Dados

```typescript
interface Movie {

id: string;

title: string;

diretor: string;

ano: número;

gênero: string;

classificação: número;

criado em: string;
}

## Principais Recursos

### Funcionalidade Completa ✅
- Todos os recursos estão **totalmente implementados e funcionais**
- Sem espaços reservados ou implementações incompletas
- Tratamento completo de erros
- Feedback do usuário (notificações)
- Estados de carregamento
- Validação

### Proteção de Rotas
- Autenticação baseada em JWT
- Redirecionamento automático para /login para rotas protegidas
- Estado de login persistente
- Logout seguro

### Experiência do Usuário
- Design responsivo
- Navegação clara
- Diálogos de confirmação para ações destrutivas
- Notificações Toast para ações
- Estados vazios com orientação
- Indicadores de carregamento

## Como Testar

### 1. Registrar um Usuário
1. Navegue até `/register`
2. Insira: Nome, E-mail, Senha
3. Faça login automaticamente e redirecione para `/dashboard`

### 2. Login
1. Navegue até `/login`
2. Insira o e-mail e a senha cadastrados
3. Redireciona para `/dashboard`

### 3. Visualizar Painel
- Veja análises e gráficos
- Dados de exemplo são inseridos automaticamente

### 4. Gerenciar Filmes (CRUD)
1. Navegue até `/crud`
2. **Criar**: Clique no botão "Adicionar Filme"
3. **Visualizar**: Clique em "Visualizar" em qualquer cartão de filme
4. **Editar**: Clique em "Editar" em qualquer cartão de filme
5. **Excluir**: Clique no ícone da lixeira e confirme a exclusão
6. **Filtrar**: Use a barra de pesquisa ou o menu suspenso de filtro por data
7. **Paginar**: Altere o número de itens por página ou navegue entre as páginas

## Dados de Exemplo
15 filmes pré-inseridos com vários gêneros, anos e classificações para testar filtros e paginação.

## Observações
- Design visual simples e funcional (conforme os requisitos)
- Foco em estrutura, organização e funcionalidade
- Todos os componentes seguem os princípios do Design Atômico
- Separação completa de responsabilidades
- Componentes reutilizáveis