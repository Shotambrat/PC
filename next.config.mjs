/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['concept.uz'],
    },
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:3001/api/:path*', // Прокси для API запросов к бэкенду
        },
      ];
    },
  };
  
  export default nextConfig;