# Mood Monitor

Real-time mood tracking application. Users select a mood emoji and the community's emotional state is aggregated live.

## Features

- Real-time mood selection with immediate vote aggregation
- One vote per user enforced via local persistence
- Background gradient reflects the most popular community mood
- Vote statistics display showing distribution across all moods

## Moods

- 🥲 Super Sad
- 🙁 Sad
- 😐 Neutral
- 🙂 Happy
- 😀 Super Happy
- 🥱 Tired
- 😑 Bored
- 🥳 Party
- 🤪 Goofy
- 🤒 Sick

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Redis
- **State**: React Hooks + Server Actions

## Getting Started

**Clone the repository**

```bash
git clone https://github.com/Tariq-Sekhri/Mood_Monitor
cd mood_monitor
```

**Install dependencies**

```bash
npm install
```

**Configure environment**

Create `.env.local`:

```env
REDIS_PW=your_redis_password
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
```

**Run development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
mood_monitor/
├── src/
│   ├── actions/         # Server actions for mood operations
│   ├── app/             # Next.js app router pages
│   ├── components/       # React components
│   ├── lib/             # Utilities and configurations
│   └── types/           # TypeScript type definitions
├── public/              # Static assets
└── ...config files
```

## How It Works

**Voting**
Users select a mood from the emoji grid. Each user gets one active vote stored locally and in Redis. Changing moods automatically decrements the previous vote and increments the new one.

**Visualization**
The background gradient shifts to match the hex color of the current winning mood. A statistics panel displays vote counts for all moods in real-time.

**Persistence**
User votes persist across browser sessions via localStorage. Redis maintains the global vote counts for all connected clients.

## License

Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

You may use and modify this project for non-commercial purposes with appropriate attribution. See LICENSE file for details.

## Contributing

Pull requests are welcome.
```
