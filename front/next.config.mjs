/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '1337',
            pathname: '/**',
          }
        
        ],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'api.airballoonufa.ru',
            pathname: '/**',
          }
        
        ],
      },
      
      transpilePackages: [ 'antd', '@ant-design', 'rc-util', 'rc-pagination', 'rc-picker', 'rc-notification', 'rc-tooltip' ],
};

export default nextConfig;
