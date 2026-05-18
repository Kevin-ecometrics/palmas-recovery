import { sendGAEvent } from "@next/third-parties/google";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const fbq = (...args: unknown[]) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq(...args);
  }
};

// ==================== GA4 ====================

export const gaEvent = {
  navClick: (label: string, path: string) =>
    sendGAEvent("event", "nav_click", { label, path }),

  roomCardClick: (roomName: string, price: string) =>
    sendGAEvent("event", "select_content", {
      content_type: "room_card",
      content_id: roomName,
      price,
    }),

  roomSelected: (roomId: string, roomName: string, price: number) =>
    sendGAEvent("event", "room_selected", {
      room_id: roomId,
      room_name: roomName,
      price,
    }),

  bookingStepComplete: (step: number, stepName: string) =>
    sendGAEvent("event", "booking_step_complete", {
      step,
      step_name: stepName,
    }),

  beginCheckout: (roomId: string, total: number, extras: string[]) =>
    sendGAEvent("event", "begin_checkout", {
      room_id: roomId,
      value: total,
      currency: "USD",
      extras: extras.join(","),
    }),

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

  extraAdded: (extraId: string, price: number) =>
    sendGAEvent("event", "add_to_cart", {
      item_id: extraId,
      item_category: "extra",
      price,
      currency: "USD",
    }),

  extraRemoved: (extraId: string, price: number) =>
    sendGAEvent("event", "remove_from_cart", {
      item_id: extraId,
      item_category: "extra",
      price,
      currency: "USD",
    }),

  promoApplied: (code: string, discountType: string, discountValue: number) =>
    sendGAEvent("event", "promo_applied", {
      promo_code: code,
      discount_type: discountType,
      discount_value: discountValue,
    }),
};

// ==================== META PIXEL ====================

export const pixelEvent = {
  roomCardClick: (roomName: string, price: string) =>
    fbq("track", "ViewContent", {
      content_name: roomName,
      content_category: "room",
      value: parseFloat(price) || 0,
      currency: "USD",
    }),

  roomSelected: (roomId: string, roomName: string, price: number) =>
    fbq("track", "ViewContent", {
      content_ids: [roomId],
      content_name: roomName,
      content_category: "room",
      value: price,
      currency: "USD",
    }),

  bookingStepComplete: (step: number, stepName: string) =>
    fbq("track", "Lead", {
      content_name: stepName,
      content_category: `booking_step_${step}`,
    }),

  beginCheckout: (roomId: string, total: number, extras: string[]) =>
    fbq("track", "InitiateCheckout", {
      content_ids: [roomId],
      num_items: 1 + extras.length,
      value: total,
      currency: "USD",
    }),

  bookingCompleted: (
    roomId: string,
    total: number,
    nights: number,
    extras: string[],
  ) =>
    fbq("track", "Purchase", {
      content_ids: [roomId],
      content_type: "product",
      num_items: 1 + extras.length,
      value: total,
      currency: "USD",
      nights,
    }),

  extraAdded: (extraId: string, price: number) =>
    fbq("track", "AddToCart", {
      content_ids: [extraId],
      content_category: "extra",
      value: price,
      currency: "USD",
    }),
};
