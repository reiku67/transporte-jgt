# Quitar el marco de la sección Guardia y unificar las bandas (home)

Dos archivos: `css/main.css` e `index.html`.
Objetivo: que Guardia y Clientes lean como una banda de borde a borde (igual que el hero,
la franja de Flota gerenciada y el footer), sin líneas ni barra lateral que la encuadren.

---

## 1) css/main.css

### a) Reemplazar la regla `#key-metrics-guard`

ANTES:

    #key-metrics-guard {
        background: transparent;
        color: var(--color-accent);
        margin: 0;
        padding: 3.5rem 0;
        border: none;
        box-shadow: none;
        border-top: 1px solid var(--color-border);
        border-bottom: 1px solid var(--color-border);
    }

DESPUÉS:

    #key-metrics-guard {
        background: transparent;
        color: var(--color-accent);
        margin: 0;
        padding: 4rem 0 3rem;
        border: none;
        box-shadow: none;
    }

### b) Reemplazar la regla `.km-guard-inner` y borrar su `::before`

ANTES:

    .km-guard-inner {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 2.5rem;
        padding-left: 1.25rem;
        text-align: left;
    }
    .km-guard-inner::before {
        content: '';
        position: absolute;
        inset: 0.2rem auto 0.2rem 0;
        width: 0.2rem;
        background: var(--color-primary);
    }

DESPUÉS (la regla `::before` se elimina por completo):

    .km-guard-inner {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 2.5rem;
        text-align: left;
    }

### c) Agregar la banda blanca de ancho completo

Agregar esta regla (por ejemplo junto al bloque `/* ── Bands ── */`):

    .band-surface { background: var(--color-surface); }

### d) Responsive: dentro de `@media (max-width: 37.5rem)`

ANTES:

    #key-metrics-guard { padding: 2rem 0; margin: 0; }

DESPUÉS:

    #key-metrics-guard { padding: 2.5rem 0 1.5rem; margin: 0; }

### e) Responsive: dentro de `@media (min-width: 120rem)`

ANTES:

    #key-metrics-guard { padding: 4rem 0; }

DESPUÉS:

    #key-metrics-guard { padding: 5rem 0 3.5rem; }

---

## 2) index.html

Envolver el último `.container` (el que contiene `#key-metrics-guard` y `#client-logos`)
en un `div` de ancho completo con fondo blanco.

ANTES (estructura):

    <div class="container">
        <section id="key-metrics-guard"> ... </section>
        <section id="client-logos"> ... </section>
    </div>

DESPUÉS (estructura):

    <div class="band-surface">
        <div class="container">
            <section id="key-metrics-guard"> ... </section>
            <section id="client-logos"> ... </section>
        </div>
    </div>

El contenido interno de las secciones no cambia.

---

## Resultado

El home queda como una secuencia de bandas que llegan al borde de la pantalla:

    hero (imagen, full-bleed)
    fondo gris  →  Quiénes somos · Líneas de Servicio · Métricas
    fondo oscuro →  Flota gerenciada
    fondo blanco →  Guardia · Confían en Nosotros
    footer oscuro

Las secciones ya no parecen tarjetas sueltas: cada cambio de sección se lee como un
cambio de color de borde a borde, no como un recuadro.
