import DialogDelete from "@/components/common/dialog-delete";
import {startTransition, useActionState, useEffect} from "react";
import {toast} from "sonner";
import {Menu} from "@/types/menu";
import {INITIAL_STATE_MENU} from "@/constants/menu-constants";
import {deleteMenu} from "@/app/(dashboard)/admin/menu/action";

export default function DialogDeleteMenu(
    {
        open,
        refetch,
        currentData,
        handleChangeAction
    }: {
        open: boolean,
        refetch: () => void,
        currentData?: Menu;
        handleChangeAction: (open: boolean) => void
    }) {

    const [deleteMenuState, deleteMenuAction, isPendingDeleteMenu] = useActionState(deleteMenu, INITIAL_STATE_MENU);

    const onSubmit = () => {
        const formData = new FormData();
        formData.append("id", currentData!.id as string);
        formData.append("image_url", currentData!.image_url as string);

        startTransition(() => {
            deleteMenuAction(formData);
        });
    }

    useEffect(() => {
        if (deleteMenuState?.status === 'error') {
            toast.error('Delete Menu Failed', {
                description: deleteMenuState.errors?._form?.[0]
            });
        }

        if (deleteMenuState?.status === "success") {
            toast.success("Menu Updated Successfully");
            handleChangeAction?.(false);
            refetch();
        }
    }, [deleteMenuState])

    return (
        <DialogDelete
            open={open}
            onOpenChange={handleChangeAction}
            onSubmit={onSubmit}
            isLoading={isPendingDeleteMenu}
            title="User"
        />
    )
}