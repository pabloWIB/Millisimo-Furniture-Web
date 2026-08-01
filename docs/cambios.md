# Registro de cambios

Reorganización completa del proyecto, 2026-07-31.
Trabajo local, sin ejecutar ningún comando de git.

---

## Fase 1 — Auditoría

- Inventariados los 12 archivos del proyecto. Resultado completo en [`auditoria.md`](auditoria.md).
- Verificadas una a una todas las rutas referenciadas en HTML y CSS.
- Medidos peso y dimensiones reales de las 6 imágenes.
- **Corregido durante la auditoría:** la primera pasada atribuyó el fallo de contraste al gris `#808080` sobre `#151515`. Al calcular los ratios con la fórmula WCAG resultó lo contrario: ese par da 4,62:1 y **pasa**, mientras que el texto blanco sobre el gris `#A3A3A3` de la cabecera daba **2,52:1 y falla**. La tabla de `auditoria.md` refleja la medición, no la impresión inicial.

## Fase 2 — Estructura

Estructura anterior → nueva:

| Antes | Ahora |
|---|---|
| `CSS/normalize.css` | fundido en `assets/css/base.css` |
| `CSS/styles.css` (compilado) | repartido en `base.css` + `layout.css` + `components.css` |
| `CSS/styles.scss` | eliminado (ver fase 3) |
| `CSS/fonts.css` | eliminado; la fuente se carga desde el `<head>` |
| `CSS/prepros.config` | eliminado |
| `IMG/photo11.jpg` | `assets/img/content/hero-gold-lounge-chair.webp` |
| `IMG/photoo.jpg` | `assets/img/content/banner-chairs-mountain-window.webp` |
| `IMG/photo.jpg` | `assets/img/content/patchwork-armchairs-window.webp` |
| `IMG/photo1.jpg` | `assets/img/content/ochre-swivel-armchair.webp` |
| `IMG/icon.png` | eliminado |
| `Nevada.png` | recortado → `assets/img/logo/{nevada-mark,favicon-32,apple-touch-icon}.png` |
| — | `assets/js/main.js` (nuevo) |
| — | `404.html`, `robots.txt`, `sitemap.xml`, `.gitignore` (nuevos) |

Todas las rutas de HTML y CSS actualizadas y verificadas contra el disco.

**Decisión sobre `assets/js/modules/`:** no se crea. El sitio tiene una sola pieza de comportamiento (el menú móvil, ~90 líneas). Un `modules/` con un único archivo obligaría a `type="module"`, que **falla al abrir `index.html` desde el disco** porque `file://` bloquea la importación de módulos — y el punto 13.1 exige que esa apertura funcione. `main.js` es un script clásico con `defer`, envuelto en una IIFE para no dejar nada en el ámbito global.

## Fase 3 — Higiene

**Eliminados:**

| Archivo | Motivo |
|---|---|
| `CSS/prepros.config` | 23,9 KB de configuración de una herramienta local (Prepros) versionados en el repo. Sin credenciales dentro. |
| `CSS/styles.scss` | Al pasar a variables CSS nativas, Sass ya no aportaba nada que el CSS no haga. Elimina el paso de compilación por completo. |
| `CSS/normalize.css` | Normalize minificado en una línea con reglas propias mezcladas. Sustituido por un reset moderno y legible dentro de `base.css`. |
| `CSS/fonts.css` | Archivo roto: contenía la declaración suelta `font-family: 'Inter', sans-serif;` fuera de todo selector, que el parser descartaba. |
| `IMG/icon.png` | Huérfana (confirmado con grep). Es el logotipo de WIB, la marca del autor, no de Millisimo. |
| `Nevada.png` (original) | Sustituido por sus recortes. Servía 183,7 KB para pintar un favicon de 32×32. |
| jQuery slim 3.0.0-beta1 | Cargado de forma bloqueante desde cdnjs y **jamás usado**: no había una sola línea de JS propio. |
| `<script src="JS/script.js">` | Apuntaba a un archivo inexistente. **404 en cada carga, también en producción.** |

**Creado `.gitignore`** con el stack real: sin `package.json` ni build, pero contemplando `node_modules/` (que `npx serve` puede dejar), `.env`, `.vercel/`, temporales de sistema y editor, y la config de Prepros para que no vuelva a colarse.

**Credenciales:** ninguna. `prepros.config` incluía una sección `uploader` con FTP, pero `remotePath`, `history` y credenciales estaban **vacíos**. Nada que rotar.

