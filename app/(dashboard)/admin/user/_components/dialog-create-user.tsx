import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Form} from "@/components/ui/form";
import FormInput from "@/components/common/form-input";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import {CreateUserForm, createUserSchema} from "@/validations/auth-validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    INITIAL_CREATE_USER_FORM,
    INITIAL_STATE_CREATE_USER, ROLE_LISTS,
} from "@/constants/auth-constants";
import {startTransition, useActionState, useEffect} from "react";
import {toast} from "sonner";
import {useForm} from "react-hook-form";
import {createUser} from "@/app/(dashboard)/admin/user/action";
import FormSelect from "@/components/common/form-select";

export default function DialogCreateUser({refetch}: { refetch: () => void }) {
    const form = useForm<CreateUserForm>({
        resolver: zodResolver(createUserSchema),
        defaultValues: INITIAL_CREATE_USER_FORM
    });

    const [createUserState, createUserAction, isPendingCreateUser] =
        useActionState(createUser, INITIAL_STATE_CREATE_USER)

    const onSubmit = form.handleSubmit(async (data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });
        startTransition(() => {
            createUserAction(formData);
        });
    })

    useEffect(() => {
        if (createUserState?.status === 'error') {
            toast.error('Create User Failed', {
                description: createUserState.errors?._form?.[0]
            });
        }

        if (createUserState?.status === "success") {
            toast.success("User Created Successfully");
            form.reset();
            document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
            refetch()
        }
    }, [createUserState])

    return (
        <DialogContent className="sm:max-w-106.25">
            <Form {...form}>
                <DialogHeader>
                    <DialogTitle>Create User</DialogTitle>
                    <DialogDescription>
                        Register a new User Account
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-4">
                    <FormInput
                        form={form}
                        type="email"
                        name="email"
                        label="Email"
                        placeholder="Insert Your Email Here"
                    />
                    <FormInput
                        form={form}
                        name="name"
                        label="Name"
                        placeholder="Insert Your Name"
                    />
                    <FormSelect
                        form={form}
                        name="role"
                        label="Role"
                        selectItem={ROLE_LISTS}
                    />
                    <FormInput
                        form={form}
                        type="password"
                        name="password"
                        label="Password"
                        placeholder="Insert Your Password Here"
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            className="text-center hover:bg-blue-400 col-span-2"
                        >
                            {isPendingCreateUser ?
                                <Loader2 className="animate-spin"/> : "Create"}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
}