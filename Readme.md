# Memory Master: Emoji Challenge

![Memory Master Icon](./frontend/public/memory-master-icon.svg)

## 🎮 About the Project

Memory Master: Emoji Challenge is a full-stack web application featuring an engaging React-based memory game that challenges players to match emoji pairs. The project consists of a frontend built with React and Vite, and a backend server handling player authentication, score tracking, and leaderboard functionality.

## 🚀 Features

- Engaging emoji-matching gameplay
- User authentication and authorization
- High score tracking and leaderboard
- Responsive design for various devices
- RESTful API for game data
- Secure password hashing and JWT-based authentication

## 🛠 Tech Stack

### Frontend
- React
- Vite
- Axios for API calls
- CSS for styling

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose ODM)
- JSON Web Tokens (JWT) for authentication
- bcrypt for password hashing
- dotenv for environment variable management

## 🏁 Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- MongoDB (v4.0.0 or later)

### Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/memory-master-emoji-challenge.git
   cd memory-master-emoji-challenge
   ```

2. Set up the backend:
   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the backend directory and add:
   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/memory_master
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   frontend_url=http://localhost:5173
   ```
   Replace `your_jwt_secret_key` with a secure random string.

3. Set up the frontend:
   ```bash
   cd ../frontend
   npm install
   ```

   Open the `App.js` file and update the `REACT_APP_API_URL`:
   ```javascript
   const REACT_APP_API_URL = 'http://localhost:3000';
   ```

4. Start the backend server:
   ```bash
   cd ../backend
   npm start
   ```

5. In a new terminal, start the frontend development server:
   ```bash
   cd ../frontend
   npm run dev
   ```

6. Open your browser and visit `http://localhost:5173` to play the game!

## 📚 API Documentation

### Authentication
- POST `/api/auth/register`: Register a new user
- POST `/api/auth/login`: Log in a user
- POST `/api/auth/logout`: Log out the current user
- GET `/api/auth/me`: Get current user information

### Game
- POST `/api/game/score`: Submit a new game score
- GET `/api/game/leaderboard`: Get the top players in the global leaderboard

## 🏗 Building for Production

### Frontend
To create a production build of the frontend:
```bash
cd frontend
npm run build
```
The built files will be in the `dist` directory.

### Backend
The backend can be deployed as-is, ensuring all environment variables are properly set in the production environment.

## 🔒 Security

- Passwords are hashed using bcrypt before storing in the database.
- JWT is used for maintaining user sessions.
- Environment variables are used for sensitive data.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JSON Web Tokens](https://jwt.io/)
- [Axios](https://axios-http.com/)
- All contributors and players!

Enjoy playing Memory Master: Emoji Challenge! 🎉

For any questions or support, please open an issue in the GitHub repository.