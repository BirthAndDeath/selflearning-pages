// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: "https://selflearning-pages.pages.dev/",// Replace with your site's URL
	integrations: [
		starlight({
			title: 'SelfLearning.pages',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/BirthAndDeath/selflearning-pages' },
			],
			components: {

				TwoColumnContent: './src/components/CustomTwoColumn.astro',
			},
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
				{
					label: 'Contribution',
					items: [
						{ label: 'How to contribute', slug: 'contribution/how-to-contribute' },
					],
				}
			],
			defaultLocale: 'en',
			locales: {
				//add new locales here, and add the corresponding translation files in the `src/locales` directory
				'zh-cn': {
					label: '简体中文',
					lang: 'zh-CN',
				},

				en: {
					label: 'English',
					lang: 'en',
				},
			},
			head: [
				// 注入外部链接拦截脚本,用于拦截外部链接跳转（放到 body 底部，确保 DOM 加载完成）
				{
					tag: 'script',
					attrs: {
						src: '/external-link-interceptor.js',
						defer: true,
					},
				},
			],
		}),
	],
});
