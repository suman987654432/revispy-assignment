🛒 E-commerce Category Interest Selection App
A modern and fully responsive web application built with Next.js, TypeScript, and MongoDB, allowing users to register, verify their email via OTP, and select their interested categories from a dynamic, paginated list of 100+ categories.

🚀 Live Demo
👉 Click here to explore the app

📂 GitHub Repository
🔗 https://github.com/suman987654432/revispy-assignment

✨ Key Features
✅ Secure Registration with Email OTP Verification

✅ JWT-based Login Authentication with httpOnly Cookies

✅ 100+ Categories Displayed with Smooth Pagination

✅ Persistent Category Selection Stored in MongoDB

✅ Protected Routes for Logged-In Users Only

✅ Responsive UI with Tailwind CSS and Radix UI

✅ Interactive Toast Notifications via Sonner

✅ Clean Form Validation using React Hook Form + Zod

🛠 Tech Stack
Frontend: Next.js 15 (App Router), TypeScript

Styling: Tailwind CSS, Radix UI, Lucide React Icons

Backend: Next.js API Routes, JWT, bcryptjs, MongoDB (via Mongoose)

Email Service: Brevo (formerly Sendinblue)

Form & Validation: React Hook Form + Zod

Toast Notifications: Sonner

Data Seeding: Faker.js (for 100+ categories)

📦 Setup Instructions
Clone the Repository

git clone https://github.com/suman987654432/revispy-assignment

Install Dependencies

npm install

Set Up Environment Variables
Create a .env.local file in the root and add:

ini
Copy
Edit
MONGODB_URI=your_mongodb_uri
BREVO_API_KEY=your_brevo_key
OWNER_EMAIL=your_email@example.com
CONTACT_EMAIL=support@example.com
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_API_URL=http://localhost:3000
Run the Development Server

npm run dev

Open your browser at http://localhost:3000

🧩 Project Highlights
🔐 Email-based OTP authentication system

🧠 Smart category persistence across sessions

📱 Fully mobile-friendly and responsive

🧪 Validations and error handling built-in

🎯 Great user feedback with loading states and toasts

👤 Developed By
Suman Kumar
📧 Email: suman987654432@gmail.com
