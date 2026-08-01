# Auditoría — Millisimo / Nevada

Fecha: 2026-07-31
Repositorio local: `portafolio/Nevada`
Demo en producción: https://nevada.wib.digital (responde, sirve esta misma página)

---

## 1. Inventario de archivos (estado inicial)

### 1.1 HTML

| Archivo | `<title>` | `<h1>` | Propósito real |
|---|---|---|---|
| `index.html` | `Millisimo` | `MILLISIMO` | Página única de presentación de la colección NEVADA de sillas industriales. Cabecera a pantalla completa + una sección de contenido. No vende nada: sin carrito, sin precios, sin fichas de producto. |

No existía ninguna otra página. No existía `404.html`.

### 1.2 CSS

| Archivo | Peso | ¿Se carga? | Observaciones |
|---|---|---|---|
| `CSS/normalize.css` | 2,4 KB | Sí | Normalize minificado en una sola línea, con reglas propias mezcladas al final (`body`, `::-webkit-scrollbar`, `img::selection`). No es normalize puro. |
| `CSS/styles.css` | 11,2 KB | Sí | Salida compilada de `styles.scss`. Con prefijos `-webkit-box` / `-ms-flexbox` para navegadores muertos. |
| `CSS/fonts.css` | 114 B | Sí | **Archivo roto.** Contiene un `@import` de Google Fonts y, fuera de cualquier selector, la línea suelta `font-family: 'Inter', sans-serif;` — declaración inválida que el parser descarta. |
| `CSS/styles.scss` | 6,0 KB | No (fuente) | Fuente Sass real de `styles.css`. |
| `CSS/prepros.config` | 23,9 KB | No | Configuración de la app Prepros. 23,9 KB de JSON de herramienta local versionados en el repo. Sin credenciales dentro (`uploader.history` vacío, `remotePath` vacío). |

### 1.3 JavaScript

| Archivo | ¿Existe? | ¿Se carga? | Observaciones |
|---|---|---|---|
| `JS/script.js` | **No** | Referenciado en `index.html:11` | La carpeta `JS/` no existe. **404 en cada carga**, en local y en producción. |
| jQuery slim 3.0.0-beta1 (cdnjs) | Sí (remoto) | Sí | Versión **beta de 2016**. Cargada de forma bloqueante en `<head>`, sin `defer`. **No se usa en ninguna parte**: no hay una sola línea de JS propio en el proyecto. |

### 1.4 Imágenes

| Archivo | Peso | Dimensiones | Formato | ¿Referenciada? | Contenido real |
|---|---|---|---|---|---|
| `IMG/photo11.jpg` | 163,7 KB | 1024×1024 | JPEG | Sí — `index.html:38` | Composición surrealista: puf dorado y mesa auxiliar de tres bandejas con figuras de gato. Imagen principal (hero). |
| `IMG/photoo.jpg` | 154,6 KB | 1152×864 | JPEG | Sí — `styles.scss:230` (fondo `fixed`) | Composición surrealista: sillas tipo Eames con textura de felino, ventanal con montaña nevada. |
| `IMG/photo.jpg` | 78,3 KB | 920×700 | JPEG | **No — huérfana** | Dos butacas tipo Eames tapizadas en patchwork ante un ventanal con montaña nevada. Foto limpia y perfectamente alineada con la marca. |
| `IMG/photo1.jpg` | 24,1 KB | 375×375 | JPEG | **No — huérfana** | Butaca giratoria mostaza con mesa auxiliar. Foto limpia, alineada con la marca. |
| `IMG/icon.png` | 14,7 KB | 320×320 | PNG RGBA | **No — huérfana** | Logotipo de **WIB** (círculo negro con «W»). Marca del autor, no de Millisimo. |
| `Nevada.png` | 183,7 KB | 1024×1024 | PNG RGBA | Sí — `index.html:9` como favicon | Marca de montaña. **El logo solo ocupa 398×395 px reales**; el resto (el 85 % del lienzo) es transparencia vacía. Se servía un PNG de 183,7 KB para pintar un favicon de 32×32. |

**Peso total de imágenes en la carga inicial: 347,4 KB** (`photo11.jpg` + `photoo.jpg` + `Nevada.png`).

### 1.5 Dependencias externas

| Dependencia | Origen | Cómo se cargaba | Veredicto |
|---|---|---|---|
| jQuery slim 3.0.0-beta1 | `cdnjs.cloudflare.com` | `<script>` bloqueante en `<head>` | Sin usar. Eliminable. |
| Fuente Inter | `fonts.googleapis.com` | `@import` dentro de `fonts.css` | El `@import` dentro de un CSS encadena la petición: el navegador debe descargar y parsear `fonts.css` antes de descubrir la fuente. Sin `preconnect`. |

Sin `package.json`, sin `node_modules`, sin paso de build.

### 1.6 Archivos basura

No se encontraron `.bak`, `copia de`, `_v2`, `.DS_Store`, `Thumbs.db` ni `node_modules`.
Sí se encontró configuración de herramienta local versionada (`CSS/prepros.config`, 23,9 KB).
No existía `.gitignore`.

