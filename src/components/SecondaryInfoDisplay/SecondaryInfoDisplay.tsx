import styled from "styled-components"
import { useInfoOption } from "../../providers/InfoOptionProvider"
import { useEffect, useState } from "react";
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

export function SecondaryInfoDisplay() {

    const { option: infoOption } = useInfoOption();
    const { playCry, setCryVolume } = useCryAudio()!
    const { language, languageHandler, languagesList, descriptionText } = useDescriptionText();
    const { selectedPokemon } = usePokemonList();
    const { playBeep } = useBeepAudio()!;

    const [volume, setVolume] = useState(0.6)
    const [isItemSelected, setIsItemSelected] = useState(false);
    const [selectedItem, setSelectedItem] = useState<number>(0);

    const moveUp = () => {
        if (selectedItem > 0) {
            setSelectedItem(selectedItem - 1)
        }
    }
    const moveDown = () => {
        if (selectedItem < screens[infoOption].options.length - 1) {
            setSelectedItem(selectedItem + 1)
        }
    }

    const speak = async () => {

        let translatedName = selectedPokemon.specie_data.names.filter((n: any) => n.language.name === languagesList[language].apiName)[0].name

        let text = (translatedName ? translatedName + ". " : "") + descriptionText.join(" ").split("\n").join(" ")
        console.log(text)
        let ttsList: string[] = []

        if (text.length > 100) {
            let phrase = ""

            while (text.length > 100) {
                let newText = text.split(".")
                let slice

                if (newText[newText.length - 1] === "") {
                    newText.pop()
                    slice = newText.pop() + "."
                } else {
                    slice = newText.pop() + "."
                }

                if ((phrase + slice).length < 100) {
                    phrase = slice + phrase
                } else {
                    ttsList.unshift(phrase)
                    phrase = slice
                }
                text = newText.join(".")
            }

            ttsList.unshift(text)
        } else {
            ttsList.push(text)
        }

        console.log(ttsList)


        const encodedText = encodeURIComponent(ttsList.shift()!)
        const ttsLanguage = languagesList[language].ttsLanguage
        const source = `https://translate.google.com/translate_tts?tl=${ttsLanguage}&q=${encodedText}&client=tw-ob`;
        const audio = new Audio(source);
        audio.play();
        audio.addEventListener('ended', () => {
            if (ttsList.length > 0) {
                const newText = encodeURIComponent(ttsList.shift()!)
                audio.src = `https://translate.google.com/translate_tts?tl=${ttsLanguage}&q=${newText}&client=tw-ob`;
                audio.play();
            }
        });
    };

    const screens = [
        {
            options: [
                {
                    element: () => <>a</>,
                    action3: () => alert("hi"),
                },
            ]
        },
        {
            options: [
                {
                    element: () => <DescriptionLanguage language={languagesList[language].name} />,
                    action1: () => languageHandler(language <= 1 ? 0 : language - 1),
                    action2: () => languageHandler(language >= languagesList.length - 1 ? languagesList.length - 1 : language + 1),
                },
                {
                    element: () => <ReadDescription speak={speak} />,
                    action3: () => speak()
                }
            ]
        },
        {
            options: [
                {
                    element: () => <>c</>,
                    action3: () => alert("hi"),
                },
            ]
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
    }, [infoOption])

    useEffect(() => {
        setCryVolume(volume)
        playBeep()
    }, [volume])

    useEffect(() => {
        playBeep()
    }, [selectedItem, isItemSelected, language])

    return <>
        <Container>
            <Display>
                <div>
                    <ul>
                        {
                            infoOption &&
                            screens[infoOption].options!.map((option, index) =>
                                option &&
                                <li
                                    key={index}
                                    className={`${selectedItem === index ? isItemSelected ? "selected-item" : "marked-item" : ""}`}
                                >
                                    {option.element()}
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
                    functionHandler={
                        infoOption &&
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
`

const Display = styled.div`
    background-color: var(--shadow-color);
    border-radius: 1rem;
    padding-top: 0.6rem;
    color: var(--shadow-color);
    
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