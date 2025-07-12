# 🏡 MERN Stack Housify - Real Estate Web Application

Welcome to the Housify project – a full-featured MERN (MongoDB, Express.js, React.js, Node.js) Stack real estate application. This repository contains the complete source code for building, listing, managing, and analyzing property listings.

## 🚀 Getting Started

### 🔐 Step 1: Pull and Setup

If you've already cloned the repo, pull the latest changes:

```bash
cd MERN_Stack_Housify
git pull origin main
```

### 📦 Step 2: Install Dependencies

Make sure you have `Node.js` and `npm` installed. Then:

```bash
# For backend
cd backend
npm install

# For frontend
cd ../frontend
npm install
```

### ⚙️ Step 3: Environment Variables

Create a `.env` file in the `backend` folder. A sample `.env` file has been added. Make sure to **not** share this file publicly. If needed, ask teammates for credentials.

```env
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
```

---

## 📂 Project Structure

```
MERN_Stack_Housify/
│
├── backend/           # Express.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── ...
│
├── frontend/          # React frontend
│   ├── src/
│   ├── public/
│   └── ...
│
└── README.md          # You are here!
```

---

## 🧾 Project Flow

### 👤 User Features

- Register / Login (Update UI if necessary)
- Create Property Listing
- View Listings
- Search & Filter Properties

### 🔐 Admin Panel (To Be Created Separately)

**Note:** Do not modify the backend code.

- Make a separate React app or section for Admin.
- Admin Features:
  - Dashboard with analytics (use charts/graphs)
  - Verify Listings
  - View reported/flagged listings
  - User management (optional)

---

## 🛠 Suggested Tools and Libraries

### Frontend:
- React Router
- Tailwind CSS or Bootstrap (for UI enhancement)
- Axios (API calls)
- Chart.js or Recharts (for analytics in dashboard)

### Backend:
- Express.js (Don't change the backend logic)
- MongoDB via Mongoose
- JWT Auth

---

## 🔁 Development Guidelines

- 👤 Register page needs to be improved first (UI/UX)
- 🧑‍💼 Admin Panel should be developed separately
- 🧠 When stuck: **Ask ChatGPT** for help (NOT for full solutions)
- ✅ Commit frequently and clearly
- 📤 Push changes before **9:00 PM daily**
- 📞 Collaborators should coordinate effectively

---

## 👥 Team Members

| Name          | GitHub/Contact |
|---------------|----------------|
| Abubakkar     |                |
| Shivam        |                |
| Sahil Dattani |                |
| Umar          |                |

Stay in sync, communicate daily, and ask if stuck.

---

## 🕘 Deadline

**All contributions must be pushed before Monday morning.**

> ⚠️ Please push daily progress by **9 PM**. If stuck, mention clearly in the commit or PR.

---

## 💾 MongoDB Compass Setup

1. Download and install [MongoDB Compass](https://www.mongodb.com/try/download/compass).
2. Open MongoDB Compass.
3. Click on `New Connection`.
4. Paste the connection string from your `.env` file into the input field.
5. Click "Connect".

---

## 💡 Notes

- When you pull new code:
    ```bash
    npm install
    ```
- Do **not** upload `.env` to GitHub again.
- Backend is stable. Focus on frontend UI/UX improvements and Admin panel.
- Admin panel should be built separately.

---

Happy Coding! ✨