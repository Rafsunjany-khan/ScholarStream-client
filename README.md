# ScholarStream

ScholarStream is a full-stack scholarship management platform designed to connect students with scholarship opportunities. It allows universities or organizations to post scholarships, and students can search and apply for them.

## Live Links

- **Client:** https://poetic-melba-a277c5.netlify.app/  
- **Server:** https://scholarstream.onrender.com

## Purpose

- **Students**: Browse scholarships, view details, and apply by paying an application fee.  
- **Moderators**: Review student applications, provide feedback, and update the application status (Pending → Processing → Completed).  
- **Admins**: Manage users, add/edit scholarships, and view analytics.  

## Key Features

- User authentication with role-based access (Student, Moderator, Admin)
- Search, filter, sort, and pagination for scholarships
- Scholarship management: Add, update, delete scholarships
- Application management: Students can apply; moderators can review and update status
- Reviews: Students can add and manage reviews for scholarships
- Payment system integration (Stripe) for application fees
- Responsive and user-friendly UI built with React and DaisyUI
- Admin analytics with charts for quick data visualization

## Technologies & Packages Used

### Client
- React
- React Router DOM
- Axios
- Firebase (authentication)
- DaisyUI & TailwindCSS (UI)
- Framer Motion (animations)
- React Icons
- React Toastify (notifications)
- Recharts (analytics charts)
- Stripe (payments)

### Server
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT) for authentication
- Bcrypt for password hashing
- CORS & dotenv for environment management

## Project Structure

- **Home Page**: Hero banner, top scholarships, success stories/testimonials, contact/FAQ section  
- **All Scholarships Page**: Search, filter, sort, and pagination with scholarship cards  
- **Scholarship Details Page**: Detailed info with reviews and "Apply" button  
- **Dashboard**: Role-based layouts for Student, Moderator, and Admin  
- **Payment Pages**: Checkout, Payment Success, Payment Failed  
- **Error Page**: Custom 404 page  



