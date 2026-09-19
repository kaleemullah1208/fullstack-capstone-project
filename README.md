# GiftLink - Fullstack Capstone Project

GiftLink is a full-stack web application developed as the Capstone Project for the **IBM Full-Stack JavaScript Developer Professional Certificate**. The application connects users who want to donate household items they no longer need with neighbors looking to recycle or find free items.

## Architecture

- **`giftlink-backend`**: RESTful API service developed using Node.js, Express, and MongoDB. Includes JWT authentication, bcrypt password encryption, and multi-filter gift search.
- **`sentiment`**: Microservice implementing sentiment analysis using the `natural` Natural Language Processing package.
- **`giftlink-frontend`**: React Single Page Application (SPA) utilizing React Router, Bootstrap, and Context API.
- **`.github/workflows/ci-cd.yml`**: Automated continuous integration and deployment pipeline.

## Getting Started

### Backend
```bash
cd giftlink-backend
npm install
npm start
```

### Sentiment Service
```bash
cd sentiment
npm install
npm start
```

### Frontend
```bash
cd giftlink-frontend
npm install
npm start
```
