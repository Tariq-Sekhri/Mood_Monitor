'use server'

import {client} from "@/lib/db"

export async function decrement(mood:string){
    try {
        const result = await client.decr(mood);
        console.log(`Decremented ${mood.replace('mood:', '')}: ${result}`);
        return result;
    } catch (error) {
        console.error('Error decrementing mood:', error);
        throw error;
    }
} 