# Sentence Construction Tool

## Overview
This is an interactive web application that helps users practice constructing sentences by filling in blanks with appropriate words. The application presents incomplete sentences along with word options, and users must select the correct words to complete each sentence within a time limit.

## Features
- Interactive sentence completion exercises
- Drag-and-drop word placement in sentence blanks
- 30-second timer for each question
- Ability to unselect words by clicking on filled blanks
- Words return to their original position when unselected
- Automatic progression to the next question when time expires
- Next button activation only when all blanks are filled
- Comprehensive feedback screen showing:
  - Correct and incorrect answers
  - Correct solutions for missed questions
  - Final score out of 10

## Demo
[Live Demo](LINK..)

## Tech Stack
- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Build Tool**: Vite
- **Deployment**: Vercel
- **Data Fetching**: Fetch API with JSON Server

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/YuvrajKathpalia/CA_MONK_FRONTEND_ASSIGNMENT.git
cd SENTENCE-CONSTRUCTION-MASTER
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Set up JSON Server for the mock API:
```bash
# Run the JSON server using the npm script
npm run server

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open your browser and visit `http://localhost:5173`

## Project Structure
```
sentence-construction-tool/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/           # shadcn/ui components
│   │   ├── Question.tsx  # Question component
│   │   ├── Feedback.tsx  # Feedback component
│   │   └── Timer.tsx     # Timer component
│   ├── lib/
│   │   └── utils.ts      # Utility functions
│   ├── types/
│   │   └── index.ts      # TypeScript type definitions
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Entry point
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies
```

## Usage
1. The application displays an incomplete sentence with blanks.
2. Select words from the options below to fill in the blanks.
3. Click on a filled blank to unselect a word and return it to its original position.
4. Complete the sentence within 30 seconds.
5. Click the "Next" button to progress to the next question.
6. After completing all questions, view your feedback and score.

## API Structure
The application fetches question data from a JSON API with the following structure:

```json
{
  "status": "SUCCESS",
  "data": {
    "questions": [
      {
        "questionId": "q1",
        "question": "The cat ___ on the mat.",
        "options": ["sits", "running", "jumped", "sleeping"],
        "correctAnswer": ["sits"]
      },
      // More questions........
    ]
  }
}
```

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
