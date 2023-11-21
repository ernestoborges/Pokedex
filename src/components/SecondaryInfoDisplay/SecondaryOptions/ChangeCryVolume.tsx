import styled from "styled-components";

export function ChangeCryVolume({
    volume,
    setVolume
}: {
    volume: number
    setVolume: (n: number) => void
}
) {

    return <>
        <Container>
            {`Volume`}
            <input
                type="range"
                value={volume * 100}
                onChange={
                    (e: any) => setVolume(Number(e.target.value) / 100)
                }
                onClick={(e: any)=> e.preventDefault()}
                onKeyDown={(e: any)=> e.preventDefault()}
                onKeyUp={(e: any)=> e.preventDefault()}
                min="0"
                max="100"
                step="10"
            />
            <div>
                <div><div className={`toggleable-background`} />0</div>
                <div><div className={`toggleable-background`} />1</div>
                <div><div className={`toggleable-background`} />2</div>
                <div><div className={`toggleable-background`} />3</div>
                <div><div className={`toggleable-background`} />4</div>
                <div><div className={`toggleable-background`} />5</div>
                <div><div className={`toggleable-background`} />6</div>
                <div><div className={`toggleable-background`} />7</div>
                <div><div className={`toggleable-background`} />8</div>
                <div><div className={`toggleable-background`} />9</div>
                <div><div className={`toggleable-background`} />10</div>
            </div>
        </Container>
    </>
}

const Container = styled.div`
    padding: 0.4rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    & input {
        -webkit-appearance: none;
        background-repeat: no-repeat;
        cursor: pointer;
        outline: transparent;
        position: relative;
        z-index: 1;

        &::-webkit-slider-thumb  {
            -webkit-appearance: none;
            width: 2rem;
            height: 3rem;
            border: 0.1rem solid var(--gray);
            background: linear-gradient(180deg, white 20%, var(--light-gray) 20%, var(--light-gray) 90%, var(--gray) 90%);
            border-radius: 0.4rem;
            transition: background .3s ease-in-out;
            margin-top: -1.45rem;
        }
        
        &::-webkit-slider-runnable-track  {
            -webkit-appearance: none;
            box-sizing: content-box;
            border: 0.2rem solid var(--gray);
            border-top: 0.2rem solid var(--dark-gray);
            border-radius: 0.4rem;
            background: var(--border-color);
            height: 0.1rem;
        }
    }

    & > div {
        display: flex;
        width: 100%;
        padding: 0 0.6rem;
        justify-content: space-around;
        & > div {
            width: calc(100% / 11);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.4rem;

            & .toggleable-background{
                width: 0.1rem;
                height: 1rem;
                background-color: var(--dark-gray);
                border-radius: 1rem;
                // border: 0.1rem solid var(--light-gray);
                box-sizing: content-box;
            }
        }
    }
`