# Mini E-Commerce System

A full-stack e-commerce platform with product management, cart functionality, and customer order processing.

![Demo](https://i.postimg.cc/PX7wjXHX/e-comerce-live.png) 
![Demo](https://i.postimg.cc/GrSZZZsX/categories.png) 
## Features

### Backend (Node.js/MySQL)
- **REST API** with endpoints for:
  - Product CRUD operations
  - Category listing
  - Cart management (stored in Redis/session)
  - Order processing with stock validation
  - Customer profile management
- **JWT Authentication** for secure user sessions
- **MySQL Database** with optimized queries (indexes for search/filters)
- **Validation**: Stock checks, duplicate order prevention

### Frontend (Next.js/React)
- **Product Browsing**:  
  - Filter by category, price, rating
  - Search functionality
- **Cart Management**:  
  - Add/remove items
  - Checkout with order summary
- **Customer Dashboard**:  
  - View order history
  - Update profile details

## Technologies
- **Backend**: Node.js, Express, MySQL, Redis, JWT
- **Frontend**: Typescript, Next.js, React, Tailwind CSS, Context API/Redux
- **Deployment**: Vercel (Frontend), Render (Backend)

## Installation

### Backend
```bash
cd backend
npm install
```
1. Create `.env` file:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=ecommerce
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://localhost:6379
```
2. Import `ecommerce.sql` into MySQL.  
3. Start server: `npm run dev`.

### Frontend
```bash
cd frontend
npm install
```
1. Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```
2. Start app: `npm run dev`.

## API Endpoints (Examples)

| Endpoint          | Method | Description                  |
|-------------------|--------|------------------------------|
| `/api/products`   | GET    | Get filtered products        |
| `/api/slug`       | POST   | Add to cart                  |
| `/api/checkout`   | POST   | Place order (JWT required)   |
| `/api/customers`  | GET    | Get customer data            |
| `/api/users`      | GET    | Get user Data                |    
**Example Request**:
```bash
curl -X GET "https://e-server-1-t5oi.onrender.com/api/products"
```

## Live Demo
- **Frontend**: [https://e-commerce-7akr.vercel.app/](https://vercel.com)  
- **Backend**: [https://e-server-1-t5oi.onrender.com](https://render.com)

## Future Enhancements
- Payment gateway integration (Stripe/PayPal)
- Product rating system
- Admin dashboard for analytics

## Contributing
Pull requests welcome! For major changes, open an issue first.

---

Developed by [Your Name] • [Contact Email/LinkedIn]  
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
```
