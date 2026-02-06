import {zodResolver} from "@hookform/resolvers/zod";
import {startTransition, useActionState, useEffect, useState} from "react";
import {toast} from "sonner";
import {useForm} from "react-hook-form";
import {Preview} from "@/types/general";
import {createMenu} from "@/app/(dashboard)/admin/menu/action";
import {MenuForm, menuFormSchema} from "@/validations/validation-menu";
import {INITIAL_MENU, INITIAL_STATE_MENU} from "@/constants/menu-constants";
import FormMenu from "@/app/(dashboard)/admin/menu/_components/form-menu";

export default function DialogCreateMenu({refetch}: { refetch: () => void }) {
    const form = useForm<MenuForm>({
        resolver: zodResolver(menuFormSchema),
        defaultValues: INITIAL_MENU
    });

    const [createMenuState, createMenuAction, isPendingCreateUser] =
        useActionState(createMenu, INITIAL_STATE_MENU)

    const [preview, setPreview] = useState<Preview | undefined>(undefined)

    const onSubmit = form.handleSubmit(async (data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, key === "image_url" ? preview?.file ?? "" : value);
        });
        startTransition(() => {
            createMenuAction(formData);
        });
    })

    useEffect(() => {
        if (createMenuState?.status === 'error') {
            toast.error('Create Menu Failed', {
                description: createMenuState.errors?._form?.[0]
            });
        }

        if (createMenuState?.status === "success") {
            toast.success("Menu Created Successfully");
            form.reset();
            setPreview(undefined);
            document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
            refetch();
        }
    }, [createMenuState])

    return (
        <FormMenu
            form={form}
            onSubmit={onSubmit}
            isLoading={isPendingCreateUser}
            type={"Create"}
            preview={preview}
            setPreview={setPreview}
        />
    );
}