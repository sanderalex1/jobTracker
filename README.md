# Job Tracker

A React-based job application tracker built with TypeScript, Vite, and Material-UI. This application helps users manage and track their job applications, view statistics, search and filter applications, and edit application details.

## Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd jobTracker
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## Usage

After starting the development server, open your browser to `http://localhost:5173` (or the port specified by Vite).

The application features:

- Dashboard with statistic cards showing application metrics
- Search and filter functionality for applications
- Table view of all applications
- Edit dialog for adding or modifying application details

## Examples

### Viewing Statistics

The dashboard displays cards with key statistics such as total applications, pending applications, etc.

### Searching Applications

Use the search bar to filter applications by company, position, or status.

### Editing an Application

Click on an application in the table to open the edit dialog, where you can update details like application date, status, and notes.

## Folder Structure

```
jobTracker/
├── public/
├── src/
│   ├── components/
│   │   ├── ApplicationTable/
│   │   │   ├── ApplicationEditor.tsx
│   │   │   ├── ApplicationEmptyCard.tsx
│   │   │   └── ApplicationTable.tsx
│   │   ├── Cards/
│   │   │   ├── StatisticCard.tsx
│   │   │   └── StatisticCards.tsx
│   │   ├── Searchbar/
│   │   │   ├── Searchbar.tsx
│   │   │   └── Filter/
│   │   │       └── Filter.tsx
│   │   └── UI/
│   │       └── Header/
│   │           └── Header.tsx
│   ├── context/
│   │   ├── ApplicationContext.tsx
│   │   └── ApplicationContext.type.ts
│   ├── data/
│   │   ├── mockData.ts
│   │   └── types.ts
│   ├── hooks/
│   │   └── useLocalStorage.ts
│   ├── pages/
│   │   └── Dashboard.tsx
│   ├── theme/
│   │   ├── AppThemeProvider.tsx
│   │   ├── components.ts
│   │   ├── darkTheme.ts
│   │   ├── index.ts
│   │   ├── lightTheme.ts
│   │   ├── palette.ts
│   │   ├── spacing.ts
│   │   ├── theme.types.ts
│   │   └── typography.ts
│   ├── types/
│   │   └── application.ts
│   ├── utils/
│   │   └── dateHelper.ts
│   ├── App.tsx
│   └── main.tsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
```
