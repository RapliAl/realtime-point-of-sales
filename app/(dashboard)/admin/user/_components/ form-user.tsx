import {FieldValues, Path, UseFormReturn} from "react-hook-form";
import {FormEvent} from "react";
import {Preview} from "@/types/general";
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
import FormImage from "@/components/common/form-image";
import FormSelect from "@/components/common/form-select";
import {ROLE_LISTS} from "@/constants/auth-constants";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";

export default function FormUser<T extends FieldValues>(
    {
        form,
        onSubmit,
        isLoading,
        type,
        preview,
        setPreview
    }: {
        form: UseFormReturn<T>;
        onSubmit: (event: FormEvent<HTMLFormElement>) => void;
        isLoading: boolean;
        type: "Create" | "Update";
        preview?: Preview
        setPreview?: (preview: Preview) => void;
    }) {
    return (
        <DialogContent className="sm:max-w-106.25">
            <Form {...form}>
                <DialogHeader>
                    <DialogTitle>
                        {type} User
                    </DialogTitle>
                    <DialogDescription>
                        {type === "Create" ? "Register a new User" : "Make Changes User Here"}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-4">
                    {type === "Create" &&
                        <FormInput
                            form={form}
                            type="email"
                            name={"email" as Path<T>}
                            label="Email"
                            placeholder="Insert Your Email Here"
                        />
                    }
                    <FormInput
                        form={form}
                        name={"name" as Path<T>}
                        label="Name"
                        placeholder="Insert Your Name"
                    />
                    <FormImage
                        form={form}
                        name={"avatar_url" as Path<T>}
                        label="Avatar"
                        preview={preview}
                        setPreview={setPreview}
                    />
                    <FormSelect
                        form={form}
                        name={"role" as Path<T>}
                        label="Role"
                        selectItem={ROLE_LISTS}
                    />
                    {type === "Create" &&
                        <FormInput
                            form={form}
                            name={"password" as Path<T>}
                            label="Password"
                            placeholder="Insert Your Password Here"
                        />
                    }
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            className="text-center hover:bg-blue-400 col-span-2"
                        >
                            {isLoading ?
                                <Loader2 className="animate-spin"/> : type}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>

    )
}