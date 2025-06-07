🚀 E-commerce Category Interest Selection App
A modern, full-stack e-commerce web application built with Next.js, TypeScript, and MongoDB, where users can register, verify email via OTP, and select their favorite categories from a beautifully paginated UI.

📌 Overview
This project offers a complete user authentication and category interest selection system with:

✅ Email verification
✅ JWT-based authentication
✅ Category pagination & persistence
✅ Responsive UI and error handling

✨ Key Features
🔐 Authentication System
✅ User Signup with secure form and validation

✅ OTP Verification via email using Brevo (Sendinblue)

✅ JWT-based Login with httpOnly cookies

✅ Protected Routes (server-side validated)

🗂️ Category Management
✅ 100+ Categories generated via Faker.js

✅ Pagination — 6 categories per page

✅ Persistent selection — user’s choices stored in DB

✅ Real-time feedback on selection

💡 User Experience
✅ Modern responsive UI with Tailwind & Radix UI

✅ Real-time validation with Zod

✅ Toast notifications with Sonner

✅ Graceful loading & error states

⚙️ Tech Stack
Layer	Tech
Frontend	Next.js 15 (App Router), TypeScript, Tailwind CSS, Radix UI
Forms & Validation	React Hook Form, Zod
Backend	Next.js API Routes, JWT, bcryptjs
Database	MongoDB (Mongoose)
Email	Brevo (Sendinblue API)
Others	Faker.js, Sonner, Lucide React

🛠️ Getting Started
✅ Prerequisites
Node.js 18+

MongoDB URI

Brevo API key

📁 Environment Variables
Create a .env.local file:

env
Copy
Edit
# MongoDB
MONGODB_URI=your_mongodb_uri

# Brevo Email
BREVO_API_KEY=your_brevo_api_key
OWNER_EMAIL=you@example.com
CONTACT_EMAIL=you@example.com

# JWT
JWT_SECRET=your_secret

# App
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000
🚀 Installation & Running Locally
bash
Copy
Edit
# Clone
git clone https://github.com/your-username/revispy-assignment.git
cd revispy-assignment

# Install
npm install

# Start server
npm run dev
Then go to 👉 http://localhost:3000

🧾 Folder Structure
perl
Copy
Edit
app/
├── (auth)/             # Signup, login, OTP verify
├── (root)/             # Protected routes (category selection)
├── api/                # All backend APIs
│   ├── auth/           # Signup/Login/Verify
│   ├── categories/     # Get categories
│   ├── interests/      # Get/Save interests
│   ├── seed/           # Category seeding
│   └── send-email/     # Email OTP
components/
├── layout/             # Layout components (Header, etc.)
├── ui/                 # UI components (Button, Card, Checkbox, etc.)
database/
├── *.model.ts          # Mongoose models
lib/
├── jwt.ts              # JWT helpers
├── mongoose.ts         # DB connection
├── seed-categories.ts  # Category generation logic
├── utils/              # Cookie, validation, etc.
🧪 Example Code Snippets
🔒 Server-side Route Protection
ts
Copy
Edit
const token = await getServerAuthToken();
if (!token) redirect("/login");
✅ Category Pagination
ts
Copy
Edit
const ITEMS_PER_PAGE = 6;
const totalPages = Math.ceil(interests.length / ITEMS_PER_PAGE);
📧 OTP Email via Brevo
ts
Copy
Edit
const otp = Math.floor(10000000 + Math.random() * 90000000).toString();
await sendOtpEmail(email, otp);
🧬 Database Models
🧍‍♂️ User
ts
Copy
Edit
{
  name: string;
  email: string;
  password: string;
  otp?: string;
  otpExpiresAt?: Date;
}
📁 Category
ts
Copy
Edit
{
  name: string;
  description?: string;
}
⭐ UserInterests
ts
Copy
Edit
{
  userId: ObjectId;
  interests: ObjectId[];
}
🔐 Security Features
JWT-based auth (httpOnly cookies)

bcryptjs for password hashing

Zod validation for input security

SSR protected routes

Sanitized user inputs

🌐 Deployment Guide
Build & Serve
bash
Copy
Edit
npm run build
npm start
Auto-Seed Categories
On first run, database seeds 100+ categories via Faker.js.

🛠 Available Scripts
bash
Copy
Edit
npm run dev       # Dev mode
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Lint the code
