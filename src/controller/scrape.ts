import { Request, Response } from "express";
import { scrapeShopifyStyles } from '../scraper';

export const getScrapedData = async (request: Request, response: Response) => {
    const { url } = request.query;
    if (!url || typeof url !== 'string')
        response.status(400).json({ error: 'Please provide a valid URL' })
    else {
        try {
            const styles = await scrapeShopifyStyles(url);
            response.json({ data: styles })
        } catch (error) {
            response.status(500).json({ error: 'Error scraping the Shopify store' })
        }
    }
}