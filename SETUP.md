# ToolShop - Local Development Setup

A full-stack e-commerce application with local PostgreSQL, Express backend, Prisma ORM, and JWT authentication.

## Prerequisites

- Node.js 18+ 
- PostgreSQL installed and running locally
- npm or yarn

## Project Structure

```
├── backend/                 # Express API server
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Auth & error handling
│   │   ├── routes/         # API routes
│   │   ├── utils/          # JWT & validators
│   │   └── index.js        # Server entry point
│   ├── .env.example
│   └── package.json
│
├── src/                     # React frontend (Vite)
│   ├── components/
│   ├── context/            # Auth & Cart contexts
│   ├── pages/
│   ├── services/           # API service layer
│   └── types/
│
├── .env.example
└── package.json
```

## Backend Setup

### 1. Install PostgreSQL

**macOS (Homebrew):**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
Download and install from https://www.postgresql.org/download/windows/

### 2. Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE toolshop;

# Exit
\q
```

### 3. Configure Backend Environment

```bash
cd backend

# Copy example env file
cp .env.example .env

# Edit .env with your PostgreSQL credentials
# DATABASE_URL="postgresql://postgres:your_password@localhost:5432/toolshop"
# JWT_SECRET="change-this-to-a-secure-random-string"
```

### 4. Install Dependencies & Setup Database

```bash
cd backend

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Start the backend server
npm run dev
```

The backend will run at **http://localhost:5000**

## Frontend Setup

### 1. Configure Frontend Environment (Optional)

```bash
# From project root
cp .env.example .env.local

# Default API URL is http://localhost:5000/api
# Edit if your backend runs on a different port
```

### 2. Install Dependencies & Start

```bash
# From project root
npm install

# Start the development server
npm run dev
```

The frontend will run at **http://localhost:5173** (Vite default)

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| PUT | `/api/auth/profile` | Update profile | Yes |
| POST | `/api/auth/logout` | Logout user | Yes |
| GET | `/api/protected` | Protected route example | Yes |
| GET | `/api/health` | Health check | No |

## Authentication Flow

1. User registers or logs in
2. Backend validates credentials
3. Password is hashed with bcrypt (registration)
4. JWT token is generated and returned
5. Frontend stores token in localStorage
6. All protected requests include `Authorization: Bearer <token>` header
7. Backend middleware validates token and attaches user to request

## Development Commands

### Backend

```bash
cd backend

npm run dev          # Start with nodemon (auto-reload)
npm start            # Start production server
npm run prisma:studio # Open Prisma Studio (database GUI)
npm run prisma:migrate # Run migrations
```

### Frontend

```bash
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript checks
```

## Prisma Commands

```bash
cd backend

# Generate Prisma Client after schema changes
npx prisma generate

# Create and apply migrations
npx prisma migrate dev --name your_migration_name

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio
```

## Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection string | `postgresql://postgres:password@localhost:5432/toolshop` |
| JWT_SECRET | Secret key for JWT signing | `your-super-secret-key` |
| JWT_EXPIRES_IN | Token expiration time | `7d` |
| PORT | Server port | `5000` |
| NODE_ENV | Environment | `development` |
| FRONTEND_URL | CORS allowed origin | `http://localhost:5173` |

### Frontend (.env.local)

| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | `http://localhost:5000/api` |

## Troubleshooting

### Database Connection Issues

1. Ensure PostgreSQL is running:
   ```bash
   # macOS
   brew services list
   
   # Linux
   sudo systemctl status postgresql
   ```

2. Verify credentials in `.env` file

3. Check if database exists:
   ```bash
   psql -U postgres -l
   ```

### CORS Errors

Update `FRONTEND_URL` in backend `.env` to match your frontend URL.

### JWT Errors

- Ensure `JWT_SECRET` is set in backend `.env`
- Check if token is properly stored in localStorage
- Verify `Authorization` header is being sent

## Tech Stack

**Backend:**
- Express.js
- Prisma ORM
- PostgreSQL
- JWT (jsonwebtoken)
- bcrypt
- express-validator

**Frontend:**
- React 18
- Vite
- TypeScript
- React Router
- Axios
- Tailwind CSS
- Lucide Icons
