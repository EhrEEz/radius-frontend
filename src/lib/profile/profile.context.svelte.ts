// src/lib/profile/profile.context.svelte.ts
import type { ProductCard } from '$lib/types/product';
import { setContext, getContext } from 'svelte';
export type ProfileUser = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

export type Address = {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
  isDefault: boolean;
};

export type Cancellation = {
  id: string;
  orderId: string;
  date: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Refunded' | 'Rejected';
  refundAmount: number;
  items: { name: string; quantity: number; price: number }[];
};

export type Favorite = ProductCard;

export type Order = {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  items: { id: string; name: string; image: string; quantity: number; price: number }[];
};

export type Return = {
  id: string;
  orderId: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Completed';
  reason: string;
  items: { name: string; quantity: number; price: number }[];
  refundAmount: number;
};

export type Review = {
  id: string;
  productId: string;
  productName: string;
  productSlug: string;
  productImage: string;
  rating: number;
  comment: string;
  date: string;
};

export type Preferences = {
  newsletter: boolean;
  promotions: boolean;
  smsNotifications: boolean;
};
export class ProfileContext {
  user = $state<ProfileUser | null>(null);
  addresses = $state<Address[]>([]);
  cancellations = $state<Cancellation[]>([]);
  favorites = $state<Favorite[]>([]);
  orders = $state<Order[]>([]);
  returns = $state<Return[]>([]);
  reviews = $state<Review[]>([]);
  preferences = $state<Preferences>({ newsletter: false, promotions: false, smsNotifications: false });

  constructor(
    initialUser: ProfileUser,
    initialAddresses: Address[],
    initialCancellations: Cancellation[],
    initialFavorites: Favorite[],
    initialOrders: Order[],
    initialReturns: Return[],
    initialReviews: Review[],
    initialPreferences: Preferences
  ) {
    this.user = initialUser;
    this.addresses = initialAddresses;
    this.cancellations = initialCancellations;
    this.favorites = initialFavorites;
    this.orders = initialOrders;
    this.returns = initialReturns;
    this.reviews = initialReviews;
    this.preferences = initialPreferences;
  }

  updateUser(updates: Partial<ProfileUser>) {
      if (this.user) this.user = { ...this.user, ...updates };
    }

    updatePreferences(updates: Partial<Preferences>) {
      this.preferences = { ...this.preferences, ...updates };
    }

    removeFavorite(productId: string) {
      this.favorites = this.favorites.filter(f => f.id !== productId);
    }


  setDefaultAddress(id: string) {
    this.addresses = this.addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    }));
  }

  addAddress(addr: Omit<Address, 'id' | 'isDefault'>) {
    const newAddr: Address = {
      ...addr,
      id: crypto.randomUUID(),
      isDefault: this.addresses.length === 0 // First address is default automatically
    };
    this.addresses = [...this.addresses, newAddr];
  }

  updateAddress(id: string, updates: Partial<Omit<Address, 'id' | 'isDefault'>>) {
    this.addresses = this.addresses.map(addr =>
      addr.id === id ? { ...addr, ...updates } : addr
    );
  }

  deleteAddress(id: string) {
    const wasDefault = this.addresses.find(a => a.id === id)?.isDefault;
    this.addresses = this.addresses.filter(addr => addr.id !== id);

    // If we deleted the default address, promote the first remaining one
    if (wasDefault && this.addresses.length > 0) {
      this.addresses[0].isDefault = true;
    }
  }
  addCancellation(cancellation: Cancellation) {
    this.cancellations = [cancellation, ...this.cancellations];
  }
}
export function setProfileContext(
  user: ProfileUser,
  addresses: Address[],
  cancellations: Cancellation[],
  favorites: Favorite[],
  orders: Order[],
  returns: Return[],
  reviews: Review[],
  preferences: Preferences
) {
  const context = new ProfileContext(
    user, addresses, cancellations, favorites, orders, returns, reviews, preferences
  );
  setContext('profile', context);
  return context;
}

export function getProfileContext() {
  return getContext<ProfileContext>('profile');
}
