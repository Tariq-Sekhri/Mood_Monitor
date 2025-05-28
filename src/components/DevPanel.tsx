'use client'
import { increment } from '@/actions/increment'
import { resetMood } from '@/actions/resetMoods'
import { getMoodValues } from '@/actions/getMoodValues'
import { Moods } from '@/types/mood'
import { useState, useEffect } from 'react'

export default function DevPanel() {
    const [moodValues, setMoodValues] = useState<Record<string, number>>({})
    const [loading, setLoading] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)

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

    if (isMinimized) {
        return (
            <button
                onClick={() => setIsMinimized(false)}
                className="fixed bottom-4 right-4 bg-white p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-all"
                title="Show dev panel"
            >
                ⚙️
            </button>
        )
    }

    return (
        <div className="fixed bottom-4 right-4 bg-white/90 backdrop-blur p-4 rounded-lg shadow-lg border border-gray-200 max-w-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Dev Panel</h2>
                <div className="flex gap-2">
                    <button
                        onClick={handleGetMoodValues}
                        className="text-blue-600 hover:text-blue-800 disabled:text-blue-300 transition-colors"
                        disabled={loading}
                        title="Refresh values"
                    >
                        🔄
                    </button>
                    <button
                        onClick={() => setIsMinimized(true)}
                        className="text-gray-600 hover:text-gray-800 transition-colors"
                        title="Minimize"
                    >
                        ⌄
                    </button>
                </div>
            </div>
            
            <div className="space-y-4">
                <button
                    onClick={handleReset}
                    className="w-full bg-red-500/90 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                    disabled={loading}
                >
                    Reset All Moods
                </button>

                <div className="grid grid-cols-2 gap-2">
                    {Moods.map((mood) => (
                        <button
                            key={mood.name}
                            onClick={() => handleIncrement(mood.name)}
                            className="bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center justify-between hover:bg-gray-700 transition-colors disabled:opacity-50"
                            disabled={loading}
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-2xl">{mood.emoji}</span>
                                <span className="font-medium">{mood.name}</span>
                            </span>
                            <span className="font-mono bg-gray-700 px-2 py-1 rounded-md">
                                {moodValues[mood.name] ?? 0}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
