# Data operations

:::info 

This document is a work in progress.

:::

Snaplet has four operations for manipulating the data in a snapshot:

- **Transform:** Make existing data suitable for development by transforming the original value into a new one
- **Exclude:** Remove data in specific tables
- **Subset (Subset):** Capture a subset of data whilst keeping referential integrity intact
- **Generate:** Seed values when you don't have any data

These operations are defined as code via config files and JavaScript functions.
This gives a development team control over the shape of their data, and introduces a _"gitops style workflow"_ for database snapshot management.

---

## JavaScript Runtime

Snaplet CLI runs Node v14. When run locally the Transformation Functions can import any 3rd party modules, can communicate over the network, and have zero restrictions.

When run in Snaplet Cloud we enable the `SNAPLET_SAFE_MODE` environmental variable and the Transformation Function can only import from `@snaplet/copycat`, are limited to a 10 second runtime, have no network, or disk access.

