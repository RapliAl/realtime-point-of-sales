export const HEADER_TABLE_TABLE = [
    "No",
    "Name",
    "Capacity",
    "Status",
    "Actions"
]

export const INITIAL_TABLE = {
    name: "",
    description: "",
    capacity: "",
    status: "true",
}

export const INITIAL_STATE_TABLE = {
    status: "idle",
    errors: {
        id: [],
        name: [],
        description: [],
        capacity: [],
        status: [],
        _form: [],
    },
};

export const STATUS_LISTS = [
    {
        value: "available",
        label: "Available",
    },
    {
        value: "unavailable",
        label: "Unavailable",
    },
    {
        value: "reserved",
        label: "Reserved",
    },
]
