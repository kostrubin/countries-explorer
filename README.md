# Countries Explorer

Explore countries from around the globe, search for specific countries, view detailed information, and filter or sort the list as per your preference. The application also displays current weather information for each country's capital city.

## Table of Contents

1. [Demo](#demo)
2. [Features](#features)
3. [Getting Started](#getting-started)
4. [API](#api)
5. [Technologies Used](#technologies-used)

## Demo

The live demo of this application is available here:
https://countries-explorer-pied.vercel.app

## Features

### 1. **Country Search**
- Search for countries by name.
- Display a list of matching countries with key details:
  - Country Name
  - Capital
  - Region
  - Flag

### 2. **Country Details with Weather Information**
- Click on a country to view detailed information, including:
  - Languages spoken
  - Currencies
  - Population
  - Neighbouring countries
  - Time zones
- **Weather Information**:
  - Current weather in the capital city.
  - Details include:
    - Temperature
    - Weather conditions
    - Icon representing the weather

### 3. **Filter and Sort**
- **Filtering**:
  - Filter countries by **region**.
  - Filter countries by **language**.
- **Sorting**:
  - Sort the list by:
    - Name
    - Population
    - Area
  - Change sort order between ascending and descending.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (v16+ recommended)
- **npm** (or **yarn**, depending on your preference)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/kostrubin/countries-explorer.git
    cd countries-explorer
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3. Start the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

## API

### 1. **Countries GraphQL API**
- URL: https://graphql.country/
- Provides detailed information about countries, including:
  - Name
  - Capital
  - Region
  - Languages
  - Currencies
  - Population
  - Borders
  - Time zones

### 2. **OpenWeather API**
- URL: https://home.openweathermap.org
- Displays weather information for the capital city of selected countries.
- API Key is required to fetch weather data. See instructions below on how to set up your API key.

### API Configuration
This project uses the OpenWeather API to fetch weather data for a selected country's capital.

Steps to Obtain an API Key
Sign up at OpenWeather if you don't already have an account.

1. Log in and navigate to the API Keys section at https://home.openweathermap.org/api_keys.

2. Generate a new API key or copy an existing one.

3. Create a .env file in the root directory of the project:
    ```bash
    touch .env
    ```
4. Add your API key to the `.env` file (you can copy the key from `.env.example` file):
    ```bash
    VITE_OPENWEATHER_API_KEY=<your-api-key>
    ```
5. Restart the development server to apply the changes:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

## Technologies Used
- React
- TypeScript
- Vite
- Tailwind CSS
- Apollo Client
- Jest
