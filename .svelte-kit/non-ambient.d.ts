
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | false | '' | undefined | null;
		'data-sveltekit-noscroll'?: true | false | '' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| false
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | false | '' | 'hover' | 'tap' | undefined | null;
		'data-sveltekit-reload'?: true | false | '' | undefined | null;
		'data-sveltekit-replacestate'?: true | false | '' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/(main)" | "/(auth)" | "/" | "/(main)/categories" | "/(main)/categories/[slug]" | "/(main)/checkout" | "/(main)/checkout/_components" | "/(auth)/login" | "/(main)/products" | "/(main)/products/[slug]";
		RouteParams(): {
			"/(main)/categories/[slug]": { slug: string };
			"/(main)/products/[slug]": { slug: string }
		};
		LayoutParams(): {
			"/(main)": { slug?: string | undefined };
			"/(auth)": Record<string, never>;
			"/": { slug?: string | undefined };
			"/(main)/categories": { slug?: string | undefined };
			"/(main)/categories/[slug]": { slug: string };
			"/(main)/checkout": Record<string, never>;
			"/(main)/checkout/_components": Record<string, never>;
			"/(auth)/login": Record<string, never>;
			"/(main)/products": { slug?: string | undefined };
			"/(main)/products/[slug]": { slug: string }
		};
		Pathname(): "/" | "/categories" | `/categories/${string}` & {} | "/checkout" | "/login" | "/products" | `/products/${string}` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/fonts/FR/Fraunces--latin_basic.woff2" | "/fonts/FR/Fraunces--latin_ext.woff2" | "/fonts/FR/Fraunces--vietnamese.woff2" | "/fonts/FR/Fraunces-Italic--latin_basic.woff2" | "/fonts/FR/Fraunces-Italic--latin_ext.woff2" | "/fonts/FR/Fraunces-Italic--vietnamese.woff2" | "/fonts/HK/HKGrotesk-Black.woff" | "/fonts/HK/HKGrotesk-Black.woff2" | "/fonts/HK/HKGrotesk-BlackItalic.woff" | "/fonts/HK/HKGrotesk-BlackItalic.woff2" | "/fonts/HK/HKGrotesk-Bold.woff" | "/fonts/HK/HKGrotesk-Bold.woff2" | "/fonts/HK/HKGrotesk-BoldItalic.woff" | "/fonts/HK/HKGrotesk-BoldItalic.woff2" | "/fonts/HK/HKGrotesk-ExtraBold.woff" | "/fonts/HK/HKGrotesk-ExtraBold.woff2" | "/fonts/HK/HKGrotesk-ExtraBoldItalic.woff" | "/fonts/HK/HKGrotesk-ExtraBoldItalic.woff2" | "/fonts/HK/HKGrotesk-ExtraLight.woff" | "/fonts/HK/HKGrotesk-ExtraLight.woff2" | "/fonts/HK/HKGrotesk-ExtraLightItalic.woff" | "/fonts/HK/HKGrotesk-ExtraLightItalic.woff2" | "/fonts/HK/HKGrotesk-Italic.woff" | "/fonts/HK/HKGrotesk-Italic.woff2" | "/fonts/HK/HKGrotesk-Light.woff" | "/fonts/HK/HKGrotesk-Light.woff2" | "/fonts/HK/HKGrotesk-LightItalic.woff" | "/fonts/HK/HKGrotesk-LightItalic.woff2" | "/fonts/HK/HKGrotesk-Medium.woff" | "/fonts/HK/HKGrotesk-Medium.woff2" | "/fonts/HK/HKGrotesk-MediumItalic.woff" | "/fonts/HK/HKGrotesk-MediumItalic.woff2" | "/fonts/HK/HKGrotesk-Regular.woff" | "/fonts/HK/HKGrotesk-Regular.woff2" | "/fonts/HK/HKGrotesk-SemiBold.woff" | "/fonts/HK/HKGrotesk-SemiBold.woff2" | "/fonts/HK/HKGrotesk-SemiBoldItalic.woff" | "/fonts/HK/HKGrotesk-SemiBoldItalic.woff2" | "/fonts/HK/HKGrotesk-Thin.woff" | "/fonts/HK/HKGrotesk-Thin.woff2" | "/fonts/HK/HKGrotesk-ThinItalic.woff" | "/fonts/HK/HKGrotesk-ThinItalic.woff2" | "/robots.txt" | string & {};
	}
}