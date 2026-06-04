# Plano de Ação Prioritário - Vitrine Autônoma

Este documento consolida todos os problemas identificados durante as auditorias de acessibilidade, performance, usabilidade e análise estática do repositório da **Vitrine Autônoma**, organizando-os por severidade e sugerindo ações corretivas imediatas.

As referências visuais e o cronograma interativo podem ser acompanhados no artefato correspondente anexado ao seu painel.

---

## 1. Tabela de Severidade e Plano de Ação

| ID | Área | Descrição do Problema | Severidade | Ação Sugerida |
| :--- | :--- | :--- | :--- | :--- |
| **01** | Usabilidade / API | Falhas de rede ou banco de dados são silenciosas na interface | 🔴 **Crítico** | Implementar tratamento visual de erro amigável (Toast, Banner de Erro) para requisições com falha. |
| **02** | Análise Estática | Número do WhatsApp hardcoded na página principal | 🔴 **Crítico** | Mover para variáveis de ambiente (ex: `NEXT_PUBLIC_WHATSAPP_NUMBER`). |
| **03** | Acessibilidade | Tecla `Tab` escapa da gaveta do carrinho (falta de Focus Trap) | 🟠 **Alto** | Implementar ou usar biblioteca com suporte a focus trap no Drawer. |
| **04** | API / Backend | API do produto envia `200 OK` quando o Supabase falha | 🟠 **Alto** | Retornar códigos de status apropriados (ex: `500 Internal Server Error`). |
| **05** | Acessibilidade | Botões do carrinho, adição e exclusão sem `aria-label` | 🟠 **Alto** | Adicionar atributos `aria-label` descritivos e dinâmicos aos botões. |
| **06** | Usabilidade | Botão "Remover" no `/admin` falha silenciosamente | 🟠 **Alto** | Garantir tratamento visual do resultado da operação. |
| **07** | Qualidade | Ausência total de testes automatizados e pipelines de CI/CD | 🟠 **Alto** | Configurar Vitest ou Playwright e uma Action no GitHub. |
| **08** | Análise Estática | Duplicação de código (`Product` e fetch) em catálogo/admin | 🟡 **Médio** | Centralizar tipo na pasta `src/types/` e criar hook `useProducts`. |
| **09** | Acessibilidade | Baixo contraste de cores na descrição dos produtos | 🟡 **Médio** | Ajustar cor no CSS global (`globals.css`) para rácio mínimo de 4.5:1. |
| **10** | Usabilidade | Sem confirmação para exclusão de produtos no admin | 🟡 **Médio** | Adicionar diálogo de confirmação visual antes de executar o DELETE. |
| **11** | Análise Estática | Falta de componentes reutilizáveis (`ProductCard`, `CartDrawer`) | 🟡 **Médio** | Refatorar `page.tsx` dividindo-o em componentes menores. |
| **12** | Acessibilidade | Falta de tags estruturais semânticas (header, main, footer) | 🟢 **Baixo** | Substituir `<div>` estruturais por tags semânticas HTML5. |
| **13** | Acessibilidade | Imagens de produto indisponíveis no DOM para leitores de tela | 🟢 **Baixo** | Garantir presença de tags `<img>` com `alt` descritivo. |
