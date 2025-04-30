type BagInfo = {
    percentage: number;
    display: number
}

export default function (bag?: Food): BagInfo {
    if (!bag) {
        return;
    }
    const daysOpenBag = Math.ceil((new Date().getTime() - bag.openDate.getTime()) / (1000 * 3600 * 24));
    const quantityUsed = daysOpenBag * props.mealQuantity;
    const percentage = quantityUsed * 100 / (bag.weight * 1000);
    return {percentage, display: Math.min(Math.ceil(percentage / 10) * 10, 100)};
}