import DialogDelete from "@/components/common/dialog-delete";
import {startTransition, useActionState, useEffect} from "react";
import {toast} from "sonner";
import {deleteTable} from "@/app/(dashboard)/admin/table/action";
import {INITIAL_STATE_TABLE} from "@/constants/table-constants";
import {Table} from "@/validations/table-validation";

export default function DialogDeleteTable(
    {
        open,
        refetch,
        currentData,
        handleChangeAction
    }: {
        open: boolean,
        refetch: () => void,
        currentData?: Table;
        handleChangeAction: (open: boolean) => void
    }) {

    const [deleteTableState, deleteTableAction, isPendingDeleteTable] = useActionState(
        deleteTable, INITIAL_STATE_TABLE
    );

    const onSubmit = () => {
        const formData = new FormData();
        formData.append("id", currentData!.id as string);

        startTransition(() => {
            deleteTableAction(formData);
        });
    }

    useEffect(() => {
        if (deleteTableState?.status === 'error') {
            toast.error('Delete Table Failed', {
                description: deleteTableState.errors?._form?.[0]
            });
        }

        if (deleteTableState?.status === "success") {
            toast.success("Table Updated Successfully");
            handleChangeAction?.(false);
            refetch();
        }
    }, [deleteTableState])

    return (
        <DialogDelete
            open={open}
            onOpenChange={handleChangeAction}
            onSubmit={onSubmit}
            isLoading={isPendingDeleteTable}
            title="User"
        />
    )
}