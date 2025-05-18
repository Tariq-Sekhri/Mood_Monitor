'use server'

import { client } from '@/lib/db'
import { Moods } from '@/types/mood'

export async function resetMood(): Promise<void> {
    try {
        for (const { name } of Moods) {
            await client.set(`mood:${name}`, '0')
        }
        console.log('All moods reset to 0');
    } catch (error) {
        console.error('Error resetting moods:', error);
        throw error;
    }
}
