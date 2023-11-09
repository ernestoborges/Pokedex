import styled from "styled-components"

export function TopSection() {


    return <Container>
        <div>
            <Circle>
                <div>
                    <div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </Circle>
        </div>
    </Container>
}

const Container = styled.section`
    width: 100%;
    background-color: var(--red-shadow);
    padding-bottom: 1rem;

    & > div {
        padding: 1rem;
        background-color: var(--red);
        display: flex;
    }
`

const Circle = styled.div`
    background-color: rgb(154 157 158);
    border-radius: 100%;
    
    & > div {
        position: relative;
        top: -0.3rem;
        padding: 0.6rem;
        border: 0.1rem solid white;
        border-top: 0.2rem solid white;
        border-bottom: 0;
        background-color: rgb(222 222 222);
        border-radius: 100%;

        & > div {
            position: relative;
            overflow: hidden;
            border: 0.1rem solid var(--border-color);
            background-color: var(--cyan);
            border-radius: 100%;
            width: 6rem;
            height: 6rem;

            & > div{
                position: absolute;
                border-radius: 100%;
                

                &:first-child{
                    background-color: var(--light-cyan);
                    width: 5rem;
                    height: 5rem;
                    top: 0.1rem;
                    left: 0.2rem;
                }
                &:nth-child(2){
                    background-color: white;
                    width: 2rem;
                    height: 2rem;
                    top: 1rem;
                    left: 1rem;
                }
            }
        }
    }
`