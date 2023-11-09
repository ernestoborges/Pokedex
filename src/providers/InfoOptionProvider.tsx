import { createContext, useContext, useState } from "react";


interface IInfoOptionContext {
    option: number
    setOption: (n: number) => void
}

const InfoOptionContext = createContext<IInfoOptionContext | null>(null);

export function InfoOptionProvider({ children }: { children: React.ReactNode }) {

    const [selectedOption, setSelectedOption] = useState<number>(0);

    function setOption(n: number) {
        setSelectedOption(n)
    }

    return (
        <InfoOptionContext.Provider value={{ option: selectedOption, setOption }}>
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



