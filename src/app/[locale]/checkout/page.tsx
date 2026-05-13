"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { QRCodeSVG } from "qrcode.react";
import { useCartStore } from "@/stores/cartStore";
import { useCurrencyStore } from "@/stores/currencyStore";
import { formatCurrency } from "@/lib/currency";
import { generateOrderId } from "@/lib/utils";
import { openWhatsApp } from "@/lib/whatsapp";
import type { CustomerInfo, Order } from "@/types";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { MessageCircle, CheckCircle, ArrowLeft, Download } from "lucide-react";
import Link from "next/link";
import Select, { CSSObjectWithLabel } from "react-select";

type OptionType = { value: string; label: string };

const COUNTRIES = [
    "Côte d'Ivoire", "Sénégal", "Mali", "Burkina Faso", "Cameroun",
    "France", "Belgique", "Canada", "États-Unis", "Autre",
];

function Field({
    label,
    name,
    type = "text",
    required,
    value,
    onChange,
    placeholder,
    className,
}: {
    label: string;
    name: string;
    type?: string;
    required?: boolean;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    className?: string;
}) {
    return (
        <div className={`relative ${className}`}>
            <input
                type={type}
                name={name}
                required={required}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder=" "
                className="peer input-themed w-full rounded-sm border border-[var(--border)] bg-[var(--surface)] px-3 pt-5 pb-2 text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
            <label
                htmlFor={name}
                className="absolute left-3 top-2 text-sm text-[var(--text-light)] transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-[var(--text-light)] peer-focus:top-2 peer-focus:text-sm peer-focus:text-[var(--primary)]"
            >
                {label} {required && <span className="text-red-500">*</span>}
            </label>
        </div>
    );
}

