import styled from "styled-components"
import { useInfoOption } from "../../providers/InfoOptionProvider"
import { PokemonTypeLabel } from "../PokemonTypeLabel"
import { MoveCategoryLabel } from "../MoveCategoryLabel"
import { usePokemonList } from "../../providers/PokemonListProvider"
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { useEffect, useState } from "react"

export function Moves() {

    const { selectedMove } = useInfoOption()
    const { selectedPokemon } = usePokemonList()

    const [moveLevels, setMoveLevels] = useState<any>(null)

    function moveUrlToGen(url: string) {
        let n = url.split("version-group/")[1].split("/")[0]

        switch (n) {
            case "1":
            case "2": return 1
            case "3":
            case "4": return 2
            case "5":
            case "6":
            case "7":
            case "12":
            case "13": return 3
            case "8":
            case "9":
            case "10": return 4
            case "11":
            case "14": return 5
            case "15":
            case "16": return 6
            case "17":
            case "18":
            case "19": return 7
            case "20":
            case "21":
            case "22":
            case "23":
            case "24": return 8
            case "25":
            case "26":
            case "27": return 9
            default: return 0
        }
    }

    function moveLevelByGen(version: any[]) {

        const map = new Map();

        version.forEach((v: any) => {
            let gen = moveUrlToGen(v.version_group.url)

            if (gen >= 1 && gen <= 9) {

                map.set(
                    gen,
                    {
                        level: v.level_learned_at,
                        method: v.move_learn_method.name,
                        gen: gen
                    }
                );
            }
        })

        return map
    }

    let eggUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/egg.png"

    function handleMoveLevelOutput(obj: any) {
        if (!obj) return "-"
        switch (obj.method) {
            case "egg": return <img src={eggUrl} alt="Move obtained by egg" />
            case "machine": return "TM"
            case "tutor": return <IoChatboxEllipsesOutline />
            default: return <span>{obj.level}</span>
        }
    }

    useEffect(() => {
        let moveBasicInfo = selectedPokemon.moves.find((m: any) => m.move.name === selectedMove.name)
        if (!moveBasicInfo) {
            moveBasicInfo = selectedPokemon.moves[0]
        }
        setMoveLevels(moveLevelByGen(moveBasicInfo.version_group_details))
    }, [selectedPokemon, selectedMove])

    if (!selectedMove) {
        return <></>
    }

    return <>
        <Section>
            <div>
                <MainInfo>
                    <div className="column">
                        <PokemonTypeLabel type={selectedMove.type.name} />
                        <MoveCategoryLabel category={selectedMove.damage_class.name} />
                    </div>
                </MainInfo>
                <MainInfo>
                    <div>
                        {
                            moveLevels
                                ?
                                <ul className="level-list">
                                    <li>
                                        <span>GEN</span>
                                        <span>1</span>
                                        <span>2</span>
                                        <span>3</span>
                                        <span>4</span>
                                        <span>5</span>
                                        <span>6</span>
                                        <span>7</span>
                                        <span>8</span>
                                        <span>9</span>
                                    </li>
                                    <li>
                                        <span>LEVEL</span>
                                        <span>{handleMoveLevelOutput(moveLevels.get(1))}</span>
                                        <span>{handleMoveLevelOutput(moveLevels.get(2))}</span>
                                        <span>{handleMoveLevelOutput(moveLevels.get(3))}</span>
                                        <span>{handleMoveLevelOutput(moveLevels.get(4))}</span>
                                        <span>{handleMoveLevelOutput(moveLevels.get(5))}</span>
                                        <span>{handleMoveLevelOutput(moveLevels.get(6))}</span>
                                        <span>{handleMoveLevelOutput(moveLevels.get(7))}</span>
                                        <span>{handleMoveLevelOutput(moveLevels.get(8))}</span>
                                        <span>{handleMoveLevelOutput(moveLevels.get(9))}</span>
                                    </li>
                                </ul>
                                : ""
                        }
                    </div>
                </MainInfo>
            </div>
            <div>
                <LeftSection>
                    <Description>
                        <div>
                            <header>DESCRIPTION</header>
                            <section>
                                <div>
                                    <p>{selectedMove.name.split("-").join(" ").toUpperCase()}</p>
                                    <p>{selectedMove.flavor_text_entries.filter((t: any) => t.language.name === "en")[0].flavor_text}</p>
                                </div>
                            </section>
                        </div>
                    </Description>
                </LeftSection>
                <RightSection>
                    <MainInfo className="basic-info">
                        <div>
                            <ul>
                                <li><span>POWER:</span> {selectedMove.power ? selectedMove.power : "--"}</li>
                                <li><span>PP:</span> {selectedMove.pp ? selectedMove.pp : "--"}</li>
                                <li><span>ACCU:</span> {selectedMove.accuracy ? selectedMove.accuracy+"%" : "--"}</li>
                                <li><span>CRIT:</span> {selectedMove.meta.crit_rate ? selectedMove.meta.crit_rate+"%" : "--"}</li>
                                <li><span>DRAIN:</span> {selectedMove.meta.drain ? selectedMove.meta.drain : "--"}</li>
                            </ul>
                        </div>
                    </MainInfo>
                    <MainInfo className="meta-data-info">
                        <div>
                            <ul>
                                <li><span>FLINCH:</span> {selectedMove.meta.flinch_chance ? selectedMove.meta.flinch_chance+"%" : "--"}</li>
                                <li><span>EFFECT:</span> {selectedMove.effect_chance ? selectedMove.effect_chance+"%" : "--"}</li>
                                <li><span>MAX HITS:</span> {selectedMove.meta.max_hits ? selectedMove.meta.max_hits : "--"}</li>
                                <li><span>MIN HITS:</span> {selectedMove.meta.min_hits ? selectedMove.meta.min_hits : "--"}</li>
                                <li><span>MIN TURNS:</span> {selectedMove.meta.mix_turns ? selectedMove.meta.mix_turns : "--"}</li>
                                <li><span>MAX TURNS:</span> {selectedMove.meta.max_turns ? selectedMove.meta.max_turns : "--"}</li>
                            </ul>
                        </div>
                    </MainInfo>
                </RightSection>
            </div>
        </Section>
    </>
}

