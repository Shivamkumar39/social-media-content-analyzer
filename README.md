🚀 Social Media Content Analyzer

AI-powered tool that helps you analyze and improve social media content.
Upload PDFs or images, automatically extract text using OCR, and get instant AI-generated insights — including engagement scores, catchy titles, hashtags, and improvement tips.

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