# Checkout Pré-Lançamento e Estratégia de Deploy - Vitrine Autônoma

Este documento formaliza as decisões arquiteturais da estratégia de **Deploy Contínuo (CD)** e integração do pipeline **CI/CD** para a **Vitrine Autônoma**.

---

## 1. Justificativa da Estratégia de Deploy Contínuo (GitHub + Vercel)

A estratégia adotada combina a automação de compilação da **Vercel** com o pipeline de checagem estática e testes do **GitHub Actions**:

### 1.1. Separação de Responsabilidades (CI vs. CD)
*   **GitHub Actions (CI - Integração Contínua):** Responsável por rodar o Linter (`eslint`), validar a checagem de tipos estáticos (`tsc`) e executar testes unitários ou de integração antes de permitir qualquer modificação na branch estável (`main`).
*   **Vercel (CD - Deploy Contínuo):** Foca exclusivamente na hospedagem, CDN global, SSR/Prerendering otimizado de páginas Next.js (Turbopack) e geração dinâmica de ambientes de *Preview* para cada Pull Request.

### 1.2. Segurança e Isolamento de Credenciais
*   A Vercel gerencia as variáveis de ambiente sensíveis (Supabase URL, Anon Key, Service Role e número do WhatsApp de produção) diretamente em seu painel criptografado, sem a necessidade de expor chaves sensíveis em arquivos de configuração públicos do repositório.

---

## 2. Checklist de Aprovação para Lançamento

| Item | Status | Responsável |
| :--- | :--- | :--- |
| **Linting & Typecheck** | 🟢 Aprovado | GitHub Actions Pipeline (`npm run lint`) |
| **Compilação de Builds** | 🟢 Aprovado | Vercel Turbopack compiler (`next build`) |
| **Contraste de Acessibilidade (a11y)** | 🟢 Aprovado | Verificado via DevTools (~97 score) |
| **Performance e Carregamento (CWV)** | 🟢 Aprovado | PageSpeed Insights Mobile (**96/100**) |
| **Integração Supabase (Dados)** | 🟢 Aprovado | Singleton Database Client funcional |
