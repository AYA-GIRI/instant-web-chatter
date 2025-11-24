# Instant Web Chatter

A modern, AI-powered chat application built with React, Vite, and Supabase.

## 🚀 Features

*   **AI Chat**: Real-time streaming chat interface powered by Google Gemini (via Supabase Edge Functions).
*   **Modern UI**: Built with Shadcn UI, Tailwind CSS, and Lucide Icons.
*   **Secure Backend**: Uses Supabase Edge Functions to handle API keys securely, keeping them off the client side.
*   **Responsive Design**: Fully responsive layout for desktop and mobile.

## 🛠️ Tech Stack

*   **Frontend**: React, TypeScript, Vite
*   **Styling**: Tailwind CSS, Shadcn UI
*   **Backend**: Supabase (Edge Functions)
*   **AI**: Google Gemini API

## 🏁 Getting Started

### Prerequisites

*   Node.js (v18+)
*   Supabase CLI (`npm install -g supabase` or use `npx`)
*   A Supabase account
*   A Google Gemini API Key

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd instant-web-chatter
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Supabase:**
    *   Create a new project at [database.new](https://database.new).
    *   Link your local project:
        ```bash
        npx supabase link --project-ref your-project-id
        ```
    *   Set your Gemini API Key:
        ```bash
        npx supabase secrets set GEMINI_API_KEY=your_gemini_key
        ```
    *   Deploy the Edge Function:
        ```bash
        npx supabase functions deploy chat
        ```

4.  **Configure Environment Variables:**
    *   Rename `.env.example` to `.env` (or create one).
    *   Add your Supabase credentials:
        ```env
        VITE_SUPABASE_URL="https://your-project-id.supabase.co"
        VITE_SUPABASE_PUBLISHABLE_KEY="your-anon-key"
        ```

### 🏃‍♂️ Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

## 🔒 Security Note

This project uses a backend proxy (Supabase Edge Function) to call the AI API. This ensures your `GEMINI_API_KEY` is never exposed to the frontend browser.

## 📄 License

[MIT](LICENSE)