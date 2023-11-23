import { createContext, useContext, useState } from "react";

interface IDescriptionTextContext {
    language: number
    languagesList: {
        name: string,
        apiName: string,
        ttsLanguage: string
    }[]
    languageHandler: (n: number) => void
    descriptionText: string[]
    setDescriptionText: (s: string[]) => void
    audioObject: HTMLAudioElement
    setDesctiptionAudioVolume: (volume: string) => void
}

const DescriptionTextContext = createContext<IDescriptionTextContext | null>(null);

export function DescriptionTextProvider({ children }: { children: React.ReactNode }) {

    const [language, setLanguage] = useState<number>(0)
    const [descriptionText, setDescriptionText] = useState(["", ""])

    const audioObject = new Audio()

    const languagesList = [
        { name: "English", apiName: "en", ttsLanguage: "en-US" },
        { name: "French", apiName: "fr", ttsLanguage: "fr-FR" },
        { name: "Japanese", apiName: "ja", ttsLanguage: "ja-JP" },
        { name: "Japanese(hrkt)", apiName: "ja-Hrkt", ttsLanguage: "ja-JP" },
        { name: "Corean", apiName: "ko", ttsLanguage: "ko-RO" },
        { name: "Deutsch", apiName: "de", ttsLanguage: "de-DE" },
        { name: "Spanish", apiName: "es", ttsLanguage: "es-ES" },
        { name: "Italian", apiName: "it", ttsLanguage: "it-IT" },
    ]

    function languageHandler(n: number) {
        setLanguage(n)
    }

    function setDesctiptionAudioVolume(volume: string) {
        audioObject.volume = Number(volume)
    }

    return (
        <DescriptionTextContext.Provider value={{
            language,
            languagesList,
            languageHandler,
            descriptionText,
            setDescriptionText,
            audioObject,
            setDesctiptionAudioVolume
        }}>
            {children}
        </DescriptionTextContext.Provider>
    );
}

export function useDescriptionText() {
    const context = useContext(DescriptionTextContext);
    if (!context) {
        throw new Error('useDescriptionText deve ser usado dentro de um DescriptionTextProvider');
    }
    return context;
}