const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    flex-grow: 1;
    padding: 0.6rem;
    text-transform: uppercase;
    gap: 0.4rem;

    & > div {
        display: flex;
        justify-content: space-between;
        width: 100%;

        &:first-child {
            gap: 0.4rem;
        }

        &:nth-child(2){
            flex-grow: 1;
            gap: 0.4rem;
            align-items: flex-start;
        }
    }

    & .level-list {
        & > li {
            display: flex;
            gap: 0.1rem;

            & > span {
                width: 2.2rem;
                display: flex;
                justify-content: center;

                &:first-child {
                    width: 5rem;
                }
            }

            &:first-child {
                & > span {
                    padding-top: 0.3rem;
                }

                & > span:not(:first-child){
                    background-color: gray;
                    color: white;
                    border-radius: 0.4rem 0.4rem 0 0;
                    border: 0.1rem solid gray;
                }
            }

            &:nth-child(2) {
                & > span {
                    align-items: center;
                    overflow: hidden;
                    height: 2.4rem;

                    & > img {
                        height: 100%;
                        object-fit: none;
                        object-position: 50% 100%;
                    }

                    & > svg {
                        font-size: 1.6rem;
                    }

                    & > span {
                        margin-top: 0.2rem;
                    }
                }

                & > span:not(:first-child){
                    border: 0.1rem solid gray;
                    border-radius: 0 0 0.4rem 0.4rem;
                }


            }
        }
    }
`

const LeftSection = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`

const RightSection = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    gap: 0.4rem;

    & .basic-info {
        width: 8rem;
    }
    & .meta-data-info{
        width: 10rem;
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
    }
`

const MainInfo = styled(Canva)`
    width: 100%;

    & > div {
        padding: 0.4rem;
        height: 100%;
        display: flex;
        align-items: center;

        &.column {
            flex-direction: column;
            gap: 0.2rem;
        }
    } 

    & ul {
        display: flex;
        flex-direction: column;
        width: 100%;
        & > li {
            display: flex;
            justify-content: space-between;
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