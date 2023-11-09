export function genderRateMale(rate: number) {
    return (8 - rate) / 8 * 100
}

export function genderRateFemale(rate: number) {
    return rate / 8 * 100
}