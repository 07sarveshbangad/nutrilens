import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, CheckCircle2, CircleHelp, Leaf, ShieldCheck, Sprout, Wheat } from "lucide-react";
import FoodFinder from "@/components/FoodFinder";

const guides = [
  { category: "FIBRE GUIDE", title: "Everyday Indian foods rich in fibre", desc: "Learn how pulses, whole grains, vegetables and fruit contribute dietary fibre.", href: "/guides/fibre-in-indian-foods", icon: Sprout },
  { category: "PROTEIN GUIDE", title: "Vegetarian foods and protein", desc: "Compare familiar plant-based foods and dairy options using reliable nutrition records.", href: "/guides/vegetarian-protein", icon: Wheat },
  { category: "HOW IT WORKS", title: "How we calculate your portion", desc: "Understand per-100-gram values, portion scaling and the limits of nutrition estimates.", href: "/methodology", icon: CircleHelp }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "NutriLens",
  applicationCategory: "HealthApplication",
  operatingSystem: "Any",
  description: "A food nutrition lookup tool for fibre and protein values by portion weight."
};

export default function HomePage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot"/> FOOD FACTS, MADE CLEAR</div>
            <h1>Know your food.<br/><em>Fuel your day.</em></h1>
            <p className="hero-intro">A clearer way to explore the fibre and protein in everyday foods — from Indian home cooking to ingredients from around the world.</p>
            <div className="hero-actions">
              <a href="#calculator" className="button-primary">Explore nutrition <ArrowRight size={17}/></a>
              <a href="#how-it-works" className="button-quiet">How it works <span>↓</span></a>
            </div>
            <div className="trust-points">
              <span><CheckCircle2 size={16}/> Portion-based results</span>
              <span><CheckCircle2 size={16}/> Source-aware data</span>
            </div>
          </div>
          <div className="hero-art" aria-label="Illustration of wholesome food">
            <div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/>
            <div className="art-label label-top">GOOD FOOD, CLEAR FACTS <span>✳</span></div>
            <div className="food-illustration">
              <div className="food-plate">
                <div className="plate-ring"/>
                <div className="leaf-shape leaf-a"/><div className="leaf-shape leaf-b"/><div className="leaf-shape leaf-c"/>
                <div className="tomato tomato-a"/><div className="tomato tomato-b"/>
                <div className="grain grain-a"/><div className="grain grain-b"/><div className="grain grain-c"/>
                <div className="chickpea chickpea-a"/><div className="chickpea chickpea-b"/><div className="chickpea chickpea-c"/>
              </div>
              <div className="art-sticker sticker-one"><Sprout size={20}/><span>FIBRE<br/><b>matters</b></span></div>
              <div className="art-sticker sticker-two"><span>PROTEIN</span><b>power</b></div>
            </div>
            <div className="art-caption">Nourish with knowledge. <span>✦</span></div>
          </div>
        </div>
        <div className="hero-bottom"><span>GOOD TO KNOW, EVERY DAY.</span><span>INDIAN + GLOBAL FOODS <span className="bottom-star">✳</span></span></div>
      </section>

      <section className="calculator-section" id="calculator">
        <div className="section-shell">
          <div className="section-overline">THE NUTRITION FINDER <span>01 / DISCOVER</span></div>
          <FoodFinder />
        </div>
      </section>

      <section className="how-section" id="how-it-works">
        <div className="section-shell">
          <div className="section-overline">SIMPLE BY DESIGN <span>02 / HOW IT WORKS</span></div>
          <div className="section-heading-row">
            <h2>Three steps to<br/><em>food clarity.</em></h2>
            <p>No complicated charts. Just a food, a portion size, and clear nutrition information with its source.</p>
          </div>
          <div className="steps-grid">
            <article className="step-card"><span className="step-number">01</span><div className="step-icon"><BookOpen size={22}/></div><h3>Find your food</h3><p>Search by common food name and choose the record that best matches the item and how it was prepared.</p></article>
            <article className="step-card"><span className="step-number">02</span><div className="step-icon"><Wheat size={22}/></div><h3>Set your portion</h3><p>Enter the weight you ate. The calculator scales nutrient values from the selected record per 100 grams.</p></article>
            <article className="step-card"><span className="step-number">03</span><div className="step-icon"><ShieldCheck size={22}/></div><h3>Understand the result</h3><p>View fibre and protein, check the source record, and remember that food varieties and cooking can affect values.</p></article>
          </div>
        </div>
      </section>

      <section className="guides-section" id="guides">
        <div className="section-shell">
          <div className="section-overline">LEARN A LITTLE MORE <span>03 / FOOD NOTES</span></div>
          <div className="section-heading-row">
            <h2>Better food choices<br/><em>start with facts.</em></h2>
            <p>Practical guides to help you understand nutrition data without making food more complicated than it needs to be.</p>
          </div>
          <div className="guide-grid">
            {guides.map((guide, i) => {
              const Icon = guide.icon;
              return <article className="guide-card" key={guide.href}><div className="guide-card-top"><span>{guide.category}</span><span>0{i+1}</span></div><div className="guide-icon"><Icon size={24}/></div><h3>{guide.title}</h3><p>{guide.desc}</p><Link href={guide.href} className="text-link">Read the guide <ArrowRight size={16}/></Link></article>;
            })}
          </div>
        </div>
      </section>

      <section className="disclaimer-band"><div className="disclaimer-inner"><ShieldCheck size={23}/><div><strong>Nutrition information, with context.</strong><p>Values are estimates based on reference food records, not a laboratory analysis of your specific meal. Use food labels for branded products and consult a qualified professional for personal medical nutrition advice.</p></div><Link href="/methodology">Our methodology <ArrowRight size={16}/></Link></div></section>


    </main>
  );
}
