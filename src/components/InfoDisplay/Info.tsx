import styled from "styled-components"
import { usePokemonList } from "../../providers/PokemonListProvider"
import { fixedNameMap } from "../../utils/pokemons-fixed-names"
import { PokemonTypeLabel } from "../PokemonTypeLabel"
import { AiFillStar } from "react-icons/ai"

export function Info() {

    const { selectedPokemon: pokemon, isShiny } = usePokemonList()

    let fixedName
    if (pokemon.name.includes("-")) {
        const data = fixedNameMap.get(pokemon.name)
        fixedName = data!.name
    }

    let pictureURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${isShiny ? "shiny/" : ""}${pokemon.id}.png`
    let footprintURL = `https://veekun.com/dex/media/pokemon/footprints/${pokemon.id}.png`
    let defaultFootprintURL = `https://veekun.com/dex/media/pokemon/footprints/11.png`

    return <>
        <Section>
            <LeftSection>
                <Picture>
                    <div>
                        <span>
                            {isShiny ? "✨" : ""}
                        </span>
                        <img
                            src={pictureURL}
                            alt={`${pokemon.name} Pokemon picture`}

                        />
                    </div>
                </Picture>
                <Abilities>
                    <div>
                        <header>ABILITIES</header>
                        <section>
                            <ul>
                                {
                                    pokemon.abilities.map((item: any, index: number) =>
                                        <li key={index}>
                                            {item.is_hidden && <AiFillStar />}
                                            {item.ability.name.split("-").join(" ")}
                                        </li>
                                    )

                                }
                            </ul>
                        </section>
                    </div>
                </Abilities>
            </LeftSection>
            <RightSection>
                <MainInfo>
                    <div>
                        <ul>
                            <li>
                                <span>NAME:</span><span>{fixedName ? fixedName : pokemon.name.toUpperCase()}</span>
                            </li>
                            <li>
                                <span>ID:</span><span>{pokemon.id.toString().padStart(3, "0")}</span>
                            </li>
                            <li>
                                <span>TYPE:</span>
                                <span>
                                    {
                                        pokemon.types.map((item: any, index: number) =>
                                            <PokemonTypeLabel key={index} type={item.type.name} />
                                        )
                                    }
                                </span>
                            </li>
                        </ul>
                    </div>
                </MainInfo>
                <div>
                    <Size>
                        <div>
                            <ul>
                                <li>
                                    <span>WEIGHT:</span><span>{(pokemon.weight / 10).toFixed(1)} <span>KG</span></span>
                                </li>
                                <li>
                                    <span>HEIGHT:</span><span>{pokemon.height.toFixed(1)} <span>M</span></span>
                                </li>
                            </ul>
                        </div>
                    </Size>
                    <Footprint>
                        <div>
                            <header>FOOTPRINT</header>
                            <footer>
                                <img
                                    src={footprintURL}
                                    alt={`${pokemon.name} Pokemon footprint`}
                                    onError={(e: React.SyntheticEvent) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = defaultFootprintURL;
                                    }}
                                />
                            </footer>
                        </div>
                    </Footprint>
                </div>
            </RightSection>
        </Section>
    </>
}

const Section = styled.section`
    display: flex;
    gap: 0.6rem;
    align-items: flex-start;
    justify-content: space-around;
    flex-grow: 1;
    padding: 0.6rem;
    text-transform: uppercase;
`

const LeftSection = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
`

const RightSection = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & > div:nth-child(2){
        display: flex;
        gap: 0.4rem;
    }
`

const Picture = styled.div`
    width: 100%;
    background-color: var(--gray);
    border-radius: 0.5rem 2.5rem 0.5rem 2.5rem;
    border: 0.2rem solid var(--dark-gray);
    padding: 0.2rem;
    
    & > div {
        background-color: white;
        border-radius: 0.5rem 2.5rem 0.5rem 2.5rem;
        border: 0rem solid var(--dark-gray);
        display: flex;
        justify-content: center;
        overflow: hidden;
        position: relative;

        & > span {
            position: absolute;
            top: 0;
            left: 0;
            font-size: 2rem;
        }

        & > img {
            width: 9rem;
            height: 9rem;
            transform: scaleX(-1)
        }
    }
`

const Canva = styled.article`
    border: 0.2rem solid var(--dark-gray);
    background-color: var(--gray);
    padding: 0.3rem;
    border-radius: 0.4rem;
    text-shadow: 
        0px 1px 0px var(--game-font-shadow),
        1px 0px 0px var(--game-font-shadow),
        1px 1px 0px var(--game-font-shadow)
    ;

    & > div {
        background-color: var(--light-gray);
        border-radius: 0.4rem;
        padding: 1rem;
        padding-bottom: 0.6rem;

        & > ul {
            display: flex;
            flex-direction: column;
            gap:1rem;

            & > li {
                border-bottom: 0.2rem dashed gray;
                display: flex;
                justify-content: space-between;

                & > span {
                    display: flex;
                    align-items: flex-end;
                    gap: 0.4rem;
                    & > span {
                        width: 1.4rem;
                        display: flex;
                    }
                }
            }
        }
    }
`

const MainInfo = styled(Canva)`
    width: 20rem;

    & li:last-child{
        border: none;
        align-items: center;
    }
`

const Abilities = styled(Canva)`
    width: 100%;
    flex-grow: 1;
    display: flex;

    & > div {
        background-color: transparent;
        width: 100%;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.4rem;

        & > header {
            width: 100%;
            background-color: var(--light-gray);
            letter-spacing: 0;
            line-height: 1rem;
            padding: 0.1rem;
            padding-top: 0.2rem;
        }

        & > section {
            width: 100%;
            flex-grow: 1;
            background-color: white;
            padding: 0.3rem 0.1rem 0.1rem;
            
            & > ul {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;

                & > li {
                    width: 100%;
                    display: flex;
                    align-items: flex-start;
                    justify-content: center;
                }
            }
        }
        
        
    }
`

const Size = styled(Canva)`
    flex-grow: 1;

`

const Footprint = styled(Canva)`
    display: flex;
    & > div {
        background-color: transparent;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.4rem;

        & > header {
            background-color: var(--light-gray);
            letter-spacing: 0;
            line-height: 1rem;
            padding: 0.1rem;
            padding-top: 0.2rem;
        }

        & > footer {
            flex-grow: 1;
            width: 100%;
            background-color: white;
            display: flex;
            align-items: center;
            justify-content: center;

            & > img {

            }
        }
    }
`