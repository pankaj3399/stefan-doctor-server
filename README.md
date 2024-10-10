## Steps to run in local

1. Install mongodb - https://www.mongodb.com/try/download/community
2. Create `.env` file at root directory level and add these fields:
   ```
   NODE_ENV=NODE_ENV
   PORT=PORT
   MONGODB_URL=MONGODB_URL
   JWT_SECRET=JWT_SECRET
   JWT_ACCESS_EXPIRATION_MINUTES=JWT_ACCESS_EXPIRATION_MINUTES
   JWT_REFRESH_EXPIRATION_DAYS=JWT_REFRESH_EXPIRATION_DAYS
   SENDER_EMAIL=SENDER_EMAIL
   SENDER_PASSKEY=SENDER_PASSKEY
   ```
3. run `./setup.sh` to fill dummy data and setup collection in local mongodb
4. run `npm install`
5. run `npm start`

## Curls

#### Register

```
  curl --location --request POST 'localhost:8082/v1/auth/register' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "email": "ddsdad@sfgs.com",
      "password": "pass555555",
      "name": "name",
      "roles": ["patient"]
  }'
```

#### Login

```
curl --location --request POST 'localhost:8082/v1/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "ddsdad@sfgs.com",
    "password": "pass555555"
}'
```

#### Trigger password reset to receive otp over email

```
curl --location --request POST 'localhost:8082/v1/auth/triggerPasswordReset' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "ddsdad@gmail.com"

}'
```

#### Reset password

```
curl --location --request POST 'localhost:8082/v1/auth/resetPassword' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "ddsdad@gmail.com",
    "password": "newpass555555#",
    "otp": "197327"

}'
```

#### Healthcheck

```
curl --location --request POST 'localhost:8082/v1/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "achandrad1122@gmail.com",
    "password": "nerPsdfsdafdasf22#"
}'
```

### Update User Profile

```
curl --location --request PUT 'localhost:8082/v1/user/updateProfile' \
--header 'Authorization: Bearer {token}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "d@gmail.com",
    "password": "pasdf#",
    "name": "fddf",
    "age":17,
    "gender":"male"
}'
```

### Check if valid token

```
curl --location --request GET 'localhost:8082/v1/auth/isLoggedIn' \
--header 'Authorization: Bearer {token}' \
--data-raw ''
```
