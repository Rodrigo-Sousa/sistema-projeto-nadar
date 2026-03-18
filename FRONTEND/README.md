
# Projeto Nadar - FrontEnd

Criação do _frontend_, fazendo uso do comando: `npx create-react-app projeto-nadar`, realizando a higienização das pastas, deixando o projeto pronto para começar a desenvolver a página de _login_.

## Rodando o projeto

Assim que baixar, abrir o projeto no VsCode (ou no editor de sua preferência) e no terminal, rodar o comando: `yarn install`, para que seja instalado todas as suas dependências e possamos utilizar o projeto.

Caso não tenha instalado o gerenciador de pacote _Yarn_, no terminal, digitar o seguinte comando: `npm install --global yarn`. 

Para checar se está instalado o gerenciador de pacotes, no terminal, digitar `yarn -v`, se for apresentando uma versão está instalado, caso contrário, precisa instalar.

Após rodar o _yarn_ na pasta _FrontEnd_, será criado a pasta **_node_modules_**. Com isso, o gerenciador de pacote já instaladou o conteúdo da pasta, para poder utilizar. Recomendando instalar as extesões para ter uma melhor utilização do projeto.

![Rodando Yarn no diretório _FrontEnd_](../img/02-rodando-Yarn.png)

Após instalar as extensões o projeto estiver pronto para startar, basta digitar no terminal, dentro do diretório _frontend_, o comando: `yarn dev`. E será aberto uma página do navegador, com o projeto iniciado.

## Extensões

Na pasta .vscode, tem as extensões recomendadas, para utilizar o projeto. Com o arquivo `extensions.json`, após baixar o projeto base, ir na parte de extesões direto no VS code, e na aba **RECOMMENDED** e instalar o que for listado ali, sendo elas, as mesmas que estão no arquivo _extensions_.
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

## Frontend

No primeiro momento, estaremos realizando a tela de login, com dados _mockados_, para simular as funcionalidades do projeto e o comportamento, com a estrutura já pronta praa produção.

1. **Regra de Negócio**

Simulação de um fluxo real.

- Usuário entra com **email + senha**.
- Validamos contra um "mock"
- Se válido:
   - Geramos um "_fake JWT_"
   - Salvamos no `localStorage`
   - Redirecionamento para a `/home`
- Se inválido:
   - Mostramos erro
- Logout:
   - Remove _token_
   - Redirecionamento para `/login`

---

2. **Criando o AuthService (simulando o backend)**

3. **Criando o AuthContext (estado global)**

4. **Criando a rota privada**

Instalaremos a biblioteca `react-router-dom` para gerenciar a navegação e rotas em aplicações web.

5. **Tela de Login (Tailwind + UX real)**

6. **Home (com logout)**

7. **Configurando rotas**

### Tela de login

- Tela de login, assim que rodar o projeto (dados mockados)

![Tela de Login](../img/03-login.png)

- Realziado o login

![Usuário Logado](../img/03.1-usuario-logado.png)

- Ao clicar no botão "sair", redirecionado para a página príncipal.

![Logout](../img/03.2-logout.png)