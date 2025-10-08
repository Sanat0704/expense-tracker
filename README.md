Personal Expense Tracker
Overview

A web-based personal expense tracker built with HTML, CSS, JavaScript, and enhanced with charts to visualize spending.
Allows users to add, view, filter, and delete expenses while providing statistics for smarter budgeting.

Features

Add Expenses: Enter amount, category, date, and optional description.

Expense List: Displays all expenses with delete option.

Filters: Filter by category and date range.

Statistics Dashboard:

Total Spending

Number of Transactions

Spending by Category (Pie chart & colored bars)

Monthly Spending Summary (Stacked bar chart by category)

Responsive Design: Works on mobile and desktop.

Persistent Storage: Uses localStorage to save expenses across sessions.

Bonus Feature: Monthly summary stacked chart for category-wise monthly analysis.

Folder Structure
expense-tracker/
│
├── index.html
├── styles.css
├── app.js
├── README.md
├── demo.mp4        ← Optional video demo
└── screenshots/
      ├── add_expense.png
      ├── pie_chart.png
      └── monthly_summary.png

How to Run

Clone or download the project folder.

Open index.html in VSCode Live Server (recommended) or any browser.

Start adding expenses, filtering, and viewing statistics!


Prompts Used:

“Create an HTML form with fields for amount, category, date, and description.”

“Write JavaScript to save form data in localStorage and display in a table.”

“Add pie chart to show spending by category using Chart.js.”

“Create a monthly summary chart grouped by category.”

“Make the page colorful and responsive with different fonts and colored elements.”

AI Assistance:

Helped generate form and table structure.

Assisted in writing chart integration with Chart.js.

Debugged filtering and monthly summary logic.

Suggested design improvements for UI/UX.

Modifications:

Customized colors, fonts, and styling.

Added Monthly Summary stacked bar chart.

Fine-tuned validation for amount and future dates.

Challenges & Solutions

Problem: Charts were not updating dynamically.
Solution: Used Chart.js destroy() method before re-rendering charts.

Problem: Filtering by category and date range.
Solution: Implemented applyFilters() function with dynamic filtering logic.

Problem: Displaying monthly summary per category.
Solution: Aggregated data by month and category, then used stacked bar chart.

Bonus Feature

Monthly Spending by Category Chart:

Each month shows stacked bars for all categories.

Allows easy comparison of monthly expenses and category trends.

Time Spent

Setup & Basic Form/Table: 45 mins

Filtering & Statistics: 1 hr 30 mins

Charts & Monthly Summary: 45 mins

Styling & UI: 30 mins

Testing & README: 30 mins

Total: ~3 hours

Screenshots

(Add screenshots to screenshots/ folder and reference here)

Adding Expense


Spending by Category Pie Chart


Monthly Summary Stacked Chart


Video Demo (Optional)

A  screen recording demonstrating the working application: https://docs.google.com/videos/d/1WVnKB4l41dJ8LSX9dGvvVV0XizX4F_nXAWeSLvQ0n70/edit?usp=sharing

Adding new expenses

Filtering by category and date

Displaying Spending by Category pie chart

Displaying Monthly Summary stacked bar chart

Bonus feature: category-wise monthly breakdown

You can add your video file in the project folder, for example:

expense-tracker/
├── demo.mp4


Include it in README.md like this:

[Watch Demo Video](demo.mp4)



On GitHub, clicking this link will allow viewers to download or play the video.
