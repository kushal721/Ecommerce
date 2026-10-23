import { useState } from "react";
import { Link } from "react-router";
import Icon from "../components/Icon";
import Price from "../components/Price";
import ProductGrid from "../components/ProductGrid";
import Reveal from "../components/Reveal";
import { DEPARTMENTS, filterProducts, pickProducts, productsIn } from "../lib/catalog";
import { useDocumentTitle } from "../lib/hooks";
import { useStore } from "../store/StoreProvider";

const HERO = pickProducts(["strawberry", "carbon-steel-wok", "honey-jar", "plant-pot"]);
const SPOTLIGHT = pickProducts(["carbon-steel-wok"])[0];
const KITCHEN_PICKS = pickProducts(["knife", "chopping-board", "pan", "wooden-rolling-pin"]);
const ON_OFFER = filterProducts({ sort: "discount" }).slice(0, 8);

const STEPS = [
  ["Order by 9pm", "Anything in the bag before nine goes on the next morning's van."],
  ["Packed at 6am", "Fresh food is picked and packed the morning it leaves, cold items in insulated liners."],
  ["At your door by noon", "We text a one hour window when the van sets off, and again when it is two stops away."],
  ["Something wrong? Tell us", "Bruised, broken or missing items are refunded the same day. No photos, no forms."],
];

export default function Home() {
  useDocumentTitle();
  return (
    <>
      <Hero />
      <Aisles />

      <section className="page section">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">On offer this week</p>
            <h2>Marked down, still good</h2>
          </div>
          <Link to="/shop?sort=discount" className="text-link">
            See every offer
          </Link>
        </Reveal>
        <ProductGrid products={ON_OFFER} />
      </section>

      <PromoBand />
      <Spotlight />

      <section className="page section steps">
        <Reveal className="steps-head">
          <p className="eyebrow">Delivery</p>
          <h2>How an order gets to you</h2>
        </Reveal>
        <ol className="steps-list">
          {STEPS.map(([title, body], index) => (
            <Reveal as="li" key={title} delay={index * 60}>
              <span className="steps-num">{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </Reveal>
          ))}
        </ol>
      </section>
    </>
  );
}

function Hero() {
  return (
    <section className="page hero">
      <div className="hero-copy">
        <p className="eyebrow hero-in" style={{ "--i": 0 }}>
          Groceries and kitchen goods, delivered
        </p>
        <h1 className="hero-in" style={{ "--i": 1 }}>
          The weekly shop, <em>minus</em> the aisles.
        </h1>
        <p className="hero-lede hero-in" style={{ "--i": 2 }}>
          Sixty two things we would buy ourselves, from this week's strawberries to a carbon steel
          wok that will outlive the kitchen.
        </p>
        <div className="hero-ctas hero-in" style={{ "--i": 3 }}>
          <Link to="/shop" className="btn btn-primary">
            Shop everything
          </Link>
          <Link to="/shop/fresh" className="btn btn-outline">
            Browse Fresh
          </Link>
        </div>
        <p className="hero-note hero-in" style={{ "--i": 4 }}>
          <Icon name="clock" size={18} />
          Order by 9pm for delivery tomorrow morning
        </p>
      </div>

      <div className="hero-collage">
        {HERO.map((product, index) => (
          <Link
            key={product.slug}
            to={`/product/${product.slug}`}
            className={`hero-tile hero-tile-${index + 1} tint-${product.department}`}
            style={{ "--i": index + 2 }}
          >
            <img src={product.images[0]} alt={product.title} width="500" height="500" />
            <span className="hero-tag">
              {product.title}
              <Price product={product} size="s" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Aisles() {
  return (
    <section className="page section">
      <Reveal className="section-head">
        <div>
          <p className="eyebrow">Four aisles</p>
          <h2>Where would you like to start?</h2>
        </div>
      </Reveal>
      <ol className="aisles">
        {DEPARTMENTS.map((department, index) => {
          const items = productsIn(department.id);
          return (
            <Reveal as="li" key={department.id} delay={index * 50}>
              <Link to={`/shop/${department.id}`} className={`aisle aisle-${department.id}`}>
                <span className="aisle-num">{String(index + 1).padStart(2, "0")}</span>
                <span className="aisle-name">{department.name}</span>
                <span className="aisle-blurb">{department.blurb}</span>
                <span className="aisle-thumbs" aria-hidden="true">
                  {items.slice(0, 3).map((p) => (
                    <img key={p.slug} src={p.thumbnail} alt="" loading="lazy" />
                  ))}
                </span>
                <span className="aisle-count">{items.length} items</span>
              </Link>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}

function PromoBand() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText("FIRST20");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the code is printed on the button anyway.
    }
  };

  return (
    <section className="promo">
      <div className="page promo-inner">
        <Reveal>
          <p className="eyebrow">First order</p>
          <h2>$20 off when you spend $60 or more.</h2>
        </Reveal>
        <Reveal className="promo-code" delay={80}>
          <p>Use this code at checkout:</p>
          <button type="button" className="code-chip" onClick={copy}>
            <span>FIRST20</span>
            <span className="code-chip-action">
              <Icon name={copied ? "check" : "copy"} size={18} />
              {copied ? "Copied" : "Copy"}
            </span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}

function Spotlight() {
  const { addToCart } = useStore();
  return (
    <section className="page section spotlight">
      <Reveal className={`spotlight-media tint-${SPOTLIGHT.department}`}>
        <img src={SPOTLIGHT.images[0]} alt={SPOTLIGHT.title} loading="lazy" />
        <Link to={`/product/${SPOTLIGHT.slug}`} className="spotlight-tag">
          {SPOTLIGHT.title}
          <Price product={SPOTLIGHT} size="s" />
        </Link>
      </Reveal>
      <div className="spotlight-copy">
        <Reveal>
          <p className="eyebrow">From the Kitchen aisle</p>
          <h2>Tools for people who cook most nights</h2>
          <p className="spotlight-lede">
            Nothing here needs a manual. A sharp knife, a board that will not slide, a pan that takes
            the heat. Season the wok once and it gets better with every stir fry.
          </p>
        </Reveal>
        <ul className="mini-list">
          {KITCHEN_PICKS.map((product, index) => (
            <Reveal as="li" key={product.slug} delay={index * 50}>
              <Link to={`/product/${product.slug}`} className={`mini-thumb tint-${product.department}`}>
                <img src={product.thumbnail} alt="" loading="lazy" />
              </Link>
              <Link to={`/product/${product.slug}`} className="mini-name">
                {product.title}
              </Link>
              <Price product={product} size="s" />
              <button
                type="button"
                className="btn btn-quiet"
                onClick={() => addToCart(product.slug)}
                aria-label={`Add ${product.title} to bag`}
              >
                <Icon name="plus" size={16} /> Add
              </button>
            </Reveal>
          ))}
        </ul>
        <Link to="/shop/kitchen" className="text-link">
          Everything in Kitchen
        </Link>
      </div>
    </section>
  );
}
