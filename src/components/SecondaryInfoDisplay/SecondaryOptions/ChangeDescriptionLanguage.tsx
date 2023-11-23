import styled from "styled-components"
import { useDescriptionText } from "../../../providers/DescriptionTextProvider"

export function DescriptionLanguage({
    language
}: {
    language: string
}) {

    const { language: languageIndex, languageHandler, languagesList } = useDescriptionText();
    return <>
        <Container
            onClick={() => languageHandler(languageIndex < languagesList.length - 1 ? languageIndex + 1 : 0)}
        >
            <span>Language:</span>
            <span>{language}</span>
        </Container>
    </>
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    cursor: pointer;
`