// ==========================================
// Base / Shared Types
// ==========================================

export interface Image {
	url: string;
	alt: string;
	/** Optional metadata for the image, useful for sorting or tagging */
	metadata?: Record<string, string>;
}

export interface Price {
	/** Base amount in the smallest currency unit (e.g., cents) or standard decimal */
	amount: number;
	/** ISO 4217 currency code (e.g., 'USD', 'EUR') */
	currency: string;
	/** Discounted amount, if applicable */
	discountedAmount?: number;
}

// ==========================================
// Variant Types
// ==========================================

/**
 * Represents a specific value for a variant option (e.g., "Red", "XL", "Matte").
 * Designed to be dynamic: it can be just a label, a label + color hex,
 * or a label + images (thumbnail for swatches, full image for gallery).
 */
export interface VariantOptionValue {
	id: string;
	/** The display name (e.g., "Crimson Red", "Extra Large") */
	label: string;

	/** Hex code for color swatches (e.g., "#FF0000"). Use this if no image is needed. */
	hexColor?: string;

	/** Small image URL (e.g., 32x32 or 64x64) used for swatches on the Product Card or Details page. */
	thumbnailUrl?: string;

	/**
	 * Larger image URL representing this specific variant.
	 * Useful for showing a preview when hovering over the swatch,
	 * or mapping to the main product image gallery.
	 */
	imageUrl?: string;
}

/**
 * Represents a variant category/attribute (e.g., "Color", "Size", "Material Finish").
 */
export interface VariantOption {
	id: string;
	/** The name of the attribute (e.g., "Color", "Size") */
	name: string;
	/** The available values for this attribute */
	values: VariantOptionValue[];
}

/**
 * Represents a specific, purchasable product combination (SKU).
 * For example: A "Red" "Large" shirt.
 */
export interface ProductVariant {
	id: string;
	sku: string;

	/**
	 * Array of VariantOptionValue IDs that make up this specific variant.
	 * Example: ['color-red-id', 'size-large-id']
	 */
	optionValueIds: string[];

	/** Price override for this specific variant (if it differs from the base product price) */
	price?: Price;

	/** Current stock level */
	stock: number;

	/**
	 * Specific images for this exact variant.
	 * When this variant is selected, the UI can filter the main gallery to show these.
	 */
	images?: Image[];
}

// ==========================================
// Product Types
// ==========================================

/**
 * Lightweight product type used for grids, lists, and search results.
 * Intentionally excludes heavy data like full descriptions or deep variant combinations.
 */
export interface ProductCard {
	id: string;
	slug: string;
	title: string;

	/**
	 * Multiple images for the card.
	 * Commonly used for hover effects (showing the 2nd image on hover) or carousels.
	 */
	images: Image[];

	price: Price;

	/** Optional rating summary for the card */
	rating?: {
		average: number;
		count: number;
	};

	/**
	 * A lightweight preview of variant options to show on the card (e.g., color swatches).
	 * We only pick the necessary fields to keep the payload small.
	 */
	variantOptions?: Pick<VariantOption, 'id' | 'name' | 'values'>[];
}

/**
 * Comprehensive product type used for the Product Details Page (PDP).
 * Contains all necessary information for purchasing and deep-diving into the product.
 */
export interface Product extends Omit<ProductCard, 'variantOptions'> {
	/** Full product description (HTML or Markdown) */
	description: string;

	/** Key-value pairs for product specifications (e.g., { "Material": "100% Cotton", "Weight": "200g" }) */
	specifications: Record<string, string>;

	/** Product categorization */
	categories: string[];
	tags: string[];

	/** Full variant options with all details */
	variantOptions: VariantOption[];

	/** All purchasable SKU combinations */
	variants: ProductVariant[];

	/** IDs of related products for cross-selling */
	relatedProductIds?: string[];

	/** SEO Metadata */
	seo?: {
		title?: string;
		description?: string;
		keywords?: string[];
	};
}
