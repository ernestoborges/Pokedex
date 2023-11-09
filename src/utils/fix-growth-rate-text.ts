export function growthRateTextFix(text: string) {
    switch (text) {
        case "fast-then-very-slow": return "fluctuating";
        case "slow-then-very-fast": return "eratic";
        default: return text.split("-").join(" ")
    }
}