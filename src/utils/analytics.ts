import { sendGAEvent } from "@next/third-parties/google";

export const gaEvent = {
  // Navbar: click en "Book" o cualquier item de navegación
  navClick: (label: string, path: string) =>
    sendGAEvent("event", "nav_click", { label, path }),

  // Carousel de habitaciones (Room.tsx): click en tarjeta
  roomCardClick: (roomName: string, price: string) =>
    sendGAEvent("event", "select_content", {
      content_type: "room_card",
      content_id: roomName,
      price,
    }),

  // Booking: habitación seleccionada en el formulario
  roomSelected: (roomId: string, roomName: string, price: number) =>
    sendGAEvent("event", "room_selected", {
      room_id: roomId,
      room_name: roomName,
      price,
    }),

  // Booking: avance de paso
  bookingStepComplete: (step: number, stepName: string) =>
    sendGAEvent("event", "booking_step_complete", {
      step,
      step_name: stepName,
    }),

  // Booking: inicio del checkout (clic en "Confirmar reserva" en paso 3)
  beginCheckout: (roomId: string, total: number, extras: string[]) =>
    sendGAEvent("event", "begin_checkout", {
      room_id: roomId,
      value: total,
      currency: "USD",
      extras: extras.join(","),
    }),

  // Booking: reserva completada con éxito
  bookingCompleted: (
    confirmationNumber: string,
    roomId: string,
    total: number,
    nights: number,
    extras: string[],
  ) =>
    sendGAEvent("event", "purchase", {
      transaction_id: confirmationNumber,
      room_id: roomId,
      value: total,
      currency: "USD",
      nights,
      extras: extras.join(","),
    }),

  // Booking: extra agregado
  extraAdded: (extraId: string, price: number) =>
    sendGAEvent("event", "add_to_cart", {
      item_id: extraId,
      item_category: "extra",
      price,
      currency: "USD",
    }),

  // Booking: extra eliminado
  extraRemoved: (extraId: string, price: number) =>
    sendGAEvent("event", "remove_from_cart", {
      item_id: extraId,
      item_category: "extra",
      price,
      currency: "USD",
    }),

  // Promo code aplicado
  promoApplied: (code: string, discountType: string, discountValue: number) =>
    sendGAEvent("event", "promo_applied", {
      promo_code: code,
      discount_type: discountType,
      discount_value: discountValue,
    }),
};
