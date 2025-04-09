# My Backend Server

This project is a simple backend server built with TypeScript and Express. It provides endpoints for managing characters, including retrieving all characters and adding new characters.

## Project Structure

```
my-backend-server
├── src
│   ├── index.ts               # Entry point of the server application
│   ├── controllers            # Contains controllers for handling requests
│   │   └── charactersController.ts  # Controller for character-related requests
│   ├── routes                 # Contains route definitions
│   │   └── charactersRoutes.ts # Routes for character-related endpoints
│   └── types                  # Type definitions
│       └── index.ts          # Interfaces for character data
├── package.json               # NPM package configuration
├── tsconfig.json              # TypeScript configuration
└── README.md                  # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd my-backend-server
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the server:**
   ```
   npm start
   ```

## Usage

- **Get all characters:**
  - Endpoint: `GET /characters`
  - Description: Retrieves a list of all characters.

- **Add a new character:**
  - Endpoint: `POST /characters`
  - Description: Adds a new character to the database. Requires a JSON body with character details.

## License

This project is licensed under the MIT License.