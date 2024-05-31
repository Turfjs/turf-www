import { useState } from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import HomepageMap from "@site/src/components/HomepageMap";

import Heading from "@theme/Heading";
import styles from "./index.module.css";
import BrowserOnly from "@docusaurus/BrowserOnly";

import "@shoelace-style/shoelace/dist/themes/light.css";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path";

setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.15.0/cdn/",
);

import SlRadioButton from "@shoelace-style/shoelace/dist/react/radio-button";
import SlRadioGroup from "@shoelace-style/shoelace/dist/react/radio-group";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  const [turfFunction, setTurfFunction] = useState("tin");

  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>

        <div className={styles.homepageMap}>
          <BrowserOnly>
            {() => <HomepageMap turfFunction={turfFunction} />}
          </BrowserOnly>
        </div>

        <div className="sl-theme-dark">
          <SlRadioGroup
            className="turf-functions"
            value={turfFunction}
            onSlChange={(event) => setTurfFunction(event.target.value)}
          >
            <SlRadioButton value="tin">Tin</SlRadioButton>
            <SlRadioButton value="buffer">Buffer</SlRadioButton>
            <SlRadioButton value="bezier">Bezier</SlRadioButton>
            <SlRadioButton value="voronoi">Voronoi</SlRadioButton>
          </SlRadioGroup>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
