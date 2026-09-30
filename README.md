<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=8A2BE2&height=250&section=header&text=BlueFeather'Z&fontSize=60&fontAlignY=35&fontColor=ffffff&desc=ᴡᴇ%20ᴍᴀᴋᴇ%20ꜰʀɪᴇɴᴅꜱʜɪᴘꜱ%20ꜰʟʏ%20🪶&descAlignY=55&descAlign=50" alt="Header" />

  <h1 align="center">Precision Bento Dashboard & AI Portfolio</h1>

  <p align="center">
    <strong>A next-generation, interactive developer portfolio engineered to look and feel like a high-end operating system.</strong>
  </p>

  <p align="center">
    <a href="https://my-pro-portfolio-vercel.app"><strong>View Live Demo »</strong></a>
    <!-- ⚠️ NOTE: Update the URL above to your actual live Vercel URL -->
  </p>

  <div>
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Sanity-F03E2F?style=for-the-badge&logo=sanity&logoColor=white" alt="Sanity" />
    <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  </div>
</div>

---

## ⚡ System Architecture & Overview

Unlike a traditional static resume, this project was designed from the ground up to be a **living, breathing application**. The UI is built around a modular "Bento Box" grid system packed with deep glassmorphism aesthetics, real-time status radars, and buttery-smooth scrolling mechanics.

The crowning feature is the **Integrated AI Agent**. Visitors can chat with an embedded AI directly on the site to learn about my background, or dynamically configure their own API keys (OpenAI, Gemini, Groq) via a sleek, highly-validated configuration terminal.

---

## 🚀 Core Features

- **🧠 Multi-Model AI Assistant:** An interactive, slide-out chat interface where users can ask questions about my experience. Includes a custom LLM Config panel with real-time format validation to dynamically swap between Gemini, ChatGPT, and Groq models.
- **🛡️ Secure Admin Gatekeeper:** A hidden, terminal-style "RESTRICTED AREA" modal that protects the Sanity Content Studio. Only authorized admins with the secure server-side passkey can access the CMS to post live updates.
- **🎛️ Bento Grid Dashboard:** A responsive layout featuring a live tech-stack scanning radar, animated network bars, and floating orbital photo rings.
- **✨ Premium UI/UX:** Powered by Tailwind CSS and Framer Motion, featuring custom scrollbar hijacking prevention, typewriter text effects, pulsing nodes, and glowing glassmorphism panels.
- **📝 Headless CMS Integration:** Powered by Sanity.io for seamless, real-time updates to the "Latest Updates" section without ever needing to touch the code or redeploy.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Library:** [React](https://reactjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) & Advanced CSS Keyframes
- **Scroll Engine:** [Lenis](https://lenis.studiofreight.com/)

### Backend & CMS
- **Content Management:** [Sanity.io](https://www.sanity.io/)
- **Security:** Next.js Server Actions (for zero-leak passkey validation)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 💻 Local Installation

To spin up a local instance of the SYS_CORE dashboard, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Manoj-Kiyan/my-pro-portfolio.git
   cd my-pro-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add your secure keys:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID="your_sanity_project_id"
   NEXT_PUBLIC_SANITY_DATASET="production"
   NEXT_PUBLIC_SITE_URL="http://localhost:3000"
   
   # Optional: Default AI Models
   GEMINI_API_KEY="your_gemini_key"
   OPENAI_API_KEY="your_openai_key"
   GROQ_API_KEY="your_groq_key"
   
   # Admin CMS Access Passkey
   ADMIN_PASSKEY="your_secret_passkey"
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

<div align="center">
  <i>Engineered with precision by Manoj Kiyan MK.</i><br>
  <a href="https://www.linkedin.com/in/manoj-kiyan-m-326b8a406">LinkedIn</a> • <a href="https://wa.me/918248992657">WhatsApp</a>
</div>
