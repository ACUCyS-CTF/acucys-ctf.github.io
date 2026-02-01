import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import Heading from "@theme/Heading";
import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Australian Council of University Cyber Societies (ACUCyS)
          Documentation
        </Heading>
        <p className="hero__subtitle">
          A student-led national network of university cyber societies, building
          a more connected, inclusive, and capable cyber security community
          across Australia.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/ctf/intro"
          >
            Explore CTF write-ups
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      title="Australian Council of University Cyber Societies"
      description="ACUCyS unifies and represents university cyber security student societies across Australia, enabling collaboration, professional development, and advocacy."
    >
      <HomepageHeader />
      <main>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.overview}>
              <Heading as="h2" className={styles.sectionTitle}>
                Overview
              </Heading>
              <p className={styles.sectionLead}>
                This site provides a focused collection of technical write-ups
                and resources maintained by the Australian Council of University
                Cyber Societies (ACUCyS).
              </p>
              <div className={styles.overviewActions}>
                <Link
                  className="button button--secondary button--lg"
                  href="https://www.acucys.org/"
                >
                  Visit acucys.org
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
