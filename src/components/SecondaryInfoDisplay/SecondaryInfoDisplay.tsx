import styled from "styled-components"
import { useInfoOption } from "../../providers/InfoOptionProvider"
import { useEffect, useRef, useState } from "react";
import { useCryAudio } from "../../providers/CryAudioProvider";
import { BiUpArrow, BiDownArrow, BiRightArrow } from "react-icons/bi"
import { Button } from "../Button";
import { PlayCryButton } from "./SecondaryOptions/PlayCryButton";
import { ChangeCryVolume } from "./SecondaryOptions/ChangeCryVolume";
import { DescriptionLanguage } from "./SecondaryOptions/ChangeDescriptionLanguage";
import { useDescriptionText } from "../../providers/DescriptionTextProvider";
import { ReadDescription } from "./SecondaryOptions/ReadDescriptionButton";
import { usePokemonList } from "../../providers/PokemonListProvider";
import { useBeepAudio } from "../../providers/BeepAudioProvider";
import { ShinySelection } from "./SecondaryOptions/ShinySelections";
import { EvolvesFrom } from "./SecondaryOptions/EvolvesFrom";
import { getEvolutionChainNodes } from "../../utils/get-evulution-chain-nodes";
import { EvolvesTo } from "./SecondaryOptions/EvolvesTo";
import { getIdFromSpecieURL } from "../../utils/get-id-from-specie-url";
import { textToSpeech } from "../../utils/text-to-speech";
import { GraphStyle } from "./SecondaryOptions/ChangeGraphStyle";
import { MoveSelector } from "./SecondaryOptions/MoveSelector";
import { useSeachFilter } from "../../providers/SearchFilterProvider";

let itemHeight = 25;

