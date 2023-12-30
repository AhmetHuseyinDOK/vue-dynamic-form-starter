import type { IField } from "./DynamicComponent.vue"

export function validate(fields: IField<any>[], data: { [name: string]: any }, errors: { [name: string]: any }) {
    for (const field of fields) {
        if ('validate' in field) {
            errors[field.name] = field.validate!(data[field.name])
        }

        if ('children' in field) {
            validate(field.children!, data, errors)
        }
    }
}

export function isValid(fields: IField<any>[], data: { [name: string]: any }, errors: { [name: string]: any }) {
    validate(fields, data, errors);
    return isValidRec(errors)
}

export function isValidRec(errors: { [name: string]: any }) {
    for (const err of Object.values(errors)) {
        if (typeof err == "object") {
            let valid = isValidRec(err);
            if (!valid) {
                return false;
            }
        }

        if (err != null) {
            return false;
        }
    }
    return true;
}