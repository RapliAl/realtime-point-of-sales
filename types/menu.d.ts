export type MenuFormState = {
    status?: string;
    errors: {
        id?: string[];
        name?: string[];
        description?: string[];
        price?: number[];
        discount?: number[];
        category?: string[];
        is_available?: string[];
        image_url?: string[];
        _form?: string[];
    };
};