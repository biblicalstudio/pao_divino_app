# 🍞 Pão Divino - App PWA de Receitas Bíblicas & Artesanais Saudáveis

Aplicativo Web Progressivo (PWA) de receitas sagradas e saudáveis, inspirado e baseado nos e-books oficiais:
- **Pães Sagrados - 12 Receitas Bíblicas dos Profetas**
- **45 Receitas de Pão Sem Glúten**
- **75 Receitas Bíblicas & Sucos Detox**
- **Planner Devocional do Pão Diário**

---

## ✨ Recursos & Funcionalidades Principais

### 1. 📱 PWA 100% Instalável & Offline-First
- Funciona como aplicativo nativo no celular (Android, iOS) e Desktop (Chrome, Edge, Safari).
- Cache automático via **Service Worker (`sw.js`)**: navegue pelas receitas e use o timer mesmo sem internet na cozinha.
- Suporte a instalação via banner customizado e atalhos rápidos.

### 2. 📜 Catálogo Sagrado de Receitas
- **Pães Bíblicos dos Profetas**:
  - *Pão de Ezequiel Clássico (Ezequiel 4:9)* - Com a proporção ancestral dos 6 grãos e leguminosas.
  - *Pão de Cevada do Milagre (João 6:11)* - O pão multiplicado por Jesus.
  - *Pão Profético de Lentilha (João 6:35)* - Pão da Vida de alto teor proteico sem glúten.
  - *Pão Ázimo da Última Ceia (Marcos 14:22)* - Rápido na chapa, sem fermento.
  - *Pão de Aveia com Mel e Azeite (1 Samuel 14:29)*.
  - *Pão de Grão-de-Bico com Ervas do Deserto (1 Reis 19:6)* - O pão que restaurou Elias.
  - *Pão do Maná - O Pão do Céu (Êxodo 16:15)* - Levíssimo e aerado.
  - *Pão Multi-Grãos Abençoado de Fermentação Natural (Levain)*.
- **Pães Sem Glúten & Saudáveis**:
  - Pão Branco de Todo Dia (sem sovar, liquidificador).
  - Pão Rápido de Frigideira de 5 Minutos.
  - Pão de Abóbora Dourada com Sementes.
  - Focaccia Artesanal com Alecrim e Tomate Confit.
  - Pão com Psyllium Husk Elástico e Fatiável.
  - Pão Rústico de Cacau Nobre com Chocolate 70%.
- **Bebidas & Acompanhamentos Detox**:
  - Suco Verde Revitalizante dos Salmos (Salmo 104:14).
  - Shot de Imunidade do Bom Samaritano.

### 3. 🥣 Modo Cozinha Inteligente (Kitchen Experience)
- **Calculadora Dinâmica de Porções**: ajuste com um toque (`+` e `-`) e as quantidades de farinha, azeite e grãos são recalculadas automaticamente!
- **Checklist Interativo de Ingredientes**: marque o que já separou na bancada (mise-en-place) com feedback sonoro suave.
- **Passo a Passo com Timers Embutidos**: cada etapa da receita possui um botão direto para acionar o cronômetro correspondente (ex: 10 min de sova, 35 min de forno).
- **Wake Lock API**: mantém a tela do celular sempre acesa enquanto você estiver sovando com as mãos na massa, sem a tela bloquear.
- **📲 Compartilhar no WhatsApp**: envia a receita e a lista de compras formatadas com versículo com apenas 1 clique.

### 4. ⏱️ Timer de Forno & Fermentação com Som e Vibração
- Relógio circular animado com contagem regressiva precisa.
- Presets rápidos (5m frigideira, 10m sova, 20m descanso, 35m forno, 60m fermentação).
- Widget flutuante que continua visível em segundo plano em qualquer tela.
- Aviso sonoro de **Sino Sagrado sintetizado via Web Audio API** (sem depender de arquivos externos) e vibração háptica nos celulares.

### 5. 🕊️ Espaço Devocional & Significado dos Grãos
- Orações para antes de sovar a massa, enquanto o pão está no forno e bênção da mesa ao partir o pão com a família.
- Guia bíblico e nutricional dos ingredientes (Cevada, Lentilhas, Azeite, Mel, Trigo Puro e Sal).

---

## 🚀 Como Executar Localmente

### Opção 1: Com Python
```bash
python3 -m http.server 3000
```
Acesse no navegador: `http://localhost:3000`

### Opção 2: Com Node.js / NPX
```bash
npx serve .
```

---

## 🌐 Deploy no Netlify

O projeto já possui os arquivos [`netlify.toml`](file:///Users/thyagosouza/Documents/AUTOMAÇÕES%20WHATSAPP/PÃES%20DIVINOS/app_pao_divino/netlify.toml) e [`_redirects`](file:///Users/thyagosouza/Documents/AUTOMAÇÕES%20WHATSAPP/PÃES%20DIVINOS/app_pao_divino/_redirects) configurados especificamente com:
- **Cache-Control adequado para o `sw.js`** (sempre atualizado no navegador dos usuários).
- **MIME Type correto para o `manifest.json`**.
- **Redirecionamento SPA (200)**.
- **Cabeçalhos de segurança (X-Frame-Options, CSP, WakeLock)**.

### Passo a passo para subir no Netlify:
1. Conecte seu repositório GitHub `biblicalstudio/pao_divino_app` no [Netlify](https://app.netlify.com/).
2. Nas configurações de build:
   - **Build command:** *(deixe em branco)*
   - **Publish directory:** `.` (ou deixe em branco, pois o `netlify.toml` já define automaticamente)
3. Clique em **Deploy site**.
4. Pronto! O app receberá SSL grátis (HTTPS) e estará disponível para instalação imediata no Android e iOS.


---

## 📲 Como Instalar no Celular

### No Android / Chrome
1. Abra o link do app no Google Chrome.
2. Toque no botão **"Instalar App"** no topo da página ou no menu do navegador (⋮) > **"Instalar aplicativo"**.

### No iPhone / iPad (Safari)
1. Abra o link no Safari.
2. Toque no botão de **Compartilhar** (ícone de quadrado com seta para cima).
3. Role para baixo e selecione **"Adicionar à Tela de Início"**.
4. O ícone sagrado do Pão Divino aparecerá na tela do seu iPhone funcionando como app nativo!

---

## 🛠️ Tecnologias Utilizadas
- **HTML5 Semântico & Modern Web APIs** (Service Worker, Web App Manifest, Wake Lock API, Web Audio API, Vibration API).
- **Vanilla CSS3** com Design System sagrado, Glassmorphism e Dark Mode acolhedor.
- **JavaScript Vanilla Moderno (ES6+)** sem dependências externas pesadas, garantindo inicialização instantânea e máxima performance.
