// src/lib/cart.svelte.ts

export interface CartItemAttributes {
	[key: string]: string;
}

export interface CartItem {
	id: string;
	productId: string;
	slug: string;
	name: string;
	variantLabel: string;
	attributes: CartItemAttributes;
	price: number;
	quantity: number;
	image?: string;
}

export type AddToCartPayload = Omit<CartItem, 'quantity'> & { quantity?: number };

class ShoppingCart {
	items = $state<CartItem[]>([]);
	isOpen = $state(false);

	// Track the element that triggered the drawer to restore focus later
	private triggerElement: HTMLElement | null = null;

	open() {
		if (typeof document !== 'undefined') {
			this.triggerElement = document.activeElement as HTMLElement;
		}
		this.isOpen = true;
	}

	close() {
		this.isOpen = false;

		// Restore focus after the close transition completes (300ms)
		if (typeof document !== 'undefined' && this.triggerElement) {
			setTimeout(() => {
				this.triggerElement?.focus();
				this.triggerElement = null;
			}, 300);
		}
	}

	toggle() {
		if (this.isOpen) {
			this.close();
		} else {
			this.open();
		}
	}

	// --- Derived values ---
	totalItems = $derived(this.items.reduce((sum, item) => sum + item.quantity, 0));
	totalPrice = $derived(this.items.reduce((sum, item) => sum + item.price * item.quantity, 0));
	lineCount = $derived(this.items.length);
	isEmpty = $derived(this.items.length === 0);

	// --- Lookup helpers ---
	getItem(variantId: string): CartItem | undefined {
		return this.items.find((item) => item.id === variantId);
	}
	hasVariant(variantId: string): boolean {
		return this.items.some((item) => item.id === variantId);
	}
	getQuantity(variantId: string): number {
		return this.getItem(variantId)?.quantity ?? 0;
	}

	// --- Mutations ---
	addItem(payload: AddToCartPayload) {
		const existing = this.items.find((item) => item.id === payload.id);
		if (existing) {
			existing.quantity += payload.quantity ?? 1;
		} else {
			this.items.push({ ...payload, quantity: payload.quantity ?? 1 });
		}
		this.open();
	}

	removeItem(variantId: string) {
		this.items = this.items.filter((item) => item.id !== variantId);
	}

	updateQuantity(variantId: string, quantity: number) {
		const item = this.items.find((i) => i.id === variantId);
		if (!item) return;
		if (quantity <= 0) {
			this.removeItem(variantId);
		} else {
			item.quantity = quantity;
		}
	}

	replaceVariant(oldVariantId: string, newPayload: AddToCartPayload) {
		const oldItem = this.getItem(oldVariantId);
		const quantity = oldItem?.quantity ?? 1;
		this.removeItem(oldVariantId);
		this.addItem({ ...newPayload, quantity });
	}

	clearCart() {
		this.items = [];
	}
}

export const cart = new ShoppingCart();
