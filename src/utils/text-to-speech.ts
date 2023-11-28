export async function textToSpeech(
    string: string
) {

    let text = string.split(". ").join(".").split(", ").join(",")
    let ttsList: string[] = []

    if (text.length > 100) {
        while (text.length > 100) {
            let newText = text.split(".")
            let slice = newText.pop()
            while ((slice === "" || !slice) && newText.length > 0) {
                slice = newText.pop()
            }
            while (slice!.length > 100) {
                let commaSplit = slice!.split(",")
                let commaSlice = commaSplit.pop()!

                if(commaSlice.length > 100){
                    let spaceSplit = commaSlice.split(" ")
                    let arr = []
                    for(let i = 0; i < (spaceSplit.length - 1)/2; i++){
                        arr.unshift(spaceSplit.pop())
                    }
                    ttsList.unshift(arr.join(" "))
                    ttsList.unshift(spaceSplit.join(" "))
                }

                newText.push(commaSplit.shift()!)
                slice = commaSplit.join(",")
            }
            text = newText.join(".")
            ttsList.unshift(slice!)
        }
        ttsList.unshift(text)
    } else {
        ttsList.push(text)
    }
    return ttsList.filter(s => s !== "")
};