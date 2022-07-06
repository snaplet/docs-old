# Data operations

Snaplet 

:::note 

This document is a work in progress.

:::

Snaplet transforms the data in your database via JavaScript callbacks. This "Transformation Function" is associated to the structure of your database. As an example if you have a `Users` table that contains an `email` column you would create the following:

```js
// .snaplet/transform.ts
module.exports = () => {
  return {
    public: {
      Users: () => {
        return {
          // highlight-next-line
          email: "my-new-email@example.org",
        };
      },
    },
  };
};
```

When a snapshot is captured the `email` column is transformed to the value "my-new-email@example.org," which is exactly what we wanted, but you probably want to generate a bunch of emails so the data looks realistic.

That's where `@snaplet/copycat` comes in! It's a library that generates deterministic fake values: By supplying an input _(the original email address),_ copycat returns a static value (a fake email address). As long as the input remains the same, the output will remain the same.

Example:

```js
// .snaplet/transform.ts
const { copycat } = require("@snaplet/copycat");

module.exports = () => {
  return {
    public: {
      // highlight-next-line
      Users: ({ row }) => {
        return {
          // highlight-next-line
          email: copycat.email(row.email), // zakary.block356@gmail.com
        };
      },
    },
  };
};
```

Each Transformation Function receives a `row` object that contains the original row's values, this allows you to perform conditional transformations, mutate a JSON object, or create deterministic faker values.

```js
// .snaplet/transform.ts
const { copycat } = require("@snaplet/copycat");

module.exports = () => {
  return {
    public: {
      Users: ({ row }) => {
        // Transform our user's data, not our developer's data.
        // highlight-next-line
        if (row.role !== "SUPERUSER") {
          return {
            name: copcat.fullName(row.name),
            email: copycat.email(row.email),
            password: copycat.password(row.password),
          };
        }
      },
    },
  };
};
```

Copycat is open-source and has templates for names, addresses, phone numbers and [many other common transformations!](https://github.com/snaplet/copycat/#api-reference)

## Getting started

We believe that a good developer experience is when developer's are in flow, so it's our goal to "work where you work" by providing programatic primitives for transforming the data in your database, and integrating those with your development worflow.

<div style={{textAlign: 'center'}}>

![Be one with the database!](/img/snappy-flow.svg)

</div>

To transform the data in your database Snaplet needs two things:
1. A connection URL to the database that you want to transform (This can be your development database).
2. A `.snaplet/transform.ts` file.


### Setup: Generating transformation files

Run `snaplet config setup` at the root of your codebase (in your git repo), so that the configuration and transformations files are shared with the rest of your team.

```bash
✔ Connection string … postgresql://localhost/snaplet_development
✔ Database connection: Testing...
✔ Project file config.json: Creating...
✔ Database connection: Testing...
✔ Database structure: Instrospecting...
✔ Project file transformations.d.ts: Creating...
✔ Project file transformations.js: Creating...
```

The first thing Snaplet needs is a **connection string to your database**, we use this to **introspect your database** and make **transformation suggestions** for columns that could contain personally identifiable information.

Regenerate these files with `snaplet config generate --type=typedef,transformations`

You can add the `.snaplet/transformations.d.ts` and `.snaplet/snapshots` to your `.gitignore` configuration.

:::tip

A user account is _not required_, you only need a user account if you want to share snapshots with your team.

:::

### Validation: Testing Transformation Functions

Snaplet Proxy is "live reload" for your Transformation Functions. It runs between your database and database client whilst applying transformations to the data.

```terminal
snaplet proxy
Listening on postgresql://localhost:2345...
```

You'll be able to connect to `postgresql://localhost:2345`, where each query is passed along to your database, but the response is transformed in realtime via Transformation Functions. 

## JavaScript Runtime

Snaplet CLI runs Node v14. When run locally the Transformation Functions can import any 3rd party modules, can communicate over the network, and have zero restrictions.

When run in Snaplet Cloud we enable the `SNAPLET_SAFE_MODE` environmental variable and the Transformation Function can only import from `@snaplet/copycat`, are limited to a 10 second runtime, have no network, or disk access.