---

## 2. Problemas detectados

### 2.1 Rutas rotas

| Tipo | Referencia | Ubicación | Estado |
|---|---|---|---|
| Script | `JS/script.js` | `index.html:11` | **Roto.** El archivo y la carpeta no existen. 404 garantizado en cada carga. |
| Imagen | — | — | Sin imágenes rotas. Las dos rutas de imagen apuntaban a archivos reales. |
| CSS | — | — | Las tres hojas referenciadas existían. |

### 2.2 Enlaces sin destino

| Texto del enlace | `href` | Ubicación |
|---|---|---|
| `BRANDING UNIVERSAL` | `#` | `index.html:27` |
| `PRICING DESIGN` | `#` | `index.html:28` |
| `PHOTOGRAPHY ARTIST` | `#` | `index.html:74` |

Tres de los cuatro enlaces de la página no llevaban a ningún sitio. El único funcional era `#page2`.

### 2.3 Contenido de relleno heredado del template

| Contenido | Ubicación | Por qué es relleno |
|---|---|---|
| `DISCOVER THE LATEST PHOTOS FROM PROFESSIONALS AND CREATORS FROM PHOTO COLLECTIONS FROM AROUND THE WORLD. FOLLOW THE TRENDS AND CHECK INSPIRATIONSS FOR DESIGN LOVERS AND ARTISTS.` | `index.html:85` | Texto de banco de imágenes. No habla de muebles ni de sillas: habla de fotos de stock. Incluye la errata `INSPIRATIONSS`. |
| `BRANDING UNIVERSAL` (×2) + `PRICING DESIGN` | `index.html:22,27,28` | Etiquetas de agencia de branding en una web de mobiliario. La misma etiqueta aparecía dos veces seguidas en el mismo `<nav>`. |
| Píldora `BRANDING UNIVERSAL · 3` | `index.html:21-26` | Contador sin nada que contar. |
| `PHOTOGRAPHY ARTIST` | `index.html:74` | Crédito de autoría fotográfica sin fotógrafo detrás. |

Sin `Lorem ipsum` literal, pero sí relleno de plantilla en el 40 % del texto de la página.

### 2.4 HTML

| Problema | Ubicación | Gravedad |
|---|---|---|
| `<main>` anidado **dentro** de `<header>` | `index.html:36-43` | Alta. HTML inválido: `<main>` no puede ser descendiente de `<header>`. Rompe la navegación por landmarks de los lectores de pantalla. |
| Sin `<footer>` | — | Media. El documento no cerraba. |
| Salto de jerarquía de encabezados | `h1` → `h2` → `h3` con `h2` repetidos como etiquetas de sección | Media. |
| Sin `<meta name="description">` | `<head>` | Alta para SEO. |
| Sin Open Graph, sin `canonical` | `<head>` | Alta. La página está en producción con dominio propio y no declaraba ninguno. |
| `<div>` vacíos como ganchos de estilo | `index.html:71,72,78` | Media. `<div></div>` sin contenido usados para pintar la banda de imagen fija y una línea divisoria. |
| `alt="Chairs"` | `index.html:38` | Media. La imagen no muestra sillas: muestra un puf dorado y una mesa auxiliar con figuras de gato. El `alt` describía otra imagen. |
| Sin `width`/`height` en `<img>` | `index.html:38` | Media. Layout shift en la carga. |
| Indentación con tabulador, mezcla de estilos | Todo el archivo | Baja. |

### 2.5 CSS

| Problema | Detalle |
|---|---|
| **Maquetación entera colgando de `nth-child`** | 22 selectores del tipo `section > :nth-child(6) > :nth-child(2) > :nth-child(1)`. Insertar un `<div>` en cualquier punto desplaza y rompe todos los estilos posteriores. Es el problema estructural más grave del CSS. |
| Selectores de más de 3 niveles | 9 reglas, la peor de 5 niveles (`section > :nth-child(6) > :nth-child(2) > :nth-child(2) p`). |
| `margin-left: -435px` | `styles.scss:209`. Margen negativo en píxeles fijos para colocar un `01`. Se descuadra en cualquier ancho no previsto. |
| Propiedad inventada | `aLL: unset` (`styles.scss:277`) — no existe la propiedad `aLL`; el parser la descarta. Era un intento de `all: unset`. |
| Declaración inválida | `text-decoration: .2px solid underline rgba(white,.8)` — sintaxis inválida, el navegador la ignora entera. **El hover de los enlaces no hacía nada.** |
| `a { all: unset }` | Elimina también el `outline` de foco por defecto sin reponer ninguno. **Navegación por teclado invisible.** |
| Media queries `max-width` | Enfoque desktop-first, contrario a mobile-first. |
| Breakpoints arbitrarios | `724px` y `913px`. |
| Espaciados sin escala | `16.5px`, `1.4px`, `1.5px`, `4.5px`, `12.5px`, `-435px`, `75px`, `435px`. |
| Sin variables | Ni una sola custom property. `#A3A3A3`, `#151515`, `#808080`, `white` y `rgba(159,123,91,.7)` repetidos a mano. |
| Prefijos muertos | ~120 líneas de `-webkit-box` / `-ms-flexbox` para IE10 y navegadores de 2013. |
| CSS duplicado | `img::selection { background: none }` declarado en `normalize.css` **y** en `styles.scss`. |
| Regla sin efecto | `@media (max-width: 913px)` redeclara `font-size: 33px` sobre un elemento que ya tenía `font-size: 33px`. |

