# Axioma Web — Portal Web Corporativo (axiomaweb.cl)

Plataforma comercial y portal de autogestión para **Axioma Web**, agencia de desarrollo web corporativo en Chile.

---

## Características

### Landing Page
- **Promoción Top Sticky (10% OFF)**: Cupón `INAUGURACION10` aplicado automáticamente en checkout
- **Modo Claro / Oscuro**: Selector de tema con paleta de 4 colores corporativos
- **Carrusel de Banners**: 5 slides con rotación automática cada 4.5s e indicadores tipo Instagram
- **Cotizador Instantáneo**: Planes desde $149.990 CLP con extras seleccionables (dominio .CL, SEO, mantención)
- **Integración Mercado Pago**: Modal de checkout simulado con validación de cupones y descuento
- **WhatsApp CTA**: Cotización directa con mensaje preformateado
- **Portafolio en Mockup Laptop**: Proyectos reales (CardPoint TCG, Beast Training Gym, Studio Vanessa Aravena)
- **FAQ Corporativo**: Acordeón con preguntas frecuentes

### Portal de Cliente
- Dashboard autoadministrable con carga diferida (React.lazy)
- Gestión de cambios en sitio web
- Mensajería con la agencia
- Agenda de reuniones

### Panel Admin
- Dashboard administrativo con carga diferida
- Visión general de todos los sitios

---

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Core | React 19 + TypeScript |
| Bundler | Vite 8 |
| Testing | Vitest + Testing Library + jsdom |
| Estilos | CSS Variables + diseño responsivo (vanilla) |
| Iconos | Lucide React |
| SEO | Schema.org JSON-LD (Organization, LocalBusiness, Service, BreadcrumbList, SearchAction) |

---

## Mejoras Implementadas

### Seguridad
- Centralización de credenciales en `src/config/credentials.ts` con fallback a `import.meta.env`
- CSP en `<meta http-equiv>` (default-src, script-src, style-src, etc.)
- Headers HTTP: X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy
- Sanitización XSS: `sanitizeHTML()` y `sanitizeEmail()` en `src/utils/sanitize.ts`
- `.env.example` con variables documentadas

### SEO
- Schema.org JSON-LD extendido (Organization + LocalBusiness + BreadcrumbList + SearchAction + Offer)
- Hreflang es-CL / es
- Open Graph avanzado (og:image:secure_url, og:image:alt, og:locale:alternate)
- Twitter Cards completas
- Meta tags: description, keywords, author, robots, theme-color, apple-mobile-web-app
- Sitemap XML + robots.txt en `public/`
- Preload de imágenes críticas con `fetchpriority`

### Performance
- Code splitting con `React.lazy()` para ClientDashboard y AdminDashboard
- `manualChunks` en Vite (vendor, icons)
- CSS muerto eliminado de `src/index.css`
- Preconnect a Google Fonts
- Soporte para `loading="lazy"` en imágenes del Footer

### UI/UX
- Skip-to-content link para accesibilidad
- Spinner animado y transición fadeIn entre vistas
- Hook `useFocusTrap()` con Tab/Shift+Tab/Escape + restauración de foco
- `role="dialog"` + `aria-modal` en modales de login y pago
- `aria-label` en imágenes y botones
- Loading states simulados en login y pago
- Estados `:focus-visible`, `:user-invalid`/`:valid`
- Skeleton shimmer y transiciones hover/active
- Scrollbar personalizado

### Testing (Vitest)
- 10 archivos de test, 62 pruebas unitarias
- Cobertura: componentes (Navbar, Footer, BannerCarousel, LoginModal, MercadoPagoModal), hooks (useDocumentTitle, useFocusTrap), utilidades (sanitize), configuración (credentials), contexto (AppContext)

---

## Instalación y Ejecución

```bash
# 1. Clonar
git clone <repo-url>
cd agencia-web-portal

# 2. Instalar dependencias
npm install

# 3. Servidor de desarrollo
npm run dev

# 4. Compilar para producción
npm run build

# 5. Tests
npm test
```

---

## Variables de Entorno

Ver `.env.example` para las variables disponibles. Opcional — el sistema funciona con defaults.

---

## Contacto

- Web: https://axiomaweb.cl
- Email: contacto@axiomaweb.cl
- Instagram: @axiomaweb.cl
- WhatsApp: +569 5662 8609
- Ubicación: Concepción, Chile
