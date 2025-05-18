export const Moods = [
    { name: 'SuperSad', emoji: '🥲' },
    { name: 'Sad', emoji: '🙁' },
    { name: 'Neutral', emoji: '😐' },
    { name: 'Happy', emoji: '🙂' },
    { name: 'SuperHappy', emoji: '😀' },
    { name: 'Tired', emoji: '🥱' },
    { name: 'Bored', emoji: '😑' },
    { name: 'Party', emoji: '🥳' },
    { name: 'Goofy', emoji: '🤪' },
    { name: 'Sick', emoji: '🤒' }
] as const

export type Mood = typeof Moods[number]
