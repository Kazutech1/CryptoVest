CryptoVest 🚀
Biotron is a full-stack Tron-based investment platform that automatically generates new Tron wallet addresses for users and routes all incoming funds to a central admin-controlled wallet. It features secure authentication, scheduled operations, and blockchain integration powered by TronWeb.

🌐 Live Demo
Coming Soon (or add your hosted URL here)

📁 Project Structure
php
Copy
Edit
biotron/
│
├── backend/                 # Server-side code (Express, MongoDB, TronWeb)
│   ├── config/              # DB and environment configurations
│   ├── controllers/         # Route logic and business rules
│   ├── middleware/          # Auth and other request middleware
│   ├── models/              # Mongoose schemas
│   ├── routes/              # Express API routes
│   ├── services/            # Utility services (e.g. wallet creation)
│   ├── utils/               # Helper functions
│   └── server.mjs           # Entry point for the backend
│
├── client/                  # Frontend code (React + Tailwind)
│   ├── public/              # Static assets
│   └── src/                 # React components & pages
│
├── .gitignore
├── package.json             # Project metadata and scripts
├── tailwind.config.js
└── README.md
🔐 Features
🔒 Secure Authentication – JWT-based login and registration.

🔁 Automated Wallet Generation – Every new user gets a unique TRX wallet.

🎯 Centralized Wallet Funnel – All user deposits route to one admin wallet.

⏰ Scheduled Tasks – Periodic jobs via node-cron.

📡 Blockchain Integration – Interacts directly with Tron blockchain via tronweb.

🌍 CORS & Cookie Handling – Secure API requests.

🛠️ Tech Stack
Frontend:

React

Vite

Tailwind CSS

TypeScript

Backend:

Node.js

Express.js

MongoDB + Mongoose

TronWeb

JWT Auth

Dotenv, CORS, Cookie-parser, Crypto

Nodemon for dev

🧪 Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/your-username/biotron.git
cd biotron
Backend Setup
bash
Copy
Edit
cd backend
npm install
cp .env.example .env    # Create your .env file and fill in the keys
npm run server          # Starts with nodemon
Frontend Setup
bash
Copy
Edit
cd client
npm install
npm run dev             # Launch Vite dev server
📦 Environment Variables
Your .env file (inside /backend) should include:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
TRON_FULL_NODE=https://api.trongrid.io
TRON_SOLIDITY_NODE=https://api.trongrid.io
TRON_EVENT_SERVER=https://api.trongrid.io
TRON_ADMIN_PRIVATE_KEY=your_private_key
TRON_ADMIN_ADDRESS=your_wallet_address
📈 Roadmap
 Add user dashboard with earnings & referrals

 TRX balance tracker per user

 Admin panel

 Email verification & password reset

 Advanced transaction logging
