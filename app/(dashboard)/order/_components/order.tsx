"use client";

import {Input} from "@/components/ui/input";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useQuery} from "@tanstack/react-query";
import {createClient} from "@/lib/supabase/client";
import {toast} from "sonner";
import DataTable from "@/components/common/data-table";
import {startTransition, useActionState, useEffect, useMemo, useState} from "react";
import DropdownAction from "@/components/common/dropwdown-action";
import useDataTable from "@/hooks/use-data-table";
import {cn} from "@/lib/utils";
import {HEADER_TABLE_ORDER} from "@/constants/order-constants";
import {Property} from "csstype";
import Order = Property.Order;
import DialogCreateOrder from "@/app/(dashboard)/order/_components/dialog-create-order";
import {updateReservation} from "@/app/(dashboard)/order/action";
import {INITIAL_STATE_ACTION} from "@/constants/general-constant";
import {Ban, Link2Icon, ScrollText} from "lucide-react";
import Link from "next/link";


export default function OrderManagement() {
    const supabase = createClient();
    const {
        currentPage,
        currentLimit,
        currentSearch,
        handleChangePage,
        handleChangeLimit,
        handleChangeSearch
    } = useDataTable()

    const {data: orders, isLoading, refetch} = useQuery({
        queryKey: ["orders", currentPage, currentLimit, currentSearch],
        queryFn: async () => {
            const query = supabase
                .from("orders")
                .select(`
                    id, order_id, customer_name, status, payment_token, tables (name, id)
                `, {count: "exact"})
                .range((currentPage - 1) * currentLimit, currentPage * currentLimit - 1)
                .order("created_at");

            if (currentSearch) {
                query.or(
                    `order_id.ilike.%${currentSearch}%,customer_name.ilike.%${currentSearch}%`
                );
            }

            const result = await query;

            if (result.error) toast.error('Get Order Data Failed', {
                description: result.error.message
            });

            return result;
        }
    });

    const {data: tables, refetch: refetchTables} = useQuery({
        queryKey: ["tables"],
        queryFn: async () => {
            const result = await supabase
                .from("tables")
                .select("*")
                .order("created_at")
                .order("status");

            return result.data;
        }
    });

    const [selectedAction, setSelectedAction] = useState<{
        data: Order,
        type: "edit" | "delete"
    } | null>(null);

    const handleChangeAction = (open: boolean) => {
        if (!open) setSelectedAction(null);
    };

    const [reservedState, reservedAction] = useActionState(updateReservation, INITIAL_STATE_ACTION)

    const totalPages = useMemo(() => {
        return orders && orders.count !== null ? Math.ceil(orders.count / currentLimit) : 0
    }, [orders])

    const handleReservation = async ({id, table_id, status}: {
        id: string,
        table_id: string,
        status: string
    }) => {
        const formData = new FormData();
        Object.entries({id, table_id, status}).forEach(([Key, value]) => {
            formData.append(Key, value);
        })

        startTransition(() => {
            reservedAction(formData);
        })
    }

    useEffect(() => {
        if (reservedState?.status === 'error') {
            toast.error('Update Reservation Failed', {
                description: reservedState.errors?._form?.[0]
            });
        }

        if (reservedState?.status === "success") {
            toast.success("Update Reservation Successfully");
            refetch();
            refetchTables()
        }
    }, [reservedState])

    const reservedActionList = [
        {
            label: (
                <span className="flex items-center gap-2 ">
                    <Link2Icon/>
                    Process
                </span>
            ),
            action: (id: string, table_id: string) => {
                handleReservation({
                    id,
                    table_id,
                    status: "process",
                })
            }
        },
        {
            label: (
                <span className="flex items-center gap-2 ">
                    <Ban className="text-red-500"/>
                    Cancel
                </span>
            ),
            action: (id: string, table_id: string) => {
                handleReservation({
                    id,
                    table_id,
                    status: "canceled",
                })
            }
        }
    ]

    const filteredData = useMemo(() => {
        return (orders?.data || []).map(((order, index) => {
                return [
                    currentLimit * (currentPage - 1) + index + 1,

                    order.order_id,
                    order.customer_name,
                    (order.tables as unknown as { name: string }).name,

                    <div key={`status-${order.status}`}
                         className={cn("px-2 py-1 rounded-full text-white w-fit capitalize", {
                             "bg-lime-600": order.status === "settled",
                             "bg-sky-600": order.status === "reserved",
                             "bg-amber-600": order.status === "process",
                             "bg-red-600": order.status === "canceled",
                         })}>
                        {order.status}
                    </div>,

                    <DropdownAction
                        key={order.id}
                        menu={
                            order.status === "reserved" ? reservedActionList.map((item) => ({
                                label: item.label,
                                action: () => item.action(order.id, (order.tables as unknown as { id: string }).id)
                            })) : [
                                {
                                    label: (
                                        <Link href={`/order/${order.order_id}`} className="flex items-center gap-2">
                                            <ScrollText/>
                                            Details
                                        </Link>
                                    ),
                                    type: "link"
                                }
                            ]
                        }/>
                ]
            }
        ))
    }, [orders])


    return (
        <div className="w-full">
            <div className="flex flex-col lg:flex-row mb-4 gap-2 justify-between w-full">
                <h1 className="text-2xl font-bold"> ORDER MANAGEMENT </h1>
                <div className="flex gap-2">
                    <Input
                        placeholder="Search By Name or Category"
                        onChange={(e) => handleChangeSearch(e.target.value)}
                    />
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                Create
                            </Button>
                        </DialogTrigger>
                        <DialogCreateOrder
                            refetch={refetch}
                            tables={tables}
                        />
                    </Dialog>
                </div>
            </div>
            <DataTable
                header={HEADER_TABLE_ORDER}
                data={filteredData}
                isLoading={isLoading}
                totalPages={totalPages}
                currentPage={currentPage}
                currentLimit={currentLimit}
                onChangePage={handleChangePage}
                onChangeLimit={handleChangeLimit}
            />
        </div>
    )
}