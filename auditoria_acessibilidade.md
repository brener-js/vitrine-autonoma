# Relatório de Auditoria de Acessibilidade (a11y) - Vitrine Autônoma

Este documento detalha os problemas de acessibilidade identificados no site **Vitrine Autônoma** (`https://vitrine-autonoma.vercel.app/` e `/admin`) e sugere correções técnicas.

As capturas de tela mencionadas no relatório foram arquivadas como artefatos no painel do seu ambiente de trabalho.

---

## 1. Resumo dos Problemas Identificados

### 1.1. Falta de Textos Alternativos (`alt text`)
* **Problema:** Não há elementos `<img>` expostos no DOM nos cartões de produto da homepage. Caso as imagens de produtos existam e sejam carregadas dinamicamente via propriedades como CSS `background-image`, elas são completamente invisíveis para leitores de ecrã (screen readers).
* **Impacto:** Utilizadores cegos ou com baixa visão não sabem o que a imagem do produto representa.

### 1.2. Problemas de Contraste de Cores
* **Problema:** O texto descritivo dos produtos (ex: *"Suco natural e gelado"*) utiliza uma cor cinza clara sobre um fundo branco.
* **Impacto:** Viola a diretriz WCAG 2.1 AA (contraste mínimo de 4.5:1 para texto normal), dificultando ou impedindo a leitura por utilizadores com baixa visão ou em ambientes muito iluminados.

### 1.3. Ausência de Elementos Semânticos e Marcos ARIA (Landmarks)
* **Problema:** Tanto a página inicial quanto o painel administrativo (`/admin`) são estruturados utilizando quase que exclusivamente tags genéricas `<div>`. Faltam elementos estruturais semânticos do HTML5 como `<header>`, `<main>`, `<nav>` e `<footer>`.
* **Impacto:** Leitores de ecrã não conseguem fornecer atalhos de navegação estrutural eficientes aos utilizadores para saltarem diretamente para o conteúdo principal.

### 1.4. Rótulos e Botões sem Descrição Apropriada (Aria Labels)
* **Botão do Carrinho (Cabeçalho):** Contém apenas o número de itens (ex: `0` ou `1`) sem descrição textual. Deve possuir um `aria-label="Ver carrinho de compras, X itens"`.
* **Botões "Adicionar":** O texto é genérico. Se houver múltiplos botões "Adicionar" na tela, um utilizador navegando por botões ouvirá apenas "Adicionar", sem saber qual produto será adicionado.
* **Botão de Fechar o Carrinho:** Um botão contendo apenas um ícone ou caractere sem descrição acessível.
* **Ajustes de Quantidade ("-", "+") e Remover:** Botões no carrinho sem rótulos acessíveis.
* **Botões de Exclusão no Admin ("Remover"):** Botões genéricos que não descrevem qual produto está sendo removido.

### 1.5. Navegação por Teclado e Foco (Focus Management)
* **Foco do Carrinho (Modal/Drawer):** O foco de teclado não é retido (trapped) dentro do carrinho quando ele é aberto. Pressionar `Tab` faz o foco sair do carrinho e navegar pelos elementos em background.
* **Fechar com Escape:** O carrinho não responde à tecla `Escape` para fechar.

---

## 2. Plano de Correções Recomendadas

1. **Correção de Semântica e Marcos:**
   Substituir as `<div>` estruturais por elementos semânticos:
   ```html
   <header class="container-header"> ... </header>
   <main class="container-catalog"> ... </main>
   ```

2. **Rótulos ARIA nos Botões:**
   Adicionar atributos descritivos:
   ```html
   <!-- Botão do Carrinho -->
   <button class="cart-toggle" aria-label="Abrir carrinho de compras, 2 itens no carrinho"> ... </button>

   <!-- Botão de Adicionar Produto -->
   <button class="add-button" aria-label="Adicionar Suco de Laranja ao carrinho">Adicionar</button>
   ```

3. **Correção de Contraste:**
   Ajustar a cor do texto de descrição do produto no CSS global (`globals.css` ou CSS correspondente) de cinza claro para um cinza mais escuro ou preto que atenda a taxa de 4.5:1.
