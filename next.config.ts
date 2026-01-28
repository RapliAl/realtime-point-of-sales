import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: "10mb",
        },
    },
    devIndicators: false,
    images: {
        domains: ["https://gqexpuzjiqriboscvvjw.supabase.co"],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "gqexpuzjiqriboscvvjw.supabase.co",
                port: "",
                pathname: "/**"
            }
        ]
    }
};

export default nextConfig;
