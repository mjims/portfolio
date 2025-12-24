# Portfolio & Blog Project

A dynamic portfolio and blog application built with a Laravel API backend and a Next.js frontend.

## Project Structure

- **api/**: Laravel application serving as the REST API.
- **frontend/**: Next.js application for the public portfolio and blog.
- **backoffice/**: Next.js application for the admin dashboard.

## Features

- **Dynamic Content**: content such as Skills, Projects, and Blog posts are fetched from the database.
- **Blog System**: Full-featured blog with SEO-friendly URLs.
- **Contact Form**: Stores messages in the database.
- **SEO Optimized**: Server-side rendering and proper metadata management.

## Setup Instructions

### Prerequisites
- PHP >= 8.2
- Composer
- Node.js & npm/yarn
- Database (MySQL/PostgreSQL)

### Backend (API)
1. Navigate to `api/`:
   ```bash
   cd api
   ```
2. Install dependencies:
   ```bash
   composer install
   ```
3. Set up environment:
   ```bash
   cp .env.example .env
   # Update DB credentials in .env
   ```
4. Generate key:
   ```bash
   php artisan key:generate
   ```
5. Run migrations:
   ```bash
   php artisan migrate
   ```
6. Serve:
   ```bash
   php artisan serve
   ```

### Frontend
1. Navigate to `frontend/`:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run development server:
   ```bash
   npm run dev
   ```

### Backoffice
1. Navigate to `backoffice/`:
   ```bash
   cd backoffice
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run development server:
   ```bash
   npm run dev
   ```
