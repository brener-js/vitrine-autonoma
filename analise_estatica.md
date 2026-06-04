# Relatório de Análise Estática - Vitrine Autônoma

Este documento consolida a análise técnica do código-fonte do projeto, identificando dívidas técnicas, *code smells*, duplicações e pontos de melhoria na arquitetura.

As referências e o diagrama visual correspondente podem ser acompanhados no artefato anexado ao seu painel.

---

## 1. Dívidas Técnicas e Code Smells Critícos

### 1.1. Valores "Hardcoded" (Configurações no Código)
* **Arquivo:** `src/app/page.tsx` (linha 23)
* **Ponto Crítico:** `const whatsappNumber = "5511999999999";`
* **Descrição:** O número de WhatsApp utilizado para receber os pedidos está embutido diretamente no código-fonte do componente do cliente.
* **Impacto:** Qualquer alteração no número exige uma nova compilação e deploy da aplicação.
* **Recomendação:** Mover para uma variável de ambiente (ex: `NEXT_PUBLIC_WHATSAPP_NUMBER`) ou armazenar no banco de dados e obter através da API.

### 1.2. Duplicação de Código (DRY - Don't Repeat Yourself)
* **Tipos Duplicados:**
  * A interface `Product` está declarada em `src/app/page.tsx` (linhas 5-12) e em `src/app/admin/page.tsx` (linhas 6-13).
* **Lógica de Busca Duplicada:**
  * A função `fetchProducts` que realiza a chamada para a API `/api/products` está duplicada quase idêntica em `src/app/page.tsx` (linhas 26-41) e em `src/app/admin/page.tsx` (linhas 25-41).
* **Recomendação:** Criar uma pasta de tipos compartilhados `src/types/` e hooks customizados reutilizáveis (ex: `useProducts.ts`).

### 1.3. Tratamento de Erros Incorreto na API
* **Arquivo:** `src/app/api/products/route.ts` (linha 17)
* **Ponto Crítico:**
  ```typescript
  if (error) {
    console.error('Supabase GET error:', error);
    return NextResponse.json([], { status: 200 }); // Status 200 para erro
  }
  ```
* **Descrição:** A API retorna um status HTTP `200 OK` mesmo quando ocorre um erro de comunicação ou consulta no banco de dados Supabase (retornando apenas um array vazio).
* **Impacto:** Dificulta o monitoramento de erros, pois ferramentas de monitoramento e o próprio cliente acharão que a requisição foi bem-sucedida.
* **Recomendação:** Retornar os códigos de status corretos (ex: `500 Internal Server Error`).

---

## 2. Arquitetura e Estruturação

### 2.1. Acoplamento e Componentização
* **Problema:** O componente `src/app/page.tsx` contém toda a lógica do catálogo, o renderizador dos cartões de produtos, a lógica do estado do carrinho e o HTML/CSS do modal do carrinho.
* **Recomendação:** Separar em subcomponentes menores e isolados:
  * `ProductCard.tsx` (para exibir um produto específico)
  * `CartDrawer.tsx` (para encapsular o carrinho de compras)
  * `CatalogHeader.tsx` (cabeçalho)

### 2.2. URLs de Imagens "Fallback" no Código
* **Arquivo:** `src/app/admin/page.tsx` (linha 61)
* **Descrição:** URL estática do Unsplash embutida diretamente como imagem padrão quando o usuário não informa uma URL.
* **Recomendação:** Mover para constantes ou um arquivo de configuração centralizado.
