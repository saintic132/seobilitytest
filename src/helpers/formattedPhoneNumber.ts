export const formattedPhoneNumber = (value: string, selectValue: number | null) => {
    let inputValue = value.replace(/\D/g, '')
    let formattedInput = ''

    if (value.length !== selectValue) {
        return value
    }
    if (inputValue.length === 1) {
        formattedInput += '(' + inputValue
    }
    if (inputValue.length > 1) {
        formattedInput += '(' + inputValue.substring(0, 3)
    }
    if (inputValue.length >= 4) {
        formattedInput += ') ' + inputValue.substring(3, 6)
    }
    if (inputValue.length >= 7) {
        formattedInput += '-' + inputValue.substring(6, 8)
    }
    if (inputValue.length >= 9) {
        formattedInput += '-' + inputValue.substring(8, 10)
    }
    return formattedInput
}