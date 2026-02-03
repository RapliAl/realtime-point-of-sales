export const HEADER_TABLE_MENU = [
    "No",
    "Name",
    "Category",
    "Price",
    "Available",
    "Actions"
]

export const CATEGORY_LISTS = [
    {
        value: "beverages",
        label: "Beverages",
    },
    {
        value: "mains",
        label: "Mains",
    },
    {
        value: "snacks",
        label: "Snacks",
    }
]

export const AVAILABILITY_LISTS = [
    {
        value: "true",
        label: "Available",
    },
    {
        value: "false",
        label: "Not Available",
    },
]

export const INITIAL_MENU = {
    name: "",
    description: "",
    price: "",
    discount: "",
    category: "",
    image_url: "",
    is_available: "true",
}

export const INITIAL_STATE_MENU = {
    status: "idle",
    errors: {
        id: [],
        name: [],
        description: [],
        price: [],
        discount: [],
        category: [],
        is_available: [],
        image_url: [],
        _form: [],
    },
};