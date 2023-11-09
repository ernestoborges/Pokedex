import styled from "styled-components"
import { usePokemonList } from "../../providers/PokemonListProvider"
import { HexbinGraph } from "../HexbinGraph"
import { shortenedStatName } from "../../utils/convert-stat-name"

export function Stats() {

    const { selectedPokemon: pokemon } = usePokemonList()

    return <>
        <Section>
            <LeftSection>
                <Chart>
                    <HexbinGraph stats={pokemon.stats} />
                </Chart>
            </LeftSection>
            <RightSection>
                <MainInfo>
                    <div>
                        <ul>
                            {
                                pokemon.stats.map((s: any, i: number) =>
                                    <li key={i}>
                                        <span>{shortenedStatName(s.stat.name)}:</span>
                                        <span>{s.base_stat}</span>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </MainInfo>
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
            }
    }
`

const Chart = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`