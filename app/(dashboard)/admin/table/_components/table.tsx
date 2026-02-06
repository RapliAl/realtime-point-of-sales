"use client";

import {Input} from "@/components/ui/input";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useQuery} from "@tanstack/react-query";
import {createClient} from "@/lib/supabase/client";
import {toast} from "sonner";
import DataTable from "@/components/common/data-table";
import {useMemo, useState} from "react";
import DropdownAction from "@/components/common/dropwdown-action";
import {Pencil, Trash2} from "lucide-react";
import useDataTable from "@/hooks/use-data-table";
import {cn} from "@/lib/utils";
import {Table} from "@/validations/table-validation";
import {HEADER_TABLE_TABLE} from "@/constants/table-constants";
import DialogCreateTable from "@/app/(dashboard)/admin/table/_components/dialog-create-table";

export default function TableManagement() {
    const supabase = createClient();
    const {
        currentPage,
        currentLimit,
        currentSearch,
        handleChangePage,
        handleChangeLimit,
        handleChangeSearch
    } = useDataTable()
    const {data: tables, isLoading, refetch} = useQuery({
        queryKey: ["tables", currentPage, currentLimit, currentSearch],
        queryFn: async () => {
            const query = supabase
                .from("tables")
                .select('*', {count: "exact"})
                .range((currentPage - 1) * currentLimit, currentPage * currentLimit - 1)
                .order("created_at");

            if (currentSearch) {
                query.or(
                    `name.ilike.%${currentSearch}%,
                    capacity.ilike.%${currentSearch}%,
                    status.ilike.%${currentSearch}%`
                )
            }

            const result = await query;

            if (result.error) toast.error('Get Table Data Failed', {
                description: result.error.message
            });

            return result;
        }
    });

    const [selectedAction, setSelectedAction] = useState<{
        data: Table,
        type: "edit" | "delete"
    } | null>(null);

    const handleChangeAction = (open: boolean) => {
        if (!open) setSelectedAction(null);
    };

    const filteredData = useMemo(() => {
        return (tables?.data || []).map(((table: Table, index) => {
                return [
                    currentLimit * (currentPage - 1) + index + 1,
                    <div key={`name-${table.id}`} className="flex flex-col">
                        <h4 className="font-bold">{table.name}</h4>
                        <p className="text-xs">{table.description}</p>
                    </div>,

                    table.capacity,

                    <div key={`status-${table.status}`}
                         className={cn("px-2 py-1 rounded-full text-white w-fit capitalize", {
                             "bg-green-600": table.status === "available",
                             "bg-red-600": table.status === "unavailable",
                             "bg-yellow-600": table.status === "reserved",
                         })}>
                        {table.status}
                    </div>,

                    <DropdownAction
                        key={table.id}
                        menu={[
                            {
                                label: (
                                    <span className="flex items-center gap-2">
                                    <Pencil/>
                                    Edit
                                </span>
                                ),
                                action: () => {
                                    setSelectedAction({
                                        data: table,
                                        type: "edit"
                                    })
                                }
                            },
                            {
                                label: (
                                    <span className="flex items-center gap-2">
                                    <Trash2 className="text-red-600"/>
                                    Delete
                                </span>
                                ),
                                variant: "destructive",
                                action: () => {
                                    setSelectedAction({
                                        data: table,
                                        type: "delete"
                                    })
                                }
                            }
                        ]}/>
                ]
            }
        ))
    }, [tables])

    const totalPages = useMemo(() => {
        return tables && tables.count !== null ? Math.ceil(tables.count / currentLimit) : 0
    }, [tables])


    return (
        <div className="w-full">
            <div className="flex flex-col lg:flex-row mb-4 gap-2 justify-between w-full">
                <h1 className="text-2xl font-bold"> TABLE MANAGEMENT </h1>
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
                        <DialogCreateTable refetch={refetch}/>
                    </Dialog>
                </div>
            </div>
            <DataTable
                header={HEADER_TABLE_TABLE}
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