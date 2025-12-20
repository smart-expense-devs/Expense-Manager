ROOT PROJECT STRUCTURE EXPECTED:
<img width="327" height="751" alt="image" src="https://github.com/user-attachments/assets/7f4fbd1b-56d2-4336-8cea-2926a2de7188" />

// ACTUALLY WNHAT WE ARE EXPECTED TO DO:

📌 Project Overview – Smart Expense Tracker
🎯 What problem are you solving?

People don’t track their daily expenses properly, so they:
Overspend
Don’t know where money goes
Fail to follow monthly budgets

Your project solves this by providing:
Expense tracking
Budget control
Visual analytics
Smart alerts

🧠 What exactly will your application do?
At a high level:

Users can register, log in, add expenses, set budgets, and view analytics — all securely.

🔁 Complete Application Workflow (BIG PICTURE)
Let’s break this into clear steps.

1️⃣ User Authentication Flow (Entry Point)
What happens?
User opens the website
If not logged in → redirected to Login / Register
User registers or logs in
Backend verifies credentials
JWT token is created and stored (cookie)
Why this is important?
Protects user data
Enables personalized expense tracking
Backend responsibilities:
Password hashing
Token generation
Secure session handling

2️⃣ Dashboard Flow (After Login)
What user sees:
Total expenses this month
Remaining budget
Charts (pie / bar)
Recent transactions
What backend does:
Fetch expenses from database
Aggregate totals
Return summarized data

3️⃣ Add Expense Flow (Core Feature)
Step-by-step:
User clicks Add Expense
Enters:
Amount
Category
Date
Description
Clicks Save
Backend:
Validates input
Saves expense to DB
Checks budget limits
Response sent to frontend
Smart behavior:
If expense exceeds budget → warning message

4️⃣ Expense Management Flow (CRUD)
User can:
View all expenses
Filter by date/category
Edit or delete an expense
Backend handles:
Secure access (only user’s data)
Update & delete logic
Efficient querying

5️⃣ Budget Setting Flow
What user does:
Sets monthly budget
Optionally sets category-wise limits
Backend logic:
Store budget per user
Compare total expenses vs budget
Send alerts if exceeded
This is where “Smart” part starts.

6️⃣ Analytics & Reports Flow
User sees:

Monthly expense trends
Category-wise distribution
Spending patterns

📘 README — Step 1: Authentication Setup
Smart Expense Tracker (Next.js + NextAuth)
🎯 Goal of This Step

By the end of this step, you will have:

✅ Next.js installed
✅ NextAuth configured
✅ User registration
✅ User login
✅ Secure session handling
✅ MongoDB connected
✅ Protected routes working

📁 Folder Structure (Auth Only)
<img width="383" height="593" alt="image" src="https://github.com/user-attachments/assets/010f3af8-4f34-4ab5-8a5c-4bf420f57511" />

Interview Explanation (Auth Phase)
“I implemented authentication using NextAuth with Credentials Provider.
User passwords are hashed using bcrypt, sessions are handled via JWT, and protected routes are enforced using middleware.”

