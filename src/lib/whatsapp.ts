import type { Order } from "@/types";
import { formatCurrency } from "./currency";

const WHATSAPP_NUMBER = "2250797878868";

export function buildWhatsAppMessage(order: Order, locale: string): string {
  const isEn = locale === "en";
  const currency = order.currency;

  const header = isEn
    ? `🛍️ *NEW ORDER* - ${order.id}`
    : `🛍️ *NOUVELLE COMMANDE* - ${order.id}`;

  const date = new Date(order.createdAt).toLocaleString(
    locale === "fr" ? "fr-FR" : "en-US"
  );

  const addressLine = order.customer.address ? `\n📍 ${order.customer.address}` : "";
  const customerSection = isEn
    ? `\n*Customer Information:*\n👤 ${order.customer.firstName}\n📞 ${order.customer.phone}${addressLine}`
    : `\n*Informations client :*\n👤 ${order.customer.firstName}\n📞 ${order.customer.phone}${addressLine}`;

  const itemsHeader = isEn ? `\n*Items Ordered:*` : `\n*Articles commandés :*`;

  const itemsList = order.items
    .map((item) => {
      const price = formatCurrency(
        item.product.price * item.quantity,
        currency
      );
      return `• ${item.product.title} (x${item.quantity}) - ${price}`;
    })
    .join("\n");

  const totalLabel = isEn ? "Total" : "Total";
  const totalValue = formatCurrency(order.total, currency);

  const notesSection = order.customer.notes
    ? isEn
      ? `\n*Notes:* ${order.customer.notes}`
      : `\n*Notes :* ${order.customer.notes}`
    : "";

  const dateLabel = isEn ? "Date" : "Date";

  return [
    header,
    `📅 ${dateLabel}: ${date}`,
    customerSection,
    itemsHeader,
    itemsList,
    `\n💰 *${totalLabel}: ${totalValue}*`,
    notesSection,
    `\n---\n_Aurore Beauty_`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function openWhatsApp(order: Order, locale: string): void {
  const message = buildWhatsAppMessage(order, locale);
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
