/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sassa.web.za',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'asdjlk.sassa.web.za',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.co.uk',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.org.uk',
        pathname: '/**',
      }
    ]
  },
  experimental: {
    scrollRestoration: true
  }
};

export default nextConfig;
