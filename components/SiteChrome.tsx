import Link from "next/link";
import { ArrowUpRight, Leaf } from "lucide-react";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return <>
    <header className="site-header">
      <div className="nav-shell">
        <Link className="brand" href="/" aria-label="NutriLens home"><span className="brand-mark"><Leaf size={21}/></span><span>nutri<span>lens</span></span></Link>
        <nav className="main-nav" aria-label="Main navigation">
          <Link href="/#calculator">Nutrition calculator</Link>
          <Link href="/#guides">Food guides</Link>
          <Link href="/methodology">Our data</Link>
        </nav>
        <Link href="/about" className="nav-cta">About NutriLens <ArrowUpRight size={15}/></Link>
      </div>
    </header>
    {children}
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand"><Link className="brand" href="/"><span className="brand-mark"><Leaf size={21}/></span><span>nutri<span>lens</span></span></Link><p>Food facts that fit real life.<br/>A growing guide to fibre and protein.</p></div>
        <div className="footer-links">
          <div><strong>Explore</strong><Link href="/#calculator">Nutrition calculator</Link><Link href="/#guides">Food guides</Link><Link href="/methodology">Data methodology</Link></div>
          <div><strong>About</strong><Link href="/about">About us</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy policy</Link><Link href="/terms">Terms of use</Link></div>
        </div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} NutriLens. All rights reserved.</span><span>Made for curious eaters. <span className="bottom-star">✳</span></span></div>
    </footer>
  </>;
}
