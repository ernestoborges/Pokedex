import styled from "styled-components"

export function MoveCategoryLabel({ category }: { category: string }) {


    return <>
        <Container>
            <div
                style={{ background: `var(--category-${category})` }}
            >
                <img src={`images/move-${category.toLowerCase()}.png`} />
            </div>
        </Container>
    </>
}

const Container = styled.div`
    color: white;
    & > div {
        width: 6.4rem;
        letter-spacing: 0.1rem;
        text-shadow: none;
        font-size: 1rem;
        border-radius: 0.4rem;
        border: 0.2rem solid var(--dark-gray);
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.2rem 0 ;
        text-shadow: 
                0px 1px 0px var(--game-font-shadow),
                1px 0px 0px var(--game-font-shadow),
                1px 1px 0px var(--game-font-shadow),
            ;

        
        & > img {
            height: 15px;
        }
    }
`