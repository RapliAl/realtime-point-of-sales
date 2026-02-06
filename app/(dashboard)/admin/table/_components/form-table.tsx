import {FieldValues, Path, UseFormReturn} from "react-hook-form";
import {FormEvent} from "react";
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
import FormSelect from "@/components/common/form-select";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import {STATUS_LISTS} from "@/constants/table-constants";

export default function FormTable<T extends FieldValues>(
    {
        form,
        onSubmit,
        isLoading,
        type,
    }: {
        form: UseFormReturn<T>;
        onSubmit: (event: FormEvent<HTMLFormElement>) => void;
        isLoading: boolean;
        type: "Create" | "Update";
    }) {
    return (
        <DialogContent className="sm:max-w-106.25 max-h-[90vh] ">
            <Form {...form}>
                <DialogHeader>
                    <DialogTitle>
                        {type} Table
                    </DialogTitle>
                    <DialogDescription>
                        {type === "Create" ? "Add a new table" : "Make Changes Table Here"}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-4 max-h-[50vh] px-1 overflow-y-auto">
                        <FormInput
                            form={form}
                            name={"name" as Path<T>}
                            label="Name"
                            placeholder="Insert a Table Name"
                            type="textarea"
                        />

                        <FormInput
                            form={form}
                            name={"description" as Path<T>}
                            label="Description"
                            placeholder="Insert a Description"
                        />

                        <FormInput
                            form={form}
                            name={"capacity" as Path<T>}
                            label="Capacity"
                            placeholder="Insert a Capacity"
                            type="number"
                        />

                        <FormSelect
                            form={form}
                            name={"status" as Path<T>}
                            label="Status"
                            selectItem={STATUS_LISTS}
                        />
                    </div>
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