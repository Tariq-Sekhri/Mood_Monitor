'use client'
import { useEffect, useState } from "react"
import { Mood } from "@/types/mood"
import MoodPicker from "./MoodPicker"
import { increment } from "@/actions/increment"
import { decrement } from "@/actions/decrement"
import { MOOD_UPDATED_EVENT } from "./VoteDisplay"

const dispatchMoodUpdate = () => {
    window.dispatchEvent(new Event(MOOD_UPDATED_EVENT))
}

export default function MoodState() {
    const [mood, setMood] = useState<Mood | null>(null)
    const [isInitialLoad, setIsInitialLoad] = useState(true)

    useEffect(() => {
        const stored = localStorage.getItem("mood")
        if (stored) {
            const parsed: Mood = JSON.parse(stored)
            setMood(parsed)
        }
        setIsInitialLoad(false)
    }, [])

    useEffect(() => {
        if (!isInitialLoad && mood) {
            localStorage.setItem("mood", JSON.stringify(mood))
        }
    }, [mood, isInitialLoad])

    const handleMoodSelect = async (selectedMood: Mood) => {
        setMood(selectedMood)
        // Only increment if this is a new mood selection (not from localStorage)
        if (!isInitialLoad) {
            try {
                await increment(`mood:${selectedMood.name}`)
                dispatchMoodUpdate() // Notify that mood counts have changed
            } catch (error) {
                console.error('Failed to increment mood:', error)
            }
        }
    }

    const handleClearMood = async () => {
        if (mood) {
            try {
                // First decrement the current mood
                await decrement(`mood:${mood.name}`)
                dispatchMoodUpdate() // Notify that mood counts have changed
                // Then clear the mood state and localStorage
                setMood(null)
                localStorage.removeItem("mood")
            } catch (error) {
                console.error('Failed to decrement mood:', error)
                // Still clear the mood even if decrement fails
                setMood(null)
                localStorage.removeItem("mood")
            }
        }
    }

    return (
        <>
            <div className="flex justify-between items-center">
                <div /> 
                {mood && (
                    <p 
                        className="text-4xl cursor-pointer hover:opacity-80 transition-opacity" 
                        onClick={handleClearMood}
                        title="Click to change your mood"
                    >
                        {mood.emoji}
                    </p>
                )}
            </div>
            {!mood && <MoodPicker setMood={handleMoodSelect} />}
        </>
    )
} 