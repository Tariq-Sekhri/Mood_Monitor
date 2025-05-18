'use server'
import { client } from '@/lib/db'
import { redirect } from 'next/navigation'
import { Moods, Mood } from '@/types/mood'

export async function getMoodValues(): Promise<Record<Mood['name'], number>> {
    try {
        const keys = Moods.map(m => `mood:${m.name}`)
        const values = await Promise.all(keys.map(key => client.get(key)))

        const moodValues = Moods.reduce<Record<Mood['name'], number>>(
            (acc, m, i) => {
                acc[m.name] = Number(values[i] ?? '0')
                return acc
            },
            {} as Record<Mood['name'], number>
        )

        console.log('Current mood counts:', Object.entries(moodValues)
            .filter(([_, value]) => value > 0)
            .map(([mood, count]) => `${mood}: ${count}`)
            .join(', ') || 'All moods at 0');

        return moodValues
    } catch (error) {
        console.error('Error getting moods:', error);
        throw error;
    }
}
