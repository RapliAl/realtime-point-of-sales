export type OrderFormState = {
    status?: string;
    errors: {
        id?: string[];
        customer_name?: string[];
        status?: string[];
        _form?: string[];
    };
};