### 2.6 Responsive

| Problema | Detalle |
|---|---|
| `h2 { font-size: 162px }` | El título `NEVADA` en píxeles fijos. Solo se corregía por debajo de 724px; entre 724px y ~1000px el texto desbordaba el ancho de la ventana. |
| `margin-left: -435px` | Provoca desbordamiento horizontal en anchos intermedios. |
| `flex-flow: row nowrap` | `styles.scss:260`. Fila que no envuelve nunca, con contenido de ancho fijo dentro. |
| Menú móvil inexistente | El icono de hamburguesa (`.lines`) y el punto (`.miniButton`) son puramente decorativos: sin JS, sin estado, sin destino. Por debajo de 724px los enlaces simplemente se ocultaban (`display: none`) y **la navegación desaparecía por completo**. |
| Áreas táctiles | `.miniButton` mide 6×6 px. El icono de hamburguesa, 34×13 px. Muy por debajo del mínimo de 44×44 px. |

### 2.7 Accesibilidad

| Problema | Impacto |
|---|---|
| Sin foco visible en ningún elemento (`a { all: unset }`) | Bloqueante para navegación por teclado. |
| Iconos sin nombre accesible (`.lines`, `.miniButton`) | Elementos con `cursor: pointer` que ningún lector de pantalla anuncia. |
| `alt` incorrecto en la única imagen | El `alt` describe una imagen distinta a la que se muestra. |
| **Contraste: texto blanco sobre el gris `#A3A3A3` de la cabecera → 2,52:1** | **Bloqueante.** Muy por debajo del mínimo AA de 4,5:1. Afecta a *todo* el texto de la cabecera: el `MILLISIMO` del `<nav>`, el `NEVADA` gigante y el párrafo de pie de cabecera. Es el fallo de accesibilidad más extendido de la página. |
| Contraste `#808080` sobre `#151515` → 4,62:1 | Pasa AA, pero por poco. Se sube a `#9A9A9A` (6,49:1) por margen. |
| Imagen de fondo `background: fixed` | Sin equivalente accesible ni respeto por `prefers-reduced-motion`. |
| `<main>` dentro de `<header>` | Rompe el salto directo al contenido principal. |

### 2.8 Rendimiento

| Problema | Coste |
|---|---|
| jQuery bloqueante y sin usar | ~24 KB + una conexión a un tercero, para nada. |
| `@import` de fuente encadenado | La descarga de la fuente no empieza hasta que `fonts.css` está descargado y parseado. |
| 404 de `JS/script.js` | Una petición fallida en cada carga. |
| PNG de 183,7 KB como favicon | Descarga de 183,7 KB para 32×32 px, el 85 % del lienzo transparencia vacía. |
| 3 hojas de estilo separadas | 3 peticiones bloqueantes para 13,7 KB de CSS. |
| Sin `defer` en los scripts | — |

### 2.9 Seguridad

Sin credenciales, tokens ni claves de API en el código. `CSS/prepros.config` incluye una sección `uploader` con conexión FTP, pero `remotePath`, `history` y las credenciales están **vacías**. Nada que rotar.

---

## 3. Resumen en cinco líneas

1. Es una página única de presentación de la colección NEVADA de sillas industriales de la marca ficticia MILLISIMO — una pieza de portafolio de diseño, no una tienda: no hay carrito, ni precios, ni fichas de producto.
2. Visualmente funciona y tiene carácter (tipografía enorme, fondo fijo, paleta grafito y arena), pero por debajo es un template a medio vaciar: el 40 % del texto habla de branding y de fotos de stock, no de muebles.
3. **Lo más grave es estructural: toda la maquetación cuelga de selectores `nth-child` encadenados** (`section > :nth-child(6) > :nth-child(2) > :nth-child(1)`). Añadir un solo `<div>` en cualquier punto rompe en cascada todos los estilos posteriores. La página era, en la práctica, ineditable.
4. Le siguen tres fallos que se veían desde fuera: un `<script src="JS/script.js">` que **404 en cada carga en producción**, jQuery beta de 2016 cargado de forma bloqueante y jamás usado, y un menú móvil que no existe — por debajo de 724px la navegación simplemente se ocultaba.
5. En accesibilidad partía de suspenso: `a { all: unset }` eliminaba el foco visible (navegación por teclado invisible), la única imagen tenía un `alt` que describía otra imagen, y **todo el texto de la cabecera —blanco sobre el gris `#A3A3A3`— daba 2,52:1**, muy por debajo del mínimo AA de 4,5:1.