**Formato:** 2 espacios de indentación en todos los archivos (el original usaba tabuladores), comillas dobles en HTML, punto y coma en JS, salto de línea final. Verificado por script: 0 tabuladores, 0 espacios finales, 0 comillas simples en atributos.

## Fase 4 — Imágenes

Solo con las 6 que ya existían. Ninguna descargada, ninguna inventada.

| Imagen | Antes | Ahora | Ahorro |
|---|---|---|---|
| Hero | 159,9 KB JPEG 1024² | 69,5 KB WebP 1024² | −56 % |
| Banner | 150,9 KB JPEG 1152×864 | 66,2 KB WebP | −56 % |
| Galería 1 | 76,5 KB JPEG 920×700 | 44,4 KB WebP 800×609 | −42 % |
| Galería 2 | 23,6 KB JPEG 375² | 13,7 KB WebP 375² | −42 % |
| **Favicon** | **183,7 KB PNG 1024²** | **0,8 KB PNG 32²** | **−99,6 %** |

- El logotipo ocupaba solo 398×395 px reales dentro de un lienzo de 1024×1024; el 85 % restante era transparencia. Recortado a su caja real, se le añadió un 6 % de aire y se generaron las tres medidas que el sitio usa.
- Redimensionado según contenedor: galería a 800 px máx.
- `width` y `height` en cada `<img>` para eliminar el layout shift.
- `loading="lazy"` en las dos imágenes de galería. **No** en el hero.
- `alt` real y descriptivo en cada una. El original tenía `alt="Chairs"` en una imagen que **no muestra sillas** sino un puf dorado y una mesa con figuras de gato.
- `assets/img/content/og-nevada.jpg` (1200×630) generada recortando el banner existente. Es una derivada de un asset del proyecto, no una imagen nueva.

**Rescatadas dos imágenes huérfanas.** `photo.jpg` y `photo1.jpg` no las cargaba ninguna página, pero son fotografía de silla limpia y perfectamente alineada con la marca. En lugar de borrarlas, sostienen la nueva sección de galería.

## Fase 5 — HTML, SEO y accesibilidad

- **`<main>` estaba anidado dentro de `<header>`** — HTML inválido que rompe la navegación por landmarks. Ahora `header` / `main` / `footer` son hermanos.
- El `<h1>` era `MILLISIMO` en el `<nav>` y `NEVADA` era un `<h2>`. Invertido: la marca es un enlace y **`NEVADA` es el `<h1>`**, que es lo que la página realmente presenta y lo más grande en pantalla. Un solo `h1`, jerarquía sin saltos (verificado).
- `<head>` completo: `title` (51 car.) y `description` (150 car.) únicos por página, canonical a la URL real, Open Graph completo con `og:image` que **sí existe**, `twitter:card`, `theme-color`, favicons.
- Añadido JSON-LD `Person` con `sameAs` hacia wib.digital, Fiverr, GitHub y LinkedIn.
- Añadidos: enlace «Skip to content», `aria-label` en el `<nav>` y en los dos botones de solo icono, `role="img"` + `aria-label` en la banda de imagen de fondo (antes era un `<div>` vacío sin nombre accesible).
- **Foco visible restaurado.** El original tenía `a { all: unset }`, que elimina el contorno de foco sin reponer nada: la navegación por teclado era literalmente invisible.
- `robots.txt` y `sitemap.xml` con la URL real del sitio.
- `404.html` con `noindex`, título y descripción propios y enlace de vuelta.

**Texto de relleno eliminado:**

| Eliminado | Por qué |
|---|---|
| `DISCOVER THE LATEST PHOTOS FROM PROFESSIONALS AND CREATORS…` | Copy de banco de imágenes. Hablaba de fotos de stock, no de muebles. Incluía la errata `INSPIRATIONSS`. |
| Píldora `BRANDING UNIVERSAL · 3` | Contador sin nada que contar. |
| Enlace `BRANDING UNIVERSAL` (`href="#"`) | Duplicaba literalmente el texto de la píldora contigua y no llevaba a ningún sitio. |
| Enlace `PRICING DESIGN` (`href="#"`) | No hay precios en el sitio. Sin destino. |
| Enlace `PHOTOGRAPHY ARTIST` (`href="#"`) | Crédito fotográfico sin fotógrafo. Sin destino. |

Los tres enlaces muertos se sustituyeron por dos anclas reales (`#collection`, `#chairs`) a secciones que existen. **Cero `href="#"` en el proyecto** (verificado).

