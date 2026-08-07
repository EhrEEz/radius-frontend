import type { LayoutServerLoad } from './$types';
import dummyUser from '$lib/mock/user.json';
import dummyAddresses from '$lib/mock/addresses.json';
import dummyCancellations from '$lib/mock/cancellations.json';
import dummyFavorites from '$lib/mock/favorites.json';
import dummyOrders from '$lib/mock/orders.json';
import dummyReturns from '$lib/mock/returns.json';
import dummyReviews from '$lib/mock/reviews.json';
import dummyPreferences from '$lib/mock/preferences.json';

import type {
  ProfileUser, Address, Cancellation, Favorite,
  Order, Return, Review, Preferences
} from '$lib/profile/profile.context.svelte';

export const load: LayoutServerLoad = async () => {
  return {
    user: dummyUser as ProfileUser,
    addresses: dummyAddresses as Address[],
    cancellations: dummyCancellations as Cancellation[],
    favorites: dummyFavorites as Favorite[],
    orders: dummyOrders as Order[],
    returns: dummyReturns as Return[],
    reviews: dummyReviews as Review[],
    preferences: dummyPreferences as Preferences
  };
};
