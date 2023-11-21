import styled from "styled-components"
import { usePokemonList } from "../../providers/PokemonListProvider"
import { fixTextCharacters } from "../../utils/fix-text-characters"
import { catchRateV } from "../../utils/pokemon-catch-rate-gen-v"
import { genderRateFemale, genderRateMale } from "../../utils/gender-rate-calc"
import { growthRateTextFix } from "../../utils/fix-growth-rate-text"
import { useDescriptionText } from "../../providers/DescriptionTextProvider"
import { useEffect } from "react"

export function Details() {

    const { selectedPokemon: pokemon } = usePokemonList();
    const { language, languagesList, descriptionText, setDescriptionText } = useDescriptionText();

    useEffect(() => {
        setDescriptionText([
            fixTextCharacters(pokemon.specie_data.genera.filter((g: any) => g.language.name === languagesList[language].apiName)[0].genus) + ".",
            fixTextCharacters(pokemon.specie_data.flavor_text_entries.filter((fte: any) => fte.language.name === languagesList[language].apiName)[0].flavor_text)
        ])
    }, [pokemon, language])

    return <>
        <Section>
            <LeftSection>
                <Description>
                    <div>
                        <header>DESCRIPTION</header>
                        <section>
                            <div>
                                <p>{descriptionText[0]}</p>
                                <p>{descriptionText[1]}</p>
                            </div>
                        </section>
                    </div>
                </Description>
            </LeftSection>
            <RightSection>
                <MainInfo>
                    <div>
                        <ul>
                            <li>
                                <span>CATCH RATE:</span>
                                <span>{catchRateV(pokemon.specie_data.capture_rate, 1).toFixed(1)}%</span>
                            </li>
                            <li>
                                <span>GROWTH:</span>
                                <span>{growthRateTextFix(pokemon.specie_data.growth_rate.name)}</span>
                            </li>
                            <li className="gender-rate">
                                GENDER:
                                {
                                    pokemon.specie_data.gender_rate === -1
                                        ? <div>UNKNOWN</div>
                                        : <div>
                                            <span>

                                                {
                                                    genderRateMale(pokemon.specie_data.gender_rate) === 100
                                                        ? "100%"
                                                        : genderRateMale(pokemon.specie_data.gender_rate) === 0
                                                            ? "0%"
                                                            : genderRateMale(pokemon.specie_data.gender_rate).toFixed(1) + "%"
                                                }
                                            </span>
                                            {
                                                <div
                                                    style={{
                                                        background: `linear-gradient(90deg, rgba(88,152,247,1) ${((8 - pokemon.specie_data.gender_rate) / 8 * 100)}%, rgba(248,88,136,1) ${((8 - pokemon.specie_data.gender_rate) / 8 * 100)}%)`
                                                    }}
                                                />
                                            }
                                            <span>
                                                {
                                                    genderRateFemale(pokemon.specie_data.gender_rate) === 100
                                                        ? "100%"
                                                        : genderRateFemale(pokemon.specie_data.gender_rate) === 0
                                                            ? "0%"
                                                            : genderRateFemale(pokemon.specie_data.gender_rate).toFixed(1) + "%"
                                                }
                                            </span>
                                        </div>
                                }
                            </li>
                        </ul>
                    </div>
                </MainInfo>
                <Habitat>
                    <div>
                        <header>HABITAT</header>
                        <section>
                            <div>
                                {
                                    pokemon.specie_data.habitat
                                        ? pokemon.specie_data.habitat.name.split("-").join(" ")
                                        : "???"
                                }
                            </div>

                        </section>

                    </div>
                    <div>
                        {
                            pokemon.specie_data.habitat
                                ? <img
                                    src={`https://veekun.com/dex/media/habitats/${pokemon.specie_data.habitat.name}.png`}
                                    alt={`Pokemon habitat ${pokemon.specie_data.habitat.name.split("-").join(" ")} `}

                                />
                                : <img src="/images/unknown-habitat.png" alt={`Pokemon habitat unknown`} />
                        }
                    </div>
                </Habitat>
            </RightSection>
        </Section>
    </>
}

const Section = styled.section`
    display: flex;
    gap: 0.4rem;
    flex-grow: 1;
    padding: 0.6rem;
    text-transform: uppercase;
`

const LeftSection = styled.div`
    width: 55%;
    height: 100%;
    display: flex;
`

const RightSection = styled.div`
    width: 45%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
    
    & > div {
        padding: 0.4rem;
    } 

    & ul {
        display: flex;
        flex-direction: column;
        
            & > li {

                display: flex;
                align-items: center;
            
                &:last-child{
                    border: none;
                    align-items: center;
                }

                &.gender-rate {
                    flex-direction: column;
                    align-items: flex-start;
                    & > div {
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        gap: 0.4rem;

                        & > span {
                            min-width: 3rem;
                            display: flex;
                            justify-content: flex-end;
                        }

                        & > div {
                            width: 7rem;
                            border-radius: 1rem;
                        }
                    }
                }

                & > svg {
                    font-size: 1.6rem;
                    font-weight: bold;
                    
                    &:first-child {
                        color: #5898F7;
                    }
                    &:last-child{
                        color: #f85888;
                    }
                }
            }
    }
`

const Description = styled(Canva)`
    display: flex;

    & > div {
        background-color: transparent;
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
            flex-grow: 1;
            background-color: white;
            text-align: left;
            text-transform: none;
            font-size: 1.2rem;
            height: 1.2rem;
            padding: 1rem 0.6rem;
            display: flex;

            & > div {
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 0.6rem;
            }

        }
    }
`

const Habitat = styled(Canva)`
    display: flex;
    gap: 0.4rem;

    & > div {
        flex-grow: 1;
        background-color: transparent;
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
            padding-top: 0.4rem;
        }

        & > section {
            width: 100%;
            flex-grow: 1;
            display: flex;
            gap: 0.2rem;
            text-transform: capitalize;

            & > div {
                flex-grow: 1;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: white;
                font-size: 1.2rem;
                height: 4.4rem;
            }
        }

        &:first-child {
            width: 100%;
        }

        &:last-child {
            background-color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 0.4rem;
            height: 100%;
        }
    }
`