export default function (age: {years?: number, months?: number}) {
    if (!age) {
        return;
    }
    if (age.years === 0) {
        return `${age.months} mois`;
    }
    return `${age.years} an${age.years > 1 ? 's' : ''} ${age.months} mois`;
}