# AP Exam Registration System - Frontend

A modern React-based frontend application for managing AP exam registrations. Built with Vite, React 19, Tailwind CSS, and DaisyUI.

## 🚀 Features

- **Interactive Registration Form** - User-friendly form for AP exam registration
- **Real-time Validation** - Client-side form validation with error handling
- **Responsive Design** - Mobile-first design using Tailwind CSS and DaisyUI
- **Idempotency Protection** - Prevents duplicate submissions with unique request keys
- **Timeout Handling** - Graceful handling of slow network requests
- **Exam Information** - Comprehensive AP exam schedule and cost details
- **Grade Selection** - Support for grades 9-12
- **Exam Section Selection** - Week 1 & 2 scheduling options

## 🛠️ Tech Stack

- **React 19.1.1** - UI library
- **Vite 7.1.7** - Build tool and dev server
- **React Router DOM 7.9.3** - Client-side routing
- **Tailwind CSS 4.1.13** - Utility-first CSS framework
- **DaisyUI 5.1.26** - Tailwind CSS component library
- **ESLint** - Code linting and quality

## 📋 Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager
- Backend API running (see backend README)

## 🔧 Installation

1. **Clone the repository** (if not already done)
   ```bash
   git clone <repository-url>
   cd form_registration_system_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5051/api
   ```

   Adjust the API URL to match your backend configuration.

## 🚀 Running the Application

### Development Mode

Start the development server with hot reload:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or next available port).

### Production Build

Build the application for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## 📁 Project Structure

```
form_registration_system_frontend/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   └── APIntroduction.jsx    # AP exam info component
│   │   └── layout/
│   │       └── ContactForm.jsx       # Main registration form
│   ├── pages/
│   │   └── APContactPage.jsx         # Registration page container
│   ├── services/
│   │   └── api.js                    # API service layer
│   ├── App.jsx                       # Main app component
│   └── main.jsx                      # Application entry point
├── public/                           # Static assets
├── .env                             # Environment variables (not in git)
├── package.json                     # Dependencies and scripts
├── vite.config.js                   # Vite configuration
├── tailwind.config.js              # Tailwind CSS configuration
└── eslint.config.js                # ESLint configuration
```

## 🔌 API Integration

The frontend communicates with the backend API through the `api.js` service layer.

### API Configuration

- **Base URL**: Configured via `VITE_API_URL` environment variable
- **Default**: `http://localhost:5051/api`
- **CORS**: Credentials included for cookie-based authentication

### API Endpoints Used

```javascript
POST /api/registrations    // Create new registration
```

### Request Format

```json
{
  "idempotencyKey": "unique-uuid-v4",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "homePhone": "123-456-7890",
  "mobilePhone": "098-765-4321",
  "currentSchool": "Example High School",
  "grade": "12",
  "examSection": "Week 1: Monday"
}
```

## 🎨 Styling

### Tailwind CSS

This project uses Tailwind CSS v4 for styling with the following configuration:

- **Utility-first approach** for rapid UI development
- **Responsive design** with mobile-first breakpoints
- **Custom color scheme** via DaisyUI themes

### DaisyUI Components

Pre-built components used in the project:

- `card` - Container components
- `form-control` - Form inputs and labels
- `btn` - Buttons with various styles
- `alert` - Success/error messages
- `badge` - Status indicators
- `table` - Exam schedule display

## 📝 Form Validation

The application includes comprehensive form validation:

### Client-side Validation
- Required field checks
- Email format validation
- Phone number format validation
- Real-time error feedback

### Validation Functions

```javascript
// Available in src/services/api.js
validateRegistrationData(data)  // Full form validation
isValidEmail(email)            // Email format check
isValidPhone(phone)            // Phone format check
```

## 🔐 Security Features

- **Idempotency Keys** - Prevents duplicate form submissions
- **CORS Configuration** - Secure cross-origin requests
- **Input Sanitization** - Client-side validation
- **Timeout Protection** - 5-second request timeout

## ⚙️ Available Exam Options

### Exam Sections
- Week 1: Monday through Friday
- Week 2: Monday through Friday

### Grade Levels
- Grade 9
- Grade 10
- Grade 11
- Grade 12

## 🐛 Troubleshooting

### Common Issues

**Issue: "Connection refused" error**
```bash
# Check if backend API is running
# Verify VITE_API_URL in .env matches backend port
```

**Issue: Build fails**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue: Hot reload not working**
```bash
# Restart the dev server
# Check vite.config.js for correct configuration
```

**Issue: Styles not loading**
```bash
# Ensure Tailwind CSS is properly configured
# Check tailwind.config.js
# Restart dev server
```

## 📦 Dependencies

### Production Dependencies
- `react` - UI library
- `react-dom` - React DOM renderer
- `react-router-dom` - Routing
- `tailwindcss` - CSS framework
- `@tailwindcss/vite` - Tailwind Vite plugin

### Development Dependencies
- `@vitejs/plugin-react` - React plugin for Vite
- `eslint` - Linting
- `daisyui` - UI components
- Various ESLint plugins

## 🚢 Deployment

### Build for Production

1. **Set production environment variables**
   ```env
   VITE_API_URL=https://your-api-domain.com/api
   ```

2. **Create production build**
   ```bash
   npm run build
   ```

3. **Deploy the `dist/` folder** to your hosting provider:
    - Netlify
    - Vercel
    - AWS S3 + CloudFront
    - GitHub Pages
    - Any static hosting service

### Environment-specific Builds

```bash
# Development
npm run build -- --mode development

# Production
npm run build -- --mode production
```

## 🔄 Connecting to Backend

Ensure the backend API is running before starting the frontend:

1. Start the backend server (see backend README)
2. Update `VITE_API_URL` in `.env` if needed
3. Start the frontend with `npm run dev`

## 🧪 Testing

Currently, the project does not include automated tests. To add testing:

```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

# Add test script to package.json
"test": "vitest"
```

## 📄 License

[Specify your license here]

## 👥 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Contact the development team
- Check the backend README for API-related issues

## 🔗 Related Documentation

- [Backend API Documentation](../backend/README.md)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [DaisyUI Documentation](https://daisyui.com)

---

**Project**: AP Exam Registration System Frontend  
**Version**: 0.0.0  
**Built with**: React + Vite + Tailwind CSS