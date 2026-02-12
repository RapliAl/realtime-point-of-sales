import {AddOrderItem} from "@/app/(dashboard)/order/[id]/add/_components/add-order-item";

export const metadata = {
    title: "Kedai Kita | Menu Management",
    description: "Detail Order Management Page"
}

export default async function AddOrderPage({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    return <AddOrderItem id={id}/>
}