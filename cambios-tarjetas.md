# Quitar el efecto tarjeta de las secciones (home)

Dos archivos: `css/main.css` (reemplazar 4 reglas + 3 líneas de responsive) e `index.html` (mover una sección fuera del `.container`).

---

## 1) css/main.css

### a) Reemplazar la regla `#key-metrics`

ANTES:

    #key-metrics {
        background: #ffffff;
        border: 1px solid rgba(17, 45, 100, 0.08);
        box-shadow: none;
        color: var(--color-accent);
        margin: 3rem 0 0;
        padding: 3rem 2.5rem;
        position: relative;
    }

DESPUÉS:

    #key-metrics {
        background: transparent;
        border: none;
        box-shadow: none;
        color: var(--color-accent);
        margin: 0;
        padding: 3rem 0 0;
        position: relative;
    }

### b) Reemplazar la regla `#key-metrics-guard`

ANTES:

    #key-metrics-guard {
        background: #ffffff;
        color: var(--color-accent);
        margin: 1.5rem 0;
        padding: 3rem 2.5rem;
        border: 1px solid rgba(17, 45, 100, 0.08);
        box-shadow: none;
    }

DESPUÉS:

    #key-metrics-guard {
        background: transparent;
        color: var(--color-accent);
        margin: 0;
        padding: 3.5rem 0;
        border: none;
        box-shadow: none;
        border-bottom: 1px solid var(--color-border);
    }

### c) Reemplazar la regla `#fleet-tracking` (pasa a banda de ancho completo)

ANTES:

    #fleet-tracking {
        position: relative;
        overflow: hidden;
        margin: 1.5rem 0;
        padding: 3rem 2.5rem;

        background: var(--dark);
        color: #fff;
        box-shadow: 0 4px 12px rgba(6, 21, 40, 0.3);
    }

DESPUÉS:

    #fleet-tracking {
        position: relative;
        overflow: hidden;
        margin: 3rem 0 0;
        padding: 4rem 0;

        background: var(--dark);
        color: #fff;
        box-shadow: none;
    }

    /* contenedor interno de la banda */
    #fleet-tracking .fleet-inner {
        width: 100%;
        max-width: 130rem;
        margin-inline: auto;
        padding-inline: clamp(1rem, 3vw, 3.5rem);
    }

### d) Reemplazar la regla `#client-logos`

ANTES:

    #client-logos {
        background: #ffffff;
        border: 1px solid rgba(17, 45, 100, 0.08);
        box-shadow: none;
        text-align: center;
        margin: 1.5rem 0;
        padding: 3rem 2.5rem;
    }

DESPUÉS:

    #client-logos {
        background: transparent;
        border: none;
        box-shadow: none;
        text-align: center;
        margin: 0;
        padding: 3.5rem 0 4rem;
    }

### e) Responsive: dentro de `@media (max-width: 37.5rem)`

ANTES:

    #key-metrics { padding: 2rem 1.5rem; margin: 1.5rem 0 0; }
    #key-metrics-guard { padding: 2rem 1.5rem; margin: 1.25rem 0; }

    #fleet-tracking { padding: 2.5rem 1.5rem; margin: 1.25rem 0; }

DESPUÉS:

    #key-metrics { padding: 2rem 0 0; margin: 0; }
    #key-metrics-guard { padding: 2rem 0; margin: 0; }

    #fleet-tracking { padding: 2.5rem 0; margin: 2rem 0 0; }

Y más abajo, en el mismo bloque:

ANTES:

    #client-logos { padding: 2rem 1.5rem; margin: 1.25rem 0; }

DESPUÉS:

    #client-logos { padding: 2rem 0; margin: 0; }

### f) Responsive: dentro de `@media (min-width: 120rem)`

ANTES:

    #key-metrics { padding: 8rem 5rem; }
    #key-metrics-guard { padding: 4rem 5rem; }
    #client-logos { padding: 6rem 5rem; }

DESPUÉS:

    #key-metrics { padding: 8rem 0 0; }
    #key-metrics-guard { padding: 4rem 0; }
    #client-logos { padding: 6rem 0; }

---

## 2) index.html

`#fleet-tracking` tiene que salir del `.container` para poder ir de borde a borde.
Hoy las cuatro secciones están dentro de un solo `<div class="container">`. Se corta en tres.

ANTES (estructura):

    <div class="container">
        <section id="key-metrics"> ... </section>
        <section id="fleet-tracking"> ... </section>
        <section id="key-metrics-guard"> ... </section>
        <section id="client-logos"> ... </section>
    </div>

DESPUÉS (estructura):

    <div class="container">
        <section id="key-metrics"> ... </section>
    </div>

    <section id="fleet-tracking"> ... </section>

    <div class="container">
        <section id="key-metrics-guard"> ... </section>
        <section id="client-logos"> ... </section>
    </div>

Es decir: cerrar el `</div>` del container justo después de `</section>` de `#key-metrics`,
dejar `#fleet-tracking` suelto, y abrir un `<div class="container">` nuevo antes de
`#key-metrics-guard`. El contenido interno de las secciones no cambia.
