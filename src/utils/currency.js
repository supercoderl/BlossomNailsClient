export const formatCurrency = (price, local, type) => {
    const defaultValue = "en-GB";
    const defaultType = "EUR";
    if (price && price > 0) {
        return price.toLocaleString(local || defaultValue, {
            style: 'currency',
            currency: type || defaultType,
            maximumFractionDigits: 0
        });
    }
    return "€0";
};