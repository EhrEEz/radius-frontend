// src/lib/types/product.ts

// ==========================================
// Base / Shared Types
// ==========================================

export interface Image {
	url: string;
	alt: string;
	metadata?: Record<string, string>;
}

export interface Price {
	amount: number;
	currency: string;
	discountedAmount?: number;
}

// ==========================================
// Variant Types
// ==========================================

export interface VariantOptionValue {
	id: string;
	label: string;
	hexColor?: string;
	thumbnailUrl?: string;
	imageUrl?: string;
}

export interface VariantOption {
	id: string;
	name: string;
	values: VariantOptionValue[];
}

export interface ProductVariant {
	id: string;
	sku: string;
	optionValueIds: string[];
	price?: Price;
	stock: number;
	images?: Image[];
}

// ==========================================
// Product Types
// ==========================================

/**
 * Lightweight product type used for grids, lists, and search results.
 */
export interface ProductCard {
	id: string;
	slug: string;
	title: string;
	images: Image[];
	price: Price;
	rating?: {
		average: number;
		count: number;
	};
	variantOptions?: Pick<VariantOption, 'id' | 'name' | 'values'>[];
}

/**
 * Comprehensive product type used for the Product Details Page (PDP).
 */
export interface Product extends Omit<ProductCard, 'variantOptions'> {
	description: string;
	specifications: Record<string, string>;
	categories: string[];
	tags: string[];
	variantOptions: VariantOption[];
	variants: ProductVariant[];
	relatedProducts?: ProductCard[];
	frequentlyBoughtTogether?: ProductCard[];
	similarKeywords?: string[];
	seo?: {
		title?: string;
		description?: string;
		keywords?: string[];
	};

	// ==========================================
	// NEW PROPERTIES FOR CONFIGURATOR
	// ==========================================
	brand?: string;
	sku?: string;
	category?: string;
	highlights?: Record<string, string>;
	saleEndDate?: string | Date;
}
