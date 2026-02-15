"use client";

import {useQuery} from "@tanstack/react-query";
import {toast} from "sonner";
import useDataTable from "@/hooks/use-data-table";
import {createClient} from "@/lib/supabase/client";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FILTER_MENU} from "@/constants/order-constants";
import CardMenu from "@/app/(dashboard)/order/[id]/add/_components/card-menu";
import LoadingCardMenu from "@/app/(dashboard)/order/[id]/add/_components/loading-card-menu";
import CardSection from "@/app/(dashboard)/order/[id]/add/_components/cart";
import React, {useState} from "react";
import {Cart} from "@/types/order";
import {Menu} from "@/types/menu";
import {startTransition, useActionState} from "react";
import {addOrderItem} from "@/app/(dashboard)/order/action";
import {INITIAL_STATE_ACTION} from "@/constants/general-constant";


export function AddOrderItem({id}: { id: string }) {
    const supabase = createClient();
    const {
        currentSearch,
        currentFilter,
        handleChangeSearch,
        handleChangeFilter
    } = useDataTable()

    const {data: menus, isLoading: isLoadingMenu} = useQuery({
        queryKey: ["menus", currentFilter, currentSearch],
        queryFn: async () => {
            const query = supabase
                .from("menus")
                .select('*', {count: "exact"})
                .order("created_at")
                .eq("is_available", true)
                .ilike("name", `%${currentSearch}%`);

            if (currentFilter) {
                query.eq("category", currentFilter)
            }

            const result = await query;

            if (result.error) toast.error('Get Menu Data Failed', {
                description: result.error.message
            });

            return result;
        }
    });

    const {data: order} = useQuery({
        queryKey: ["order", id],
        queryFn: async () => {
            const result = await supabase
                .from("orders")
                .select("id, customer_name, status, payment_token, tables (name, id)")
                .eq("order_id", id).single()

            if (result.error)
                toast.error('Get Order Data Failed', {
                    description: result.error.message
                });

            return result.data;
        },
        enabled: !!id
    });

    const [carts, setCarts] = useState<Cart[]>([]);

    const [addOrderItemState, addOrderItemAction, isPendingAddOrderItem] = useActionState(addOrderItem, INITIAL_STATE_ACTION);

    const handleOrder = async () => {
        const data = {
            order_id: id,
            items: carts.map((item) => ({
                order_id: order?.id ?? "",
                ...item,
                status: "pending"
            })),
        };

        startTransition(() => {
            addOrderItemAction(data)
        })
    }

    const handleAddToCart = (menu: Menu, action: "increment" | "decrement") => {
        const existingItem = carts.find((item) => item.menu_id === menu.id);

        if (existingItem) {
            if (action === "decrement") {
                if (existingItem.quantity > 1) {
                    setCarts(carts.map((item) => item.menu_id === menu.id ? {
                        ...item,
                        quantity: item.quantity - 1,
                        total: item.total - menu.price
                    } : item))
                } else {
                    setCarts(carts.filter((item) => item.menu_id !== menu.id))
                }
            } else {
                setCarts(carts.map((item) => item.menu_id === menu.id ? {
                    ...item,
                    quantity: item.quantity + 1,
                    total: item.total + menu.price
                } : item))
            }
        } else {
            setCarts([...carts, {
                menu_id: menu.id,
                quantity: 1,
                total: menu.price,
                notes: "",
                menu
            }])
        }
    }

    return (
        <div className="flex flex-col lg:flex-row gap-4 w-full">
            <div className="lg:w-2/3 space-y-4">
                <div className="flex flex-col lg:flex-row items-center gap-4 justify-between w-full">
                    <div className="flex flex-col lg:flex-row items-center gap-4">
                        <h1 className="text-2xl font-bold"> Menu </h1>
                        <div className="flex gap-2">
                            {FILTER_MENU.map((item) => (
                                <Button
                                    key={item.value}
                                    variant={currentFilter === item.value ? "default" : "outline"}
                                    onClick={() => handleChangeFilter(item.value)}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <Input placeholder="Search" onChange={(e) => handleChangeSearch(e.target.value)}></Input>
                </div>
                {isLoadingMenu && !menus ? (
                    <LoadingCardMenu/>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-3 w-full gap-4">
                        {menus?.data?.map((menu) => (
                            <CardMenu menu={menu} key={`menu-${menu.id}`} onAddToCarts={handleAddToCart}/>
                        ))}
                    </div>
                )}
                {!isLoadingMenu && menus?.data?.length === 0 && (
                    <div className="text-center w-full">
                        Menu Not Found
                    </div>
                )}
            </div>
            <div className="lg:w-1/3">
                <CardSection
                    order={order}
                    carts={carts}
                    setCarts={setCarts}
                    onAddToCarts={handleAddToCart}
                    isLoading={isPendingAddOrderItem}
                    onOrder={handleOrder}
                />
            </div>
        </div>
    )
}