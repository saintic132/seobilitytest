export const validatorFormData = (dataField: string, value: string) => {
    switch (dataField) {
        case 'name': {
            if (!/^[a-z]{3,30} [a-z]{3,30}$/i.test(value)) {
                return {[dataField]: 'First and Last name min 3 and max 30 letters'}
            } else {
                return {[dataField]: ''}
            }
        }
        case 'email': {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                return {[dataField]: 'Invalid email address'}
            } else {
                return {[dataField]: ''}
            }
        }
        case 'phone': {
            if (!/^[(]\d{3}[)]\s\d{3}[-]\d{2}[-]\d{2}/g.test(value)) {
                return {[dataField]: 'Accepted only numeric number, e.g. +7 (495) 555-55-55'}
            } else {
                return {[dataField]: ''}
            }
        }
        case 'message': {
            if (value.length > 0 && value.length < 10) {
                return {[dataField]: 'Min 10 letters'}
            } else if (value.length === 300) {
                return {[dataField]: 'Max 300 letters'}
            } else {
                return {[dataField]: ''}
            }
        }
    }
}