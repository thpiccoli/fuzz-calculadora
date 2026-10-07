# Guia de Integração: Calculadora no Menu da Fuzz Cafés

Este guia orienta passo a passo como testar localmente, publicar a Calculadora de Café e vinculá-la ao menu principal da loja virtual **Fuzz Cafés** (que utiliza a plataforma **Tray Commerce**).

---

## 1. Como Rodar e Testar Localmente

A página foi construída com tecnologias web puras e leves (HTML5, CSS3 e JavaScript Vanilla sem dependências externas complexas).

### Opção A: Direto pelo navegador
Basta dar **duplo clique** no arquivo `index.html` para abrir diretamente no seu Google Chrome, Edge ou Safari.

### Opção B: Servidor Local (Recomendado)
Se preferir rodar como servidor local:
```bash
# Com Python (já disponível na sua máquina):
python -m http.server 3000

# Ou com Node.js:
npx serve
```
Acesse em: `http://localhost:3000`

---

## 2. Opções de Publicação da Landing Page

### Opção 1: Subdomínio Próprio (Ex: `calculadora.fuzzcafes.com.br`) — *Mais Recomendada*
Esta opção garante alta performance e independência técnica total:
1. Faça o deploy gratuito dos arquivos no **Vercel**, **Netlify** ou **Cloudflare Pages** (basta arrastar a pasta do projeto).
2. No painel do seu domínio (Registro.br ou Cloudflare onde está o `fuzzcafes.com.br`), crie um apontamento CNAME:
   - **Nome:** `calculadora`
   - **Destino:** o endereço fornecido pela Vercel / Netlify (ex: `cname.vercel-dns.com`).
3. O link final ficará lindo: `https://calculadora.fuzzcafes.com.br`.

### Opção 2: Página Institucional Customizada dentro da Tray
Se quiser que rode diretamente sob o domínio principal:
1. Acesse o painel da **Tray Commerce**: `Minha Loja` > `Páginas da Loja` (ou `Conteúdo da Loja`).
2. Clique em **Criar Nova Página**.
3. Defina o título como: `Calculadora de Preparo`.
4. Defina a URL amigável como: `calculadora` (gerando `https://www.fuzzcafes.com.br/calculadora`).
5. No editor da página, alterne para o modo **Código Fonte (HTML)** e cole o conteúdo ou utilize um iframe apontando para a sua hospedagem:
   ```html
   <iframe src="https://calculadora.fuzzcafes.com.br" width="100%" height="1600px" frameborder="0" style="border:none;"></iframe>
   ```

---

## 3. Como Adicionar a Opção no Menu da Loja Tray

Para fazer o link aparecer no menu superior junto com *Cafés Especiais*, *Edições Limitadas*, *Kits* e *Métodos*:

1. Acesse o Painel da Tray (`https://www.fuzzcafes.com.br/loja/adm/`).
2. Vá em **Minha Loja** > **Menus** (ou em **Design da Loja** > **Menus da Loja**).
3. Selecione o **Menu Superior** (Menu Principal / Topo).
4. Clique em **+ Adicionar Item ao Menu**:
   - **Nome de Exibição:** `Calculadora de Preparo` (ou `Calculadora de Café`).
   - **Tipo de Link:** `Link Externo` ou `Página da Loja`.
   - **URL de Destino:** `https://calculadora.fuzzcafes.com.br` (ou `/calculadora`).
   - **Ordem de exibição:** coloque após *Métodos e Acessórios* ou onde preferir.
5. Clique em **Salvar Alterações**.
6. Pronto! O menu superior da loja passará a exibir o atalho diretamente para os clientes.

---

## 4. Personalizações Futuras de Grãos e Métodos

Para adicionar novos cafés ou alterar preços e microlotes:
- Abra o arquivo `js/data.js`.
- O catálogo de cafés da Fuzz está organizado no array `FUZZ_DATA.coffees`.
- Basta adicionar um novo objeto com `id`, `name`, `notes`, `sensory` e `recommendedRatio`. O card e o cálculo são atualizados automaticamente!
