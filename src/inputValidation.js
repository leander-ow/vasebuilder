export function validateNumber(input) {
    input.value = input.value
        .replace(',', '.')
        .replace(/[^0-9.]/g, '');

    const parts = input.value.split('.');
    if (parts.length > 2) {
        input.value = parts[0] + '.' + parts.slice(1).join('');
    }
}

export function validateInteger(input) {
    input.value = input.value.replace(/[^0-9]/g, '');
}
