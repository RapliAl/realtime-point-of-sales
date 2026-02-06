import {zodResolver} from "@hookform/resolvers/zod";
import {startTransition, useActionState, useEffect} from "react";
import {toast} from "sonner";
import {useForm} from "react-hook-form";
import {Dialog} from "@/components/ui/dialog";
import {updateTable} from "@/app/(dashboard)/admin/table/action";
import FormTable from "@/app/(dashboard)/admin/table/_components/form-table";
import {Table, TableForm, tableFormSchema} from "@/validations/table-validation";
import {INITIAL_STATE_TABLE} from "@/constants/table-constants";

export default function DialogUpdateTable(
    {
        refetch,
        currentData,
        handleChangeAction,
        open
    }: {
        refetch: () => void,
        currentData?: Table,
        open?: boolean,
        handleChangeAction?: (open: boolean) => void
    }) {
    const form = useForm<TableForm>({
        resolver: zodResolver(tableFormSchema),
    });

    const [updateTableState, updateTableAction, isPendingUpdateTable] =
        useActionState(updateTable, INITIAL_STATE_TABLE)

    const onSubmit = form.handleSubmit(async (data) => {
        const formData = new FormData();

        Object.entries(data).forEach(([Key, value]) => {
            formData.append(Key, value)
        });

        formData.append("id", currentData?.id ?? "")

        startTransition(() => {
            updateTableAction(formData);
        });
    })

    useEffect(() => {
        if (updateTableState?.status === 'error') {
            toast.error('Update Table Failed', {
                description: updateTableState.errors?._form?.[0]
            });
        }

        if (updateTableState?.status === "success") {
            toast.success("Table Updated Successfully");
            form.reset();
            handleChangeAction?.(false);
            refetch();
        }
    }, [updateTableState])

    useEffect(() => {
        if (currentData) {
            form.setValue("name", currentData.name as string)
            form.setValue("description", currentData.description as string)
            form.setValue("capacity", currentData.capacity.toString())
            form.setValue("status", currentData.status)
        }
    }, [currentData]);

    return (
        <Dialog open={open} onOpenChange={handleChangeAction}>
            <FormTable
                form={form}
                onSubmit={onSubmit}
                isLoading={isPendingUpdateTable}
                type={"Update"}
            />
        </Dialog>
    );
}