export default function CheckoutPage() {
    const locale = useLocale();
    const t = useTranslations("checkout");
    const { items, getSubtotal, clearCart } = useCartStore();
    const { currency } = useCurrencyStore();

    const [step, setStep] = useState<"form" | "confirm" | "receipt">("form");
    const [order, setOrder] = useState<Order | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [info, setInfo] = useState<CustomerInfo>({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        country: "",
        zip: "",
        notes: "",
    });

    const set = (field: keyof CustomerInfo) => (value: string) =>
        setInfo((prev) => ({ ...prev, [field]: value }));

    const subtotal = getSubtotal();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep("confirm");
    };

    const handleConfirm = async () => {
        setIsSubmitting(true);
        const newOrder: Order = {
            id: generateOrderId(),
            items,
            customer: info,
            subtotal,
            total: subtotal,
            currency,
            createdAt: new Date().toISOString(),
        };
        setOrder(newOrder);
        clearCart();
        openWhatsApp(newOrder, locale);
        setTimeout(() => {
            setIsSubmitting(false);
            setStep("receipt");
        }, 1000);
    };

    if (items.length === 0 && step === "form") {
        return (
            <>
                <Header />
                <main className="min-h-screen pt-24 pb-16 flex items-center justify-center">
                    <div className="text-center max-w-sm px-4">
                        <div className="text-6xl mb-4">🛍️</div>
                        <h2 className="text-xl font-bold text-[var(--text)] mb-3">
                            {locale === "fr" ? "Votre panier est vide" : "Your cart is empty"}
                        </h2>
                        <p className="text-[var(--text-muted)] mb-6">
                            {locale === "fr"
                                ? "Ajoutez des produits avant de passer commande."
                                : "Add products before checking out."}
                        </p>
                        <Link href={`/${locale}/products`}>
                            <Button>{locale === "fr" ? "Voir les produits" : "Browse Products"}</Button>
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    // Receipt step
    if (step === "receipt" && order) {
        return (
            <>
                <Header />
                <main className="min-h-screen pt-24 pb-16 bg-[var(--surface)]">
                    <div className="max-w-2xl mx-auto px-4">
                        {/* Success header */}
                        <div className="text-center mb-8">
                            <CheckCircle size={64} className="text-emerald-500 mx-auto mb-4" />
                            <h1
                                className="text-3xl font-bold text-[var(--text)] mb-2"
                                style={{ fontFamily: "Playfair Display, serif" }}
                            >
                                {locale === "fr" ? "Commande Confirmée !" : "Order Confirmed!"}
                            </h1>
                            <p className="text-[var(--text-muted)]">
                                {locale === "fr"
                                    ? "Votre commande a été envoyée via WhatsApp. Vous serez contacté(e) très bientôt."
                                    : "Your order was sent via WhatsApp. You will be contacted shortly."}
                            </p>
                        </div>

                        {/* Receipt card */}
                        <div
                            id="receipt"
                            className="bg-[var(--bg)] rounded-3xl border border-[var(--border)] overflow-hidden shadow-xl"
                        >
                            {/* Receipt header */}
                            <div
                                className="px-8 py-6 text-white"
                                style={{ background: "linear-gradient(135deg, #090909, #b88a2d)" }}
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-white/70 text-sm">
                                            {locale === "fr" ? "N° de commande" : "Order ID"}
                                        </p>
                                        <p className="text-xl font-bold mt-1">{order.id}</p>
                                        <p className="text-white/70 text-sm mt-3">
                                            {new Date(order.createdAt).toLocaleDateString(
                                                locale === "fr" ? "fr-FR" : "en-US",
                                                { dateStyle: "full" }
                                            )}
                                        </p>
                                    </div>
                                    <div className="bg-white rounded-2xl p-2">
                                        <QRCodeSVG
                                            value={order.id}
                                            size={90}
                                            fgColor="#b88a2d"
                                            bgColor="white"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Customer info */}
                            <div className="px-8 py-5 border-b border-[var(--border)]">
                                <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-3">
                                    {locale === "fr" ? "Informations client" : "Customer Info"}
                                </p>
                                <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                                    <div>
                                        <span className="text-[var(--text-muted)]">
                                            {locale === "fr" ? "Nom : " : "Name: "}
                                        </span>
                                        <span className="text-[var(--text)] font-medium">
                                            {order.customer.firstName} {order.customer.lastName}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-[var(--text-muted)]">
                                            {locale === "fr" ? "Tél : " : "Phone: "}
                                        </span>
                                        <span className="text-[var(--text)] font-medium">{order.customer.phone}</span>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="text-[var(--text-muted)]">
                                            {locale === "fr" ? "Adresse : " : "Address: "}
                                        </span>
                                        <span className="text-[var(--text)] font-medium">
                                            {order.customer.address}, {order.customer.city}, {order.customer.country}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Items */}
                            <div className="px-8 py-5 border-b border-[var(--border)]">
                                <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-3">
                                    {locale === "fr" ? "Articles" : "Items"}
                                </p>
                                <div className="space-y-3">
                                    {order.items.map((item) => (
                                        <div key={item.product.id} className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-[var(--surface-2)] flex-shrink-0 relative">
                                                <Image
                                                    src={item.product.thumbnail}
                                                    alt={item.product.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="48px"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-[var(--text)] line-clamp-1">
                                                    {item.product.title}
                                                </p>
                                                <p className="text-xs text-[var(--text-muted)]">
                                                    x{item.quantity}
                                                </p>
                                            </div>
                                            <p className="text-sm font-bold text-[var(--color-primary)]">
                                                {formatCurrency(
                                                    item.product.price * item.quantity,
                                                    order.currency
                                                )}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Total */}
                            <div className="px-8 py-5">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-[var(--text)]">
                                        {locale === "fr" ? "Total" : "Total"}
                                    </span>
                                    <span
                                        className="text-2xl font-bold text-[var(--color-primary)]"
                                        style={{ fontFamily: "Playfair Display, serif" }}
                                    >
                                        {formatCurrency(order.total, order.currency)}
                                    </span>
                                </div>
                                <p className="text-xs text-emerald-600 font-medium mt-1">
                                    {locale === "fr" ? "✓ Livraison gratuite incluse" : "✓ Free shipping included"}
                                </p>
                            </div>

                            {/* WhatsApp note */}
                            <div className="mx-8 mb-8 p-4 rounded-xl bg-[#f0fdf4] border border-emerald-200 flex items-center gap-3">
                                <MessageCircle size={20} className="text-emerald-600 flex-shrink-0" />
                                <p className="text-sm text-emerald-800">
                                    {locale === "fr"
                                        ? "Votre commande a été envoyée via WhatsApp. Notre équipe vous contactera sous 24h pour confirmer et organiser la livraison."
                                        : "Your order has been sent via WhatsApp. Our team will contact you within 24h to confirm and arrange delivery."}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                            <Link href={`/${locale}`} className="flex-1">
                                <Button variant="outline" fullWidth>
                                    <ArrowLeft size={16} />
                                    {locale === "fr" ? "Retour à l'accueil" : "Back to Home"}
                                </Button>
                            </Link>
                            <Button
                                variant="secondary"
                                className="flex-1"
                                onClick={() => window.print()}
                            >
                                <Download size={16} />
                                {locale === "fr" ? "Télécharger le reçu" : "Download Receipt"}
                            </Button>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="min-h-screen pt-24 pb-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <h1
                        className="text-3xl font-bold text-[var(--text)] mb-8"
                        style={{ fontFamily: "Playfair Display, serif" }}
                    >
                        {t("title")}
                    </h1>

                    <div className="grid md:grid-cols-[1fr_380px] gap-8">
                        {/* Left: Form or Confirmation */}
                        {step === "form" && (
                            <form
                                onSubmit={handleSubmit}
                                className="bg-[var(--surface)] rounded-3xl border border-[var(--border)] p-8 space-y-8 shadow-lg"
                            >
                                <h2 className="text-2xl font-semibold text-[var(--text)] mb-4">
                                    {t("customerInfo")}
                                </h2>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    <Field
                                        label={t("firstName")}
                                        name="firstName"
                                        required
                                        value={info.firstName}
                                        onChange={set("firstName")}
                                        placeholder="Marie"
                                        className="input-themed"
                                    />
                                    <Field
                                        label={t("lastName")}
                                        name="lastName"
                                        required
                                        value={info.lastName}
                                        onChange={set("lastName")}
                                        placeholder="Koné"
                                        className="input-themed"
                                    />
                                </div>

                                <Field
                                    label={t("phone")}
                                    name="phone"
                                    type="tel"
                                    required
                                    value={info.phone}
                                    onChange={set("phone")}
                                    placeholder="+225 07 00 00 00 00"
                                    className="input-themed"
                                />

                                <Field
                                    label={t("email")}
                                    name="email"
                                    type="email"
                                    value={info.email}
                                    onChange={set("email")}
                                    placeholder="marie@email.com"
                                    className="input-themed"
                                />

                                <Field
                                    label={t("address")}
                                    name="address"
                                    required
                                    value={info.address}
                                    onChange={set("address")}
                                    placeholder="Rue des Jardins, Cocody"
                                    className="input-themed"
                                />

                                <div className="grid sm:grid-cols-2 gap-6">
                                    <Field
                                        label={t("city")}
                                        name="city"
                                        required
                                        value={info.city}
                                        onChange={set("city")}
                                        placeholder="Abidjan"
                                        className="input-themed"
                                    />
                                    <Field
                                        label={t("zip")}
                                        name="zip"
                                        value={info.zip}
                                        onChange={set("zip")}
                                        placeholder="00225"
                                        className="input-themed"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[var(--text)] mb-2">
                                        {t("country")} <span className="text-red-500">*</span>
                                    </label>
                                    <Select
                                        options={COUNTRIES.map((c) => ({ value: c, label: c }))
                                        }
                                        value={info.country ? { value: info.country, label: info.country } : null}
                                        onChange={(selected: OptionType | null) => set("country")(selected?.value || "")}
                                        placeholder={`— ${t("selectCountry")} —`}
                                        classNamePrefix="react-select"
                                        styles={{
                                            control: (base: CSSObjectWithLabel) => ({ ...base, minHeight: "40px" }),
                                            menu: (base: CSSObjectWithLabel) => ({ ...base, zIndex: 10 }),
                                        }}
                                        isSearchable
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[var(--text)] mb-2">
                                        {t("notes")}
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={info.notes}
                                        onChange={(e) => set("notes")(e.target.value)}
                                        placeholder={locale === "fr" ? "Instructions de livraison, etc." : "Delivery instructions, etc."}
                                        className="input-themed w-full rounded-md resize-none"
                                    />
                                </div>

                                <Button type="submit" fullWidth size="lg" className="bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]">
                                    <MessageCircle size={18} />
                                    {t("placeOrder")}
                                </Button>
                            </form>
                        )}

                        {step === "confirm" && (
                            <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border)] p-6 sm:p-8">
                                <h2 className="text-xl font-bold text-[var(--text)] mb-6">
                                    {locale === "fr" ? "Confirmer votre commande" : "Confirm your order"}
                                </h2>

                                <div className="space-y-3 mb-8">
                                    {[
                                        [t("firstName") + " " + t("lastName"), `${info.firstName} ${info.lastName}`],
                                        [t("phone"), info.phone],
                                        [t("address"), `${info.address}, ${info.city}`],
                                        [t("country"), info.country],
                                    ].map(([label, value]) => (
                                        <div key={label} className="flex gap-2 text-sm">
                                            <span className="text-[var(--text-muted)] w-32">{label}</span>
                                            <span className="text-[var(--text)] font-medium">{value}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 text-sm text-emerald-800 mb-6">
                                    <MessageCircle size={16} className="inline mr-2" />
                                    {locale === "fr"
                                        ? "En confirmant, votre commande sera envoyée directement sur WhatsApp +225 59 34 38 66"
                                        : "By confirming, your order will be sent directly on WhatsApp +225 59 34 38 66"}
                                </div>

                                <div className="flex gap-3">
                                    <Button
                                        variant="outline"
                                        onClick={() => setStep("form")}
                                        className="flex-1"
                                    >
                                        <ArrowLeft size={16} />
                                        {locale === "fr" ? "Modifier" : "Edit"}
                                    </Button>
                                    <Button
                                        onClick={handleConfirm}
                                        loading={isSubmitting}
                                        className="flex-1"
                                    >
                                        <MessageCircle size={18} />
                                        {locale === "fr" ? "Envoyer via WhatsApp" : "Send via WhatsApp"}
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Right: Order summary */}
                        <div className="order-first md:order-last">
                            <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border)] p-6 sticky top-24">
                                <h3 className="text-lg font-bold text-[var(--text)] mb-4">
                                    {t("orderSummary")}
                                </h3>

                                <div className="space-y-4 mb-6 max-h-72 overflow-y-auto pr-1">
                                    {items.map((item) => (
                                        <div key={item.product.id} className="flex items-center gap-3">
                                            <div className="w-14 h-14 rounded-xl overflow-hidden bg-[var(--surface-2)] flex-shrink-0 relative">
                                                <Image
                                                    src={item.product.thumbnail || "https://placehold.co/56x56"}
                                                    alt={item.product.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="56px"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-[var(--text)] line-clamp-1">
                                                    {item.product.title}
                                                </p>
                                                <p className="text-xs text-[var(--text-muted)]">
                                                    x{item.quantity}
                                                </p>
                                            </div>
                                            <p className="text-sm font-bold text-[var(--color-primary)] flex-shrink-0">
                                                {formatCurrency(item.product.price * item.quantity, currency)}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-[var(--border)] pt-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[var(--text-muted)]">{t("subtotal")}</span>
                                        <span className="text-[var(--text)]">{formatCurrency(subtotal, currency)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[var(--text-muted)]">{t("shipping")}</span>
                                        <span className="text-emerald-600 font-medium">{t("free")}</span>
                                    </div>
                                    <div className="flex justify-between text-base font-bold pt-2 border-t border-[var(--border)]">
                                        <span className="text-[var(--text)]">{t("total")}</span>
                                        <span className="text-[var(--color-primary)]">{formatCurrency(subtotal, currency)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
