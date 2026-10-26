export type FoodRecord = {
  id: string;
  name: string;
  category: string;
  region: "Indian" | "International";
  state: string;
  fibrePer100g: number | null;
  proteinPer100g: number | null;
  sourceName: string;
  sourceUrl: string;
  sourceType: "API" | "Curated";
  note: string;
  verified: boolean;
};

export const starterFoods: FoodRecord[] = [
  {
    id: "demo-apple-raw",
    name: "Apple, raw, with skin",
    category: "Fruit",
    region: "International",
    state: "Raw, edible portion",
    fibrePer100g: 2.4,
    proteinPer100g: 0.26,
    sourceName: "USDA FoodData Central (starter example)",
    sourceUrl: "https://fdc.nal.usda.gov/",
    sourceType: "Curated",
    note: "Starter example only. Confirm the matching FDC record and values before publishing.",
    verified: false
  },
  {
    id: "demo-banana-raw",
    name: "Banana, raw",
    category: "Fruit",
    region: "International",
    state: "Raw, edible portion",
    fibrePer100g: 2.6,
    proteinPer100g: 1.09,
    sourceName: "USDA FoodData Central (starter example)",
    sourceUrl: "https://fdc.nal.usda.gov/",
    sourceType: "Curated",
    note: "Starter example only. Confirm the matching FDC record and values before publishing.",
    verified: false
  },
  {
    id: "demo-oats-dry",
    name: "Oats, dry",
    category: "Grains",
    region: "International",
    state: "Dry, uncooked",
    fibrePer100g: 10.6,
    proteinPer100g: 16.9,
    sourceName: "USDA FoodData Central (starter example)",
    sourceUrl: "https://fdc.nal.usda.gov/",
    sourceType: "Curated",
    note: "Starter example only. Confirm the matching FDC record and values before publishing.",
    verified: false
  },
  {
    id: "demo-lentils-cooked",
    name: "Lentils, cooked",
    category: "Pulses",
    region: "International",
    state: "Boiled, drained",
    fibrePer100g: 7.9,
    proteinPer100g: 9.0,
    sourceName: "USDA FoodData Central (starter example)",
    sourceUrl: "https://fdc.nal.usda.gov/",
    sourceType: "Curated",
    note: "Starter example only. Confirm the matching FDC record and values before publishing.",
    verified: false
  },
  {
    id: "demo-almonds",
    name: "Almonds",
    category: "Nuts & seeds",
    region: "International",
    state: "Raw",
    fibrePer100g: 12.5,
    proteinPer100g: 21.2,
    sourceName: "USDA FoodData Central (starter example)",
    sourceUrl: "https://fdc.nal.usda.gov/",
    sourceType: "Curated",
    note: "Starter example only. Confirm the matching FDC record and values before publishing.",
    verified: false
  },
  {
    id: "demo-rice-cooked",
    name: "White rice, cooked",
    category: "Grains",
    region: "International",
    state: "Cooked",
    fibrePer100g: 0.4,
    proteinPer100g: 2.7,
    sourceName: "USDA FoodData Central (starter example)",
    sourceUrl: "https://fdc.nal.usda.gov/",
    sourceType: "Curated",
    note: "Starter example only. Confirm the matching FDC record and values before publishing.",
    verified: false
  }
];

export function scaleNutrient(valuePer100g: number | null, grams: number): number | null {
  if (valuePer100g === null || !Number.isFinite(valuePer100g) || !Number.isFinite(grams) || grams < 0) {
    return null;
  }
  return (valuePer100g * grams) / 100;
}

export function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
