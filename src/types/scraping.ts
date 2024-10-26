export interface Font {
    family: string;
    variants: string;
    letterSpacings: string; // '0.01em' is a string but can be adjusted if needed
    fontWeight: string; // '400' is a string, but could be a number if you prefer
    url: string; // URL as a string
}