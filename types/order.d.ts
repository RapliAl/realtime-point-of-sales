import {Menu} from "@/types/menu";

export type OrderFormState = {
    status?: string;
    errors: {
        id?: string[];
        customer_name?: string[];
        status?: string[];
        _form?: string[];
    };
};

export type Cart = {
    menu_id: string;
    quantity: number;
    total: number;
    notes: string;
    menu: Menu;
    order_id?: number;
}