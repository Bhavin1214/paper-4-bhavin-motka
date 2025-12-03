# technology stack 
frontend react \
backend node js \
database postgresql 

## 1 first install node modules 
```npm install``` 

## 2 then install frontend and backend node modules and dependecy
run this in current directory 

for both at a time\
```npm run installD```

for frontend only\
```npm run installD:frontend```

for backend only\
```npm run installD:backend```

## 3 setup env for backend and frontend

backend: crete .env a file in backend folder and set this value
```
PORT=5000
KEY=(this is for the enc/dec exmlple : J9SNdcjJgDnDBhPLb9e7bcSNlb6CfR52)
IV=(this is for the enc/dec exmlple : J9SNdcjJgDnDBhPL)
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=(enter any number it count as a day)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```


frontend: crete .env a file in frontend folder and set this value
```
REACT_APP_API_URL=http://localhost:5000/api/v1
REACT_APP_API_KEY=(this is for the enc/dec exmlple : J9SNdcjJgDnDBhPLb9e7bcSNlb6CfR52) write same with backend 
REACT_APP_API_IV=(this is for the enc/dec exmlple : J9SNdcjJgDnDBhPL) write same with backend
```

## 4 setup prisma for database 

run in terminal 
```
cd backend
npx prisma migrate dev --name init
npx prisma generate
```

## 5 now start the server

run this in current directory 

for both at a time\
```npm start```

for frontend only\
```npm run start:frontend```

for backend only\
```npm run start:backend```