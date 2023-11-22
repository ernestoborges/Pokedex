import { DefaultVolumeSwitcher } from "./DefaultVolumeSwitcher"
import { useEffect, useRef, useState } from "react"
import { RiMusic2Fill } from "react-icons/ri";
import { useBeepAudio } from "../../providers/BeepAudioProvider";

export function EffectVolumeSwitcher() {

    const audioRef = useRef<HTMLAudioElement>(null)
    const [volume, setVolume] = useState<string>("0.2")

    const { setBeepVolume } = useBeepAudio()!

    useEffect(() => {
        setBeepVolume(volume)
    }, [volume])

    return <>
        <div>
            <DefaultVolumeSwitcher
                icon={<RiMusic2Fill />}
                volume={volume}
                setVolume={setVolume}
            />
            <audio
                ref={audioRef}
                src="/audios/music/pokecenter.mp3"
                loop
            />
        </div>
    </>
}
