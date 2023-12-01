import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";


interface ISeachFilterContext {
    filterText: string
    setFilterText: Dispatch<SetStateAction<string>>
    isKeyboardOpened: boolean
    setIsKeyboardOpened: Dispatch<SetStateAction<boolean>>
    selectedKey: number
    setSelectedKey: Dispatch<SetStateAction<number>>
    isInputFocus: boolean
    setIsInputFocus: Dispatch<SetStateAction<boolean>>
    handleKeyAction: (key: string) => void
}

const SeachFilterContext = createContext<ISeachFilterContext | null>(null);

export function SeachFilterProvider({ children }: { children: React.ReactNode }) {

    const [filterText, setFilterText] = useState("");
    const [isKeyboardOpened, setIsKeyboardOpened] = useState(false);
    const [selectedKey, setSelectedKey] = useState(0);
    const [isInputFocus, setIsInputFocus] = useState(false);

    function handleKeyAction(key: string) {
        switch (key) {
            case "DEL": return setFilterText((text: string) => text.slice(0, -1))
            case "CLR": return setFilterText("")
            default: setFilterText((text: string) => text + key)
        }
    }

    return (
        <SeachFilterContext.Provider
            value={{
                filterText,
                setFilterText,
                isKeyboardOpened,
                setIsKeyboardOpened,
                selectedKey,
                setSelectedKey,
                isInputFocus,
                setIsInputFocus,
                handleKeyAction
            }}>
            {children}
        </SeachFilterContext.Provider>
    );
}

export function useSeachFilter() {
    const context = useContext(SeachFilterContext);
    if (!context) {
        throw new Error('useSeachFilter deve ser usado dentro de um SeachFilterProviderj');
    }
    return context;
}



