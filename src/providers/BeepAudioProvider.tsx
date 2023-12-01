import { createContext, useContext, useEffect, useState } from 'react';

interface IBeepAudioContext {
    beepAudio: HTMLAudioElement | null
    playBeep: () => void
    setBeepVolume: (volume: string) => void
    playSwipeIn: () => void
    playSwipeOut: () => void
}

const BeepAudioContext = createContext<IBeepAudioContext | null>(null);

export const BeepAudioProvider = ({ children }: { children: React.ReactNode }) => {
    const [beepAudio, setBeepAudio] = useState<HTMLAudioElement | null>(null);
    const [swipeInAudio, setSwipeInAudio] = useState<HTMLAudioElement | null>(null);
    const [swipeOutAudio, setSwipeOutAudio] = useState<HTMLAudioElement | null>(null);

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

    function playSwipeIn() {
        if (swipeInAudio) {
            if (
                !swipeInAudio.paused &&
                swipeInAudio.currentTime > swipeInAudio.duration * 0.2
            ) {
                swipeInAudio.currentTime = 0;
            }
            swipeInAudio.play()
        }
    }

    function playSwipeOut() {
        if (swipeOutAudio) {
            if (
                !swipeOutAudio.paused &&
                swipeOutAudio.currentTime > swipeOutAudio.duration * 0.2
            ) {
                swipeOutAudio.currentTime = 0;
            }
            swipeOutAudio.play()
        }
    }

    function setBeepVolume(volume: string) {
        if (beepAudio) {
            beepAudio.volume = Number(volume)
        }
        if (swipeInAudio) {
            swipeInAudio.volume = Number(volume)
        }
        if (swipeOutAudio) {
            swipeOutAudio.volume = Number(volume)
        }
    }

    useEffect(() => {
        if (!beepAudio) {
            setBeepAudio(new Audio("/audios/effects/beep.wav"))
        }
        if (!swipeInAudio) {
            setSwipeInAudio(new Audio("/audios/effects/swipe-in.wav"))
        }
        if (!swipeOutAudio) {
            setSwipeOutAudio(new Audio("/audios/effects/swipe-out.wav"))
        }
    }, [])

    return (
        <BeepAudioContext.Provider value={{
            beepAudio,
            playBeep,
            playSwipeIn,
            playSwipeOut,
            setBeepVolume
        }}>
            {children}
        </BeepAudioContext.Provider >
    );
};

export const useBeepAudio = () => {
    return useContext(BeepAudioContext);
};