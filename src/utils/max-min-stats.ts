export function maxStat(
    stat: string,
    base: number
) {

    if (stat === "hp") {
        let response = Math.floor(0.01 * (2 * base + 31 + Math.floor(0.25 * 255)) * 100) + 100 + 10
        return Math.floor(response)
    } else {
        let response = (Math.floor(0.01 * (2 * base + 31 + Math.floor(0.25 * 255)) * 100) + 5) * 1.1
        return Math.floor(response)
    }
}
export function minStat(
    stat: string,
    base: number
) {
    if (stat === "hp") {
        let response = Math.floor(0.01 * (2 * base) * 100) + 100 + 10
        return Math.floor(response)
    } else {
        let response = (Math.floor(0.01 * (2 * base) * 100) + 5) * 0.9
        return Math.floor(response)
    }
}


