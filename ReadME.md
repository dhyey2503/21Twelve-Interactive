MERN Task Project

This project was built as part of a MERN (MongoDB, Express.js, React.js, Node.js) practical assignment.  
It demonstrates **authentication, shop & product management, and integration of frontend with backend**.  

---

🚀 Features

 Backend (Node.js + Express + MongoDB)
- User **Register & Login** with JWT authentication
- **Validation** for inputs (register, login, shop, product)
- **Shop Management**
  - Create a shop
  - Update a shop
  - Delete a shop (with products linked)
- **Product Management**
  - Add products under a shop
  - Update product details
  - Delete product
- **Get all shops with products** in a single API call (shop object with nested products)

Frontend (React.js)
- **User Authentication**
  - Register and Login pages with basic design
- **Shop Management**
  - Create a new shop
  - Update existing shop
  - View all shops
- **Product Management**
  - Add a new product under a shop
  - Update product details
  - Delete product
- **Shop Products**
  - Click on a shop to view all its products
  - Edit/Delete products from shop view

---

🛠️ Tech Stack
- **Frontend**: React.js, React Router DOM, Axios, TailwindCSS (for styling)
- **Backend**: Node.js, Express.js, JWT, bcrypt
- **Database**: MongoDB (Mongoose ODM)
- **Tools**: Postman (for API testing), GitHub Desktop

---
 How to Run Locally

Backend:
```bash
cd backend
npm install
npm start
```
Frontend:
```bash
cd frontend
npm install
npm start
