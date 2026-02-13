"use client";

import {Button} from "@/components/ui/button";
import DataTable from "@/components/common/data-table";
import {HEADER_TABLE_DETAIL_ORDER} from "@/constants/order-constants";
import Link from "next/link";
import {createClient} from "@/lib/supabase/client";
import useDataTable from "@/hooks/use-data-table";
import {useQuery} from "@tanstack/react-query";
import {toast} from "sonner";
import {useMemo} from "react";
import {cn, convertIDR} from "@/lib/utils";
import Image from "next/image";
import Summary from "@/app/(dashboard)/order/[id]/_components/summary";

export default function DetailOrder({id}: { id: string }) {
    const supabase = createClient();
    const {
        currentPage,
        currentLimit,
        handleChangePage,
        handleChangeLimit,
    } = useDataTable()

    const {data: order} = useQuery({
        queryKey: ["order", id],
        queryFn: async () => {
            const result = await supabase
                .from("orders")
                .select("id, customer_name, status, payment_url, tables (name, id)")
                .eq("order_id", id).single()

            if (result.error)
                toast.error('Get Order Data Failed', {
                    description: result.error.message
                });

            return result.data;
        },
        enabled: !!id
    });

    const {data: orderMenu, isLoading: isLoadingOrderMenu} = useQuery({
        queryKey: ["orders_menu", order?.id, currentPage, currentLimit],
        queryFn: async () => {
            const result = await supabase
                .from("orders_menus")
                .select("*, menus (id, name, image_url, price)", {count: "exact"})
                .eq("order_id", order?.id)
                .order("status");

            if (result.error)
                toast.error('Get Order Menu Data Failed', {
                    description: result.error.message
                });

            return result;
        },
        enabled: !!order?.id
    });

    const filteredData = useMemo(() => {
        return (orderMenu?.data || []).map(((item, index) => {
                return [
                    currentLimit * (currentPage - 1) + index + 1,
                    <div className="flex items-center gap-2">
                        <Image
                            src={item.menus.image_url}
                            alt={item.menus.name}
                            width={40}
                            height={40}
                            className="rounded"
                        />
                        <div className="flex flex-col ">
                            {item.menus.name} x {item.quantity}
                            <span className="text-xs text-muted-foreground">
                                {item.notes || "No Notes "}
                            </span>
                        </div>
                    </div>,
                    <div>
                        {convertIDR(item.menus.price * item.quantity)}
                    </div>,
                    <div key={`status-${item.status}`}
                         className={cn("px-2 py-1 rounded-full text-white w-fit capitalize", {
                             "bg-gray-600": item.status === "pending",
                             "bg-yellow-600": item.status === "process",
                             "bg-blue-600": item.status === "ready",
                             "bg-green-600": item.status === "serve",
                         })}>
                        {item.status}
                    </div>,
                    '',
                ]
            }
        ))
    }, [orderMenu?.data])

    const totalPages = useMemo(() => {
        return orderMenu && orderMenu.count !== null ? Math.ceil(orderMenu.count / currentLimit) : 0
    }, [orderMenu])

    return (
        <div className="w-full space-y-4">
            <div>
                <div className="flex items-center gap-4 justify-between w-full">
                    <h1 className="text-2xl font-bold"> DETAIL ORDER </h1>
                    <Link href={`/order/${id}/add`}>
                        <Button className="font-bold mr-4"> Add Order Item </Button>
                    </Link>
                </div>
                <div className="flex flex-col lg:flex-row w-full gap-4 mt-4">
                    <div className="lg:w-2/3">
                        <DataTable
                            header={HEADER_TABLE_DETAIL_ORDER}
                            data={filteredData}
                            isLoading={isLoadingOrderMenu}
                            totalPages={totalPages}
                            currentPage={currentPage}
                            currentLimit={currentLimit}
                            onChangePage={handleChangePage}
                            onChangeLimit={handleChangeLimit}
                        />
                    </div>
                    <div className="lg:w-1/3">
                        {order && (
                            <Summary order={order} orderMenu={orderMenu?.data} id={id}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}