## Fase 6 — CSS y sistema de diseño

- **Eliminados los 22 selectores `nth-child` encadenados.** Era el problema estructural más grave: `section > :nth-child(6) > :nth-child(2) > :nth-child(1)` significa que insertar un `<div>` en cualquier punto rompe en cascada todo lo posterior. Ahora todo va por clases con nombre.
- Ningún selector pasa de 3 niveles. Cero estilos inline. Cero `!important` salvo el bloque `prefers-reduced-motion`, donde es el idioma estándar y necesario para ganar a cualquier transición declarada.
- Variables en `:root`: color, espaciado, tipografía, radios, transiciones, medida de línea.
- **Paleta derivada de la que ya usaba el sitio, con una corrección de contraste.** El gris de cabecera `#A3A3A3` dejaba el texto blanco en 2,52:1. Pasa a `#726E69` — mismo carácter de piedra, ligeramente más cálido para armonizar con el acento arena que ya existía, y **5,06:1**. El acento `#9F7B5B` estaba ya en el sitio, escondido en la regla `::selection`; ahora es variable y se usa también en `#C9A179` (7,70:1) para el foco y los enlaces sobre negro.
- Escala de espaciado 4/8/16/24/32/48/64/96. Eliminados `16.5px`, `1.4px`, `4.5px`, `75px` y el `margin-left: -435px`.
- Una sola familia tipográfica (Inter).
- Corregidas dos reglas que el navegador descartaba en silencio: `aLL: unset` (propiedad inexistente) y `text-decoration: .2px solid underline rgba(...)` (sintaxis inválida — **el hover de los enlaces no hacía nada**).
- Eliminadas ~120 líneas de prefijos `-webkit-box` / `-ms-flexbox` para navegadores de 2013, y la regla duplicada `img::selection`.
- Orden dentro de cada archivo: variables → reset → base → layout → componentes → utilidades → media queries.

## Fase 7 — Responsive

- Mobile-first real: todas las media queries son `min-width`. El original era `max-width` (desktop-first).
- Breakpoints 480 / 768 / 1024 / 1440, en lugar de los arbitrarios 724 y 913.
- El título pasa de `font-size: 162px` fijo a `clamp(3.25rem, 18vw, 10.125rem)`.
- **Corregido un bug de cascada** que introduje yo: el bloque `@media (min-width: 1024px)` de `.banner` estaba escrito **antes** del de 768px, así que el de 768 lo pisaba por orden de fuente con igual especificidad. La banda medía 340 px en escritorio en lugar de 420. Reordenado.
- `background-attachment: fixed` queda restringido a `(min-width: 1024px) and (hover: hover)`: en táctil da tirones y iOS Safari lo ignora.
- **Menú móvil funcional**, que antes no existía — por debajo de 724px los enlaces simplemente se ocultaban con `display: none` y la navegación desaparecía. Abre, cierra, bloquea el scroll de fondo, se cierra al pulsar un enlace y con Escape, mueve el foco al primer enlace al abrir y lo devuelve al botón al cerrar.
- Sin scroll horizontal en 360, 480, 768, 1024 y 1440 px (verificado con `scrollWidth > innerWidth`).
- Áreas táctiles ≥ 44×44 px (verificado midiendo cada `<a>` y `<button>` renderizado).

## Fase 8 — UX / UI

- Jerarquía clara: marca, después `NEVADA` a tamaño de titular, después el producto.
- **La cabecera superponía el titular sobre la foto.** Medido pixel a pixel contra la imagen real: el **74 %** de la zona de solape quedaba por debajo de 4,5:1, con un mínimo de **1,00:1** (blanco sobre la pared blanca de la foto). El titular y la imagen se apilan; ahora cada letra se lee sobre el fondo sólido a 5,06:1.
- Un CTA por pantalla con destino real: la flecha de la cabecera baja a `#collection`.
- Estados en todo elemento interactivo (default, hover, focus-visible, active), transiciones de 180 ms.
- Ancho de línea limitado a 68 caracteres en el texto corrido.
- **Formularios: no hay.** El proyecto nunca tuvo ninguno y no se ha añadido uno falso.
- Sin gradientes decorativos, sin sombras, sin animaciones gratuitas.

## Fase 9 — JavaScript

Antes: cero líneas propias y jQuery cargado para nada. Ahora `assets/js/main.js`, 90 líneas:

