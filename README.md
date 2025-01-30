
# 💰 Expense Tracker

The Expense Tracker is a web application designed to help users manage their monthly and yearly budgets, track expenses, and visualize their spending habits through charts and reports. 📊

---

## ✨ Features

- **🔐 User Authentication**: Login and Signup functionality.
- **📊 Dashboard**: Displays monthly and yearly budgets, total expenses, and visual charts for budget and expense reports.
- **💸 Expense Management**: Add, update, and delete expenses with details like category, amount, description, and date.
- **📅 Budget Management**: Set monthly budgets for each month of the year.
- **📈 Charts**: Visualize budget and expense data using bar charts.

---

## 🛠️ Technologies Used

- **Frontend**: React, BlueprintJS, FontAwesome
- **Backend**: (Assumed to be a REST API, as indicated by the fetch calls)
- **Routing**: React Router
- **Charts**: Custom chart components (`BarChart`, `ExpenseChart`)

---

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- A backend server running (if applicable).

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/expense-tracker.git
   cd expense-tracker
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`.

---

## 🖥️ Usage

1. **Login**:
   - Enter your username and password to log in.
   - If you don't have an account, click on **Sign up**.

2. **Dashboard**:
   - View your monthly and yearly budgets.
   - Check your total expenses.
   - Explore visual charts for budget and expense reports.

3. **Manage Expenses**:
   - Add new expenses with details like category, amount, description, and date.
   - Update or delete existing expenses.

4. **Set Budgets**:
   - Navigate to the **Budgets** page to set monthly budgets for each month.

---

## 📂 Project Structure

```
expense-tracker/
├── src/
│   ├── components/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Expenses.jsx
│   │   ├── Budget.jsx
│   │   ├── chart/
│   │   │   ├── MonthlyChart.jsx
│   │   │   ├── ExpenseChart.jsx
│   ├── App.css
│   ├── App.js
│   ├── index.js
├── README.md
├── package.json
```

---

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

---
