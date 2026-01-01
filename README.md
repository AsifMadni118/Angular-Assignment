# People Management Application

A professional Single Page Application (SPA) built with Angular 7/8 for managing a list of people. This application demonstrates CRUD operations (Create, Read, Update, Delete) with a clean, modern user interface.

## Features

- ✅ **List All People** - View all people in a responsive table
- ✅ **Edit Person** - Update existing person information
- ✅ **Delete Person** - Remove people from the list with confirmation
- ✅ **Create Person** - Add new people to the list
- ✅ **RESTful API Integration** - Full HTTP client integration
- ✅ **Routing** - Single Page Application with Angular Router
- ✅ **Responsive Design** - Works on desktop and mobile devices
- ✅ **Error Handling** - Comprehensive error handling and user feedback

## Technology Stack

- **Angular 8.2.14** - Frontend framework
- **TypeScript 3.5.3** - Programming language
- **RxJS 6.5.5** - Reactive programming
- **Angular Router** - Client-side routing
- **Angular HttpClient** - HTTP client for API calls
- **Angular Forms** - Template-driven forms

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 10.x to 16.x recommended for Angular 8)
  - Note: Node.js v17+ requires the `--openssl-legacy-provider` flag (already configured)
- **npm** (version 6.x or higher) or **yarn**
- **Angular CLI** (version 8.x)

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd Angular
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Install Angular CLI globally** (if not already installed)
   ```bash
   npm install -g @angular/cli@8.3.29
   ```

## Configuration

### API Configuration

The application uses REST API endpoints for data operations. By default, it's configured to use JSONPlaceholder API for demonstration purposes.

To configure your own API:

1. Open `src/environments/environment.ts` for development
2. Open `src/environments/environment.prod.ts` for production
3. Update the `apiUrl` property with your REST API endpoint:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://your-api-url.com/api/people'
};
```

### Expected API Endpoints

The application expects the following REST API endpoints:

- `GET /api/people` - Get all people
- `GET /api/people/:id` - Get a person by ID
- `POST /api/people` - Create a new person
- `PUT /api/people/:id` - Update a person
- `DELETE /api/people/:id` - Delete a person

## Running the Application

1. **Start the development server**
   ```bash
   npm start
   ```
   or
   ```bash
   ng serve
   ```

2. **Open your browser**
   Navigate to `http://localhost:4200`

3. **Build for production**
   ```bash
   npm run build
   ```
   The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── person-list/          # List all people component
│   │   └── person-edit/          # Edit/Create person component
│   ├── models/
│   │   └── person.model.ts       # Person interface/model
│   ├── services/
│   │   └── person.service.ts     # HTTP service for API calls
│   ├── app.component.ts          # Root component
│   ├── app.component.html        # Root template
│   ├── app.component.css         # Root styles
│   ├── app.module.ts             # Root module
│   └── app-routing.module.ts     # Routing configuration
├── assets/                        # Static assets
├── environments/                  # Environment configurations
├── index.html                     # Main HTML file
├── main.ts                        # Application entry point
├── polyfills.ts                   # Polyfills
└── styles.css                     # Global styles
```

## Application Routes

- `/` or `/people` - List all people (default route)
- `/people/new` - Create a new person
- `/people/edit/:id` - Edit an existing person

## Features in Detail

### List View (`/people`)
- Displays all people in a responsive table
- Shows ID, Name, Email, Phone, and City
- Action buttons for Edit and Delete
- Refresh button to reload data
- Add New Person button
- Loading states and error handling

### Edit View (`/people/edit/:id`)
- Form to edit existing person information
- Fields include: Name, Username, Email, Phone, Website, Address, Company
- Form validation
- Success/error messages
- Auto-redirect to list after successful save

### Create View (`/people/new`)
- Same form as Edit view for creating new people
- All fields optional except Name and Email
- Form validation
- Success feedback

### Delete Functionality
- Confirmation dialog before deletion
- Success message after deletion
- Automatic list refresh after deletion

## Development

### Code Style
- Follows Angular style guide
- TypeScript strict mode enabled
- Component-based architecture
- Service-based data management

### Adding New Features
1. Create components in `src/app/components/`
2. Add routes in `src/app/app-routing.module.ts`
3. Update services in `src/app/services/` if needed
4. Add models in `src/app/models/` if needed

## Testing

Run unit tests:
```bash
npm test
```

Run end-to-end tests:
```bash
npm run e2e
```

## Building for Production

```bash
ng build --prod
```

This will create an optimized production build in the `dist/` folder.

## Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the `dist/people-management-app` folder to your web server

3. Configure your web server to redirect all routes to `index.html` for SPA routing

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Common Issues

1. **Module not found errors**
   - Run `npm install` to ensure all dependencies are installed

2. **Port 4200 already in use**
   - Use `ng serve --port 4201` to use a different port

3. **API connection errors**
   - Check your API URL in `environment.ts`
   - Ensure CORS is enabled on your API server

4. **OpenSSL Error (ERR_OSSL_EVP_UNSUPPORTED) with Node.js v17+**
   - This error occurs when using Node.js v17 or higher with Angular 8
   - The project is configured with `cross-env` to use the legacy OpenSSL provider
   - If you still encounter issues, you can:
     - Use Node.js v16 or v14 (recommended for Angular 8)
     - Or manually set: `$env:NODE_OPTIONS="--openssl-legacy-provider"` in PowerShell before running `npm start`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is created for educational purposes as part of a MEAN Stack Intern Assignment.

## Author

Created as part of Angular 7/8 Test Assignment

## References

- [Angular Routing Guide](https://dev.to/codev206/how-to-set-up-routing-in-angular-to-create-single-page-applications-4ch2)
- [Angular HttpClient Guide](https://www.javaguides.net/2020/01/angular-9-httpclient-get-post-put-and-delete-request-example.html)
- [Angular CLI Getting Started](https://www.digitalocean.com/community/tutorials/getting-started-with-angular-using-the-angular-cli)
- [Angular Official Tutorial](https://angular.io/tutorial)

---

**Note:** Make sure to update the API URL in the environment files before deploying to production.

