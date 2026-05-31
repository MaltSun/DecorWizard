function convertToSubcurrency(amount: number, factor: number) {
    return Math.round(amount * factor);
}

export default convertToSubcurrency;