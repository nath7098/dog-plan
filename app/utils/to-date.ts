import { parseDate } from '@internationalized/date';

export default function(date: string) {
    return parseDate(date);
}