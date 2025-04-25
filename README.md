![banner](https://codemeapixel.dev/Pixie.png)

## Features

- 💬 **Natural Conversations**: Engage in fluid, context-aware discussions with AI
- 📱 **Responsive Design**: Works seamlessly across desktop and mobile devices
- 💾 **Message Management**: Save important messages and maintain chat history
- 📥 **Data Export**: Download conversations and saved messages for offline use
- 🔒 **Privacy Focused**: All data is stored locally in your browser
- 🎨 **Modern UI**: Clean, intuitive interface with smooth animations

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- A GROQ API key (for AI chat functionality)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pixie.git
cd pixie
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with the following variables:
```env
# Authentication
AUTH_SECRET=your_auth_secret_here

# AI API Keys
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_key
ANTHROPIC_API_KEY=your_anthropic_key
OPENAI_API_KEY=your_openai_key
GROQ_API_KEY=your_groq_key
TAVILY_API_KEY=your_tavily_key

# Storage
BLOB_READ_WRITE_TOKEN=your_blob_token

# Database
POSTGRES_URL=your_postgres_url
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Chat Interface
- Type your message in the input field at the bottom of the screen
- Press Enter or click the send button to get a response
- View the conversation history in real-time

### Message Management
- Save important messages using the bookmark icon
- Access saved messages from the sidebar
- Download individual messages or entire conversations
- Clear chat history or delete specific conversations

### Mobile Experience
- Responsive design adapts to any screen size
- Sidebar collapses into a hamburger menu on mobile
- Touch-friendly interface for easy navigation

## Tech Stack

- **Framework**: Next.js 14
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **AI Integration**: Multi-provider (OpenAI, Google AI, Anthropic, GROQ)
- **Database**: PostgreSQL
- **Storage**: Vercel Blob Storage
- **Markdown Support**: react-markdown
- **Code Highlighting**: react-syntax-highlighter

## Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [GROQ](https://groq.com/)
