import styled from "styled-components"
import { useInfoOption } from "../../providers/InfoOptionProvider"
import { Info } from "./Info";
import { optionsList } from "./OptionsButtons";
import { Details } from "./Details";
import { Stats } from "./Stats";
import { Cry } from "./Cry/Cry";
import { useEffect } from "react";
import { useBeepAudio } from "../../providers/BeepAudioProvider";
import { Moves } from "./Moves";

export function InfoDisplay() {

    const { option: selectedOption } = useInfoOption();
    const { playBeep } = useBeepAudio()!;

    function handleHeaderTitle() {
        switch (selectedOption) {
            case 0: return "info"
            case 1: return "details"
            case 2: return "stats"
            case 3: return "moves"
            case 4: return "cry"
            default: return false
        }
    }

    function handleShowOption() {
        switch (selectedOption) {
            case 0: return <Info />
            case 1: return <Details />
            case 2: return <Stats />
            case 3: return <Moves />
            case 4: return <Cry />
            default: return false
        }
    }

    useEffect(() => {
        playBeep()
    }, [selectedOption])

    return <>
        <Container>
            <article>
                <Header>
                    <span>
                        {handleHeaderTitle()}
                    </span>
                    <ul>
                        {
                            optionsList.map((option) =>
                                <li
                                    key={option.option}
                                    className={selectedOption >= option.option ? selectedOption === option.option ? "selected" : "before-selected" : ""}
                                >
                                    {option.keyName}
                                </li>
                            )
                        }
                    </ul>
                </Header>
                {handleShowOption()}
                <div className="overlay" />
            </article>
        </Container>
    </>
}

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #5898F7;
    text-transform: uppercase;
    color: white;
    padding: 0 0 0 1rem;
    font-weight: bold;
    letter-spacing: 0.4rem;
    text-shadow: 
        0px 1px 0px var(--game-font-shadow),
        1px 0px 0px var(--game-font-shadow),
        1px 1px 0px var(--game-font-shadow)
    ;

    & > span {
        padding: 0.2rem 0;
    }

    & > ul {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #4777A0;

        & > li {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2rem;
            height: 100%;
            color: #365B7A;
            text-shadow: none;

            &.before-selected {
                background-color: transparent;
                background-color: #5898F7;
                color: #4777A0;
            }

            &.selected {
                color: white;
                background-color: #5898F7;
                border-radius: 0 100% 100% 0;
                
                &:last-child{
                    border-radius: 0;
                }
            }
        }
    }
`

const Container = styled.div`
    background-color: var(--shadow-color);
    border-radius: 1rem;
    padding-top: 0.6rem;
    color: var(--shadow-color);
    
    & > article {
        position: relative;
        width: 37.6rem;
        height: 21rem;
        background-color: white;
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background-color: var(--light-gray);
    }

    @media (max-width: 420px){
        width: 100%;
        & > article {
            width: 100%;
        }
    }
`