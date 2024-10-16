## Notes

# Front-End Task

This is a Vue 3 project using Vite, Tailwind CSS, TypeScript, and Strapi as the backend CMS. It also includes Material Design Icons for easy icon usage in the frontend.

## Project Structure

- **Vue 3**: Main front-end framework (located in `/vue`)
- **Vite**: Fast build tool and development server
- **Strapi**: Headless CMS for the backend (located in `/strapi`)
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Strongly typed JavaScript
- **Material Design Icons**: Icon library for UI components

## Setup Instructions

### 1. Install Dependencies

To set up the project, run the following command in the `/vue` directory:

```bash
cd vue
npm install

cd strapi
npm install
```

### 2. Running the Project
You can run both the Vue front-end and Strapi backend simultaneously with the following command:
In **/vue** directory:
```bash
npm run dev:all
```
This will:
- Run the Vue 3 app at http://localhost:3000 (default or another available port).
- Run the Strapi project on its default port (typically http://localhost:1337).

This is important because strapi implementation in the admin panel is set to only works with those ports.

#### If you want to run them individually:

- Run the Vue project with:

```bash
npm run dev
```

- Run the Strapi backend with:
```bash
npm run develop:strapi
```

### 3. Building for Production
To build the Vue project for production:

```bash
npm run build
```
