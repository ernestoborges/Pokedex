import styled from "styled-components"

export function DescriptionLanguage({
    language
}: {
    language: string
}) {

    return <>
        <Container>
            <span>Language:</span>
            <span>{language}</span>
        </Container>
    </>
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem;
`