import MoodState from "@/components/MoodState";
import VoteDisplay from "@/components/VoteDisplay";
import { Mood, Moods } from "@/types/mood"
import { getMoodValues } from "@/actions/getMoodValues";

const moodGradientMap: Record<Mood['name'], [string, string]> = {
    SuperSad: ['#1C3DA9', '#0C1C52'],
    Sad: ['#3461F4', '#0A2C9C'],
    Neutral: ['#FFF685', '#3461F4'],
    Happy: ['#FFF685', '#F9D423'],
    SuperHappy: ['#FFD580', '#E1FF00'],
    Tired: ['#9386AF', '#45386C'],
    Bored: ['#D3D3E0', '#8B8CA3'],
    Party: ['#FF5FD2', '#845EF7'],
    Goofy: ['#15FF00', '#FF7E00'],
    Sick: ['#C8FACC', '#70C173'],
}

export default async function Home() {
    const globalMoodData = await getMoodValues()
    const highestMood = Object.entries(globalMoodData)
        .reduce((highest, [mood, count]) => 
            count > (highest.count || 0) ? { name: mood, count } : highest, 
            { name: Moods[0].name, count: 0 }
        );
    const globalMood = Moods.find(m => m.name === highestMood.name) || Moods[0];

    return (
        <div className="min-h-screen flex flex-col">
            <header className="flex justify-between items-center bg-gradient-to-r from-blue-300 to-blue-800 text-7xl h-24 p-3">
                <p>Mood Monitor</p>
                <MoodState />
            </header>

            <main
                className="flex-1 w-full"
                style={{
                    backgroundImage: globalMood
                        ? `linear-gradient(to right, ${moodGradientMap[globalMood.name][0]}, ${moodGradientMap[globalMood.name][1]})`
                        : undefined,
                }}
            ></main>

            <footer className="bg-gradient-to-r from-blue-300 to-blue-800 text-white text-center py-4">
                <div className="flex justify-center gap-6">
                    <a href="https://github.com/Tariq-Sekhri" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
                    <a href="https://linkedin.com/in/tariq-sekhri-b69098232/" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                    <a href="mailto:tariqsekhri+moodmonitor@gmail.com" className="hover:underline">Email</a>
                </div>
                <p className="text-sm mt-2">© 2025 Mood Monitor</p>
            </footer>
            <VoteDisplay />
            {/* <DevPanel /> */}
        </div>
    )
}
