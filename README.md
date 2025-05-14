# Blockchain Game Savings Web App

A Next.js application for managing a savings group that invests in a Play-to-Earn blockchain game.

## Overview

This web application allows 12 students to form a savings group with three different tiers of investment. The collective savings are invested in a blockchain game that yields a 20% return on the total invested amount per gameplay.

### Savings Tiers

- **Tier 1**: 10,000 Naira (5% interest per week)
- **Tier 2**: 20,000 Naira (10% interest per week)
- **Tier 3**: 30,000 Naira (20% interest per week)

## Features

### Student Registration
- Register with name and savings tier selection
- Automatic calculation of weekly interest and total withdrawal amount
- Validation to ensure correct amount for chosen tier

### Savings Dashboard
- View total amount saved by all members
- Detailed breakdown of each member's contribution and accumulated interest
- Track total interest earned and projected returns

### Withdrawal and Membership Management
- Simulate weekly progress to see how interest accumulates
- Process withdrawals for members who want to exit the group
- Track available slots for new members to join

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/blockchain-savings-app.git
   cd blockchain-savings-app
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage Guide

### Registering a New Member

1. Navigate to the "Register" tab
2. Enter the student's full name
3. Select a savings tier (1, 2, or 3)
4. Review the investment details (amount, interest rate, weekly interest, and total after one week)
5. Click "Register" to add the student to the savings group

### Viewing the Dashboard

1. Navigate to the "Dashboard" tab
2. View key metrics:
   - Total savings
   - Total interest earned
   - Gameplay return (20% of total investment)
   - Number of members
3. See a detailed breakdown of each member's contribution and accumulated interest
4. Click "Simulate Week" to advance time and calculate interest for all members

### Managing Members

1. Navigate to the "Manage Members" tab
2. View all current members with their investment details
3. Process withdrawals:
   - Click "Withdraw" next to a member's name
   - Review the withdrawal details
   - Confirm the withdrawal
4. Track weekly progress and overall group performance

## Data Persistence

The application uses browser localStorage to persist data between sessions. This means:
- Member information is saved even if you close the browser
- Weekly progress is maintained
- No server-side database is required

## Technical Implementation

- Built with Next.js, TypeScript, and Tailwind CSS
- Uses React Context API for state management
- Implements form validation with React Hook Form and Zod
- Responsive design that works on mobile and desktop
- Uses shadcn/ui components for a consistent UI

## License

This project is licensed under the MIT License - see the LICENSE file for details.
