# Plano de Monitoramento Pós-Lançamento - Vitrine Autônoma

Com a arquitetura escalável (Next.js + Supabase na Vercel) consolidada, é vital garantir que a qualidade se mantenha assim que o tráfego aumentar. Este documento define a estratégia, ferramentas e gatilhos de alerta para monitorar a saúde da aplicação em produção.

---

## 1. Ferramentas de Monitoramento Recomendadas

Para ter uma visão global da aplicação com pouco atrito de configuração e baixo custo, sugere-se as seguintes ferramentas (maioria gratuitas ou com "free tiers" generosos):

### 1.1. Rastreio de Erros e Exceções (Error Tracking)
*   **Ferramenta Sugerida:** **Sentry** (Plano Developer / Gratuito).
*   **Objetivo:** Capturar falhas não tratadas na interface (React Exceptions) e gargalos na comunicação do Next.js com o Supabase.
*   **Vantagem:** O Sentry permite capturar o "Stack Trace" exato de quando um botão falha ou um produto não carrega, associando o erro ao tipo de dispositivo do utilizador.

### 1.2. Tráfego, Performance e Core Web Vitals
*   **Ferramenta Sugerida:** **Vercel Analytics & Vercel Speed Insights**.
*   **Objetivo:** Acompanhar volumes de acesso, fontes de tráfego, referenciadores e a saúde do frontend (Métricas LCP, INP, CLS reais recolhidas diretamente do navegador do utilizador).
*   **Vantagem:** Totalmente integrado com um simples clique no painel da Vercel, dispensando tags pesadas do Google Analytics para cenários iniciais.

### 1.3. Uptime e Disponibilidade Sintética
*   **Ferramenta Sugerida:** **UptimeRobot** ou **BetterStack**.
*   **Objetivo:** Simular visitas frequentes (a cada 1 a 5 minutos) nas rotas principais (`/` e `/api/products`).
*   **Vantagem:** Confirma se a hospedagem principal e o banco de dados estão respondendo adequadamente antes mesmo que um utilizador humano perceba a queda.

---

## 2. Métricas Críticas a Acompanhar

Para garantir que a performance e a usabilidade mantêm a alta barra definida no pré-lançamento, vigie diariamente as métricas abaixo:

### 2.1. Métricas de Experiência do Utilizador (UX & Vitals)
*   **LCP (Largest Contentful Paint):** O tempo até o render da maior imagem de produto. Deve manter-se abaixo de **2.5 segundos** no percentil 75 (p75).
*   **CLS (Cumulative Layout Shift):** Pulos de tela enquanto as imagens carregam. Deve ser mantido estritamente abaixo de **0.1**.

### 2.2. Métricas de Fiabilidade Técnica
*   **Taxa de Erro HTTP 5xx:** Percentagem de requisições que chegam à `/api/products` e falham (ex: timeout de rede com o Supabase). O padrão ouro é manter essa taxa em **< 0.1%**.
*   **Latência P95 (Tempo de Resposta):** 95% de todas as listagens de produtos devem resolver num tempo inferior a **300ms**.

### 2.3. Métricas de Negócio (Conversão Básica)
*   **Click-Through de Checkout:** Monitorizar no Vercel Events ou Plausible Analytics quantas vezes o botão "Finalizar Compra" (redirecionamento WhatsApp) é clicado vs. Total de Visitantes da Loja.

---

## 3. Critérios Objetivos para Disparo de Alertas

Configurar os canais de alerta (Discord, Slack, ou E-mail) do Sentry e do UptimeRobot para reagirem automaticamente sem causar "Fadiga de Alerta". Defina os seguintes limiares de disparo:

| Categoria do Alerta | Critério Limite (Trigger Condition) | Ferramenta | Severidade / Ação Exigida |
| :--- | :--- | :--- | :--- |
| **Queda Generalizada (Downtime)** | Rota raiz `/` retorna Timeout ou `502/503` por mais de **3 minutos** consecutivos. | UptimeRobot | 🔴 **Crítica** - Verificar status da infraestrutura da Vercel imediatamente. |
| **Pico de Erros Internos (API)** | Erros `HTTP 500` ultrapassam **5% das requisições** na API de produtos numa janela de 5 minutos. | Sentry / Vercel Logs | 🔴 **Crítica** - Inspecionar quotas do Supabase ou latência de banco de dados. |
| **Exceções em Cascata (Front-end)** | O mesmo TypeError/ReferenceError afeta **> 20 utilizadores únicos** em menos de 1 hora. | Sentry | 🟡 **Aviso** - Regressão na interface introduzida no último deploy. Isolar componente. |
| **Degradação Lenta de Performance** | Média diária de LCP (Mobile) excede o patamar de **3.5 segundos**. | Vercel Speed Insights | 🟡 **Aviso** - Adicionar na dívida técnica a necessidade de rever o tamanho ou loader das imagens. |

> [!TIP]
> **Prática de Retenção:** Se um alerta crítico 🔴 for disparado, o pipeline de deploy recém-configurado permite a funcionalidade de "Instant Rollback" no painel da Vercel. Isto assegura que a aplicação retorna a uma versão estável enquanto o erro é corrigido no código.
