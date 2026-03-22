# Life Compass

Visualize your life balance and get AI-powered recommendations for a more fulfilling life.

## About The Project

Life Compass is an interactive web application designed to help you reflect on and improve your life balance. Based on the popular "Wheel of Life" coaching tool, this app allows you to rate your satisfaction across eight key areas of your life. The results are instantly visualized on a radar chart, giving you a clear snapshot of your current life balance.

The app uses **Genkit** to provide personalized, actionable recommendations from an AI coach.

### Key Features

*   **Interactive Wheel of Life:** Rate eight different life categories, including career, finances, health, and relationships.
*   **Dynamic Visualization:** See your life balance represented on a color-coded radar chart that updates in real-time.
*   **AI-Powered Recommendations:** Get personalized advice from an AI coach to help you improve your wellbeing.
*   **Modern, Responsive UI:** A clean and intuitive interface built with Next.js, Tailwind CSS, and ShadCN UI.

## Built With

*   [Next.js](https://nextjs.org/) - React Framework
*   [Genkit](https://firebase.google.com/docs/genkit) - AI Integration Toolkit
*   [Tailwind CSS](https://tailwindcss.com/) - Styling
*   [ShadCN UI](https://ui.shadcn.com/) - UI Components
*   [Recharts](https://recharts.org/) - Visualization

## Getting Started

### Prerequisites

*   Node.js 20+
*   npm

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/aminbadh/life-compass.git
    ```
2.  Install dependencies:
    ```sh
    npm install
    ```
3.  Set up environment variables:
    Create a `.env` file and add your `GOOGLE_GENAI_API_KEY`.

### Running the Application

To run the app in development mode:
```sh
npm run dev
```
Open [http://localhost:9002](http://localhost:9002) in your browser.

## Deployment

This project is optimized for deployment on **Vercel**. Simply connect your GitHub repository to Vercel and it will automatically detect the Next.js setup.
