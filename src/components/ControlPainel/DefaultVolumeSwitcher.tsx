import styled from "styled-components"

export function DefaultVolumeSwitcher({
    icon,
    volume,
    setVolume
}: {
    icon: React.ReactNode
    volume: string
    setVolume: (value: string) => void
}) {

    return <>
        <Container>
            {icon}
            <input
                type="range"
                value={volume}
                max="1"
                min="0"
                step="0.1"
                onChange={(e) => setVolume(e.target.value)}
            />
        </Container>
    </>
}

const Container = styled.div`
    margin: 1rem 0;
    display: flex;
    gap: 1rem;

    & > svg {
        font-size: 2rem;
        background-color: var(--red);
        color: rgb(110 5 22);
    }

    & > input {
        width: 10rem;

        -webkit-appearance: none;
        background-repeat: no-repeat;
        background-color: transparent;
        cursor: pointer;
        outline: transparent;
        // position: relative;
        // z-index: 1;

        &::-webkit-slider-thumb  {
            -webkit-appearance: none;
            width: 1rem;
            height: 3rem;
            background: linear-gradient(180deg, #222222 0%, #222222 80%, #111111 90%);
            border-radius: 0.4rem;
            transition: background .3s ease-in-out;
            margin-top: -1.45rem;
        }
        
        &::-webkit-slider-runnable-track  {
            -webkit-appearance: none;
            box-sizing: content-box;
            border: 0.2rem solid #333333;
            border-top: 0.2rem solid #222222;
            border-radius: 0.4rem;
            background: #111111;
            height: 0.1rem;
        }
    }
`