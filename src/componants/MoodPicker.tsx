'use client'
import { useState } from "react"
import { Mood, Moods } from "@/types/mood"

interface MoodPickerProps {
    setMood: (mood: Mood) => Promise<void> | void
}

export default function MoodPicker({ setMood }: MoodPickerProps) {
    const [isSelecting, setIsSelecting] = useState(false)

    const handleMoodClick = async (mood: Mood) => {
        if (isSelecting) return // Prevent multiple selections
        setIsSelecting(true)
        try {
            await setMood(mood)
        } catch (error) {
            console.error('Failed to set mood:', error)
            setIsSelecting(false)
        }
    }

    return (
        <div className="bg-white text-black w-80 absolute top-[150px] left-1/2 transform -translate-x-1/2">
            <div className="grid grid-cols-5 gap-x-0 gap-y-4 text-center">
                {Moods.map(m => (
                    <button
                        className={`text-5xl transition-opacity ${isSelecting ? 'opacity-50' : 'hover:scale-110'}`}
                        onClick={() => handleMoodClick(m)}
                        disabled={isSelecting}
                        key={m.name}
                    >
                        {m.emoji}
                    </button>
                ))}
            </div>
        </div>
    )
}
