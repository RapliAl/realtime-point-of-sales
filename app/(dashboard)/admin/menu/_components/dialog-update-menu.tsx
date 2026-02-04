import {zodResolver} from "@hookform/resolvers/zod";
import {INITIAL_STATE_UPDATE_USER} from "@/constants/auth-constants";
import {startTransition, useActionState, useEffect, useState} from "react";
import {toast} from "sonner";
import {useForm} from "react-hook-form";
import {updateUser} from "@/app/(dashboard)/admin/user/action";
import {Preview} from "@/types/general";
import FormUser from "@/app/(dashboard)/admin/user/_components/ form-user";
import {Profile} from "@/types/auth";
import {Dialog} from "@/components/ui/dialog";
import {updateMenu} from "@/app/(dashboard)/admin/menu/action";
import {MenuForm, menuFormSchema} from "@/validations/validation-menu";
import {INITIAL_STATE_MENU} from "@/constants/menu-constants";
import {Menu} from "@/types/menu";
import FormMenu from "@/app/(dashboard)/admin/menu/_components/form-menu";

export default function DialogUpdateMenu(
    {
        refetch,
        currentData,
        handleChangeAction,
        open
    }: {
        refetch: () => void,
        currentData?: Menu,
        open?: boolean,
        handleChangeAction?: (open: boolean) => void
    }) {
    const form = useForm<MenuForm>({
        resolver: zodResolver(menuFormSchema),
    });

    const [updateMenuState, updateMenuAction, isPendingUpdateMenu] =
        useActionState(updateMenu, INITIAL_STATE_MENU)

    const [preview, setPreview] = useState<Preview | undefined>(undefined)

    const onSubmit = form.handleSubmit(async (data) => {
        const formData = new FormData();

        if (currentData?.image_url !== data.image_url) {
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, key === "image_url" ? preview?.file ?? "" : value);
            });
            formData.append("old_image_url", currentData?.image_url ?? "");
        } else {
            Object.entries(data).forEach(([Key, value]) => {
                formData.append(Key, value)
            });
        }
        formData.append("id", currentData?.id ?? "")

        startTransition(() => {
            updateMenuAction(formData);
        });
    })

    useEffect(() => {
        if (updateMenuState?.status === 'error') {
            toast.error('Update User Failed', {
                description: updateMenuState.errors?._form?.[0]
            });
        }

        if (updateMenuState?.status === "success") {
            toast.success("User Updated Successfully");
            form.reset();
            handleChangeAction?.(false);
            refetch();
        }
    }, [updateMenuState])

    useEffect(() => {
        if (currentData) {
            form.setValue("name", currentData.name as string)
            form.setValue("description", currentData.description as string)
            form.setValue("price", currentData.price.toString())
            form.setValue("discount", currentData.discount.toString())
            form.setValue("category", currentData.category as string)
            form.setValue("is_available", currentData.is_available.toString())
            form.setValue("image_url", currentData.image_url as string)
            setPreview({
                file: new File([], currentData.image_url as string),
                displayUrl: currentData.image_url as string
            })
        }
    }, [currentData]);
    return (
        <Dialog open={open} onOpenChange={handleChangeAction}>
            <FormMenu
                form={form}
                onSubmit={onSubmit}
                isLoading={isPendingUpdateMenu}
                type={"Update"}
                preview={preview}
                setPreview={setPreview}
            />
        </Dialog>
    );
}