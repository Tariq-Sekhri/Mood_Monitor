'use server'

import {client} from "@/lib/db"

export async function increment(mood:string){
    try {
        const result = await client.incr(mood);
        console.log(`Incremented ${mood.replace('mood:', '')}: ${result}`);
        return result;
    } catch (error) {
        console.error('Error incrementing mood:', error);
        throw error;
    }
}
