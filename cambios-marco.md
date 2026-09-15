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
        padding: 7.5rem 0 5.5rem;
        border: none;
        box-shadow: none;
    }

### b) Centrar Guardia y agrandar su título (para que combine con Clientes)

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
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

Y además:

    .km-guard-left  { flex: none; }
    .km-guard-text  { max-width: 60ch; font-size: 1.15rem; line-height: 1.65; margin: 0; }

    .km-guard-title {
        font-size: clamp(1.9rem, 3.8vw, 3rem);
        margin: 0 0 0.8rem;
    }

    /* mismo tamaño de título que Guardia, están en la misma banda */
    #client-logos h2 {
        font-size: clamp(1.9rem, 3.8vw, 3rem);
        margin: 0 0 2.5rem;
    }

### c) Más aire vertical en Métricas y Clientes

Las secciones quedaban achatadas. Reemplazar el `padding` de estas dos reglas:

ANTES:

    #key-metrics { padding: 3rem 0 0; }
    #client-logos { padding: 3.5rem 0 4rem; }

DESPUÉS:

    #key-metrics { padding: 5rem 0 4rem; }
    #client-logos { padding: 1.5rem 0 6.5rem; }

(`#client-logos` arranca con poco padding arriba porque Guardia, que está justo encima
en la misma banda blanca, ya aporta 4.5rem de separación.)

### d) Que los logos de clientes ocupen todo el ancho

Hoy el track es un flex centrado, así que los logos quedan apretados en el medio.
Pasarlo a grid para que se repartan de lado a lado.

ANTES:

    .client-logo-track {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 2rem 4rem;
    }
    .client-logo-track img {
        max-width: 130px;
        height: 80px;
        width: auto;
        object-fit: contain;
    }

DESPUÉS:

    .client-logo-track {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
        align-items: center;
        justify-items: center;
        gap: 2.5rem 3rem;
        width: 100%;
    }
    .client-logo-track img {
        max-width: 100%;
        width: auto;
        height: 80px;
        object-fit: contain;
    }

### e) Agregar la banda blanca de ancho completo

Agregar esta regla (por ejemplo junto al bloque `/* ── Bands ── */`):

    .band-surface { background: var(--color-surface); }

### f) Responsive: dentro de `@media (max-width: 37.5rem)`

ANTES:

    #key-metrics { padding: 2rem 0 0; margin: 0; }
    #key-metrics-guard { padding: 2rem 0; margin: 0; }
    #client-logos { padding: 2rem 0; margin: 0; }

DESPUÉS:

    #key-metrics { padding: 3rem 0 2.5rem; margin: 0; }
    #key-metrics-guard { padding: 3.5rem 0 2.5rem; margin: 0; }
    #client-logos { padding: 1rem 0 4rem; margin: 0; }

### g) Responsive: dentro de `@media (min-width: 120rem)`

ANTES:

    #key-metrics { padding: 8rem 0 0; }
    #key-metrics-guard { padding: 4rem 0; }
    #client-logos { padding: 6rem 0; }

DESPUÉS:

    #key-metrics { padding: 8rem 0 5rem; }
    #key-metrics-guard { padding: 7rem 0 5rem; }
    #client-logos { padding: 2rem 0 8rem; }

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


---

## 3) Logos de clientes — exactamente como se ven en la preview

En la preview se usan los mismos archivos que ya están en `logos/` del repo, sin ningún
filtro de color, en este orden y con este markup:

    <div class="client-logo-track">
        <img src="logos/flowback.webp" alt="Logo Flowback Consulting Services" width="200" height="99" loading="lazy">
        <img src="logos/slb.svg"       alt="Logo SLB">
        <img src="logos/naborss.png"   alt="Logo Nabors">
        <img src="logos/phoenix.webp"  alt="Logo Phoenix Global Resources" width="220" height="38" loading="lazy">
        <img src="logos/cws.svg"       alt="Logo CWS CalFrac" width="90" height="108" loading="lazy">
        <img src="logos/tacker.webp"   alt="Logo Tacker" width="180" height="73" loading="lazy">
    </div>

Es el mismo markup que ya tiene `index.html` (no hay que cambiarlo).
Los estilos son los del punto 1.d (grid `auto-fit`).

Si en el sitio publicado los logos se ven de otro color, NO viene de estas reglas:
no hay ningún `filter`, `grayscale` ni `opacity` aplicado a `.client-logo-track img`
en `css/main.css`. Revisar en ese caso que los archivos servidos en producción sean
los mismos que están hoy en la carpeta `logos/` (puede haber una versión vieja cacheada).
