"use server";

import uploadFile from "@/actions/storage-actions";
import {createClient} from "@/lib/supabase/server";
import {menuSchema} from "@/validations/validation-menu";
import {MenuFormState} from "@/types/menu";

export async function createMenu(prevState: MenuFormState, formData: FormData) {
    let validatedFields = menuSchema.safeParse({
        name: formData.get("name"),
        description: formData.get("description"),
        price: parseFloat(formData.get("price") as string),
        discount: parseFloat(formData.get("discount") as string),
        category: formData.get("category"),
        is_available: formData.get("is_available") === "true",
        image_url: formData.get("image_url"),
    });

    if (!validatedFields.success) {
        return {
            status: 'error',
            errors: {
                ...validatedFields.error.flatten().fieldErrors,
                _form: [],
            }
        };
    }

    if (validatedFields.data.image_url instanceof File) {
        const {errors, data} = await uploadFile("images", "menus", validatedFields.data.image_url);

        if (errors) {
            return {
                status: 'error',
                errors: {
                    ...prevState.errors,
                    _form: [...errors._form],
                }
            };
        }

        validatedFields = {
            ...validatedFields,
            data: {
                ...validatedFields.data,
                image_url: data.url
            }
        }
    }

    const supabase = await createClient();

    const {error} = await supabase.from("menus").insert({
        name: validatedFields.data.name,
        description: validatedFields.data.description,
        price: validatedFields.data.price,
        discount: validatedFields.data.discount,
        category: validatedFields.data.category,
        image_url: validatedFields.data.image_url,
        is_available: validatedFields.data.is_available,
    });

    if (error) {
        return {
            status: 'error',
            errors: {
                ...prevState.errors,
                _form: [error.message],
            },
        };
    }

    return {
        status: "success",
        errors: {
            _form: [],
            name: undefined,
            description: undefined,
            price: undefined,
            discount: undefined,
            category: undefined,
            image_url: undefined,
            is_available: undefined,
        }
    }
}

export async function updateMenu(prevState: MenuFormState, formData: FormData) {
    let validatedFields = menuSchema.safeParse({
        name: formData.get("name"),
        description: formData.get("description"),
        price: parseFloat(formData.get("price") as string),
        discount: parseFloat(formData.get("discount") as string),
        category: formData.get("category"),
        is_available: formData.get("is_available") === "true",
        image_url: formData.get("image_url"),
    });

    if (!validatedFields.success) {
        return {
            status: 'error',
            errors: {
                ...validatedFields.error.flatten().fieldErrors,
                _form: [],
            }
        };
    }

    if (validatedFields.data.image_url instanceof File) {
        const oldImageUrl = formData.get("old_image_url") as string;
        const {errors, data} = await uploadFile(
            "images",
            "menus",
            validatedFields.data.image_url,
            oldImageUrl.split("/images/") [1]
        );

        if (errors) {
            return {
                status: 'error',
                errors: {
                    ...prevState.errors,
                    _form: [...errors._form],
                }
            };
        }

        validatedFields = {
            ...validatedFields,
            data: {
                ...validatedFields.data,
                image_url: data.url
            }
        }
    }

    const supabase = await createClient();

    const {error} = await supabase.from("menus").update({
        name: validatedFields.data.name,
        description: validatedFields.data.description,
        price: validatedFields.data.price,
        discount: validatedFields.data.discount,
        category: validatedFields.data.category,
        image_url: validatedFields.data.image_url,
        is_available: validatedFields.data.is_available,
    }).eq("id", formData.get("id"));

    if (error) {
        return {
            status: 'error',
            errors: {
                ...prevState.errors,
                _form: [error.message],
            },
        };
    }

    return {
        status: "success",
        errors: {
            _form: [],
            name: undefined,
            description: undefined,
            price: undefined,
            discount: undefined,
            category: undefined,
            image_url: undefined,
            is_available: undefined,
        }
    }
}
