// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'SelfLearning.pages',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/BirthAndDeath/selflearning-pages' },
			],

			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Guide', slug: 'guides/main' },
					],
				},
				{
					label: 'Reference',
					items: [{ autogenerate: { directory: 'reference' } }],
				},
			],
			defaultLocale: 'en',
			locales: {

				'zh-CN': {
					label: '简体中文',
					lang: 'zh-CN',
				},

				en: {
					label: 'English',
					lang: 'en',
				},
			},
		}),
	],
});
