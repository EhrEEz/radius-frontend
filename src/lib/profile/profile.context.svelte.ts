// src/lib/profile/profile.context.svelte.ts
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
  notes: string;
  isDefault: boolean;
};

export class ProfileContext {
  user = $state<ProfileUser | null>(null);
  addresses = $state<Address[]>([]);

  constructor(initialUser: ProfileUser, initialAddresses: Address[]) {
    this.user = initialUser;
    this.addresses = initialAddresses;
  }

  updateUser(updates: Partial<ProfileUser>) {
    if (this.user) this.user = { ...this.user, ...updates };
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
}

export function setProfileContext(user: ProfileUser, addresses: Address[]) {
  const context = new ProfileContext(user, addresses);
  setContext('profile', context);
  return context;
}

export function getProfileContext() {
  return getContext<ProfileContext>('profile');
}
