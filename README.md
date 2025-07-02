# Dimension3

This repository contains a simple Angular e-commerce frontend. It includes basic business logic for products, cart management, authentication, and orders. To run the project you will need Node.js and the Angular CLI installed.

The application is organized into a set of reusable services and small data models under `src/app/models`.

The codebase now follows a modular structure:

* `core` module provides singletons like services and application configuration.
* `shared` module contains reusable UI components.
* feature modules (`auth` and `shop`) declare pages and are lazy loaded via the router.

Runtime settings are provided through the `environment` files under `src/environments` and injected using an `APP_CONFIG` token. This makes it easy to swap configuration for different deployments.

Major services expose RxJS observables so components can consume state using the `async` pipe. This reactive pattern keeps components lean and testable.

User credentials are stored securely in browser storage using salted SHA-256 hashes rather than plain text. Sessions are kept in `sessionStorage` so they clear when the tab closes.

## Setup

```bash
cd frontend
npm install
npm start
```

This will start the Angular development server.

### Error handling

The application registers a global `ErrorHandler` that logs unexpected errors to
the console and displays a toast notification. Local storage operations in the
core services are wrapped in `try/catch` blocks so the app can recover from
corrupt data or quota failures.
