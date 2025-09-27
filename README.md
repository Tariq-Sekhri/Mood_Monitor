# 🎭 Mood Monitor

A real-time mood tracking application that allows users to share and visualize the collective emotional state of the community.

## 🌟 Features

- **Real-time Mood Selection**: Choose from 10 different mood emojis
- **One Vote Per User**: Users can only have one active mood at a time
- **Local Persistence**: Your mood choice persists across browser sessions
- **Global Visualization**: Background gradient reflects the most popular mood
- **Vote Display**: Real-time view of community mood statistics

## 🎨 Available Moods

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

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Redis
- **State Management**: React Hooks + Server Actions
- **Architecture**: Server Components with Client Islands

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tariq-Sekhri/Mood_Monitor
   cd mood_monitor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with:
   ```env
   REDIS_PW=your_redis_password
   REDIS_HOST=your_redis_host
   REDIS_PORT=your_redis_port
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
mood_monitor/
├── src/
│   ├── actions/         # Server actions for mood operations
│   ├── app/            # Next.js app router pages
│   ├── components/     # React components
│   ├── lib/           # Utilities and configurations
│   └── types/         # TypeScript type definitions
├── public/           # Static assets
└── ...config files
```

## 💡 How It Works

1. **Mood Selection**:
   - Users can select their current mood from the emoji grid
   - Each selection is stored locally and on the server
   - Users can change their mood by clicking their current emoji

2. **Vote Tracking**:
   - One vote per user is enforced
   - Previous mood is decremented when changing moods
   - Current mood counts are stored in Redis

3. **Visual Feedback**:
   - Background gradient changes based on most popular mood
   - Current mood is displayed in the header
   - Real-time vote display shows community mood statistics

## 🧪 Development

- Use the built-in dev panel to test mood operations
- Monitor mood counts and state changes in real-time
- Test the one-vote-per-user system
- Experiment with different moods to see gradient changes

## 📝 License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License - see the [LICENSE](LICENSE) file for details. This means you can freely use and modify this project for non-commercial purposes, as long as you provide appropriate attribution.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- Built with Next.js 14 and Redis
- Emoji designs from [Unicode Emoji 15.1](https://unicode.org/emoji/charts/emoji-list.html)

## 📫 Contact

- GitHub: [@Tariq-Sekhri](https://github.com/Tariq-Sekhri)
- LinkedIn: [Tariq Sekhri](https://linkedin.com/in/tariq-sekhri-b69098232)
- Email: tariqsekhri+moodmonitor@gmail.com
