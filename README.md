# CyberShop

## About

A fullstack web development project that simulates a virtual shop website, allowing users to browse products, manage a cart, and save their purchase history!

> **NOTE**: None of these items are actually purchasable. They are imported from the [FakeStore API](https://fakestoreapi.com/) for demonstration purposes.

---

## Features

* **User Accounts:** Create your own account with secure authentication.
* **Search & Filters:** Easily find items using the integrated search system and category filtering.
* **Cart Management:** Add, remove, or update item quantities before checkout.
* **Purchase History:** Access a dedicated dashboard to see all your lifetime purchases.
* **Responsive Design:** MOSTLY optimized for both desktop and mobile viewing.

---

## Tools & Tech Stack

### Frontend
* **React.js + Vite**
* **Axios**
* **React Router Dom**
* **React Hot Toast**
* **Lucide React**

### Backend
* **Node.js & Express**
* **PG**
* **Express Session**
* **Passport.js**
* **Bcrypt**
* **Express Validator**

### Database
* **PostgreSQL**

---

## Getting Started

If you want to run the project locally, you will need those requirements

### Prerequisites
Before running the project, ensure you have:
* [Node.js](https://nodejs.org/) (v18.x or higher)
* [NPM](https://www.npmjs.com/) (latest version)
* [PostgreSQL](https://www.postgresql.org/) (installed and running)

### ENV Setup
Create a `.env` file in the respective folders following this structure

````env
#BackEnd 
SECRET=your_jwt_secret
DB_HOST=localhost
DB_USER=your_user
DB_DATABASE=cybershop
DB_PASSWORD=your_password
DB_PORT=5432
PORT = your_port
VITE_API_URL = #you should insert here the frontend domain, it's probably http://localhost:5173
SECURE = "false"
SAMESITE = "lax"

# FrontEnd
VITE_API_URL= #insert here the backend domain, basically http://localhost:your_port
````

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/ElissonXD/cybershop.git](https://github.com/ElissonXD/cybershop.git)
   cd cybershop
   ```
2. **Setup the backend**
   ```bash
   cd server
   node app.js
   # Make sure to have a .env file like the example before
   # Also, setup your database with PostgreSQL like the example in the next section

3. **In a new terminal, setup the frontend**
   ```bash
   cd client
   # Make sure to have the .env configured
   npm run dev

### Database Structure

The system follows a relational structure to ensure data consistency between users and their shopping activities:
<img width="913" height="443" alt="image" src="https://github.com/user-attachments/assets/c43255b9-8ce8-4838-88b7-310024b64006" />

---

Made by ElissonXD
   
