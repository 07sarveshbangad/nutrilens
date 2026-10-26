"use client";

import { useMemo, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Check, ChevronDown, Clock3, Database, Leaf, Search, ShieldCheck, Sparkles, Wheat } from "lucide-react";
import { starterFoods, scaleNutrient, type FoodRecord } from ".foods";

type ResultFood = FoodRecord & { fdcId?: number; provider?: string; brandOwner?: string | null };

const popular = ["apple", "banana", "oats", "lentils", "almonds", "white rice"];

function number(value: number | null) {
  return value === null ? "Not available" : `${value.toFixed(value < 10 ? 2 : 1)} g`;
}

export default function FoodFinder() {
  const [query, setQuery] = useState("");
  const [weight, setWeight] = useState("100");
  const [results, setResults] = useState<ResultFood[]>([]);
  const [selected, setSelected] = useState<ResultFood | null>(null);
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState("");
  const [searched, setSearched] = useState(false);

  const grams = Number(weight);
  const validWeight = weight.trim() !== "" && Number.isFinite(grams) && grams > 0 && grams <= 5000;
  const fibre = selected && validWeight ? scaleNutrient(selected.fibrePer100g, grams) : null;
  const protein = selected && validWeight ? scaleNutrient(selected.proteinPer100g, grams) : null;

  async function searchFood(term = query) {
    const clean = term.trim();
    if (clean.length < 2) {
      setWarning("Enter at least 2 letters to search.");
      return;
    }
    setLoading(true);
    setWarning("");
    setSelected(null);
    setSearched(true);
    try {
      const response = await fetch(`/api/foods?q=${encodeURIComponent(clean)}`);
      const data = await response.json();
      setResults(data.foods ?? []);
      setWarning(data.warning ?? "");
      if (!data.foods?.length && !data.warning) setWarning("No matching foods found. Try a simpler name, such as “apple” or “lentils”.");
    } catch {
      setResults([]);
      setWarning("Search failed. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  const suggestionList = useMemo(() => results.slice(0, 8), [results]);

  function choose(food: ResultFood) {
    setSelected(food);
    setQuery(food.name);
    setResults([]);
    setWarning("");
  }

  return (
    <section className="finder" id="calculator" aria-labelledby="finder-title">
      <div className="finder-heading">
        <div className="eyebrow"><Sparkles size={15} /> NUTRITION LOOKUP</div>
        <h2 id="finder-title">What’s in your food?</h2>
        <p>Search a food, choose the right preparation, and calculate fibre and protein for your portion.</p>
      </div>

      <form className="search-form" onSubmit={(event) => { event.preventDefault(); void searchFood(); }}>
        <label className="sr-only" htmlFor="food-search">Food name</label>
        <Search size={21} aria-hidden="true" />
        <input
          id="food-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try apple, oats, cooked lentils…"
          autoComplete="off"
        />
        <button type="submit" disabled={loading}>{loading ? "Searching…" : "Find food"}</button>
      </form>

      <div className="popular-row">
        <span>Popular:</span>
        {popular.map((food) => (
          <button key={food} type="button" onClick={() => { setQuery(food); void searchFood(food); }}>{food}</button>
        ))}
      </div>

      {warning && <div className="notice" role="status">{warning}</div>}

      {suggestionList.length > 0 && (
        <div className="result-list" aria-label="Search results">
          <div className="result-list-head"><span>Choose the closest match</span><span>{results.length} result{results.length === 1 ? "" : "s"}</span></div>
          {suggestionList.map((food) => (
            <button className="food-option" type="button" key={food.id} onClick={() => choose(food)}>
              <span className="food-icon"><Wheat size={19} /></span>
              <span className="food-option-name"><strong>{food.name}</strong><small>{food.state} · {food.category}</small></span>
              <span className="food-option-values"><small>Per 100 g</small><strong>Fibre {number(food.fibrePer100g)} · Protein {number(food.proteinPer100g)}</strong></span>
              <ChevronDown className="option-arrow" size={17} />
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div className="nutrition-result" aria-live="polite">
          <div className="selected-food">
            <div>
              <div className="eyebrow"><Check size={14} /> SELECTED FOOD</div>
              <h3>{selected.name}</h3>
              <p>{selected.state} · Data source: {selected.sourceName}</p>
            </div>
            <a href={selected.sourceUrl} target="_blank" rel="noreferrer" className="source-link">View source <ArrowUpRight size={15}/></a>
          </div>

          <div className="weight-control">
            <label htmlFor="food-weight">Your portion</label>
            <div className="weight-input-wrap">
              <input id="food-weight" type="number" min="1" max="5000" step="1" value={weight} onChange={(event) => setWeight(event.target.value)} />
              <span>grams</span>
            </div>
            <div className="weight-presets">
              {[30, 50, 100, 150, 200, 250].map((g) => <button type="button" key={g} className={grams === g ? "active" : ""} onClick={() => setWeight(String(g))}>{g} g</button>)}
            </div>
          </div>

          {!validWeight && <div className="notice" role="alert">Enter a weight from 1 to 5,000 grams.</div>}

          <div className="nutrient-cards">
            <article className="nutrient-card fibre-card">
              <div className="nutrient-top"><span className="nutrient-icon"><Leaf size={19}/></span><span>DIETARY FIBRE</span></div>
              <div className="nutrient-number">{validWeight ? number(fibre) : "—"}</div>
              <p>For {validWeight ? grams : "your"} gram{grams === 1 ? "" : "s"} portion</p>
              {selected.fibrePer100g !== null && <div className="per-100"><span>Per 100 g</span><strong>{number(selected.fibrePer100g)}</strong></div>}
            </article>
            <article className="nutrient-card protein-card">
              <div className="nutrient-top"><span className="nutrient-icon"><ArrowDownRight size={19}/></span><span>PROTEIN</span></div>
              <div className="nutrient-number">{validWeight ? number(protein) : "—"}</div>
              <p>For {validWeight ? grams : "your"} gram{grams === 1 ? "" : "s"} portion</p>
              {selected.proteinPer100g !== null && <div className="per-100"><span>Per 100 g</span><strong>{number(selected.proteinPer100g)}</strong></div>}
            </article>
          </div>
          <div className="source-note">
            <ShieldCheck size={18}/>
            <div><strong>Know your source</strong><p>{selected.verified ? selected.note : "Starter sample values are unverified and are shown for development only. Confirm this record against its source before relying on or publishing it."}</p></div>
          </div>
        </div>
      )}

      {searched && !loading && !results.length && !selected && !warning && (
        <div className="empty-result"><Database size={23}/><strong>No match yet</strong><span>Try another name or a simpler search term.</span></div>
      )}
      <p className="finder-footnote"><Clock3 size={14}/> Values are estimates from the selected food record. Brand, variety, water content and preparation can change nutrition.</p>
    </section>
  );
}
