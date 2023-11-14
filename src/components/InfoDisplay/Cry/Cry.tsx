import styled from "styled-components"
import { usePokemonList } from "../../../providers/PokemonListProvider"
import { useEffect } from "react";
import { useCryAudio } from "../../../providers/CryAudioProvider";
import { drawDisplayCells } from "../../../utils/canvas-functions";
import { WaveSurferComponent } from "./WaveSurfer";

export function Cry() {

    const { selectedPokemon } = usePokemonList()
    const {
        canvasRef1,
        canvasRef2,
    } = useCryAudio()!

    let pictureURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.id}.png`


    useEffect(() => {

        // canvas 1 and 2
        const canvasElement1 = canvasRef1.current!
        const canvasElement2 = canvasRef2.current!

        const ctx1 = canvasElement1.getContext("2d")!;
        const ctx2 = canvasElement2.getContext("2d")!;

        const barWidth = 13;
        let blockHeight = 10;
        let blockGap = 3;
        const nBars = 9

        ctx1.clearRect(0, 0, canvasElement1.width, canvasElement1.height);

        for (let i = 0; i < nBars; i++) {
            let start = i * (barWidth + 4);
            drawDisplayCells(
                ctx1,
                canvasElement1,
                start,
                barWidth,
                canvasElement1.height,
                blockHeight, blockGap,
                ["#737373", "#737373"]
            )
        }

        ctx2.clearRect(0, 0, canvasElement1.width, canvasElement1.height);
        ctx2.beginPath();
        ctx2.moveTo(0, canvasElement2.height / 2);
        ctx2.lineTo(canvasElement2.width, canvasElement2.height / 2);
        ctx2.lineWidth = 1;
        ctx2.strokeStyle = '#29DEBD';
        ctx2.stroke();

    }, [selectedPokemon])

    return <>
        <Section>
            <div>
                <Wrapper>
                    <SoundCanvas ref={canvasRef1} width={150} height={75} />
                    <SoundCanvas ref={canvasRef2} width={190} height={75} style={{ backgroundColor: "#427384" }} />
                </Wrapper>
            </div>
            <div>
                <WaveSuferWrapper>
                    <div>

                        <div>
                            <img
                                src={pictureURL}
                                alt={`${selectedPokemon.name} Pokemon picture`}

                            />
                        </div>
                        <WaveSurferComponent pokemonId={selectedPokemon.id} />
                    </div>
                </WaveSuferWrapper>
            </div>
        </Section>
    </>
}

const Section = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex-grow: 1;
    padding: 0.6rem;
    text-transform: uppercase;
`

const SoundCanvas = styled.canvas`
    background-color: #6B6B6B;
    padding: 0.4rem;
`

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const WaveSuferWrapper = styled.div`

    background-color: var(--gray);
    border-radius: 1rem;
    border: 0.2rem solid var(--dark-gray);
    padding: 0.2rem;

     & > div {

        width: 100%;
        display: flex;
        align-items: center;

        background-color: white;
        border-radius: 1rem;
        border: 0rem solid var(--dark-gray);
        
        & > div {
            &:first-child{
                transform: scaleX(-1);
                display: flex;
                align-items: center;
                jusitfy-content: center;
                & img {
                    height: 7rem;
                }
            }
        }
    }
`