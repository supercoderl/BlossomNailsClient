export const sumPrice = (array) => {
    let total = 0;
    array.map((data) => {
        total += data.price;
    });
    return total;
}