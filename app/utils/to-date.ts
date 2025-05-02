import { parseDate } from '@internationalized/date';

export default function(date?: string) {
    if (!date) {
        return null;
    }
    return parseDate(date);
}