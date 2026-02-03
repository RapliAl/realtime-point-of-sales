import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: "10mb",
        },
    },
    devIndicators: false,
    images: {
        domains: ["https://gqexpuzjiqriboscvvjw.supabase.co", "https://gqexpuzjiqriboscvvjw.storage.supabase.co"],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "gqexpuzjiqriboscvvjw.supabase.co",
                port: "",
                pathname: "/**"
            },
            {
                protocol: 'https',
                hostname: "gqexpuzjiqriboscvvjw.storage.supabase.co",
                port: "",
                pathname: "/**"
            }
        ]
    }
};

export default nextConfig;
