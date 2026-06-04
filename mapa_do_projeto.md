# Mapa do Projeto - Vitrine Autônoma

Este documento descreve detalhadamente a estrutura, funcionalidades, fluxos de utilizador e botões de ação do site **Vitrine Autônoma** após a exploração realizada com o agente de navegação.

As capturas de tela das seções principais foram geradas e anexadas como artefatos no seu painel.

---

## 1. Tela de Catálogo (Homepage - `/`)

A tela inicial exibe os produtos disponíveis e permite ao utilizador interagir com o carrinho de compras.

### Funcionalidades e Elementos:
*   **Cabeçalho (Header)**:
    *   Título principal: "Nosso Menu".
    *   **Botão de Ação**: Ícone do carrinho de compras (`button.cart-toggle`) que exibe um indicador dinâmico da quantidade de itens atuais.
*   **Lista de Produtos**:
    *   Cartões de produto exibindo Categoria, Nome, Descrição, Imagem (se disponível) e Preço.
    *   **Botão de Ação**: Botão **"Adicionar"** para incluir o item diretamente no carrinho.

---

## 2. Gaveta do Carrinho de Compras (Cart Drawer)

Aparece como um painel lateral direito (drawer) ao clicar no ícone do carrinho no cabeçalho.

### Funcionalidades e Elementos:
*   **Título**: "Seu Pedido".
*   **Botão de Ação**: Botão de fechar `[X]` no topo direito.
*   **Lista de Itens**:
    *   Exibe os itens adicionados com o nome e quantidade.
    *   **Botões de Ação**: Controles de quantidade `-` e `+` para atualizar a quantidade do produto.
    *   **Botão de Ação**: Ícone de lixeira para remover o item por completo.
*   **Resumo**: Exibição do valor total atualizado em tempo real: `Total: R$ XX,XX`.
*   **Botão de Ação**: Botão **"Finalizar via WhatsApp"** (`button#checkout-btn`) na parte inferior.

---

## 3. Fluxo de Checkout (Integração com WhatsApp)

Ao clicar no botão "Finalizar via WhatsApp" no carrinho, o utilizador inicia o fluxo de finalização externa.

### Funcionalidades e Elementos:
*   **Redirecionamento**: Redireciona o utilizador para a API oficial do WhatsApp (`https://api.whatsapp.com/send`).
*   **Conteúdo da Mensagem**: Uma mensagem pré-formatada contendo:
    *   Cabeçalho do pedido.
    *   Lista detalhada com quantidade, nome e preço de cada item.
    *   O valor total calculado do pedido.
    *   Número de telefone do comerciante configurado (ex: `5511999999999`).

---

## 4. Painel de Administração (`/admin`)

Uma interface simplificada para que o administrador gerencie o inventário de produtos do catálogo de forma dinâmica.

### Funcionalidades e Elementos:
*   **Botão de Ação**: Link **"Voltar para Loja"** no topo para regressar ao catálogo.
*   **Formulário de Cadastro (Adicionar Novo Produto)**:
    *   Campos de entrada: Nome do Produto (obrigatório), Descrição, Preço em R$ (obrigatório), Categoria e URL da Imagem.
    *   **Botão de Ação**: Botão **"Adicionar Produto"** para submeter e salvar.
*   **Lista de Produtos Atuais**:
    *   Lista de itens cadastrados no sistema com suas informações principais.
    *   **Botão de Ação**: Botão **"Remover"** para excluir um produto do inventário em tempo real.
