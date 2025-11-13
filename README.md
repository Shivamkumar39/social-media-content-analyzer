📘 Project Overview – Social Media Content Analyzer

The Social Media Content Analyzer is an advanced web-based application built using JavaScript, React.js, Node.js, and Gemini AI API to analyze and evaluate the quality and performance of social media content. The platform helps creators, marketers, and businesses gain deep insights into how their posts perform across different platforms.

This project allows users to upload images, videos, or text posts, which are then analyzed using AI-powered models to generate sentiment analysis, engagement predictions, keyword recommendations, and content improvement tips. It also supports both image and PDF file uploads, providing flexibility for various use cases.

The backend is powered by Node.js and Express, ensuring secure API communication and efficient data handling. The frontend, developed in React with Tailwind CSS, offers a modern and responsive UI that works seamlessly on all devices.

By integrating Gemini AI, the project delivers real-time insights, enabling users to enhance their content quality and engagement strategies.

This tool is ideal for digital marketing teams, social media managers, and individual creators who aim to improve their online presence through data-driven content optimization.

🧩 Project Overview

Tech Stack:

Frontend: React + Vite + TypeScript

UI Framework: Tailwind CSS + ShadCN UI

AI Integration: OpenAI API (gpt-4o-mini / gpt-4.1) for OCR and content analysis

🛠️ Getting Started
1️⃣ Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

2️⃣ Install dependencies
npm install

3️⃣ Add your OpenAI API key

Create a .env file in the project root and add your key:

OPENAI_API_KEY=your_openai_api_key_here
and other db api key

4️⃣ Run the development server
npm run dev


This starts the app locally with hot reload enabled.
Open http://localhost:8080
 in your browser to preview the project.

💡 How It Works

Upload an image or PDF file.

The app sends it to the OpenAI API, which performs OCR or text extraction.

The extracted text is analyzed by another AI prompt that generates:

Engagement score (0–100)

Suggested post titles

Relevant hashtags

Engagement improvement tips

All responses are formatted in clean JSON, then displayed beautifully on the UI.

⚙️ Development Notes

You can work on this project in any of the following ways:

🧠 Option 1: Local Development (Recommended)

Edit the code using your favorite IDE (VS Code, WebStorm, etc.).
Changes are reflected instantly when running npm run dev.

🌐 Option 2: GitHub

Edit files directly on GitHub by clicking the ✏️ (Edit) icon on any file.
Commit your changes and push to your main branch.

💻 Option 3: GitHub Codespaces

If you prefer developing in the cloud:

Click Code → Codespaces → New Codespace on your repo.

Wait for it to initialize.

Start coding immediately in the browser!

🚀 Deployment

You can deploy this project on any platform that supports static React builds, such as:

Vercel


To build for production:

npm run build


This creates an optimized build in the dist/ folder, ready to deploy.

🌍 Custom Domain (Optional)

After deployment (e.g. on Vercel), you can connect your own custom domain in a few clicks.
Most hosting providers let you add your domain under project Settings → Domains.

👨‍💻 Author

Social Media Content Analyzer
Developed with ❤️ by Shivam kumar developer using OpenAI’s, Lovablea_API_KEY powerful models to make content optimization easy, accurate, and insightful.