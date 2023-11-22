import { createContext, useContext, useEffect, useState } from 'react';

interface IBeepAudioContext {
    beepAudio: HTMLAudioElement | null
    playBeep: () => void
    setBeepVolume: (volume: string) => void
}

const BeepAudioContext = createContext<IBeepAudioContext | null>(null);

export const BeepAudioProvider = ({ children }: { children: React.ReactNode }) => {
    const [beepAudio, setBeepAudio] = useState<HTMLAudioElement | null>(null);

    function playBeep() {
        if (beepAudio) {
            if (
                !beepAudio.paused &&
                beepAudio.currentTime > beepAudio.duration * 0.2
            ) {
                beepAudio.currentTime = 0;
            }
            beepAudio.play()
        }
    }

    function setBeepVolume(volume: string) {
        if (beepAudio) {
            beepAudio.volume = Number(volume)
        }
    }

    useEffect(() => {
        if (!beepAudio) {
            setBeepAudio(new Audio("/audios/effects/beep.wav"))
        }
    }, [])

    return (
        <BeepAudioContext.Provider value={{
            beepAudio,
            playBeep,
            setBeepVolume
        }}>
            {children}
        </BeepAudioContext.Provider >
    );
};

export const useBeepAudio = () => {
    return useContext(BeepAudioContext);
};