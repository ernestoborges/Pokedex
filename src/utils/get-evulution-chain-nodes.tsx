import { getIdFromSpecieURL } from "./get-id-from-specie-url"

export function getEvolutionChainNodes(pokemon: any) {

    const evoNodes: any = []
    handleChain(pokemon.evo_chain_data.chain, 1)
    function handleChain(chain: any, chainLevel: number) {

        if (chain.evolves_to.length > 0) {
            chain.evolves_to.forEach((c: any) => {
                handleChain(c, chainLevel + 1)
            })
        }
        let id = getIdFromSpecieURL(chain.species.url)
        if (Number(id) <= 807) {
            let newChain = {
                id: id,
                chain_level: chainLevel,
                ...chain
            }
            evoNodes.push(newChain)
        }
    }

    return evoNodes
}