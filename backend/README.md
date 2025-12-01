
## 1. Create `.env` File

Inside the **backend** folder, create a file named `.env` and add the following:

PORT=3000

KEY=//J9SNdcjJgDnDBhPLb9e7bcSNlb6CfR52
IV=//J9SNdcjJgDnDBhPL

JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=1d

DATABASE_URL=postgresql://username:password@localhost:5432/yourdb?schema=public


## 2. Install Dependencies

Navigate into the backend directory:

cd backend
npm install

## 3. Start the Server
npm start
