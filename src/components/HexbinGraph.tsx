import styled from "styled-components"

interface IBaseStat {
    hp: number
    atk: number
    sp_atk: number
    def: number
    sp_def: number
    speed: number
}

export function HexbinGraph({ stats }: {
    stats: {
        base_stat: number
        effort: number
        stat: {
            name: "string"
            url: "string"
        }
    }[]
}) {

    const maxStatValue = 255

    const maxStats = {
        hp: 255,
        atk: 255,
        sp_atk: 255,
        def: 255,
        sp_def: 255,
        speed: 255
    }

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
            <div>
                <Hexagons isFlat stat={maxStats} max={maxStatValue} color='var(--dark-gray)' zIndex={1} />
                <Hexagons isFlat stat={maxStats} max={maxStatValue} color='white' zIndex={2} />
                <Hexagons stat={baseStats as IBaseStat} max={maxStatValue} color='cyan' zIndex={4} />
                <div>
                    <div className="line" />
                    <div className="line" />
                    <div className="line" />
                </div>
                <div className="stats-labels text-shadow">
                    <div><span>HP</span> <span>{baseStats.hp}</span></div>
                    <div><span>ATK</span><span>{baseStats.atk}</span></div>
                    <div><span>DEF</span><span>{baseStats.def}</span></div>
                    <div><span>SPEED</span><span>{baseStats.speed}</span></div>
                    <div><span>SP.DEF</span><span>{baseStats.sp_atk}</span></div>
                    <div><span>SP.ATK</span><span>{baseStats.sp_def}</span></div>
                </div>
            </div>
        </Container>
    </>
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    transform: rotate(-30deg);

    & > div {
        position: relative;
        width: 11.2rem;
        height: 9.7rem;

        & .chart {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 11rem;
            height: 9.5rem;

            &:nth-child(1){
                width: 11.4rem;
                height: 9.9rem;
            }
        }

        & .stats-labels {
            transform: rotate(30deg);
            width: 100%;
            height: 100%;

            & > div {
                position: absolute;
                transform: translate(-50%, -50%);
                z-index: 10;
                color: var(--border-color);
                display: flex;
                flex-direction: column;
                align-items: center;
                
                &:nth-child(1){
                    top: -25%;
                    left: 50%;
                }

                &:nth-child(2){
                    top: 10%;
                    left: 110%;
                }

                &:nth-child(3){
                    top: 94%;
                    left: 110%;
                }

                &:nth-child(4){
                    top: 130%;
                    left: 50%;
                }

                &:nth-child(5){
                    top: 94%;
                    left: -15%;
                }

                &:nth-child(6){
                    top: 10%;
                    left: -15%;
                }
            }
        }
    }

    

    & .line {
        width: 94%;
        border-bottom: 0.2rem dashed rgba(0,0,0,.1);
        position: absolute;
        top: 50%;
        left: 50%;
        transform:  translate(-50%, -50%);
        z-index: 3;

        &:nth-child(2){
            transform:  translate(-50%, -50%) rotate(120deg);
        }
        &:nth-child(3){
            transform:  translate(-50%, -50%) rotate(-120deg);
        }

    }
`

function Hexagons(
    {
        stat,
        max,
        color,
        zIndex,
        isFlat
    }: {
        stat: IBaseStat
        max: number
        color: string
        zIndex: number
        isFlat?: boolean
    }) {

    if (isFlat) {
        return <>
            <div
                className="chart"
                style={{
                    zIndex: zIndex,
                    backgroundColor: color,
                    clipPath:
                        "polygon(" +
                        (45 + (-20 * max) / max) +
                        "% " +
                        (40 + (-40 * max) / max) +
                        "%, " +
                        (55 + (20 * max) / max) +
                        "% " +
                        (40 + (-40 * max) / max) +
                        "%, " +
                        (60 + (40 * max) / max) +
                        "% " +
                        (50 + 0) +
                        "%, " +
                        (55 + (20 * max) / max) +
                        "% " +
                        (60 + (40 * max) / max) +
                        "%, " +
                        (45 + (-20 * max) / max) +
                        "% " +
                        (60 + (40 * max) / max) +
                        "%, " +
                        (40 + (-40 * max) / max) +
                        "% " +
                        (50 + 0) +
                        "%)",
                }}
            />
        </>
    }

    return <>
        <div
            className="chart"
            style={{
                zIndex: zIndex,
                backgroundColor: color,
                opacity: 0.8,
                clipPath:
                    "polygon(" +
                    (45 + (-20 * stat.sp_atk) / max) +
                    "% " +
                    (40 + (-40 * stat.sp_atk) / max) +
                    "%, " +
                    (55 + (20 * stat.hp) / max) +
                    "% " +
                    (40 + (-40 * stat.hp) / max) +
                    "%, " +
                    (60 + (40 * stat.atk) / max) +
                    "% " +
                    (50 + 0) +
                    "%, " +
                    (55 + (20 * stat.def) / max) +
                    "% " +
                    (60 + (40 * stat.def) / max) +
                    "%, " +
                    (45 + (-20 * stat.speed) / max) +
                    "% " +
                    (60 + (40 * stat.speed) / max) +
                    "%, " +
                    (40 + (-40 * stat.sp_def) / max) +
                    "% " +
                    (50 + 0) +
                    "%)",
            }}
        />
    </>
}
