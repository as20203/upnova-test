import puppeteer from 'puppeteer';
import { Font } from './types';

export const scrapeShopifyStyles = async (url: string) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Extract font styles and button styles
        const styles = await page.evaluate(() => {
            const getFontStyles = () => {
                const styleTags = document.querySelectorAll('style');
                if (!styleTags) return []; // Return empty array if no <style> tag found
                const fontFaces: Font[] = []
                styleTags.forEach(styleTag => {
                    if (styleTag.sheet) {
                        const rules = styleTag.sheet.cssRules
                        // Loop through each rule in the stylesheet
                        for (const rule of rules) {
                            // Check if the rule is a @font-face
                            if (rule instanceof CSSFontFaceRule) {
                                const { style } = rule
                                fontFaces.push({
                                    family: style.fontFamily.replace(/['"]/g, ''),
                                    variants: style.fontStyle || '',
                                    letterSpacings: style.letterSpacing,
                                    fontWeight: style.getPropertyValue('font-weight'),
                                    url: style.getPropertyValue('src')
                                });
                            }
                        }
                    }
                })
                return fontFaces;
            }
            const getButtonStyles = () => {
                const button = document.querySelector('form[action*="/cart/add"] button');
                if (button) {
                    const computedStyles = getComputedStyle(button);
                    const {
                        fontFamily,
                        fontSize,
                        lineHeight,
                        letterSpacing,
                        textTransform,
                        textDecoration,
                        textAlign,
                        backgroundColor,
                        color,
                        borderColor,
                        borderWidth,
                        borderRadius
                    } = computedStyles;

                    return {
                        fontFamily,
                        fontSize,
                        lineHeight,
                        letterSpacing,
                        textTransform,
                        textDecoration,
                        textAlign,
                        backgroundColor,
                        color,
                        borderColor,
                        borderWidth,
                        borderRadius
                    };
                }
                return null;
            }
            const fonts = getFontStyles();
            // Detect primary button styles
            const primaryButton = getButtonStyles();

            return { fonts, primaryButton };
            // return getStyles(getFontStyles, getButtonStyles)
        });

        await browser.close();
        return styles;
    } catch (error) {
        console.log(error)
        await browser.close();
        throw error;
    }
}
