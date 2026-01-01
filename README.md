# People Management Application

This is a simple Angular 7/8 Single Page Application built as part of an internship assignment.  
The project demonstrates basic **CRUD operations** using Angular, routing, and REST API integration.

---

## Features

- View list of people  
- Add a new person  
- Edit existing person details  
- Delete a person with confirmation  
- Angular routing (SPA)  
- REST API integration using HttpClient  
- Basic form validation  
- Responsive UI  

---

## Tech Stack

- Angular 8  
- TypeScript  
- RxJS  
- Angular Router  
- Angular HttpClient  
- Template-driven Forms  

---

## Prerequisites

- Node.js (v10–v16 recommended)  
- npm  
- Angular CLI (v8)

---

## Installation & Run

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd Angular
   ```
2. Install dependencies

   ```bash
   npm install
   ```
3. Run the application

   ```bash
   ng serve
   ```
4. Open in browser

   ```
   http://localhost:4200
   ```

---

## API Configuration

Update API URL in:

```bash
src/environments/environment.ts
```

Example:

```ts
apiUrl: 'http://localhost:3000/api/people'
```

---

## API Endpoints Used

- GET /people – Get all people
- GET /people/:id – Get person by ID
- POST /people – Add new person
- PUT /people/:id – Update person
- DELETE /people/:id – Delete person

---

## Application Routes

- /people – List all people
- /people/new – Create new person
- /people/edit/:id – Edit person

---

## Project Structure

```
src/app/
├── components/
│   ├── person-list
│   └── person-edit
├── services/
│   └── person.service.ts
├── models/
│   └── person.model.ts
└── app-routing.module.ts
```

---

## Notes

This project is created for learning and evaluation purposes

Focus is on Angular fundamentals and CRUD operations

UI and logic are kept simple and clear

