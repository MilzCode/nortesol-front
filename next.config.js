/** @type {import('next').NextConfig} */

module.exports = {
	images: {
		domains: ['res.cloudinary.com'],
	},
	reactStrictMode: true,
	i18n: {
		locales: ['es-CL'],
		defaultLocale: 'es-CL',
		localeDetection: false,
	},
};
