export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12')
];

export const server_loads = [];

export const dictionary = {
		"/(main)": [9,[3]],
		"/(main)/checkout": [10,[3]],
		"/(auth)/forgot-password": [4,[2]],
		"/(auth)/login": [5,[2]],
		"/(main)/products": [~11,[3]],
		"/(main)/products/[slug]": [~12,[3]],
		"/(auth)/reset-password": [6,[2]],
		"/(auth)/signup": [7,[2]],
		"/(auth)/verify-email": [8,[2]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));
export const encoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.encode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export const get_error_template = () => import('../shared/error-template.js').then(m => m.default);