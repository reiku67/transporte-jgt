# Cambios — página Rental (4b: franja + listado)

Reemplaza el `<main>` de `rental/index.html` y agrega un bloque nuevo al final de `css/main.css`.
No se toca el header, la topbar, el footer, ni ninguna otra página. El `<head>` queda igual.

Resumen:

- **Paso 1** — `css/main.css`: agregar el bloque `Rental` al final del archivo.
- **Paso 2** — `rental/index.html`: reemplazar todo el `<main>…</main>` por el markup nuevo.
- **Paso 3** (opcional) — revisar que `.services-page` no le meta fondo gris.

Qué cambia visualmente: desaparecen las cinco bandas alternadas con párrafos largos. Queda la barra navy de siempre, una franja de cinco fotos a lo ancho, y debajo una intro corta a la izquierda con el listado numerado 01–05 a la derecha. Se eliminan los bloques "Características", "Seguridad industrial", "Especificaciones LED" e "Incluye".

---

## Paso 1 — CSS

Pegar al final de `css/main.css`:

```css
/* ── Rental: franja panorámica + listado ─────────────────── */
.rental-page { background: var(--color-surface); }

.rental-strip {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 2px;
    background: var(--color-border);
}

.rental-strip img {
    width: 100%;
    height: 14.375rem;
    object-fit: cover;
    display: block;
}

.rental-body {
    padding: clamp(2.75rem, 5vw, 4rem) 0 clamp(3rem, 6vw, 4.75rem);
}

.rental-body__inner {
    display: grid;
    grid-template-columns: minmax(0, 0.62fr) minmax(0, 1fr);
    gap: clamp(2rem, 4vw, 4rem);
    align-items: start;
}

.rental-lead {
    color: var(--color-heading);
    font-family: var(--font-display);
    font-size: clamp(1.35rem, 2.2vw, 1.65rem);
    font-weight: 700;
    line-height: 1.35;
    letter-spacing: -0.02em;
    margin: 0 0 1.25rem;
}

.rental-intro p { margin-bottom: 1.5rem; }

.rental-item {
    display: grid;
    grid-template-columns: 3.5rem minmax(0, 1fr);
    gap: 1.25rem;
    padding: 1.125rem 0;
    border-top: 1px solid var(--color-border);
}

.rental-item:last-child { border-bottom: 1px solid var(--color-border); }

.rental-item .service-index {
    color: var(--color-muted);
    font-size: 0.85rem;
    padding-top: 0.5rem;
}

.rental-item h2 {
    font-size: clamp(1.4rem, 2.2vw, 1.7rem);
    margin: 0 0 0.3rem;
}

.rental-item p {
    margin: 0;
    font-size: 1rem;
    line-height: 1.55;
}

@media (max-width: 900px) {
    .rental-body__inner { grid-template-columns: 1fr; }
    .rental-strip { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .rental-strip img { height: 10rem; }
    .rental-strip img:last-child { grid-column: span 2; }
}

@media (max-width: 37.5rem) {
    .rental-strip img { height: 8rem; }
    .rental-item {
        grid-template-columns: 2.25rem minmax(0, 1fr);
        gap: 0.75rem;
    }
}
```

`.rental-item .service-index` pisa a propósito el `.service-index` del hero de servicios, que está pensado para fondo oscuro (`rgba(223,230,236,.52)`) y sobre blanco quedaría invisible.

## Paso 2 — HTML

En `rental/index.html`, reemplazar desde `<main class="services-page">` hasta `</main>` por:

