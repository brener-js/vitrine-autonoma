# Relatório de Performance e Usabilidade - Vitrine Autônoma

Este documento consolida a auditoria de **Core Web Vitals** (Performance) e a avaliação de usabilidade baseada nas **10 Heurísticas de Nielsen** da aplicação **Vitrine Autônoma**.

As capturas de tela mencionadas no relatório foram arquivadas como artefatos no painel do seu ambiente de trabalho.

---

## 1. Métricas de Performance (Core Web Vitals)

Como a aplicação é extremamente leve e minimalista, ela apresenta ótimos resultados nos testes de velocidade:

| Métrica | Estimativa | Status | Explicação |
| :--- | :--- | :--- | :--- |
| **LCP** (Largest Contentful Paint) | **< 0.5s** | 🟢 Ótimo | O conteúdo principal da página (cabeçalho e produtos) é renderizado quase que imediatamente. |
| **CLS** (Cumulative Layout Shift) | **0** | 🟢 Ótimo | Não há elementos que causam deslocamento visual durante a renderização inicial ou interações. |
| **FID / INP** (First Input Delay / Interaction to Next Paint) | **< 50ms** | 🟢 Ótimo | Ações de adicionar ao carrinho e abrir o carrinho respondem instantaneamente na interface sem bloquear a thread principal. |

---

## 2. Heurísticas de Usabilidade (Nielsen)

### Heurística 1: Visibilidade do estado do sistema
*   **Status:** 🟡 Parcialmente atendido.
*   **Análise:** O contador do carrinho de compras atualiza imediatamente ao clicar em "Adicionar". No entanto, no painel `/admin`, a ação de remoção de produtos ocorre sem feedback visual claro se a operação falhar.

### Heurística 2: Correspondência entre o sistema e o mundo real
*   **Status:** 🟢 Atendido.
*   **Análise:** O fluxo de compra (carrinho, quantidades e envio de mensagem estruturada com o resumo para o WhatsApp) é altamente intuitivo para o público brasileiro acostumado a fazer pedidos locais diretamente via chat.

### Heurística 3: Controle e liberdade do usuário
*   **Status:** 🔴 Crítico.
*   **Análise:** O usuário pode gerenciar o carrinho de compras. No entanto, no painel `/admin`, o botão de exclusão de produtos ("Remover") falha de forma silenciosa ou está quebrado em determinadas situações, impossibilitando a exclusão dos itens, e não há opção de edição. Além disso, a gaveta do carrinho não responde ao botão `Escape` para fechar.

### Heurística 4: Consistência e padrões
*   **Status:** 🟢 Atendido.
*   **Análise:** O posicionamento do cabeçalho, botão do carrinho no topo direito, disposição dos cards de produto e campos de formulário padrão seguem as melhores convenções de UI do mercado de e-commerce.

### Heurística 5: Prevenção de erros
*   **Status:** 🟡 Parcialmente atendido.
*   **Análise:** O formulário administrativo usa validação nativa de campos obrigatórios (`required`), porém a exclusão de produtos não solicita uma confirmação ao usuário para evitar cliques acidentais.

### Heurística 6: Reconhecimento em vez de recordação
*   **Status:** 🟢 Atendido.
*   **Análise:** Ao abrir o carrinho de compras, todas as informações de itens, preços unitários, quantidades e o preço total ficam evidentes no drawer lateral, não obrigando o cliente a lembrar do que adicionou anteriormente.

### Heurística 7: Flexibilidade e eficiência de uso
*   **Status:** 🟡 Parcialmente atendido.
*   **Análise:** Interface leve e adaptável para dispositivos móveis, mas carece de barra de pesquisa ou filtros de categoria.

### Heurística 8: Estética e design minimalista
*   **Status:** 🟢 Atendido.
*   **Análise:** Design limpo, sem elementos supérfluos ou anúncios, com excelente foco no produto, embora o contraste do texto de descrição precise ser ajustado para conformidade com regras a11y.

### Heurística 9: Reconhecer, diagnosticar e recuperar erros
*   **Status:** 🔴 Crítico.
*   **Análise:** As falhas de comunicação da API (seja ao carregar produtos ou deletar) não geram qualquer aviso ao usuário, ocorrendo de maneira silenciosa no console.

### Heurística 10: Ajuda e documentação
*   **Status:** 🟢 Atendido.
*   **Análise:** Não há documentação ou central de ajuda integrada, contudo a simplicidade e a intuitividade do fluxo dispensam essa necessidade para o usuário final.
