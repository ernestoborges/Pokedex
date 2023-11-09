export function fixTextCharacters(text: string) {
    let arr = text.split("")
    let validCharacters = "áàãâéèêíìîòóôõùúûüäëïöç"
    let response = arr.map(l => {
        if (validCharacters.includes(l)) {
            return convertLetter(l)
        }
        return l

    })
    return response.join("")
}

function convertLetter(l: string) {
    switch (l) {
        case "á":
        case "à":
        case "ã":
        case "ä":
        case "â": return "a"
        case "é":
        case "è":
        case "ê":
        case "ë": return "e"
        case "ì":
        case "í":
        case "î":
        case "ï": return "i"
        case "ò":
        case "ó":
        case "ô":
        case "õ":
        case "ö": return "o"
        case "ú":
        case "ù":
        case "û":
        case "ü": return "u"
        case "ç": return "c"
        default: return " "
    }
}