```html
    <main id="main-content" role="main" class="services-page rental-page">
        <h1 class="main-title">Equipos para Campamentos</h1>

        <div class="rental-strip">
            <img src="../img/vivienda.jpg" alt="Trailers vivienda preparados para campamentos" width="800" height="600" loading="lazy">
            <img src="../img/vigilancia.jpg" alt="Cabina de vigilancia para seguridad perimetral en locación petrolera" width="800" height="600" loading="lazy">
            <img src="../img/luminarias12.jpeg" alt="Torres de iluminación LED para operaciones petroleras nocturnas" width="800" height="600" loading="lazy">
            <img src="../img/TABLERO ELECTRICO.jpeg" alt="Tableros eléctricos industriales para campamentos e instalaciones petroleras" width="800" height="600" loading="lazy">
            <img src="../img/bc-2.webp" alt="Medición profesional de puesta a tierra en instalaciones petroleras" width="800" height="600" loading="lazy">
        </div>

        <section class="rental-body" aria-labelledby="rental-listado">
            <div class="container rental-body__inner">
                <div class="rental-intro">
                    <p class="rental-lead">Alquiler de equipamiento para operaciones en campo.</p>
                    <p>Coordinamos cada equipo según el requerimiento de la locación: entrega, instalación y retiro.</p>
                    <a href="/contacto/" class="cta-button">Consultar disponibilidad</a>
                </div>

                <div class="rental-list">
                    <h2 id="rental-listado" class="hidden">Equipos disponibles</h2>

                    <article class="rental-item">
                        <span class="service-index">01</span>
                        <div>
                            <h2>Trailers vivienda</h2>
                            <p>Módulos habitacionales completos para locaciones remotas.</p>
                        </div>
                    </article>

                    <article class="rental-item">
                        <span class="service-index">02</span>
                        <div>
                            <h2>Cabinas de vigilancia</h2>
                            <p>Puestos de control para accesos y perímetros.</p>
                        </div>
                    </article>

                    <article class="rental-item">
                        <span class="service-index">03</span>
                        <div>
                            <h2>Luminarias</h2>
                            <p>Iluminación LED y halógena para operación 24/7.</p>
                        </div>
                    </article>

                    <article class="rental-item">
                        <span class="service-index">04</span>
                        <div>
                            <h2>Tableros eléctricos</h2>
                            <p>Distribución desde 100A hasta 2000A, trifásica.</p>
                        </div>
                    </article>

                    <article class="rental-item">
                        <span class="service-index">05</span>
                        <div>
                            <h2>Medición y vinculación de puesta a tierra (PAT)</h2>
                            <p>Medición y certificación con informe técnico.</p>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    </main>
```

Notas:

- El `<main>` de hoy no tiene `id="main-content"`, así que el "Saltar al contenido" del header no llega a ningún lado. Agregarlo lo arregla de paso.
- `<h2 class="hidden">` da un encabezado al listado para lectores de pantalla sin mostrarlo. La clase `hidden` ya existe en el CSS.
- Las rutas de imagen son las mismas que usa hoy la página. Ojo con `TABLERO ELECTRICO.jpeg`: lleva espacio y va en mayúsculas, tal cual está en el repo.

## Paso 3 — fondo (revisar)

`.services-page` tiene `background: var(--band-muted)`. Con `.rental-page` el fondo pasa a blanco. Si preferís mantener el gris del resto de servicios, borrá la primera línea del bloque del paso 1 (`.rental-page { background: … }`) y dejá solo las demás reglas.

## Qué revisar después

1. `/rental/` en escritorio: la franja tiene cinco fotos parejas de 230px y el listado arranca alineado con la intro.
2. Entre 900px y 600px: la franja pasa a dos columnas y la quinta foto ocupa el ancho completo; la intro queda arriba del listado.
3. En teléfono: los números 01–05 no deben empujar los títulos fuera de la pantalla.
4. `/transporte/` y `/mecanica/` tienen que verse exactamente igual que antes. Si cambiaron, algún selector del paso 1 quedó sin el prefijo `.rental-`.
5. El CTA usa `.cta-button`, que en móvil pasa a ancho completo. Es el comportamiento que ya tiene el resto del sitio.

## Volver atrás

Borrar el bloque del paso 1 y restaurar el `<main>` original de `rental/index.html`. No hay cambios en otros archivos.
