import {today, getLocalTimeZone, parseDate} from '@internationalized/date';
type BagInfo = {
    percentage: number;
    display: number
}

export default function (bag?: Food, mealQuantity?: number): BagInfo {
    if (!bag || !mealQuantity) {
        return;
    }
    const daysOpenBag = today(getLocalTimeZone()).compare(parseDate(bag.openDate));
    const quantityUsed = daysOpenBag * mealQuantity;
    const percentage = quantityUsed * 100 / (bag.weight * 1000);
    return {percentage, display: Math.min(Math.ceil(percentage / 10) * 10, 100)};
}