# Checklist de Prontidão de Lançamento (Release Readiness) - Vitrine Autônoma

Este documento apresenta um checklist detalhado para avaliar a viabilidade de colocar a aplicação **Vitrine Autônoma** em produção de forma segura e automatizada.

---

## 1. Status de Prontidão

*   **Infraestrutura Core e Framework:** 🟢 Pronto (Next.js 16 + React 19 configurados)
*   **Banco de Dados e Persistência:** 🟢 Pronto (Supabase integrado com padrão Singleton)
*   **Estilos e Design:** 🟢 Pronto (CSS responsivo estruturado com convenção de contêineres)
*   **Testes Automatizados:** 🔴 Em falta (Sem qualquer framework de testes configurado)
*   **Integração e Entrega Contínua (CI/CD):** 🔴 Em falta (Sem automação de GitHub Actions)
*   **Configuração de Deploy Avançada:** 🟡 Parcial (Apenas o deploy padrão automático da Vercel foi feito, sem otimizações adicionais)

---

## 2. Checklist Detalhado

### 2.1. Desenvolvimento e Qualidade de Código
*   `[x]` Configuração de Linter (`eslint` integrado e configurado).
*   `[x]` Tipagem estática com TypeScript (`typescript` configurado).
*   `[ ]` Testes Unitários e de Componente (Não existem testes com Jest/Vitest/React Testing Library).
*   `[ ]` Testes E2E (End-to-End) (Não há automação de fluxos críticos como fluxo de carrinho e WhatsApp com Playwright ou Cypress).

### 2.2. CI/CD (Automação)
*   `[ ]` Pipeline de Verificação no Pull Request (Linter + Build + Typecheck automáticos no GitHub).
*   `[ ]` Pipeline de Execução de Testes Automáticos antes do Merge.

### 2.3. Infraestrutura & Deploy
*   `[x]` Integração básica com Vercel (Hospedagem atual do domínio `vitrine-autonoma.vercel.app`).
*   `[ ]` Arquivo de Configuração do Deploy (`vercel.json` ausente para controle de cache, headers de segurança ou regras de redirecionamento).
*   `[ ]` Separação de Ambientes (Não há documentação ou setup de staging vs. produção para o banco de dados Supabase e chave do WhatsApp).

---

## 3. Próximos Passos Recomendados (Ordem de Prioridade)

1.  **Configurar Variáveis de Ambiente de Produção:**
    Garantir que as credenciais do Supabase e o número do WhatsApp estejam configurados separadamente no painel da Vercel para Produção e Homologação.
2.  **Adicionar Pipeline de CI/CD (GitHub Actions):**
    Criar `.github/workflows/ci.yml` para rodar `npm run lint` e `npm run build` em cada push/PR.
3.  **Configurar Testes Críticos:**
    Instalar Vitest ou Playwright e automatizar o teste de adição e exclusão de itens do carrinho.
4.  **Criar `vercel.json`:**
    Adicionar políticas de segurança adicionais (headers `X-Frame-Options`, `Content-Security-Policy`, etc.).
