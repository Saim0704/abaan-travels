# Overview

Abaan Travel is a full-stack web application for a travel agency specializing in Hajj and Umrah pilgrimage packages. The application provides a modern, responsive website with package browsing, admin management capabilities, and a content management system for slider images and travel packages.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Library**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with CSS variables for theming
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod schema validation

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with structured error handling
- **Development**: Hot reload with Vite middleware integration
- **Storage**: In-memory storage implementation with interface for future database integration

## Data Layer
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Definition**: Type-safe schema definitions with Zod validation
- **Database**: PostgreSQL (configured but using in-memory storage currently)
- **Data Models**: Packages, Users, and Slider Images with proper relationships

## Project Structure
- **Monorepo Layout**: Shared schema between client and server
- **Client**: React application in `/client` directory
- **Server**: Express API in `/server` directory  
- **Shared**: Common types and schemas in `/shared` directory
- **Component Organization**: UI components, pages, and admin panels properly separated

## Authentication & Authorization
- Session-based authentication infrastructure prepared
- Admin panel with protected routes for content management
- User management system with username/password authentication

## Development Features
- **Type Safety**: Full TypeScript integration across frontend and backend
- **Development Tools**: Vite with HMR, ESLint configuration, and proper build pipeline
- **Error Handling**: Comprehensive error boundaries and API error management
- **Replit Integration**: Specialized development tools and banner integration

# External Dependencies

## Frontend Dependencies
- **UI Framework**: React, React DOM for core functionality
- **UI Components**: Radix UI primitives for accessible component library
- **Styling**: Tailwind CSS with PostCSS for utility-first styling
- **State Management**: TanStack Query for server state and caching
- **Forms**: React Hook Form with Hookform Resolvers for form management
- **Validation**: Zod for runtime type checking and validation
- **Utilities**: clsx, class-variance-authority for conditional styling
- **Icons**: Lucide React for consistent iconography

## Backend Dependencies
- **Web Framework**: Express.js for HTTP server and routing
- **Database**: Drizzle ORM with PostgreSQL driver (@neondatabase/serverless)
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Development**: tsx for TypeScript execution, esbuild for production builds
- **Utilities**: date-fns for date manipulation, nanoid for ID generation

## Development Tools
- **Build System**: Vite with React plugin and TypeScript support
- **Database Tools**: Drizzle Kit for migrations and schema management
- **Replit Integration**: Specialized Vite plugins for Replit environment
- **Type Checking**: TypeScript with strict configuration across all modules