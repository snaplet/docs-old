# Data operations

:::info 

This document is a work in progress.

:::

Snaplet uses configuration as code in order to modify the table data in your database.
Currently we support four operations:

1. Transform: Replace an existing column value with another
2. Reduce (Subset): Copy, and transform, a subset of data based on a criteria whilst maintaining relational integrity
3. Generate (Seed): Generate relational data

These operations can be mixed and matched in order to support your particular use-case.

---

## JavaScript Runtime

Snaplet CLI runs Node v14. When run locally the Transformation Functions can import any 3rd party modules, can communicate over the network, and have zero restrictions.

When run in Snaplet Cloud we enable the `SNAPLET_SAFE_MODE` environmental variable and the Transformation Function can only import from `@snaplet/copycat`, are limited to a 10 second runtime, have no network, or disk access.

