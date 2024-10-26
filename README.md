# Express TypeScript Server

A simple Express server built with TypeScript.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [API Endpoint](#api-endpoint)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (version 14 or higher)
- **npm** (Node package manager, comes with Node.js)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   npm install
   npm install -g typescript
   ```

## Running the Server

```
npm start
```

## API Endpoint

```
GET /api/scrape
Query Parameters:

url: The URL of the Shopify store to scrape.
Response:

Returns JSON with scraped styles:

json
{
"data": {
"fonts": [...],
"primaryButton": { ... }
}
}

```
