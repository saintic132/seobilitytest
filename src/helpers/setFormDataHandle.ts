import React from "react";
import {formattedPhoneNumber} from "./formattedPhoneNumber";
import {validatorFormData} from "./validatorFormData";

const helpValidator = (value: string, field: string) => {
    return value
        ? validatorFormData(field, value)
        : {[field]: ''}
}

export const setFormDataHandle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    switch (e.currentTarget.dataset.field) {
        case 'name': {
            return {
                data: {[e.currentTarget.dataset.field]: e.currentTarget.value.toUpperCase()},
                error: helpValidator(e.currentTarget.value, e.currentTarget.dataset.field)
            }
        }
        case 'email': {
            return {
                data: {[e.currentTarget.dataset.field]: e.currentTarget.value},
                error: helpValidator(e.currentTarget.value, e.currentTarget.dataset.field)
            }
        }
        case 'phone': {
            return {
                data: {[e.currentTarget.dataset.field]: formattedPhoneNumber(e.currentTarget.value, e.currentTarget.selectionStart)},
                error: helpValidator(e.currentTarget.value, e.currentTarget.dataset.field)
            }
        }
        case 'birthday': {
            return {
                data: {[e.currentTarget.dataset.field]: e.currentTarget.value},
            }
        }
        case 'message': {
            return {
                data: {[e.currentTarget.dataset.field]: e.currentTarget.value},
                error: helpValidator(e.currentTarget.value, e.currentTarget.dataset.field)
            }
        }
    }
}