import {zodResolver} from "@hookform/resolvers/zod";
import {startTransition, useActionState, useEffect, useState} from "react";
import {toast} from "sonner";
import {useForm} from "react-hook-form";
import {Preview} from "@/types/general";
import {Dialog} from "@/components/ui/dialog";
import {updateTable} from "@/app/(dashboard)/admin/menu/action";
import {TableForm} from "@/validations/validation-menu";
import {INITIAL_STATE_MENU} from "@/constants/menu-constants";
import {Table} from "@/types/menu";
import FormTable from "@/app/(dashboard)/admin/menu/_components/form-menu";
import {tableSchema} from "@/validations/table-validation";

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
        resolver: zodResolver(tableSchema),
    });

    const [updateTableState, updateTableAction, isPendingUpdateTable] =
        useActionState(updateTable, INITIAL_STATE_MENU)

    const [preview, setPreview] = useState<Preview | undefined>(undefined)

    const onSubmit = form.handleSubmit(async (data) => {
        const formData = new FormData();

        if (currentData?.id !== data.id) {
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, key === "id" ? preview?.file ?? "" : value);
            });
            formData.append("old_image_url", currentData?.image_url ?? "");
        } else {
            Object.entries(data).forEach(([Key, value]) => {
                formData.append(Key, value)
            });
        }
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
            form.setValue("capacity", currentData.capacity as string)
            form.setValue("status", currentData.status.toString())
        }
    }, [currentData]);

    return (
        <Dialog open={open} onOpenChange={handleChangeAction}>
            <FormTable
                form={form}
                onSubmit={onSubmit}
                isLoading={isPendingUpdateTable}
                type={"Update"}
                preview={preview}
                setPreview={setPreview}
            />
        </Dialog>
    );
}