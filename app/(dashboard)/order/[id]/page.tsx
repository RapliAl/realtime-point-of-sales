import DetailOrder from "@/app/(dashboard)/order/[id]/_components/detail-order";

export const metadata = {
    title: "Kedai Kita | Menu Management",
    description: "Detail Order Management Page"
}

export default async function DetailOrderPage({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    return <DetailOrder id={id}/>
}