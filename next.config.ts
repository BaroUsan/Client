import { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/umb/status',
        destination: 'https://port-0-cloud-lylb047299de6c8f.sel5.cloudtype.app/umb/status',
      },
      {
        source: '/signup',
        destination: 'https://port-0-cloud-lylb047299de6c8f.sel5.cloudtype.app/signup',
      },
    ];
  },
};

export default nextConfig;
