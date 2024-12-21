# Notes Application

Welcome to the Notes Application! This project is a single-page application (SPA) built with React that allows users to create, edit, and manage their personal notes. The application includes user authentication, a responsive design, and seamless navigation between different sections.

---

## Features

- **User Authentication:**
  - Register and log in with email and password validation.
  - Persistent user sessions.

- **Note Management:**
  - Create, edit, and delete notes.
  - Notes include a title, body, and timestamp for creation.

- **Dynamic Routing:**
  - Seamless navigation using React Router DOM.
  - Protected routes to ensure only logged-in users can access certain features.

- **Responsive Design:**
  - Optimized for various screen sizes, ensuring a user-friendly experience on both mobile and desktop devices.

---

## Technologies Used

- **Frontend:**
  - React with functional components and hooks.
  - React Router DOM for navigation.
  - TailwindCSS for styling.

- **Backend:**
  - JSON Server for simulating a RESTful API.

- **Validation:**
  - Zod for form validation.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/eviillia/notion
   ```

2. Navigate to the project directory:
   ```bash
   cd notes-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the JSON Server:
   ```bash
   npm run dev:db
   ```

5. Start the React application:
   ```bash
   npm run dev
   ```

6. Open the application in your browser at:
   ```
   http://localhost:5173
   ```

---



## Routes

- `/login` - User login and registration.
- `/home` - User dashboard with welcome message.
- `/home/notes` - Notes listing page.
- `/home/create-note` - Page for creating a new note.
- `/home/edit-note/:id` - Page for editing an existing note.

---