- IIFE con `"use strict"`. Cero variables globales, cero `var` sueltas fuera del ámbito, cero jQuery.
- Toda búsqueda de elemento comprobada antes de operar (`if (!toggle || !menu) return`).
- Delegación: un único listener en el `<ul>` cubre todos los enlaces del panel.
- `IntersectionObserver` marca con `aria-current` el enlace de la sección visible, con guarda de soporte.
- Cero errores y cero warnings en consola (verificado en las dos páginas).

**Bug encontrado y corregido durante la verificación:** al abrir el menú, el foco no entraba en el primer enlace. La causa era `transition: … visibility 180ms`: una `visibility` en transición **computa a `hidden` en el progreso 0**, así que el navegador descartaba el `focus()` por considerar el elemento oculto. Ni forzar reflujo ni `requestAnimationFrame` lo resolvían. La corrección es el patrón canónico: `visibility 0s` al abrir y `visibility 0s linear 180ms` al cerrar, de modo que el panel es enfocable al instante y el fundido de salida sigue viéndose.

## Fase 10 — Rendimiento

| | Antes | Ahora |
|---|---|---|
| Peticiones bloqueantes en `<head>` | 3 CSS + 1 JS + `@import` de fuente encadenado | 3 CSS + fuente con `preconnect` |
| jQuery | 24 KB sin usar | eliminado |
| Peticiones 404 | 1 por carga | 0 |
| Favicon | 183,7 KB | 0,8 KB |
| **Primera carga** | **~560 KB** | **162 KB** |

- Scripts con `defer`.
- Fuente con `preconnect` a los dos orígenes de Google y `display=swap` en la URL, en vez del `@import` encadenado dentro de un CSS.
- Los tres archivos CSS suman 14,4 KB; no se unen porque la separación base/layout/components es la que pide la estructura y el coste de dos peticiones más a ese tamaño es irrelevante.
- Objetivo de < 1 MB cumplido con holgura: 162 KB.

## Fase 11 — QA

Verificado con Chrome sin interfaz sobre el sitio servido. 60 comprobaciones automatizadas, todas en verde:

- Cada `<link>`, `<script>` e `<img>` apunta a un archivo que existe (verificado contra el disco **y** por respuesta HTTP 200 de las 16 rutas).
- Cada imagen decodifica de verdad (`naturalWidth > 0`), no solo devuelve 200.
- Cada ancla interna (`#main`, `#top`, `#collection`, `#chairs`) resuelve a un elemento existente.
- Cero errores y cero warnings de consola en las dos páginas.
- Sin scroll horizontal en 360/480/768/1024/1440.
- Menú móvil en las dos direcciones, con Escape, con clic en enlace, con bloqueo y liberación de scroll, y con foco correcto en ambos sentidos.
- Un solo `h1` por página, jerarquía sin saltos.
- Áreas táctiles ≥ 44 px.
- Foco visible al tabular.
- Cero placeholders y cero `href="#"` (verificado por script sobre todos los archivos).

**Fallos encontrados y corregidos en esta fase:** desbordamiento horizontal de 3 px a 360 px y 1 px a 480 px causado por el margen negativo del botón de menú; cinco elementos por debajo de 44 px; y el bug de foco descrito en la fase 9.

## Fase 13 — Deploy

- Verificado abriendo `index.html` **directamente desde el disco**: las 4 imágenes cargan, el CSS aplica, el JS se ejecuta y no hay ni un error. Es la razón de que `main.js` sea un script clásico y no un módulo ES.
- Verificado también servido por HTTP: las 16 rutas responden 200.
- Sin rutas absolutas de la máquina. Todas las rutas internas relativas y en minúsculas (verificado por script).
- **No se ha creado configuración de hosting** (`vercel.json`, `_redirects`, `.htaccess`): no se indicó destino. Vercel ya sirve `404.html` automáticamente en proyectos estáticos, así que no hace falta nada para que la página de error funcione.

---

## Nota sobre `npx serve`

El `serve` instalado globalmente en esta máquina está roto: apunta a `C:\Users\pablo\AppData\Roaming\npm\node_modules\serve\build\main.js`, que no existe, y `npx serve` lo resuelve antes que la descarga temporal. La verificación se hizo con `python -m http.server`, y el README recomienda `npx http-server`, que sí funciona aquí (v14.1.1). Se arregla con `npm i -g serve` o `npm rm -g serve`.

## Sin git

No se ejecutó ningún comando de git. No se tocó `.git/`. Todos los cambios están en el disco, listos para que los revises y los subas tú.
