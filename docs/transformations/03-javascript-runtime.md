# JavaScript Runtime

Snaplet CLI runs Node v14. When run locally the Transformation Functions can import any 3rd party modules, can communicate over the network, and have zero restrictions.

When run in Snaplet Cloud we enable the `SNAPLET_SAFE_MODE` environmental variable and the Transformation Function can only import from `@snaplet/copycat`, are limited to a 10 second runtime, have no network, or disk access.

