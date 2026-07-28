// src/routes/profile/+layout.server.ts
// import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import dummyUser from '$lib/mock/user.json';
import dummyAddresses from '$lib/mock/addresses.json';

import type { ProfileUser, Address } from '$lib/profile/profile.context.svelte';

export const load: LayoutServerLoad = async () => {

  return {
      user: dummyUser as ProfileUser,
      addresses: dummyAddresses as Address[]
    };
};
// export const load: LayoutServerLoad = async (event) => {
  // // 1. Get the JWT from the cookie (Adjust cookie name based on your API/Payload setup)
  // const token = event.cookies.get('auth_token'); // or 'payload-token' for Payload CMS

  // if (!token) {
  //   throw redirect(303, '/login');
  // }

  // try {
  //   // 2. Call your REST API or Payload CMS to verify token and get user data
  //   // Using event.fetch ensures cookies/headers are forwarded correctly in SSR
  //   const response = await event.fetch('http://localhost:3000/api/users/me', { // Change URL to your API/Payload URL
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       // If using Payload CMS, it might just rely on the cookie automatically
  //     }
  //   });

  //   if (!response.ok) {
  //     // Token is invalid or expired
  //     event.cookies.delete('auth_token', { path: '/' });
  //     throw redirect(303, '/login');
  //   }

  //   const userData = await response.json();

  //   // 3. Return the user data to the layout
  //   return {
  //     user: userData as ProfileUser
  //   };

  // } catch (error) {
  //   // Handle network errors or unexpected failures
  //   console.error('Auth fetch failed:', error);
  //   throw redirect(303, '/login');
  // }
  // }
