'use client'
import { useState, useEffect } from 'react'
import { getMoodValues } from '@/actions/getMoodValues'
import { Moods } from '@/types/mood'

// Create a custom event for mood updates
export const MOOD_UPDATED_EVENT = 'moodUpdated';

export default function VoteDisplay() {
    const [moodValues, setMoodValues] = useState<Record<string, number>>({})
    const [loading, setLoading] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)

    const handleRefresh = async () => {
        if (loading) return; // Prevent multiple simultaneous refreshes
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

    // Set up auto-refresh and event listeners
    useEffect(() => {
        // Initial load
        handleRefresh()

        // Set up auto-refresh interval
        const intervalId = setInterval(handleRefresh, 5000)

        // Set up mood update event listener
        const handleMoodUpdate = () => {
            handleRefresh()
        }
        window.addEventListener(MOOD_UPDATED_EVENT, handleMoodUpdate)

        // Cleanup function
        return () => {
            clearInterval(intervalId)
            window.removeEventListener(MOOD_UPDATED_EVENT, handleMoodUpdate)
        }
    }, []) // Empty dependency array since handleRefresh is stable

    if (isMinimized) {
        return (
            <button
                onClick={() => setIsMinimized(false)}
                className="fixed bottom-4 right-4 bg-white p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-all"
                title="Show mood counts"
            >
                📊
            </button>
        )
    }

    return (
        <div className="fixed bottom-4 right-4 bg-white/90 backdrop-blur p-4 rounded-lg shadow-lg border border-gray-200 max-w-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Current Moods</h2>
                <div className="flex gap-2">
                    <button
                        onClick={handleRefresh}
                        className="text-blue-600 hover:text-blue-800 disabled:text-blue-300 transition-colors"
                        disabled={loading}
                        title="Refresh counts"
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
            
            <div className="grid grid-cols-2 gap-2">
                {Moods.map((mood) => {
                    const count = moodValues[mood.name] ?? 0
                    return (
                        <div
                            key={mood.name}
                            className="bg-gray-800 text-white px-4 py-2 rounded flex items-center justify-between"
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-2xl">{mood.emoji}</span>
                                <span className="font-medium">{mood.name}</span>
                            </span>
                            <span className="font-mono bg-gray-700 px-2 py-1 rounded-md">
                                {count}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
} 