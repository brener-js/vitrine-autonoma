# KPIs de Impacto Recomendados - Vitrine Autônoma

Este documento propõe **5 Indicadores-Chave de Desempenho (KPIs)** projetados especificamente para o modelo operacional e de produto da **Vitrine Autônoma**.

---

## 1. Taxa de Conversão de Checkout (Add-to-Cart para WhatsApp Click)
*   **Métrica:** Percentual de sessões de usuários que clicaram em "Finalizar via WhatsApp" em relação ao total de usuários que adicionaram pelo menos um item ao carrinho.
*   **Fórmula:** `(Cliques no Checkout / Usuários com Itens no Carrinho) * 100`
*   **Justificativa Técnica:** Como a Vitrine Autônoma não realiza a transação de pagamento de forma interna, a conclusão da intenção de compra ocorre quando o cliente clica para enviar a mensagem formatada de pedido no WhatsApp. Esta métrica ajuda a diagnosticar possíveis barreiras de usabilidade na gaveta do carrinho ou fricção no redirecionamento.

## 2. Taxa de Abandono do Carrinho (Cart Abandonment Rate)
*   **Métrica:** Percentual de carrinhos criados (com pelo menos um item adicionado) que foram fechados ou abandonados sem que o checkout fosse acionado.
*   **Fórmula:** `(1 - (Cliques no Checkout / Adições ao Carrinho)) * 100`
*   **Justificativa Técnica:** Permite identificar se o preço dos produtos, o valor total do carrinho ou a usabilidade do drawer lateral (como o ajuste de quantidades ou falta de clareza nas ações de fechar) afetam negativamente a decisão do cliente.

## 3. Tempo de Interação da Página Inicial (Interactive Core Web Vitals)
*   **Métricas:** INP (Interaction to Next Paint) e LCP (Largest Contentful Paint) medidos via RUM (Real User Monitoring).
*   **Justificativa Técnica:** Por se tratar de uma vitrine digital frequentemente acessada por dispositivos móveis através de redes 3G/4G (vinda de links orgânicos em redes sociais), tempos de carregamento e tempo de resposta ao clique do botão "Adicionar" impactam diretamente a conversão. Valores de INP superiores a 200ms reduzem drasticamente a fluidez das compras de impulso.

## 4. Retenção de Clientes e Frequência de Pedidos (Repeat Order Rate)
*   **Métrica:** Taxa de retorno de clientes que iniciam novos carrinhos ou chegam ao checkout em um intervalo de 30 dias.
*   **Justificativa Técnica:** Indica a fidelidade dos consumidores a um menu/catálogo específico de estabelecimento comercial e a satisfação do cliente com a facilidade da jornada de compra oferecida pela vitrine.

## 5. Taxa de Atualização do Inventário (Admin Engagement)
*   **Métrica:** Frequência de inserção ou remoção de produtos através da interface `/admin`.
*   **Justificativa Técnica:** Mede o uso ativo do sistema pelo lojista ou administrador. Como a "Vitrine Autônoma" depende da dinamicidade dos menus (ex: esgotamento de pratos do dia, alteração de valores de ingredientes rápidos), essa métrica garante que o painel administrativo de backend é de fato operável, eficiente e livre de fricção para quem gerencia a loja.
