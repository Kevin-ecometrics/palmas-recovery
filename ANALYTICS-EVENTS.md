# Analytics Events — Palmas Recovery
GA4 + Meta Pixel

---

## GA4

### Eventos a marcar como Key Event

Ve a **GA4 → Configure → Events** y activa el toggle en estos dos:

| Evento | Cuándo se dispara |
|---|---|
| `purchase` | Usuario completa una reserva exitosamente |
| `begin_checkout` | Usuario hace click en "Confirmar reserva" (paso 3) |

### Todos los eventos registrados

| Evento | Cuándo se dispara |
|---|---|
| `purchase` | Reserva confirmada con éxito |
| `begin_checkout` | Click en "Confirmar reserva" en el paso 3 |
| `booking_step_complete` | Al avanzar del paso 1 al 2 y del 2 al 3 |
| `room_selected` | Usuario selecciona una habitación en el formulario de reserva |
| `select_content` | Click en una tarjeta de habitación en el carousel del home |
| `nav_click` | Click en cualquier item del menú de navegación |
| `add_to_cart` | Usuario agrega un extra (masaje, faja, etc.) |
| `remove_from_cart` | Usuario quita un extra |
| `promo_applied` | Usuario aplica un código de descuento válido |

### Cómo marcarlos en GA4

1. Entra a [analytics.google.com](https://analytics.google.com)
2. Selecciona la propiedad de Palmas Recovery
3. Ve a **Configure → Events**
4. Espera 24-48 hrs a que los eventos aparezcan (deben dispararse en producción primero)
5. Activa el toggle **"Mark as key event"** en `purchase` y `begin_checkout`

---

## Meta Pixel

### Eventos estándar registrados

Los eventos del Pixel usan nombres estándar de Meta — no requieren configuración extra en el Pixel Manager.

| Evento | Cuándo se dispara |
|---|---|
| `Purchase` | Reserva confirmada con éxito |
| `InitiateCheckout` | Click en "Confirmar reserva" en el paso 3 |
| `Lead` | Al avanzar del paso 1 al 2 y del 2 al 3 |
| `ViewContent` | Click en tarjeta de habitación en el carousel o al seleccionarla en el formulario |
| `AddToCart` | Usuario agrega un extra (masaje, faja, etc.) |

### Cómo usarlos en Meta

1. Entra a [Meta Events Manager](https://business.facebook.com/events_manager)
2. Selecciona el Pixel de Palmas Recovery (ID: 743057892204187)
3. Los eventos aparecen automáticamente en **Test Events** al dispararse en producción
4. Para optimizar anuncios ve a tu campaña en Ads Manager → Optimization → selecciona `Purchase` o `InitiateCheckout`
