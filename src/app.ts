import express, { Request, Response } from 'express';
import { getScrapedData } from './controller';

const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON
app.use(express.json());

// Basic route
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Express API for scraping!');
});

app.get('/api/scrape', getScrapedData);


// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});