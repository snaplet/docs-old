import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Safe & secure',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Easily identify and transform sensitive user data.
        Only authenticated team members can restore snapshots.
      </>
    ),
  },
  {
    title: 'Custom anonymized data',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Exclude trivial tables and define exactly how to
        de-identify personally identifiable information.
      </>
    ),
  },
  {
    title: 'Fast, tiny downloads',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Restore only essential tables as and when needed
        to create snapshots in just a few minutes.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
