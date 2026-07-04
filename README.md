# Wobotec · Caracol — Landing Page

Landing page institucional da Wobotec e do seu produto principal, o Caracol.

## Estrutura do projeto

```
wobotec-caracol/
├── index.html          # Marcação de todas as seções da página
├── css/
│   └── style.css        # Tokens de design, layout e responsividade
├── js/
│   └── main.js          # Menu mobile e feedback do formulário de contacto
├── assets/
│   └── img/
│       └── hero-bg1.jpg # Imagem de fundo do hero
└── README.md
```

## Seções da página

1. **Hero** — imagem de fundo de marca + chamada principal
2. **Sobre a Wobotec** — diferenciais institucionais e números
3. **Conheça o Caracol** — recursos do produto principal
4. **Nossos Produtos** — Caracol Escolar, Venda e Hospitalar
5. **Nossos Serviços** — portfólio completo de serviços (grelha de 20 itens)
6. **Nossos Diferenciais** — vantagens competitivas + garantia
7. **Como Funciona** — processo em 4 passos
8. **O Que Nossos Clientes Dizem** — depoimentos
9. **Clientes e Parceiros** — carrossel infinito de logótipos
10. **Contato** — informações + formulário de demonstração
11. **Footer** — links, redes sociais e dados legais

## Personalização

- Cores, tipografia, espaçamentos e sombras estão centralizados em variáveis
  CSS no topo de `css/style.css` (`:root { ... }`).
- Os ícones são um sprite SVG único no início do `index.html`
  (`<symbol id="i-...">`), reutilizado com `<use href="#i-...">`.
- Os logótipos de clientes/parceiros em `#logosTrack` são placeholders —
  substitua pelos logótipos reais dos seus clientes quando disponíveis.
