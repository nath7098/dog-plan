
export const calculAge = (birthDate: Date) => {
    if (!birthDate) {
        return;
    }
    const dob = new Date(birthDate);
    const today = new Date();
    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();

    if (months < 0 || (months === 0 && today.getDate() < dob.getDate())) {
        years--;
        months = 12 + months + +(months === 0);
        return {years, months};
    }

    return {years, months};
};

export const ageToString = (age: {years?: number, months?: number}) => {
    if (!age) {
        return;
    }
    if (age.years === 0) {
        return `${age.months} mois`;
    }
    return `${age.years} an${age.years > 1 ? 's' : ''} ${age.months} mois`;
};