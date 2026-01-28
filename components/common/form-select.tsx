import {FieldValues, Path, UseFormReturn} from "react-hook-form";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {cn} from "@/lib/utils";
import {Label} from "@/components/ui/label";


export default function FormSelect<T extends FieldValues>(
    {
        form,
        name,
        label,
        selectItem,
    }: {
        form: UseFormReturn<T>;
        name: Path<T>;
        label: string;
        placeholder?: string;
        type?: string;
        selectItem: { value: string; label: string; disabled?: boolean } [];
    }) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({field: {onChange, ...rest}}) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Select {...rest} onValueChange={onChange}>
                            <SelectTrigger
                                className={cn("w-full",
                                    {"border-red-500": form.formState.errors[name]?.message})}
                            >
                                <SelectValue placeholder={`Select ${label}`}>

                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>
                                        {label}
                                        {selectItem.map((item) => (
                                            <SelectItem
                                                key={item.label}
                                                value={item.value}
                                                disabled={item.disabled}
                                                className="capitalize"
                                            >
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectLabel>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage className="text-xs"/>
                </FormItem>
            )}
        />
    )
}