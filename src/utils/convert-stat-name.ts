export function objectStatName(statName: string) {
    switch (statName) {
        case "attack": return "atk";
        case "defense": return "def";
        case "special-defense": return "sp_def";
        case "special-attack": return "sp_atk";
        default: return statName;
    }
}


export function shortenedStatName(statName: string){
    switch (statName) {
        case "attack": return "atk";
        case "defense": return "def";
        case "special-defense": return "sp.def";
        case "special-attack": return "sp.atk";
        default: return statName;
    }
}