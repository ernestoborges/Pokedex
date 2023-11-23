export function getIdFromSpecieURL(url: string){

    let id = url.split("pokemon-species/")[1].split("/")[0]
    return id
}