# E-commerce Category Interest Selection App

A modern e-commerce web application built with Next.js, TypeScript, and MongoDB that allows users to register, login, and select their interested categories from a paginated list.

## 🎯 Project Overview

This project is a complete authentication and category management system where users can:

- Register with email verification via OTP
- Login securely with JWT authentication
- Browse through 100+ categories with pagination
- Select and persist their interested categories
- Access protected routes only when authenticated

## ✨ Features

### Authentication System

- **User Registration** - Secure signup with email verification
- **OTP Verification** - Email-based OTP verification using Brevo
- **User Login** - JWT-based authentication with secure cookies
- **Protected Routes** - Server-side route protection

### Category Management

- **100+ Categories** - Generated using Faker.js for realistic data
- **Pagination** - 6 categories per page for optimal UX
- **Persistent Selection** - Categories persist across sessions
- **Real-time Updates** - Instant feedback on category selection

### User Experience

- **Responsive Design** - Mobile-first responsive interface
- **Clean UI** - Modern design with Tailwind CSS and Radix UI
- **Loading States** - Comprehensive loading and error handling
- **Toast Notifications** - User feedback with Sonner

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15.1.8 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, Lucide React
- **Forms**: React Hook Form with Zod validation
- **Notifications**: Sonner

### Backend

- **API**: Next.js API Routes
- **Authentication**: JWT with httpOnly cookies
- **Database**: MongoDB with Mongoose
- **Email Service**: Brevo (Sendinblue)
- **Password Hashing**: bcryptjs

### Data Generation

- **Faker.js** - For generating realistic category data

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database
- Brevo account for email service

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# API
NEXT_PUBLIC_API_URL=http://localhost:3000

# Email (Brevo / Email.js)
BREVO_API_KEY=your_brevo_api_key
OWNER_EMAIL=your_sender_email@domain.com
CONTACT_EMAIL=your_contact_email@domain.com

# JWT / Auth
JWT_SECRET=your_jwt_secret_key

# Environment
NODE_ENV=development  # or "production" during deployment
```

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd revispy-frontend-assignment
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env.local
# Edit .env.local with your actual values
```

4. **Start the development server**

```bash
npm run dev
```

5. **Open your browser**

```
http://localhost:3000
```

## 📁 Project Structure

```
app/
├── (auth)/               # Authentication routes group
│   ├── login/           # Login page
│   ├── signup/          # Signup page
│   └── verify-otp/      # OTP verification
│       └── [email]/     # Dynamic email route
├── (root)/              # Protected routes group
│   ├── layout.tsx       # Protected layout with auth check
│   └── page.tsx         # Category interests selection page
├── api/                 # API routes
│   ├── auth/            # Authentication endpoints
│   │   ├── login/
│   │   ├── signup/
│   │   └── verify/
│   ├── categories/      # Category management
│   ├── interests/       # User interests management
│   ├── seed/           # Database seeding
│   └── send-email/     # Email service endpoints
├── globals.css         # Global styles
└── layout.tsx          # Root application layout

components/
├── layout/             # Layout components
│   └── header.tsx      # Application header
└── ui/                 # Reusable UI components (shadcn/ui)
    ├── button.tsx
    ├── card.tsx
    ├── checkbox.tsx
    ├── form.tsx
    ├── input.tsx
    └── input-otp.tsx

database/               # MongoDB models
├── category.model.ts   # Category schema
├── user.model.ts       # User schema
└── user-interests.model.ts # User interests schema

lib/                    # Utility functions
├── utils/
│   └── server-cookies.ts # Server-side cookie management
├── db.ts              # Database connection
├── email-templates.ts  # Email templates
├── jwt.ts             # JWT utilities
├── mongoose.ts        # Mongoose configuration
├── seed-categories.ts  # Category seeding logic
└── utils.ts           # General utilities
```

## 🎨 Key Features Implementation

### 1. User Authentication Flow

```typescript
// Server-side route protection
const token = await getServerAuthToken();
if (!token) {
  redirect("/login");
}
```

### 2. Category Pagination

```typescript
// 6 categories per page with advanced pagination
const ITEMS_PER_PAGE = 6;
const totalPages = Math.ceil(interests.length / ITEMS_PER_PAGE);
```

### 3. Persistent Category Selection

```typescript
// Categories persist across sessions using database
await UserInterests.findOneAndUpdate(
  { userId },
  { interests: categoryObjectIds },
  { upsert: true, new: true }
);
```

### 4. Email Verification System

```typescript
// OTP-based email verification using Brevo
const otp = Math.floor(10000000 + Math.random() * 90000000).toString();
await sendOtpEmail(email, otp);
```

## 🎨 Design Implementation

The application follows the provided Figma design with:

- **Clean, modern interface** using Tailwind CSS
- **Consistent spacing and typography**
- **Interactive elements** with hover states
- **Responsive design** for all screen sizes
- **Loading states** and error handling

## 🔒 Security Features

- **JWT Authentication** with httpOnly cookies
- **Password Hashing** using bcryptjs
- **Server-side Route Protection**
- **Input Validation** with Zod schemas
- **XSS Protection** through proper data sanitization

## 📱 User Experience

### Registration Flow

1. User enters email, name, and password
2. System sends OTP via email
3. User verifies OTP
4. Account is activated and user is logged in

### Category Selection

1. User browses paginated categories (6 per page)
2. Selects interested categories with checkboxes
3. Selections are saved and persist across sessions
4. Visual feedback shows selected count

## 🚀 Deployment

### Environment Setup

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Database Setup

The application automatically seeds the database with 100 categories using Faker.js on first run.

## 📊 Database Schema

### User Model

```typescript
{
  name: string
  email: string (unique)
  password: string (hashed)
  otp?: string
  otpExpiresAt?: Date
}
```

### Category Model

```typescript
{
  id: string (unique)
  name: string
  description?: string
}
```

### UserInterests Model

```typescript
{
  userId: ObjectId (ref: User)
  interests: ObjectId[] (ref: Category)
}
```

## 🧪 Testing

The application includes:

- **Form validation** with real-time feedback
- **Error handling** for API failures
- **Loading states** for better UX
- **Responsive design** testing

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📝 API Endpoints

### Authentication

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify` - OTP verification

### Categories & Interests

- `GET /api/categories` - Fetch all categories
- `GET /api/interests` - Get user interests
- `POST /api/interests` - Save user interests
- `POST /api/seed` - Seed database with categories

### Utilities

- `POST /api/send-email` - Send OTP emails

## 🎯 Bonus Features Implemented

- **Advanced Pagination** with page numbers and navigation
- **Real-time Validation** with Zod schemas
- **Toast Notifications** for user feedback
- **Responsive Design** for all devices
- **Loading States** throughout the application
- **Error Handling** with graceful fallbacks
- **TypeScript** for type safety
- **Server-side Authentication** for security

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Faker.js](https://fakerjs.dev/) for generating test data
- [Brevo](https://www.brevo.com/) for email service

---

## 🚀 Developed By

**Name**: Shivam Patel  
**Email**: [shivampatel0048@gmail.com](mailto:shivampatel0048@gmail.com)  
**🔗 Demo**: [View Live App](https://revispy-frontend-assignment-snowy.vercel.app/signup)  
**📂 Repository**: [GitHub Repository](https://github.com/shivampatel0048/revispy-frontend-assignment)

#   r e v i s p y - a s s i g n m e n t  
 