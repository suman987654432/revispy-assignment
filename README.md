🛒 E-commerce Category Interest Selection App
An interactive, modern e-commerce web app built using Next.js, TypeScript, and MongoDB, allowing users to register, verify via OTP, and explore + select categories of interest from a smartly paginated list.

🎯 What This Project Does
This application provides a seamless flow where users can:

Create an account with secure OTP-based verification

Sign in using JWT authentication

Browse a variety of product categories

Choose their preferences with selections saved across sessions

Access protected pages securely after login

✨ Core Highlights
🔐 Secure User Access
Signup with Email – New users can register easily

OTP Verification – Email verification using 8-digit OTP via Brevo

JWT Login – Tokens stored in httpOnly cookies for added security

Protected Routes – Unauthorized users are auto-redirected

🗂️ Category System
100+ Fake Categories – Generated using Faker.js

Smart Pagination – 6 categories per page

Persisted Selection – Saves choices to the database

Live Feedback – Real-time updates on selection

💻 UI/UX Features
Fully Responsive – Works beautifully on all screen sizes

Modern Aesthetics – Tailwind + Radix for polished design

Helpful Feedback – Toast notifications with Sonner

Graceful States – Custom loaders and error messages

🛠️ Technology Stack
Frontend
Framework: Next.js (App Router)

Language: TypeScript

Styling: Tailwind CSS

Components: Radix UI, Lucide Icons

Forms: React Hook Form + Zod

Notifications: Sonner

Backend
API Layer: Next.js API routes

Auth: JWT + Secure Cookies

Database: MongoDB via Mongoose

Email Service: Brevo

Encryption: bcryptjs

🚀 Quick Start Guide
Prerequisites
Node.js 18+

MongoDB Instance

Brevo API Key

Setup Instructions
Clone this repo
git clone https://github.com/suman987654432/revispy-assignment

Install packages
npm install

Add environment config
Create .env.local and include:

ini
Copy
Edit
MONGODB_URI=your_mongodb_url
JWT_SECRET=your_secret
BREVO_API_KEY=your_brevo_api
OWNER_EMAIL=your_email
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
Start the dev server
npm run dev
Visit: http://localhost:3000

📁 Folder Breakdown
rust
Copy
Edit
app/
├── (auth)/          -> login, signup, otp verify
├── (root)/          -> dashboard for interests
├── api/             -> authentication, interests, categories
components/          -> layout, UI elements
database/            -> mongoose models
lib/                 -> db, email, jwt, utils
🎨 How It Works
Authentication Flow

Redirects unauthenticated users

Uses JWT for session management

Paginated Categories

Displays 6 categories per page

Allows forward/backward navigation

Saved Preferences

Updates saved categories in real-time

Retrieves on every user session

OTP System

Sends 8-digit OTP via Brevo

Expires after limited time

🔒 Security Measures
JWT tokens stored in httpOnly cookies

Passwords hashed using bcryptjs

Input validation with Zod

SSR-based protected pages

Email OTP prevents bot signups

👥 User Journey
Signup Flow
Fill name, email, password

Receive OTP on mail

Verify OTP to login

Interest Selection
Navigate through categories

Choose interests via checkbox

Data saved in MongoDB

Feedback shown via toast alerts

🚀 Deployment Steps
Build and Run
arduino
Copy
Edit
npm run build
npm start
Auto Seed Categories
100 fake categories are auto-inserted on first run

🧱 MongoDB Models
User

ts
Copy
Edit
{
  name: string,
  email: string,
  password: string,
  otp?: string,
  otpExpiresAt?: Date
}
Category

ts
Copy
Edit
{
  name: string,
  description?: string
}
UserInterests

ts
Copy
Edit
{
  userId: ObjectId,
  interests: ObjectId[]
}
🧪 Testing & Quality
Form validation using Zod

Loading and error states handled

Mobile + desktop responsiveness

Fallbacks for API failures

🔧 Useful Commands
npm run dev – Launch dev server

npm run build – Generate build

npm run start – Start production

npm run lint – Run linting

📝 Key API Routes
Authentication
POST /api/auth/signup

POST /api/auth/login

POST /api/auth/verify

Categories
GET /api/categories

POST /api/seed

Interests
GET /api/interests

POST /api/interests

🌟 Extra Features
Clean pagination UI

Live Zod validations

Fully responsive layouts

Type-safe coding via TypeScript

Smooth SSR-based route protection

Brevo-powered transactional emails

🤝 Contribution Guide
Fork this repository

Create a new branch

Add your feature or fix

Push and open a PR

📃 License
Licensed under the MIT License

🙌 Tools & Thanks
Next.js – Full-stack React framework

Tailwind CSS – Fast styling

Radix UI – Headless component library

Brevo – Email provider

Faker.js – Fake category data

👨‍💻 Developed by
Suman Kumar
📧 Email: suman987654432@gmail.com
🔗 Live App: revispy-assignment-blue.vercel.app/login
📂 GitHub Repo: github.com/suman987654432/revispy-assignment

