import styled from "styled-components"

interface IBaseStat {
    hp: number
    atk: number
    sp_atk: number
    def: number
    sp_def: number
    speed: number
}

export function BarsGraph({ stats }: {
    stats: {
        base_stat: number
        effort: number
        stat: {
            name: "string"
            url: "string"
        }
    }[]
}) {

    let baseStats: IBaseStat = {
        hp: 0,
        atk: 0,
        sp_atk: 0,
        def: 0,
        sp_def: 0,
        speed: 0
    }

    stats.forEach(s => {
        baseStats = {
            ...baseStats,
            [convertStatName(s.stat.name)]: s.base_stat
        }
    })

    function convertStatName(name: string) {
        switch (name) {
            case "attack": return "atk";
            case "defense": return "def";
            case "special-defense": return "sp_def";
            case "special-attack": return "sp_atk";
            default: return name;
        }
    }

    return <>
        <Container>
            <ul className="text-shadow">
                <li><span>HP</span><span>{baseStats.hp}</span><span><div className="bar" style={{width: baseStats.hp/2+"px"}}/></span></li>
                <li><span>ATK</span><span>{baseStats.atk}</span><span><div className="bar" style={{width: baseStats.atk/2+"px"}}/></span></li>
                <li><span>DEF</span><span>{baseStats.def}</span><span><div className="bar" style={{width: baseStats.def/2+"px"}}/></span></li>
                <li><span>SP.ATK</span><span>{baseStats.sp_atk}</span><span><div className="bar" style={{width: baseStats.sp_atk/2+"px"}}/></span></li>
                <li><span>SP.DEF</span><span>{baseStats.sp_def}</span><span><div className="bar" style={{width: baseStats.sp_def/2+"px"}}/></span></li>
                <li><span>SPEED</span><span>{baseStats.speed}</span><span><div className="bar" style={{width: baseStats.speed/2+"px"}}/></span></li>
            </ul>
        </Container>
    </>
}

const Container = styled.div`
    display: flex;
    justify-content: center;

    & > ul {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;

        & > li {
            display: flex;

            & > span:first-child {
                flex-grow: 1;
                display: flex;
                justify-content: flex-start;
                font-weight: bold;
            }
            & > span:nth-child(2){
                width: 2.5rem;
                display: flex;
                justify-content: flex-end;
            }
            & > span:last-child {
                width: 127.5px;
                margin-left: 0.4rem;
                4rem;
                background-color: var(--light-cyan);
                border-radius: 0.2rem;
            }
        }
    }

    & .bar {
        background-color: var(--cyan);
        height: 15px;
        border-radius: 0.2rem;
    }
`