# 📖 BookNook – A Small Online Library (Frontend)

**BookNook** is a modern, responsive digital library platform designed around the simple, elegant philosophy: *“Add a book, borrow a book, return a book.”* Built using Next.js (App Router), Tailwind CSS, and BetterAuth (MongoDB adapter), and an Express backend API for books and borrows.

## 🌐 Live Website URL
- **Live Demo:** [https://booknook-online-library.vercel.app](https://booknook-online-library.vercel.app) *(or your deployed Vercel URL)*
- **Server API Repository:** [https://github.com/Saidulhimu/BookNook-A-Small-Online-Library---backend](https://github.com/Saidulhimu/BookNook-A-Small-Online-Library---backend)

---

## ✨ Key Features (Minimum 5 Highlights)
1. **Interactive Swiper.js Hero Banner & Curated New Arrivals:**
   - Smooth 3+ slide banner showcasing library highlights with call-to-actions, accompanied by real-time MongoDB sorted New Arrivals featuring the latest 6 additions.
2. **BetterAuth & JWT Session Protection:**
   - Seamless authentication supporting Email/Password and Google OAuth with custom password validation (Uppercase, Lowercase, 6+ characters). Private route state persists flawlessly on reload without premature redirects.
3. **Smart Borrowing System with Available Copies Challenge:**
   - Real-time `$inc: -1` atomic decrement when borrowing and `$inc: +1` increment when returning books. Automatically disables borrow actions when copies reach 0 with a prominent "Not Available" badge.
4. **No Double Borrow Enforcement:**
   - Intelligent duplicate protection preventing users from having multiple active borrows of the exact same book simultaneously.
5. **Complete Book Management & Clean Modal Dialogs:**
   - Private contributor dashboard to add new books with ImgBB cloud image uploads, prefilled edit modal for instant updates, and safe custom delete confirmation dialogs (zero browser `alert()` usage).
6. **Dark / Light Theme & Responsive Modern UI:**
   - Integrated theme toggle persisting user preference across sessions, responsive desktop 3-column card grid, dynamic page titles, and custom 404 page with home navigation.

---

## 🛠️ Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling & Icons:** Tailwind CSS, DaisyUI, Lucide React
- **Authentication:** BetterAuth (MongoDB Adapter) + JSON Web Token (JWT)
- **Slider & Animation:** Swiper.js, Framer Motion
- **Notifications:** React Hot Toast
- **Image Hosting:** ImgBB API

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/Saidulhimu/BookNook-A-Small-Online-Library---frontend.git
cd BookNook-A-Small-Online-Library---frontend
```

### 2. Configure Environment Variables
Create a `.env` file based on `.env.example`:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5001
BETTER_AUTH_SECRET=your_random_secret          # openssl rand -hex 32
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
DB_NAME=booknook
JWT_SECRET=same_value_as_backend_JWT_SECRET
NEXT_PUBLIC_HAS_GOOGLE_AUTH=false              # set true after adding the Google keys
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```
Google redirect URI to register in Google Cloud: `http://localhost:3000/api/auth/callback/google`.

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to explore the library.

---

## 📄 License
MIT © 2026 Saidul Himu. Built for book enthusiasts everywhere.

