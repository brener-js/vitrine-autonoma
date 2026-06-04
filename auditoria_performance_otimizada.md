# Relatório de Auditoria de Performance Otimizada - Vitrine Autônoma

Este documento compara o desempenho da aplicação **Vitrine Autônoma** antes e depois das otimizações de *lazy loading* de componentes e imagens.

---

## 1. Otimizações Implementadas

1.  **Lazy Loading Dinâmico de Componente:**
    *   O componente `CartDrawer` foi extraído para um ficheiro separado e importado em `src/app/page.tsx` com `dynamic(() => import("@/components/CartDrawer"), { ssr: false })`.
    *   **Impacto:** O bundle JS inicial carregado no ecrã principal foi reduzido, postergando o carregamento dos SVGs e da lógica do carrinho até que o utilizador clique no ícone.
2.  **Lazy Loading Nativo de Imagens:**
    *   Configuração de `loading="lazy"` e `decoding="async"` nas imagens dos cartões de produtos.
    *   **Impacto:** Acelera o First Contentful Paint (FCP) ao não bloquear a renderização para carregar imagens fora da área visível (viewport).

---

## 2. Comparativo de Performance (Antes vs Depois)

Os dados comparativos foram obtidos analisando a versão em produção na Vercel através da ferramenta **Google PageSpeed Insights**:

| Métrica | Antes (Auditoria Inicial) | Depois (Com Otimizações) | Status |
| :--- | :--- | :--- | :--- |
| **Pontuação Mobile** | ~92/100 | **96/100** | 🟢 Melhoria |
| **Largest Contentful Paint (LCP) Mobile** | ~3.1s | **2.8s** | 🟢 Reduzido |
| **Pontuação Desktop** | ~96/100 | **98/100** | 🟢 Melhoria |
| **Largest Contentful Paint (LCP) Desktop** | ~0.7s | **0.6s** | 🟢 Reduzido |
| **Total Blocking Time (TBT)** | 10ms | **10ms** | 🟢 Estável |

---

## 3. Evidência Visual da Auditoria
A gravação completa do fluxo de verificação de performance e comportamento de rede executada pelo navegador pode ser acompanhada sob os arquivos de gravação de mídia anexados aos artefactos do painel lateral.
