import { createContext, useContext, useState } from "react";


interface IInfoOptionContext {
    option: number
    setOption: (n: number) => void
    isGraphHex: boolean
    graphToggle: () => void
}

const InfoOptionContext = createContext<IInfoOptionContext | null>(null);

export function InfoOptionProvider({ children }: { children: React.ReactNode }) {

    const [selectedOption, setSelectedOption] = useState<number>(0);
    const [isGraphHex, setIsGraphHex] = useState<boolean>(true);

    function setOption(n: number) {
        setSelectedOption(n)
    }

    function graphToggle() {
        setIsGraphHex(!isGraphHex)
    }

    return (
        <InfoOptionContext.Provider
            value={{
                option: selectedOption,
                setOption,
                isGraphHex,
                graphToggle
            }}>
            {children}
        </InfoOptionContext.Provider>
    );
}

export function useInfoOption() {
    const context = useContext(InfoOptionContext);
    if (!context) {
        throw new Error('useInfoOption deve ser usado dentro de um InfoOptionProvider');
    }
    return context;
}



