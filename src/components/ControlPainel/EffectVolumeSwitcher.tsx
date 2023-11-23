import { DefaultVolumeSwitcher } from "./DefaultVolumeSwitcher"
import { useEffect, useRef, useState } from "react"
import { PiSpeakerSimpleHighFill } from "react-icons/pi";
import { useBeepAudio } from "../../providers/BeepAudioProvider";
import { useDescriptionText } from "../../providers/DescriptionTextProvider";

export function EffectVolumeSwitcher() {

    const audioRef = useRef<HTMLAudioElement>(null)
    const [volume, setVolume] = useState<string>("0.1")

    const { setBeepVolume } = useBeepAudio()!
    const { setDesctiptionAudioVolume } = useDescriptionText()!

    useEffect(() => {
        setBeepVolume(volume)
        setDesctiptionAudioVolume(volume)
    }, [volume])

    return <>
        <div>
            <DefaultVolumeSwitcher
                icon={<PiSpeakerSimpleHighFill />}
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
