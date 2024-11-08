# Recipe API

This is a RESTful API for managing recipes, built with Node.js, Express, and MongoDB. It allows users to create, read, update, delete, and list recipes with pagination. The API is structured with separate controllers, routes, and models, making it modular and maintainable.

## Features

- CRUD operations for recipes:
  - **POST** `/api/recipes` - Add a new recipe
  - **GET** `/api/recipes` - Retrieve all recipes with pagination
  - **GET** `/api/recipes/:id` - Retrieve a single recipe by ID
  - **PUT** `/api/recipes/:id` - Update a recipe by ID
  - **DELETE** `/api/recipes/:id` - Delete a recipe by ID
- Data validation and error handling
- Pagination support for large datasets

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ORM for modeling data
- **dotenv** - Environment variable management

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/) (either locally or on MongoDB Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/recipe-api.git
   cd recipe-api

2. Install dependencies:
   npm install

3. Create a .env file in the root directory and add your MongoDB URI in said .env file:

MONGODB_URI=your_mongodb_connection_string(
Just replace `"your-username"` and `"your_mongodb_connection_string"` with the appropriate values.
)
PORT=3001

4. Start the server:

node server.js