export function SecondaryInfoDisplay() {

    const listRef: React.RefObject<HTMLUListElement> = useRef(null);

    const { option: infoOption, isGraphHex, graphToggle, selectedMove, fetchMove } = useInfoOption();
    const { playCry, setCryVolume } = useCryAudio()!
    const { language, languageHandler, languagesList, descriptionText, audioObject } = useDescriptionText();
    const { selectedPokemon, toggleShiny, isShiny } = usePokemonList();
    const { playBeep } = useBeepAudio()!;
    const { isInputFocus } = useSeachFilter();

    const [volume, setVolume] = useState(0.6)
    const [isItemSelected, setIsItemSelected] = useState(false);
    const [selectedItem, setSelectedItem] = useState<number>(0);

    const evoNodes = getEvolutionChainNodes(selectedPokemon)
    const pokemonChainLevel = evoNodes.find((p: any) => getIdFromSpecieURL(p.species.url) == selectedPokemon.id).chain_level
    const [selectedEF, setSelectedEF] = useState(-1);
    const evolvesFrom = evoNodes.reverse().filter((evo: any) => evo.chain_level === pokemonChainLevel - 1)
    const [selectedET, setSelectedET] = useState(-1);
    const evolvesTo = evoNodes.reverse().filter((evo: any) => evo.chain_level === pokemonChainLevel + 1)

    let translatedName = selectedPokemon.specie_data.names.filter((n: any) => n.language.name === languagesList[language].apiName)[0].name
    const fullTextoToRead = (translatedName ? translatedName + "." : "") + descriptionText.join(" ").split("\n").join(" ")

    const moveUp = () => {
        if (selectedItem > 0) {
            setSelectedItem(selectedItem - 1)
            let newSelectionPosition = selectedItem - 1

            if (listRef.current) {
                let currentScrollY = listRef.current.scrollTop
                if (
                    newSelectionPosition * itemHeight < currentScrollY ||
                    newSelectionPosition * itemHeight > currentScrollY + (itemHeight * 5)
                ) {
                    listRef.current.scrollTop = newSelectionPosition * itemHeight
                }
            }
        }
    }
    const moveDown = () => {
        if (selectedItem < screens[infoOption].options.length - 1) {
            setSelectedItem(selectedItem + 1)
            let newSelectionPosition = selectedItem + 1
            if (listRef.current) {
                let currentScrollY = listRef.current.scrollTop
                if (
                    newSelectionPosition * itemHeight < currentScrollY ||
                    newSelectionPosition * itemHeight > currentScrollY + (itemHeight * 5)
                ) {
                    listRef.current.scrollTop = (newSelectionPosition * itemHeight) - (itemHeight * 5)
                }
            }
        }
    }

    const handlePlayDescription = async () => {

        const ttsList: string[] = await textToSpeech(fullTextoToRead)

        const encodedText = encodeURIComponent(ttsList.shift()!)
        const ttsLanguage = languagesList[language].ttsLanguage

        if (!audioObject.paused) {
            audioObject.pause()
        } else {
            const source = `https://translate.google.com/translate_tts?tl=${ttsLanguage}&q=${encodedText}&client=tw-ob`;
            audioObject.src = source
            audioObject.play();
            audioObject.addEventListener('ended', () => {
                if (ttsList.length > 0) {
                    const newText = encodeURIComponent(ttsList.shift()!)
                    audioObject.src = `https://translate.google.com/translate_tts?tl=${ttsLanguage}&q=${newText}&client=tw-ob`;
                    audioObject.play();
                }
            });
        }
    }


    const screens = [
        {
            options: [
                {
                    element: () => <ShinySelection />,
                    action3: () => toggleShiny(),
                },
                {
                    element: evolvesFrom.length > 0
                        ? (i: number) => <EvolvesFrom
                            from={evolvesFrom}
                            selectedItem={selectedEF}
                            isThisSelected={selectedItem === i}
                            isItemSelected={isItemSelected}
                        />
                        : null,
                    action1: () => setSelectedEF(selectedEF < evolvesFrom.length - 1 ? selectedEF + 1 : -1),
                    action2: () => setSelectedEF(selectedEF > 0 ? selectedEF - 1 : evolvesFrom.length - 1),
                },
                {
                    element: evolvesTo.length > 0
                        ? (i: number) => <EvolvesTo
                            to={evolvesTo}
                            selectedItem={selectedET}
                            isThisSelected={selectedItem === i}
                            isItemSelected={isItemSelected}
                        />
                        : null,
                    action1: () => setSelectedET(selectedET < evolvesTo.length - 1 ? selectedET + 1 : -1),
                    action2: () => setSelectedET(selectedET > 0 ? selectedET - 1 : evolvesTo.length - 1),
                }
            ].filter(o => o.element)
        },
        {
            options: [
                {
                    element: () => <DescriptionLanguage language={languagesList[language].name} />,
                    action1: () => languageHandler(language <= 1 ? 0 : language - 1),
                    action2: () => languageHandler(language >= languagesList.length - 1 ? languagesList.length - 1 : language + 1),
                },
                {
                    element: () => <ReadDescription handlePlayDescription={handlePlayDescription} />,
                    action3: () => handlePlayDescription()
                }
            ]
        },
        {
            options: [
                {
                    element: () => <GraphStyle isGraphHex={isGraphHex} graphToggle={graphToggle} />,
                    action3: () => graphToggle(),
                },
            ]
        },
        {
            options: selectedPokemon.moves.map((move: any, index: number) => ({
                element: () => <MoveSelector move={move} fetchMove={fetchMove} setSelectedItem={setSelectedItem} index={index} />,
                action3: () => fetchMove(move.move.url)
            }))
        },
        {
            options: [
                {
                    element: () => <PlayCryButton />,
                    action3: () => playCry()
                },
                {
                    element: () => <ChangeCryVolume volume={volume} setVolume={setVolume} />,
                    action1: () => setVolume(volume >= 0.9 ? 1 : Math.floor((volume * 10) + 1) / 10),
                    action2: () => setVolume(volume <= 0.1 ? 0 : Math.floor((volume * 10) - 1) / 10),
                },
            ],
        }
    ]

    useEffect(() => {
        setSelectedItem(0)
        setSelectedEF(-1)
        setSelectedET(-1)
        audioObject.pause()
        fetchMove(selectedPokemon.moves[0].move.url)
    }, [selectedPokemon, infoOption])

    useEffect(() => {
        setCryVolume(volume)
        playBeep()
    }, [volume])

    useEffect(() => {
        playBeep()
    }, [selectedItem, isItemSelected, language, selectedEF, selectedET, isShiny, isGraphHex, selectedMove])

    return <>
        <Container>
            <Display>
                <div>
                    <ul ref={listRef} className="secondary-options-list">
                        {
                            infoOption !== null &&
                            screens[infoOption].options!.map((option: any, index: number) =>
                                option.element &&
                                <li
                                    key={index}
                                    className={`${selectedItem === index ? isItemSelected ? "selected-item" : "marked-item" : ""}`}
                                    style={{height: infoOption === 3 ? "2.5rem" : "auto"}}
                                >
                                    {option.element(index)}
                                </li>
                            )
                        }
                    </ul>
                    <div className="overlay" />
                </div>
            </Display>
            <Buttons>
                <Button
                    shape="arrow-up"
                    keyName="ArrowUp"
                    keyLabel={<BiUpArrow />}
                    isDisable={isInputFocus}
                    functionHandler={
                        isItemSelected &&
                            screens[infoOption].options[selectedItem].action1 &&
                            screens[infoOption].options.length - 1 >= selectedItem
                            ? screens[infoOption].options[selectedItem].action1!
                            : moveUp
                    }
                    selectedOption={[infoOption, selectedItem]}
                />
                <Button
                    shape="square"
                    keyName="ArrowRight"
                    keyLabel={<BiRightArrow />}
                    isDisable={isInputFocus}
                    functionHandler={
                        infoOption !== null &&
                            screens[infoOption].options.length - 1 >= selectedItem &&
                            'action3' in screens[infoOption].options[selectedItem]
                            ? screens[infoOption!].options[selectedItem].action3!
                            : () => setIsItemSelected(!isItemSelected)
                    }
                    selectedOption={[infoOption, selectedItem]}
                />
                <Button
                    shape="arrow-down"
                    keyName="ArrowDown"
                    keyLabel={<BiDownArrow />}
                    isDisable={isInputFocus}
                    functionHandler={
                        isItemSelected &&
                            screens[infoOption].options[selectedItem].action2 &&
                            screens[infoOption].options.length - 1 >= selectedItem
                            ? screens[infoOption].options[selectedItem].action2!
                            : moveDown
                    }
                    selectedOption={[infoOption, selectedItem]}
                />
            </Buttons>
        </Container>
    </>
}

const Container = styled.div`
    display: flex;
    align-items: stretch;
    gap: 1rem;

    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
`

const Display = styled.div`
    background-color: var(--shadow-color);
    border-radius: 1rem;
    padding-top: 0.6rem;
    color: var(--shadow-color);
    text-shadow: 
        0px 1px 0px var(--game-font-shadow),
        1px 0px 0px var(--game-font-shadow),
        1px 1px 0px var(--game-font-shadow)
    ;
    
    & > div {
        position: relative;
        width: 18rem;
        height: 16rem;
        background-color: white;
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background-color: var(--light-gray);
        padding: 0.6rem;
    }
    
    & .secondary-options-list {
        overflow-y: auto;
        height: 14.8rem;
    }

    & li {
        border: 0.2rem solid transparent;
        border-radius: 0.4rem;

        &.marked-item {
            background-color: #a4cad1;
            // border: 0.2rem solid var(--cyan);
        }

        &.selected-item {
            background-color: #667cbf;
            color: white;

            & .toggleable-background {
                background-color: white !important;
            }
        }
    }
`

const Buttons = styled.div`
    width: 4rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`