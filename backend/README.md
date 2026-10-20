# Personal Expense Tracker — Backend

## Requirements
- Node.js (LTS)
- MongoDB local service or MongoDB Atlas
- Postman

## Setup
1. Open a terminal in the `backend` folder.
2. Run `npm install`.
3. Copy `.env.example` to `.env`.
4. Update `MONGO_URI` and replace `JWT_SECRET` with a long random secret.
5. Run `npm run dev`.

API base URL: `http://localhost:5000`

## Routes

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (Bearer token required)

### Expenses (all require Bearer token)
- `POST /api/expenses`
- `GET /api/expenses`
- `GET /api/expenses/summary`
- `GET /api/expenses/:id`
- `PUT /api/expenses/:id`
- `DELETE /api/expenses/:id`

## Example register/login body
```json
{
  "name": "Demo User",
  "email": "demo@example.com",
  "password": "secret123"
}
```

## Example expense body
```json
{
  "title": "Lunch",
  "amount": 250,
  "category": "Food",
  "paymentMethod": "UPI",
  "date": "2026-10-20",
  "description": "Lunch at college"
}
```

After login/register, copy the returned token. In Postman choose Authorization > Bearer Token and paste it for `/api/expenses` requests.
