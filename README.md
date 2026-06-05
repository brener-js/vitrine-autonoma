# Vitrine Autônoma

## Introdução e Alinhamento com a ODS 8

O projeto Vitrine Autônoma foi desenvolvido com o propósito de fomentar o crescimento econômico inclusivo e sustentável, alinhando-se diretamente ao Objetivo de Desenvolvimento Sustentável 8 (Trabalho Decente e Crescimento Econômico) da ONU. Ao fornecer uma plataforma de e-commerce acessível, simplificada e eficiente para pequenos empreendedores, o projeto visa:

- Promover a formalização e o crescimento de micro e pequenas empresas.
- Facilitar o acesso de produtores locais ao mercado digital.
- Garantir um ambiente de trabalho digno através da automação de processos de venda e gestão.

## Sobre o Projeto

A **Vitrine Autônoma** é uma aplicação minimalista, rápida e acessível projetada para pequenos empreendedores e negócios locais. Ela permite a criação de um catálogo digital de produtos de forma rápida e utiliza o WhatsApp como canal de fechamento de vendas, dispensando a necessidade de complexos gateways de pagamento e encurtando a jornada de compra do cliente.

## Funcionalidades Principais

- **Catálogo de Produtos:** Listagem clara, ágil e focada em performance para alta taxa de conversão.
- **Carrinho de Compras Interativo:** Gestão do pedido simplificada que envia um resumo do pedido diretamente para o WhatsApp do lojista.
- **Painel Administrativo Seguro (`/admin`):** Adição e remoção de produtos, garantindo uma gestão fluida com mensagens de sucesso e diagnóstico amigáveis.
- **Performance e Acessibilidade:** Desenvolvida para atingir a pontuação máxima no Lighthouse (Core Web Vitals), com total suporte a leitores de tela e ótimo contraste.

## Tecnologias Utilizadas

- **[Next.js](https://nextjs.org/)** (App Router)
- **TypeScript**
- **CSS** (Vanilla CSS focando em alta performance na renderização)

## Primeiros Passos

1. Clone o repositório e instale as dependências:
```bash
npm install
```

2. Execute o servidor de desenvolvimento localmente:
```bash
npm run dev
```

3. Acesse em seu navegador:
   - **Loja (Catálogo):** [http://localhost:3000](http://localhost:3000)
   - **Painel Administrativo:** [http://localhost:3000/admin](http://localhost:3000/admin)

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto, caso queira configurar o número de destino do WhatsApp:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999
```