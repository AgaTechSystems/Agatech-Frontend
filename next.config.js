/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async headers() {
		return [
		  {
			source: '/(.*)',
			headers: [
			  {
				key: 'Content-Security-Policy',
				value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; font-src 'self'; frame-src 'none';",
			  },
			],
		  },
		];
	  },
	webpack: (config) => {
	  config.externals.push(
		"pino-pretty",
		"lokijs",
		"encoding"
	  );
	return config;
  }}