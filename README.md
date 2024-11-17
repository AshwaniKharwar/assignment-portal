# Assignment Submission Portal

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)

---

## Project Overview

The Assignment Submission Portal is a backend system designed to facilitate the submission, review, and approval of assignments. It supports two types of users: **Users** who can upload assignments and **Admins** who can accept or reject these submissions.

## Features

- **User Authentication**: Register and login functionalities for both users and admins.
- **Role-Based Access**: Separate capabilities for users and admins.
- **Assignment Management**:
  - Users can upload assignments.
  - Admins can view assignments tagged to them and either accept or reject them.
- **Database Integration**: Uses MongoDB for storing user data and assignments.

## Tech Stack

- **Node.js** (Backend runtime)
- **Express** (Web framework for Node.js)
- **MongoDB** (NoSQL Database)
- **Mongoose** (MongoDB ODM)
- **JWT** (Authentication)
- **bcrypt.js** (Password hashing)
- **dotenv** (Environment variable management)

---

## Getting Started

Follow these instructions to set up the project on your local machine for development and testing.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [MongoDB](https://www.mongodb.com/) (You can also use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud-based database)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/AshwaniKharwar/assignment-portal.git
   cd assignment-portal
2. **Install dependencies**:
   ```bash
   npm install

### Environment Variables
   Create a .env file in the root directory and add the following environment variables:
     ```
     PORT=5000 
     MONGO_URI=mongodb://localhost:27017/assignmentDB 
     JWT_SECRET=mysecretkey 
     ```

### Running the Application
    npm run dev

