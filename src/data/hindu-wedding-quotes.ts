export type QuotePosition = 'left' | 'right' | 'bottom-left' | 'center' | 'top-right' | 'bottom-right';

export interface WeddingQuote {
  heading: string;
  description: string;
  position: QuotePosition;
}

export const hinduWeddingQuotes: (WeddingQuote | undefined)[] = [
  // Image 1 (Index 0)
  {
    heading: "Sacred Promises. Timeless Memories.",
    description: "Every ritual tells a story of love, faith, family, and tradition...",
    position: "left"
  },
  undefined,
  undefined,
  // Image 4 (Index 3)
  {
    heading: "Where Traditions Meet Timeless Storytelling.",
    description: "",
    position: "right"
  },
  undefined,
  undefined,
  // Image 7 (Index 6)
  {
    heading: "Every Ritual Has Meaning. Every Moment Has a Story.",
    description: "",
    position: "bottom-left"
  },
  undefined,
  undefined,
  // Image 10 (Index 9)
  {
    heading: "Seven Sacred Steps. One Beautiful Journey.",
    description: "",
    position: "center"
  },
  undefined,
  undefined,
  // Image 13 (Index 12)
  {
    heading: "Love Blessed by Family and Tradition.",
    description: "",
    position: "top-right"
  },
  undefined,
  undefined,
  // Image 16 (Index 15)
  {
    heading: "Some Moments Last a Day. These Memories Last Forever.",
    description: "",
    position: "bottom-right"
  },
  undefined,
  undefined,
  // Image 19 (Index 18)
  {
    heading: "Your Story. Your Legacy. Captured Forever.",
    description: "",
    position: "center"
  }
];
