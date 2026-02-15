import {INITIAL_STATE_ACTION} from "@/constants/general-constant";

export const HEADER_TABLE_ORDER = [
    "No",
    "Order Id",
    "Customer Name",
    "Table",
    "Status",
    "Actions"
]

export const INITIAL_ORDER = {
    customer_name: "",
    table_id: "",
    status: "",
}

export const INITIAL_STATE_ORDER = {
    status: "idle",
    errors: {
        customer_name: [],
        table_id: [],
        status: [],
        _form: []
    }
}

export const STATUS_CREATE_ORDER = [
    {
        value: "reserved",
        label: "Reserved"
    },
    {
        value: "process",
        label: "Process"
    },
];

export const HEADER_TABLE_DETAIL_ORDER = [
    "No",
    "Menu",
    "Total",
    "Status",
    "Actions"
]

export const FILTER_MENU = [
    {
        value: "",
        label: "All"
    },
    {
        value: "mains",
        label: "Mains"
    },
    {
        value: "beverages",
        label: "Beverage"
    },
    {
        value: "snacks",
        label: "Snacks"
    },
    {
        value: "desserts",
        label: "Desserts"
    },
]

export const INITIAL_STATE_GENERATE_PAYMENT = {
    ...INITIAL_STATE_ACTION,
    data: {
        payment_token: "",
    }
}