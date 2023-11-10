import styled from "styled-components"
import { usePokemonList } from "../../../providers/PokemonListProvider"
import { useEffect, useRef, useState } from "react";

let animationController;

export function Cry() {

    const { selectedPokemon: pokemon } = usePokemonList()
    const cryUrl = `/audios/cries/${pokemon.id}.wav`

    const [cryVolume, setCryVolume] = useState(0.4)

    const canvasRef1 = useRef<HTMLCanvasElement>(null);
    const canvasRef2 = useRef<HTMLCanvasElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const source = useRef<MediaElementAudioSourceNode | null>(null);
    const analyzer = useRef<AnalyserNode | null>(null);

    function handlePlayCry() {
        audioRef.current!.volume = cryVolume
        audioRef.current!.play()
        let audioContext = new AudioContext();
        if (!source.current) {
            source.current = audioContext.createMediaElementSource(audioRef.current!);
            analyzer.current = audioContext.createAnalyser();
            source.current.connect(analyzer.current);
            analyzer.current.connect(audioContext.destination);
        }
        visualizeData()

    }

    function drawDisplayCells(
        ctx: any,
        canvasElement: any,
        start: number,
        barWidth: number,
        barHeight: number,
        blockHeight: number,
        blockGap: number,
        fill: any,
    ) {
        let nBlocks = Math.trunc(barHeight / (blockHeight + blockGap))
        for (let j = 0; j <= nBlocks; j++) {
            let Y0 = (blockHeight + blockGap) * j
            let blockFloor = canvasElement.height - Y0 - blockHeight

            let gradient = ctx.createLinearGradient(
                start,
                blockFloor,
                start,
                blockFloor + blockHeight
            );

            gradient.addColorStop(0, fill[0]);
            gradient.addColorStop(0.2, fill[0]);
            gradient.addColorStop(0.2, fill[1]);
            gradient.addColorStop(0.8, fill[1]);
            gradient.addColorStop(0.8, fill[0]);
            gradient.addColorStop(1.0, fill[0]);

            ctx.fillStyle = gradient;
            ctx.fillRect(start, blockFloor, barWidth, blockHeight);
        }
    }

    function visualizeData() {
        const audioElement = audioRef.current!;
        const canvasElement1 = canvasRef1.current!;
        const canvasElement2 = canvasRef2.current!;
        const analyzerElement = analyzer.current!;


        const ctx1 = canvasElement1.getContext("2d")!;
        const ctx2 = canvasElement2.getContext("2d")!;
        animationController = window.requestAnimationFrame(visualizeData);

        const barWidth = 10;
        let blockHeight = 10;
        let blockGap = 3;
        const nBars = 11

        if (audioElement!.paused) {
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

            return cancelAnimationFrame(animationController);
        }

        // canvas1
        analyzerElement.fftSize = 64
        let bufferLength = analyzerElement!.frequencyBinCount
        let songData = new Uint8Array(bufferLength);
        analyzerElement.getByteFrequencyData(songData);

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
        for (let i = 0; i < songData.length; i++) {
            let start = i * (barWidth + 4);
            let barHeight = (songData[i] * canvasElement1.height / 255) * audioElement.volume;

            drawDisplayCells(
                ctx1,
                canvasElement1,
                start,
                barWidth,
                barHeight,
                blockHeight, blockGap,
                ["#FF7373", "#FF5252"]
            )
        }


        // canvas2
        analyzerElement.fftSize = 2048;
        bufferLength = analyzerElement.frequencyBinCount;
        songData = new Uint8Array(bufferLength);
        analyzerElement.getByteTimeDomainData(songData);

        ctx2.clearRect(0, 0, canvasElement2.width, canvasElement2.height);
        ctx2.beginPath();
        const sliceWidth = canvasElement2.width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            const v = songData[i] / 128.0;
            const y = v * canvasElement2.height / 2;
            if (i === 0) {
                ctx2.moveTo(x, y);
            } else {
                ctx2.lineTo(x, y);
            }
            x += sliceWidth;
        }

        ctx2.lineWidth = 1;
        ctx2.strokeStyle = '#29DEBD';
        ctx2.stroke();
    }

    useEffect(() => {
        audioRef.current!.volume = cryVolume
    }, [cryVolume])

    return <>
        <Section>
            <LeftSection>
                <Chart>
                    <SoundCanvas ref={canvasRef1} width={150} height={75} />
                    <SoundCanvas ref={canvasRef2} width={150} height={75} style={{ backgroundColor: "#427384" }} />
                </Chart>
            </LeftSection>
            <RightSection>
                <MainInfo>
                    <div>
                        <div>
                            <audio ref={audioRef} src={cryUrl} />
                            <button onClick={() => handlePlayCry()}>play</button>
                            <input type="range" onChange={(e: any) => setCryVolume(e.target.value / 100)} min="0" max="100" />
                            {`Volume: ${cryVolume}`}
                        </div>
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

const SoundCanvas = styled.canvas`
    background-color: #6B6B6B;
    padding: 0.4rem;
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
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;
`