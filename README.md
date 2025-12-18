# 🇿🇦 MatricPulse AI: The Elite Matric Companion

**MatricPulse** is a high-performance, AI-driven platform designed to empower South African Matric students. It combines cutting-edge generative AI with localized data to provide a comprehensive success suite.

---

## 🚀 Key Features

- **APS Engine**: Precision-engineered calculator using official NSC standards (Life Orientation capped at 3 pts).
- **Uni Matcher**: AI-grounded analysis of 2025/2026 University Prospectuses (Wits, UCT, UP, UJ, etc.).
- **Snap & Study**: Computer vision-powered textbook analysis that generates CAPS-aligned summaries and quizzes.
- **Opportunity Finder**: Real-time search for live bursaries and learnerships using Google Search Grounding.
- **AI Mentor**: Multilingual support agent speaking all 11 official South African languages.
- **Crisis Support**: Dedicated, high-visibility mental health resources integrated with SADAG.

## 🛠️ Technical Architecture

- **Frontend**: React 19 (Ultra-fast concurrent rendering)
- **Styling**: Tailwind CSS with custom "Glass-Morphism" and "Elite" design language.
- **AI Core**: Google Gemini 3 series (`pro-preview` for complex reasoning, `flash-preview` for speed).
- **Icons**: Lucide React for high-performance vector graphics.

## 📦 Deployment on Vercel

1. **Clone the repository.**
2. **Environment Variables**:
   - Ensure `API_KEY` (Gemini API Key) is set in your Vercel Project Settings.
3. **Build Settings**:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`

## 🔒 Safety & Compliance

- **POPIA Compliant**: User data is handled securely and session-based.
- **Content Safety**: Integrated crisis triggers to ensure student wellbeing is prioritized during high-stress periods.

---

*Made with ❤️ for the youth of Mzansi.*