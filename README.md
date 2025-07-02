# Dimension3

This repository contains a simple Angular e-commerce frontend. It includes basic business logic for products, cart management, authentication, and orders. To run the project you will need Node.js and the Angular CLI installed.

The application is organized into a set of reusable services and small data models under `src/app/models`.

Major services expose RxJS observables so components can consume state using the `async` pipe. This reactive pattern keeps components lean and testable.

## Setup

```bash
cd frontend
npm install
npm start
```

This will start the Angular development server.
