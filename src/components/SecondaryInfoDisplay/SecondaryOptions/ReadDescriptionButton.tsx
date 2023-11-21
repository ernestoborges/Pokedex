import styled from "styled-components"

export function ReadDescription({
    speak
}: {
    speak: () => void
}) {

    return <>
        <Container>
            <Button onClick={speak}>
                Read
            </Button>
        </Container>
    </>
}

const Container = styled.div`
`

const Button = styled.div`
`