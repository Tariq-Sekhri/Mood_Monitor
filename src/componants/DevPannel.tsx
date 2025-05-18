'use client'
import { increment } from '@/actions/increment'
import { resetMood } from '@/actions/resetMoods'
import { getMoodValues } from '@/actions/getMoodValues'
import { Moods } from '@/types/mood'
import { useState, useEffect } from 'react'

export default function DevPanel() {
    const [moodValues, setMoodValues] = useState<Record<string, number>>({})
    const [loading, setLoading] = useState(false)

    // Load initial values
    useEffect(() => {
        handleGetMoodValues()
    }, [])

    const handleGetMoodValues = async () => {
        try {
            setLoading(true)
            const values = await getMoodValues()
            setMoodValues(values)
        } catch (error) {
            console.error('Error getting mood values:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleIncrement = async (moodName: string) => {
        try {
            setLoading(true)
            await increment(`mood:${moodName}`)
            // Refresh values after increment
            handleGetMoodValues()
        } catch (error) {
            console.error('Error incrementing mood:', error)
        }
    }

    const handleReset = async () => {
        try {
            setLoading(true)
            await resetMood()
            // Refresh values after reset
            handleGetMoodValues()
        } catch (error) {
            console.error('Error resetting moods:', error)
        }
    }

    return (
        <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 max-w-md">
            <h2 className="text-xl font-bold mb-4">Dev Panel</h2>
            
            <div className="space-y-4">
                <div className="flex gap-2">
                    <button
                        onClick={handleGetMoodValues}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                        disabled={loading}
                    >
                        Get Mood Values
                    </button>
                    <button
                        onClick={handleReset}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
                        disabled={loading}
                    >
                        Reset All Moods
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    {Moods.map((mood) => (
                        <button
                            key={mood.name}
                            onClick={() => handleIncrement(mood.name)}
                            className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded flex items-center justify-between disabled:opacity-50"
                            disabled={loading}
                        >
                            <span>
                                {mood.emoji} {mood.name}
                            </span>
                            <span className="font-mono bg-white px-2 py-1 rounded-md shadow-sm">
                                {moodValues[mood.name] ?? 0}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
