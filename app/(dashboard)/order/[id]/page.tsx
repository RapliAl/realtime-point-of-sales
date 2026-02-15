import DetailOrder from "@/app/(dashboard)/order/[id]/_components/detail-order";
import Script from "next/dist/client/script";
import {environment} from "@/configs/environment";

export const metadata = {
    title: "Kedai Kita | Menu Management",
    description: "Detail Order Management Page"
}

export default async function DetailOrderPage({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    return (
        <div className="w-full">
            <Script
                src={`${environment.MIDTRANS_API_URL}/snap/snap.js`}
                data-client-key={`${environment.MIDTRANS_API_CLIENT_KEY}`}
                strategy="lazyOnload"
            />
            <DetailOrder id={id}/>
        </div>
    )
}