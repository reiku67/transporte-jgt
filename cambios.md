# Cambios — páginas de servicios con fondo homogéneo

## Contexto

Las páginas de servicios alternaban bandas claras y navy: `band-muted` → `band-accent` → `band-muted` → footer navy. El objetivo es que los servicios queden sobre un solo fondo continuo. El hero azul no se toca.

Afecta a las tres páginas que usan `class="services-page"` en su `<main>`:

| Página | Bandas que tiene hoy |
|---|---|
| `transporte/index.html` | `band-muted` (+`pt-20 pb-50`), `band-accent`, `band-muted` |
| `rental/index.html` | `band-muted`, `band-accent`, `band-muted`, `band-dark`, … |
| `mecanica/index.html` | solo `band-muted` (no cambia visualmente, pero hereda el espaciado nuevo) |

`empleos/index.html` también usa `band-accent`, pero su `<main>` no es `.services-page`: **queda igual**.

## Resumen

- Obligatorio: **2 ediciones en `css/main.css`** (pasos 1 y 2). Con eso las tres páginas quedan listas.
- Recomendado: **1 edición más en `css/main.css`** (paso 3, la sombra de las imágenes).
- Opcional: **limpieza del HTML** (paso 4). No cambia nada visual, solo evita confusión a futuro.

Lo que **no** se modifica: el hero `.service-hero`, la lista 01–06, el botón `.btn` / `.btn-light`, la barra de acento bajo cada `h2`, el header, la topbar y el footer.

---

## Paso 1 — fondo de la página (obligatorio)

`css/main.css`, línea ~368, sección *Services pages*:

```css
/* ANTES */
.services-page {
    background: #0d1c2d;
}

/* DESPUÉS */
.services-page {
    background: var(--band-muted);
}
```

Esto es lo que se ve entre bandas y detrás del contenido. Si queda navy, se filtra en los bordes.

## Paso 2 — anular la alternancia de bandas (obligatorio)

`css/main.css`, línea ~509. **Hoy es una sola línea:**

```css
/* ANTES */
.services-page .band { padding: 4rem 0; }
```

Reemplazala por este bloque:

```css
/* DESPUÉS */
/* Servicios: un solo fondo continuo, sin alternancia de bandas.
   Anula band-muted / band-accent / band-dark dentro de .services-page. */
.services-page .band,
.services-page .band-muted,
.services-page .band-accent,
.services-page .band-dark {
    background: var(--band-muted);
    color: var(--color-text);
    padding: clamp(2.75rem, 5vw, 4.5rem) 0;
}

.services-page .band h2,
.services-page .band h3,
.services-page .band h4 { color: var(--color-heading); }
.services-page .band p  { color: var(--color-text); }

/* separador fino entre servicios (el hero ya trae su propio borde) */
.services-page .band + .band { border-top: 1px solid var(--color-border); }
```

Por qué hace falta cada parte:

- Las reglas de color van **dentro** del bloque `.services-page` porque las globales de la línea 330–336 (`.band-accent { background: var(--dark); color:#fff }`, `.band-accent h2 { color:#fff }`, `.band-dark p { color: rgba(215,213,213,0.92) }`) siguen existiendo y se aplican a rental. Con dos clases en el selector, el nuevo bloque gana por especificidad. Si solo cambiás el fondo, los títulos y párrafos quedan blancos sobre gris claro.
- `h2/h3/h4` y `p` por separado porque `color` no hereda a los headings: tienen su propio color desde `--color-heading`.
- El `padding` unificado reemplaza al `4rem 0` que borraste y además gana sobre los utilitarios `pt-20` / `pb-50` de la primera banda de `transporte/index.html`, que es lo que hacía que esa banda tuviera un espaciado distinto al resto.
- `.band + .band` es el divisor. Deja sin borde a la primera banda, porque el hero ya aporta su `border-bottom`.

## Paso 3 — la sombra de las imágenes (recomendado)

`css/main.css`, línea ~530. Esa sombra fue calculada para un fondo navy; sobre gris claro se ve como una mancha azul.

```css
/* ANTES */
.services-page .image-content {
    box-shadow: 0 20px 45px -20px rgba(10, 28, 63, 0.5);
}

/* DESPUÉS */
.services-page .image-content {
    box-shadow: 0 18px 40px -22px rgba(26, 36, 49, 0.28);
}
```

## Paso 4 — limpieza del HTML (opcional)

El CSS del paso 2 ya anula `band-accent` y `band-dark`, así que podés dejar el HTML como está y funciona. Si preferís que el marcado diga la verdad, sacá los modificadores y dejá solo `band`:

- `transporte/index.html` línea 111: `class="band band-accent"` → `class="band"`
- `transporte/index.html` línea 87: `class="band band-muted pt-20 pb-50"` → `class="band"`
- `rental/index.html` línea 95: `class="band band-accent"` → `class="band"`
- `rental/index.html` línea 127: `class="band band-dark"` → `class="band"`
- `rental/index.html` y `mecanica/index.html`: los `class="band band-muted"` pueden quedarse; `band-muted` ya pinta el mismo color.

Si hacés el paso 4 en **todas** las páginas de servicios, el bloque del paso 2 se puede simplificar a solo `.services-page .band`. Mientras quede un `band-accent` o `band-dark` suelto, dejá los cuatro selectores.

---

## Qué revisar después

1. `/transporte/` — tres servicios sobre el mismo gris, dos líneas divisorias, sin franja navy en el medio.
2. `/rental/` — es la que más cambia (tenía `band-accent` y `band-dark`). Verificá que ningún título ni párrafo quedó blanco sobre claro, y los `<strong>` de "Características:" / "Seguridad industrial:".
3. `/mecanica/` — debería verse casi igual que antes, solo con el espaciado nuevo.
4. `/empleos/` — su `band-accent` tiene que **seguir** navy. Si se aclaró, el selector quedó sin el `.services-page` adelante.
5. Móvil (menos de 900px): el hero pasa a una columna y las bandas se apilan; el fondo tiene que ser continuo igual.

## Volver atrás

Los tres pasos son reemplazos en un solo archivo. Para revertir, restaurá `css/main.css`: `.services-page { background: #0d1c2d; }` y `.services-page .band { padding: 4rem 0; }`. Si hiciste el paso 4, devolvé las clases `band-accent` / `band-dark` al HTML.

## Archivo ya parcheado

`patch/css/main.css` en este proyecto es tu `main.css` con los pasos 1, 2 y 3 aplicados, por si preferís pisarlo directamente en lugar de editar a mano. El paso 4 no está hecho ahí (no toqué ningún HTML).
