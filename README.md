# 🍽️ Recipe Book API (Backend)

This is the backend server for the Recipe Book application, built with **Node.js**, **Express**, and **MongoDB**.

---

## 📦 Features

- User authentication with JWT
- Recipe CRUD (Create, Read, Update, Delete)
- Image upload using Multer
- Search, filter, and pagination for recipes
- Protected routes for user-specific actions

---

## 🚀 Getting Started

### 1. Clone the repo

git clone https://github.com/Uzzwal12/recipe-book.git
cd recipe-book/server
npm install
Create a .env file:
PORT=3000
MONGODB_URI=mongodb://localhost:27017/recipebook
JWT_SECRET=your_jwt_secret

Start Server - npm run dev
Start Unit Test - npm run test



# 🍽️ Recipe Book API (Frontend)

## ⚙️ Tech Stack

- React + Vite
- Redux Toolkit
- React Router v6
- Tailwind CSS
- Axios
- Toast notifications via react-hot-toast

cd recipe-book/client
npm install
npm run dev

Protected Routes
/add-recipe
/my-recipes
/edit-recipe/:id




