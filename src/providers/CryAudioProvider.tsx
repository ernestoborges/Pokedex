import { RefObject, createContext, useContext, useRef, useState } from 'react';
import { drawDisplayCells } from '../utils/canvas-functions';
import WaveSurfer from 'wavesurfer.js/dist/plugins/wavesurfer.js';


interface IAudioContext {
    cryAudioRef: RefObject<HTMLAudioElement>
    crySource: RefObject<MediaElementAudioSourceNode | null>
    cryAnalyzer: RefObject<AnalyserNode | null>
    canvasRef1: RefObject<HTMLCanvasElement>
    canvasRef2: RefObject<HTMLCanvasElement>
    playCry: () => void
    setCryVolume: (volume: number) => void
    wavesurfer: WaveSurfer | null
    setWavesurfer: (obj: any) => void
}

const CryAudioContext = createContext<IAudioContext | null>(null);

export const CryAudioProvider = ({ children }: { children: React.ReactNode }) => {
    const cryAudioRef = useRef<HTMLAudioElement | null>(null);
    const crySource = useRef<MediaElementAudioSourceNode | null>(null);
    const cryAnalyzer = useRef<AnalyserNode | null>(null);
    const canvasRef1 = useRef<HTMLCanvasElement | null>(null);
    const canvasRef2 = useRef<HTMLCanvasElement | null>(null);

    let [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null)

    let audioContext: AudioContext;

    function playCry() {

        cryAudioRef.current!.play()

        if(wavesurfer){
            wavesurfer.setVolume(0)
            wavesurfer.play()
        }

        if (!audioContext) {
            audioContext = new AudioContext();
        }

        if (!crySource.current) {
            crySource.current = audioContext.createMediaElementSource(cryAudioRef.current!);
            cryAnalyzer.current = audioContext.createAnalyser();
            crySource.current.connect(cryAnalyzer.current);
            cryAnalyzer.current.connect(audioContext.destination);
        }

        visualizeData()
    }

    function visualizeData() {
        const audioElement = cryAudioRef.current!;
        const canvasElement1 = canvasRef1.current!;
        const canvasElement2 = canvasRef2.current!;
        const analyzerElement = cryAnalyzer.current!;

        const ctx1 = canvasElement1.getContext("2d")!;
        const ctx2 = canvasElement2.getContext("2d")!;
        let animationController = window.requestAnimationFrame(visualizeData);

        const barWidth = 13;
        let blockHeight = 10;
        let blockGap = 3;
        const nBars = 9

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

        // canvas1 ( red square bars )
        analyzerElement.fftSize = 64
        let bufferLength = analyzerElement!.frequencyBinCount
        let audioData = new Uint8Array(bufferLength);
        analyzerElement.getByteFrequencyData(audioData);

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

        for (let i = 0; i < nBars; i++) {
            let start = i * (barWidth + 4);
            let barHeight = (audioData[i] * canvasElement1.height / 255) * audioElement.volume;

            drawDisplayCells(
                ctx1,
                canvasElement1,
                start,
                barWidth,
                barHeight,
                blockHeight,
                blockGap,
                ["#FF7373", "#FF5252"]
            )
        }


        // canvas2 (horizontal light blue wave)
        analyzerElement.fftSize = 2048;
        bufferLength = analyzerElement.frequencyBinCount;
        audioData = new Uint8Array(bufferLength);
        analyzerElement.getByteTimeDomainData(audioData);

        ctx2.clearRect(0, 0, canvasElement2.width, canvasElement2.height);
        ctx2.beginPath();
        let sliceWidth = canvasElement2.width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            const v = audioData[i] / 128.0;
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

    function setCryVolume(volume: number) {
        cryAudioRef.current!.volume = volume
    }

    return (
        <CryAudioContext.Provider value={{
            cryAudioRef,
            crySource,
            cryAnalyzer,
            playCry,
            setCryVolume,
            canvasRef1,
            canvasRef2,
            wavesurfer,
            setWavesurfer
        }}>
            {children}
        </CryAudioContext.Provider>
    );
};

export const useCryAudio = () => {
    return useContext(CryAudioContext);
};