# 🛍️ MyStore — Full-Stack E-Commerce Platform

A complete e-commerce web application built with the MERN stack, featuring secure authentication, real-time cart synchronization, and integrated online payments via Stripe.

## 🚀 Live Demo
- Frontend: [your-frontend-url]
- Backend API: [your-backend-url]

## 📋 Features

- **Product Catalog** — Browse 100+ products across multiple categories with search, filtering, sorting, and pagination
- **User Authentication** — Secure registration/login with httpOnly cookie-based JWT sessions
- **Password Recovery** — Email-based password reset flow with expiring, hashed tokens
- **Shopping Cart & Wishlist** — Persisted per-user in the database, synced across devices and sessions
- **Stock Management** — Real-time stock validation with out-of-stock handling
- **Related Products** — Smart product recommendations based on category
- **Secure Checkout** — Stripe Checkout integration with webhook-verified payment confirmation
- **Order History** — Full order tracking with payment and shipping status
- **Dark/Light Mode** — Theme toggle with persisted user preference
- **Rate Limiting** — Protection against brute-force attacks on auth endpoints
- **Fully Responsive** — Optimized for mobile, tablet, and desktop

## 🛠️ Tech Stack

### Frontend
- React + Vite
- Redux Toolkit + RTK Query
- Redux Persist
- React Router DOM
- Tailwind CSS v4
- React Hook Form
- SweetAlert2
- Swiper.js
- Lucide React (icons)

### Backend
- Node.js + Express (ES Modules)
- MongoDB Atlas + Mongoose
- JWT Authentication (httpOnly cookies)
- Bcrypt.js (password hashing)
- Stripe API (Checkout + Webhooks)
- Resend (transactional emails)
- Express Rate Limit

## 🔒 Security Highlights

- Passwords hashed with bcrypt (12 salt rounds)
- JWT stored in httpOnly, secure cookies (XSS-resistant)
- Password reset tokens are hashed before storage and expire after 15 minutes
- Payment confirmation relies solely on Stripe webhook signatures — never trusts client-side success responses
- Rate limiting on authentication endpoints
- Generic error messages on password reset to prevent user enumeration

## ⚙️ Environment Variables

### Backend (`.env`)
