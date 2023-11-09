import styled from "styled-components"
import { usePokemonList } from "../providers/PokemonListProvider"

export function MainDisplay() {

    const { selectedPokemon } = usePokemonList()

    return <>
        <Container>
            <Wrapper>
                <Display>
                    <div>
                        <div className="overlay" />
                        {
                            selectedPokemon &&
                            <img
                                src={`https://projectpokemon.org/images/normal-sprite/${selectedPokemon.name}.gif`}
                                alt={`Pokemon ${selectedPokemon.name}`}
                            />
                        }
                    </div>
                </Display>
                <BottomBar>
                    <Circle>
                        <div>
                            <div>
                                <div></div>
                            </div>
                        </div>
                    </Circle>
                    <AudioOutput>
                        <div></div>
                    </AudioOutput>
                </BottomBar>
            </Wrapper>
        </Container>
    </>
}

const Container = styled.div`
    background-color: rgb(156 156 156);
    border-radius: 1rem;
    padding-bottom: 0.6rem;
    border: 0.1rem solid white;
    border-bottom: 0;
    box-shadow: 0px 6px 1px var(--shadow-color);
`

const BottomBar = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0.6rem 0;
`

const Circle = styled.div`
    border-radius: 100%;
    background-color: rgb(154 157 158);
    border: 0.1rem solid var(--shadow-color);
    width: 3rem;
    height: 3rem;
    padding: 0.4rem;

    & > div {
        width:100%;
        height: 100%;
        border-radius: 100%;
        // border: 0.1rem solid var(--shadow-color);
        & > div {
            border: 0.1rem solid #901020;
            border-top: 0rem;
            border-bottom: 0.2rem solid #901020;
            border-radius: 100%;
            background-color: rgb(244 21 68);
            width:100%;
            height: 100%;
            position: relative;

            & > div {
                position: absolute;
                left: 2px;
                top: 2px;
                transform: rotate(-45deg);
                width: 70%;
                height: 70%;
                border-radius: 100%;
                border-top: 0.2rem solid white;
            }
        }
    }

`

const AudioOutput = styled.div`
`

const Display = styled.div`
    background-color:rgb(156 156 156);
    padding-top: 0.3rem;
    border-radius: 1rem;
    border: 0.1rem solid white;
    border-top: 0.1rem solid white;
    border-bottom: 0.1rem solid white;

    & > div {
        position: relative;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        padding-bottom: 1rem;
        width: 25.6rem;
        height: 16rem;
        overflow: hidden;
        border-radius: 1rem;
        
        background:
            var(--g1),var(--g1) var(--s) calc(1.73*var(--s)),
            var(--g2),var(--g2) var(--s) calc(1.73*var(--s)),
            var(--g3) var(--s) 0,var(--g3) 0 calc(1.73*var(--s)) 
            var(--light-cyan);
        background-size: calc(2*var(--s)) calc(3.46*var(--s));
          
        box-shadow: 
            inset 0 3px 0 var(--shadow-color);
    
        & > img {
            transform: rotateX(10deg);
        }
        
    }

`

const Wrapper = styled.div`
    background-color: rgb(222 222 222);
    padding: 1rem 2rem 0rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
`