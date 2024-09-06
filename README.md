# 🏭 **Test1-ProdFlow: Sistema de Gestão de Produção**

Bem-vindo ao **Test1-ProdFlow**! Este projeto é um sistema dinâmico e completo de gestão de ordens de produção (OPs), voltado para a indústria de móveis. O objetivo principal deste sistema é permitir o controle das etapas de produção, acompanhamento de status e gestão de estoque de maneira simples e eficiente.

## 🚀 **Funcionalidades**
- 📦 **Cadastro de Produtos**: Cadastre novos produtos no sistema.
- 📝 **Cadastro de OPs**: Crie ordens de produção com produtos, descrição e quantidade.
- 🛠️ **Acompanhamento de OPs**: Visualize e gerencie o status de cada OP, com possibilidade de alterar entre os estados _Concluída_, _Em Produção_, ou _Em Espera_.
- 📊 **Dashboard Dinâmico**: Exibe gráficos interativos de produção com base nas OPs cadastradas e atualizadas.
- 🏗️ **Gestão de Estoque**: Controle de estoque com exibição de produtos liberados (concluídos) e bloqueados (em produção/espera).

## 🔧 **Tecnologias Utilizadas**
- **Frontend**: React.js, Next.js
- **Bibliotecas**: 
  - `react-chartjs-2` & `chart.js` para os gráficos 📊
  - `react-table` para as tabelas interativas 📋
  - `sweetalert2` para alertas personalizados 💬
- **Backend**: API com Next.js para gerenciamento de dados 📡
- **Estilo**: Tailwind CSS para um design responsivo e moderno 💅

## 🛠️ **Instalação e Configuração**

1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/test1-prodflow.git
    ```

2. Navegue até o diretório do projeto:
    ```bash
    cd test1-prodflow
    ```

3. Instale as dependências:
    ```bash
    npm install
    ```

4. Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

5. Acesse o projeto no navegador:
    ```
    http://localhost:3000
    ```

## 🖥️ **Como Usar**

### 📦 **Cadastro de Produto**
- Vá até a aba **Cadastro de Produto** no menu lateral.
- Preencha as informações do novo produto.
- Clique em **Cadastrar Produto**.

### 📝 **Cadastro de OP**
- Navegue até a aba **Cadastro de OP**.
- Selecione o produto e insira as informações necessárias, como quantidade e descrição.
- Clique em **Cadastrar OP**.

### 🛠️ **Acompanhamento de OP**
- Na aba **Acompanhamento de OP**, você pode ver todas as OPs criadas.
- Filtre e altere o status da OP (Em produção, Concluída ou Em espera).

### 📊 **Dashboard**
- O Dashboard exibe gráficos interativos que mostram a quantidade de OPs concluídas, em produção e em espera.

### 🏗️ **Gestão de Estoque**
- Na aba **Estoque**, visualize produtos liberados (concluídos) e bloqueados (em produção/espera).
- Pesquise por número da OP ou nome do produto para filtrar os resultados.

## 📂 **Estrutura do Projeto**

- **public**: Arquivos estáticos, como imagens
  - `user.jpg`: Foto do usuário padrão
- **src**:
  - **app**: Configurações do aplicativo Next.js
  - **components**: Componentes reutilizáveis (Sidebar, etc.)
  - **pages**: Páginas principais do sistema (Dashboard, Acompanhamento, etc.)
  - **styles**: Estilos globais e customizados
- **README.md**: Documentação do projeto



## 🎯 **Desafios Enfrentados**
Durante o desenvolvimento deste sistema, vários desafios interessantes foram enfrentados, como:

- **Integração de gráficos dinâmicos**: O uso de `react-chartjs-2` para gerar gráficos interativos e atualizados com os dados das OPs foi um grande aprendizado.
- **Gerenciamento de estado**: Implementamos `useState` e `useEffect` para lidar com o carregamento dinâmico e atualização de OPs.
- **Responsividade**: Garantir que todas as telas, tabelas e gráficos fossem responsivos para uma melhor experiência de usuário em dispositivos móveis e desktops.

## 📈 **Possíveis Melhorias Futuras**
- Implementar autenticação para diferentes usuários.
- Adicionar mais gráficos e relatórios customizados.
- Integração com uma API externa para envio automático de relatórios por e-mail.

## 🛡️ **Licença**
Este projeto está licenciado sob a MIT License. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 **Contato**
Se você tiver alguma dúvida, problema ou sugestão, entre em contato:

- **Vinicius Santos**  
  ✉️ Email: vinicius.santos@email.com  
  🔗 [LinkedIn](https://www.linkedin.com/in/vinicius-souza-santoss/)  

---

✨ _Desenvolvido com muita dedicação por Vinicius Santos_ ✨

