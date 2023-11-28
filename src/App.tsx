import styled from "styled-components";
import { MainDisplay } from "./components/MainDisplay";
import { SearchDisplay } from "./components/SearchDisplay";
import { TopSection } from "./components/TopSection";
import { InfoDisplay } from "./components/InfoDisplay/InfoDisplay";
import { InfoOptionProvider } from "./providers/InfoOptionProvider";
import { OptionsButtons } from "./components/InfoDisplay/OptionsButtons";
import { usePokemonList } from "./providers/PokemonListProvider";
import { SecondaryInfoDisplay } from "./components/SecondaryInfoDisplay/SecondaryInfoDisplay";
import { ControlPainel } from "./components/ControlPainel/ControlPainel";
import { PokeballSpinLoading } from "./components/PokeballSpinLoading";

export default function App() {

  const { selectedPokemon } = usePokemonList()
  
  if (!selectedPokemon) {
    return <PokeballSpinLoading />
  }

  return (
    <>
      <Main>
        <LeftSection>
          <div>
            <TopSection />
            <MainDisplay />
            <SearchDisplay />
          </div>
        </LeftSection>
        <RightSection>
          <div>
            <InfoOptionProvider>
              <InfoDisplay />
              <OptionsButtons />
              <div className="secondary-info-display-section">
                <ControlPainel />
                <SecondaryInfoDisplay />
              </div>
            </InfoOptionProvider>
          </div>
        </RightSection>
      </Main >
    </>
  )
}

const Main = styled.main`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: center;

  @media (max-width: 420px){
    width: 100%;
  }
`

const LeftSection = styled.section`
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    background-color: rgb(220 10 45);
    padding: 0 0 3rem;
    border-radius: 1rem;
  }
  
  padding-bottom: 1rem;
  border: 0.2rem solid var(--border-color);;
  background-color: rgb(148 24 38);
  border-radius: 1rem;
  overflow: hidden;

  @media (max-width: 420px){
    border: none;
    border-radius: 0;

    width: 100%;
    
  }
`
const RightSection = styled.section`
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.4rem;
    background-color: rgb(220 10 45);
    padding: 1.8rem 2rem 1.4rem;
    border-radius: 1rem;
  }

  padding-bottom: 1rem;
  border: 0.2rem solid var(--border-color);;
  background-color: rgb(148 24 38);
  border-radius: 1rem;
  overflow: hidden;

  & .secondary-info-display-section {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }


  @media (max-width: 420px){
    border: none;
    border-radius: 0;

    width: 100%;
    
    & > div {
      padding: 1.8rem 1rem 1.4rem;
    }
  }
`

