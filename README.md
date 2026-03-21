# Atharva Sarnaik - Developer Portfolio

A premium, interactive developer portfolio built to showcase personal projects, education, and technical skills through cinematic GSAP scroll animations and fully responsive, immersive design.

## Features
- **Immersive Interactive Elements**: Custom neural network background canvas and a bespoke magnetic cursor interaction system.
- **Cinematic Scroll Animations**: Powered by GSAP ScrollTrigger for precise element scrubbing, sticky layouts, and line-by-line text reveals.
- **Fully Responsive**: Crafted with an adaptive mobile approach so animations are equally seamless and fluid on phone screens.
- **Modern Architecture**: Built on Next.js App Router, styled flawlessly with Tailwind CSS.

## Tech Stack
- **Framework:** Next.js (React 18)
- **Styling:** Tailwind CSS
- **Animations:** GSAP (ScrollTrigger, Timelines)
- **Language:** TypeScript
- **Icons:** React Icons

---

# 🚀 Deployment Guide (GitHub to Vercel)

Follow these steps to deploy your portfolio live to the web for free using Vercel.

## Step 1: Push to GitHub Server

1. **Create a new Empty Repository on GitHub:**
   - Log into GitHub, click the `+` icon in the top right, and select **New repository**.
   - Name it something like `portfolio-website`.
   - Leave it **Public**.
   - **IMPORTANT:** Do NOT check "Add a README file" or ".gitignore". Leave the repo completely empty.
   - Click **Create repository**.

2. **Open Git Bash or Terminal in your project folder:**
   Make sure your terminal is opened inside `c:\Users\Atharva Sarnaik\Desktop\Porfolio website`.

3. **Initialize and Push your code:**
   Run these sequence of commands one by one to securely link your folder to the GitHub server:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Portfolio"
   git branch -M main
   
   # REPLACE the URL below with your actual repository URL!
   git remote add origin https://github.com/Atharva-Sarnaik/portfolio-website.git
   
   git push -u origin main
   ```
   *(If it asks for authentication, sign in to your GitHub account via the browser prompt).*

## Step 2: Deploy to Vercel

Vercel is the creator of Next.js and provides the fastest, most reliable deployment process for it.

1. **Log in to Vercel:** Go to [vercel.com](https://vercel.com/) and sign up/log in using your **GitHub** account.
2. **Import Project:** Click the **Add New...** button and select **Project**.
3. **Select Repository:** You will see a list of your GitHub repositories. Click the **Import** button next to your new `portfolio-website` repository.
4. **Configure Project:**
   - **Framework Preset**: Vercel will automatically detect `Next.js`. Leave everything exactly as is.
   - **Environment Variables**: If you have an `.env.local` file (e.g., for contact form API keys or passwords), open the **Environment Variables** dropdown and copy/paste exactly what is inside your `.env.local` file here.
5. **Deploy:** Click the large **Deploy** button.

### You're Live! 🌍
Vercel will build your website (takes ~1-2 minutes). Once finished, you will be redirected to a dashboard containing your live web address (e.g., `portfolio-website-atharva.vercel.app`). 

You can also add a custom domain (like `atharvasarnaik.com`) in the "Domains" setting in your Vercel project dashboard at any point!
