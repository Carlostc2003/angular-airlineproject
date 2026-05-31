# Airline Frontend Project

![header-airline-frontend-project](docs/img/header-img.png)

Frontend application developed with **Angular** as a demonstration client for the **Spring Airline Project** backend.

> **Important:** This project is only an example frontend created for educational and portfolio purposes. It is **not a real airline website** and should not be considered a production-ready application.

The frontend communicates directly with the **Spring Airline Backend Project** API:

https://github.com/Carlostc2003/spring-airlineproject

## Project Status

> **Preliminary Development Stage**
>
> This frontend is currently in a very early stage of development. Only a small number of features have been implemented and many functionalities are incomplete or still under development.

## Technologies

* Angular 21
* TypeScript 5.9.3
* HTML5
* CSS3

## Features

- [building...]

## Installation and Execution

### 1. Clone the repository

```bash
git clone https://github.com/Carlostc2003/angular-airlineproject.git

cd angular-airlineproject
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the backend URL

Replace your backend URI with your own in the app.component.ts file. This file contains several global settings for easy management.

```typescript
export const uri = 'https://spring-airlineproject.onrender.com/';
```

### 4. Run the application

```bash
ng serve -o
```

The application will be available at:

```text
http://localhost:4200
```

## Backend Dependency

This frontend has been designed to work with the Spring Airline Backend Project.

Backend repository:

https://github.com/Carlostc2003/spring-airlineproject

Backend API Documentation:

https://spring-airlineproject.onrender.com/swagger-ui/index.html

## Disclaimer

This project is a personal learning and portfolio project intended to demonstrate frontend and backend integration using Angular and Spring Boot.

It does not represent a commercial airline platform and should not be used for real flight reservations or airline operations.
