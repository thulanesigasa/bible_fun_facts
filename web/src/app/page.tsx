import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AppPreview, PhoneTrio } from "@/components/AppPreview";
import { WaitlistForm } from "@/components/WaitlistForm";
import "./coming-soon.css";

export const metadata: Metadata = {
  title: { absolute: "Coming Soon — Scripture has depths. | exégeomai" },
  description:
    "Meet exégeomai, the upcoming Bible study app. Explore Scripture, biblical languages and fascinating biblical facts. Join the waiting list for launch news.",
  alternates: { canonical: "https://exegeomai.app" },
};
const features = [
  [
    "01",
    "Scripture, with context.",
    "Explore Bible passages with room to slow down, reflect and follow the meaning beyond a single verse.",
    "Read",
  ],
  [
    "02",
    "Go back to the words.",
    "Discover Greek and Hebrew words with Strong’s concordance, definitions and pronunciation guides.",
    "Understand",
  ],
  [
    "03",
    "A little discovery. Every day.",
    "Meet the people, places and surprising connections that bring the world of the Bible closer.",
    "Discover",
  ],
  [
    "04",
    "Keep what speaks to you.",
    "Return to saved discoveries and build a personal rhythm of study, one passage at a time.",
    "Grow",
  ],
];
const faqs = [
  [
    "What is exégeomai?",
    "exégeomai is an upcoming Bible study mobile application for believers who want to explore Scripture, biblical languages and biblical facts in one thoughtful experience.",
  ],
  [
    "What does the name mean?",
    "The name comes from the Greek verb ἐξηγέομαι: to explain, recount or make known. It is the word behind “exegesis” — carefully drawing meaning from a text.",
  ],
  [
    "When will the app launch?",
    "We are preparing for the public launch. There is no confirmed release date yet. Join the waiting list and we will let you know when there is launch news to share.",
  ],
  [
    "Will it be available for my phone?",
    "Platform availability and supported devices will be confirmed at launch. Joining the list is the easiest way to hear the details.",
  ],
  [
    "Does joining the list create an app account?",
    "No. The waiting list is separate from app accounts. We only ask for an email address and your consent to receive launch notifications.",
  ],
  [
    "How do I leave the waiting list?",
    "Email support@exegeomai.app from the address you registered, with “Unsubscribe from waitlist” as the subject. The team will remove your waitlist record. Joining does not subscribe you to other marketing.",
  ],
];
export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main" className="launch-page">
        <section className="launch-hero" id="home" aria-labelledby="hero-title">
          {/* Decorative architectural background lines & geometric floating rings */}
          <div className="hero-grid-lines" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="launch-orbit" aria-hidden="true" />
          <div className="hero-deco-ring hero-deco-ring-1" aria-hidden="true" />
          <div className="hero-deco-ring hero-deco-ring-2" aria-hidden="true" />
          <div className="hero-deco-circle hero-deco-circle-1" aria-hidden="true" />
          <div className="hero-deco-circle hero-deco-circle-2" aria-hidden="true" />
          <div className="hero-deco-square" aria-hidden="true" />
          <div className="launch-wrap hero-copy">
            <p className="launch-eyebrow">
              <span className="status-dot" /> COMING SOON
            </p>
            <h1 id="hero-title">
              Scripture has depths.
              <br />
              <span>Get ready to discover them.</span>
            </h1>
            <p className="hero-description">
              Introducing <strong>exégeomai</strong> — a Bible study experience
              designed to help believers go deeper into Scripture, explore
              biblical languages, discover fascinating biblical facts and grow
              in understanding.
            </p>
            <div className="launch-actions">
              <a className="launch-button gold" href="#waitlist">
                Join the Waiting List <span aria-hidden="true">↗</span>
              </a>
              <a className="launch-button outline" href="#features">
                Explore What&apos;s Coming <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className="hero-small">
              A deeper understanding starts with curiosity.
            </p>
          </div>
          <PhoneTrio />
          <div className="hero-caption">
            <span>READ WITH PURPOSE</span>
            <span>EXPLORE THE ORIGINAL</span>
            <span>GROW IN UNDERSTANDING</span>
          </div>
        </section>
        <section className="launch-section launch-wrap meet-grid" id="about">
          <div>
            <p className="launch-kicker">01 / MEET EXÉGEOMAI</p>
            <h2>
              An ancient Word.
              <br />A fresh sense of wonder.
            </h2>
          </div>
          <div className="meet-copy">
            <p>
              There is always more to discover in Scripture. A word you have
              read a hundred times. A story seen in its historical setting. A
              connection you had never noticed.
            </p>
            <p>
              We are building exégeomai to make those moments part of your
              everyday study — bringing careful exploration and personal
              reflection together.
            </p>
            <a className="launch-text-link" href="#sneak-peek">
              Take a look inside <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
        <section className="why-section" aria-labelledby="why-title">
          <div className="launch-wrap why-grid">
            <div>
              <p className="launch-kicker">WHY EXÉGEOMAI?</p>
              <h2 id="why-title">
                More than reading.
                <br />
                <span>Understanding.</span>
              </h2>
              <p>
                For the question that makes you pause.
                <br />
                For the word that invites a closer look.
                <br />
                For a faith that keeps growing.
              </p>
            </div>
            <div className="word-study">
              <div className="word-meta">
                <span>THE WORD BEHIND THE NAME</span>
                <span>G1834</span>
              </div>
              <p lang="el" className="greek-word">
                ἐξηγέομαι
              </p>
              <p className="word-pronunciation">exēgeomai · verb</p>
              <hr />
              <p className="word-meaning">
                To explain.
                <br />
                To make known.
                <br />
                <em>To unfold.</em>
              </p>
              <span className="word-footnote">
                A closer look can open a whole new understanding.
              </span>
            </div>
          </div>
        </section>
        <section className="launch-section launch-wrap" id="sneak-peek">
          <div className="launch-section-heading">
            <div>
              <p className="launch-kicker">02 / A LOOK INSIDE</p>
              <h2>
                A little glimpse.
                <br />A deeper journey.
              </h2>
            </div>
            <p>
              Scripture, discoveries and original words.
              <br />
              Explore a preview of what we&apos;re building.
            </p>
          </div>
          <AppPreview />
        </section>
        <section className="features-section" id="features">
          <div className="launch-wrap">
            <p className="launch-kicker">03 / COMING TO THE APP</p>
            <h2>
              Tools for a more
              <br />
              thoughtful study.
            </h2>
            <div className="launch-feature-grid">
              {features.map(([number, title, copy, tag]) => (
                <article className="launch-feature" key={number}>
                  <div className="feature-top">
                    <span>{number}</span>
                    <span>{tag}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
            <p className="launch-note">
              A preview of our direction. Features and availability may evolve
              before launch.
            </p>
          </div>
        </section>
        <section className="launch-section launch-wrap" id="how-it-works">
          <div className="launch-section-heading">
            <div>
              <p className="launch-kicker">04 / HOW IT WILL WORK</p>
              <h2>
                Start with a verse.
                <br />
                See where it leads.
              </h2>
            </div>
            <p>
              Designed for your quiet moments,
              <br />
              your questions and your everyday life.
            </p>
          </div>
          <ol className="launch-steps">
            <li>
              <span>01</span>
              <h3>Open the Word</h3>
              <p>
                Choose a passage or begin with a biblical discovery that sparks
                your curiosity.
              </p>
            </li>
            <li>
              <span>02</span>
              <h3>Look a little closer</h3>
              <p>
                Explore original words and context to deepen your understanding
                of what you read.
              </p>
            </li>
            <li>
              <span>03</span>
              <h3>Carry it with you</h3>
              <p>
                Save discoveries, revisit what you learn and make space for a
                regular study rhythm.
              </p>
            </li>
          </ol>
        </section>
        <section className="launch-wrap privacy-panel">
          <div className="privacy-symbol" aria-hidden="true">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            >
              <path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6z" />
              <path d="m8 12 3 3 5-6" />
            </svg>
          </div>
          <div>
            <p className="launch-kicker">PRIVACY &amp; SECURITY</p>
            <h2>
              Your curiosity is welcome.
              <br />
              Your privacy matters.
            </h2>
            <p>
              The waiting list asks for your email, not an app account. Your
              address is kept in a restricted database and used for the launch
              notifications you consent to receive.
            </p>
            <a href="/waitlist-privacy" className="launch-text-link">
              How we handle waitlist data <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
        <span id="download" aria-hidden="true" />
        <section className="waitlist-section" id="waitlist">
          <div className="launch-wrap waitlist-grid">
            <div>
              <p className="launch-eyebrow">
                <span className="status-dot" /> BE THERE AT THE BEGINNING
              </p>
              <h2>
                Something deeper
                <br />
                is coming.
              </h2>
              <p>
                Join the waiting list.
                <br />
                Be first to hear when exégeomai is ready.
              </p>
              <span className="waitlist-aside">
                No account needed. Just a little anticipation.
              </span>
            </div>
            <WaitlistForm />
          </div>
        </section>
        <section className="launch-section launch-wrap faq-grid" id="faq">
          <div>
            <p className="launch-kicker">A FEW THINGS TO KNOW</p>
            <h2>
              Good questions.
              <br />
              Clear answers.
            </h2>
            <p>Something else on your mind?</p>
            <a className="launch-text-link" href="/support">
              Talk to us <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="launch-faqs">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
