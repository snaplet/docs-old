# Transform data

Snaplet transforms the data in your database via JavaScript callbacks. This "Transformation Function" is associated to the structure of your database. As an example if you have a `Users` table that contains an `email` column you would create the following:

```ts
// .snaplet/transform.ts
import { copycat } from "@snaplet/copycat";
import type { Transform } from "./structure";

const config: Transform = () => ({
  public: {
    Users() {
      return {
        // highlight-next-line
        email: "my-new-email@example.org",
      };
    },
  },
});

export default config;
```

When a snapshot is captured the `email` column is transformed to the value `"my-new-email@example.org,"` which is exactly what we wanted, but you probably want to generate a bunch of emails so the data looks realistic.

That's where [`@snaplet/copycat`](https://github.com/snaplet/copycat) comes in! It's a library that generates deterministic fake values: by supplying an input _(the original email address),_ copycat returns a static value (a fake email address). As long as the input remains the same, the output will remain the same.

Example:

```ts
// .snaplet/transform.ts
import { copycat } from "@snaplet/copycat";
import type { Transform } from "./structure";

const config: Transform = () => ({
  public: {
    Users({ row }) {
      return {
        // highlight-next-line
        email: copycat.email(row.email), // zakary.block356@gmail.com
      };
    },
  },
});

export default config;
```

Each Transformation Function receives a `row` object that contains the original row's values, this allows you to perform conditional transformations, mutate a JSON object, or create deterministic faker values.

```js
// .snaplet/transform.ts
import { copycat } from "@snaplet/copycat";
import type { Transform } from "./structure";

const config: Transform = () => ({
  public: {
    Users({ row }) {
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
});

export default config;
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

### Dealing with character limits

One challenge when it comes to replacing data, is that some character varying (`varchar`) columns have a defined maximum character length.

For example, lets say you had an `address` column with the type `varchar(16)`. Simply using `copycat.postalAddress()` for this column would not always work, since copycat might give back an address that is longer than 16 characters.

In these cases, [`copycat.scramble`](https://github.com/snaplet/copycat#copycatscramblestring-options) might be more helpful for you: it transforms each character in the string, but preserves the string's length. Since the original value is less than the character limit, the transformed result will also be.

```ts
// .snaplet/transform.ts
import { copycat } from "@snaplet/copycat";
import type { Transform } from "./structure";

const config: Transform = () => ({
  public: {
    Users({ row }) {
      return {
        // highlight-next-line
        address: copycat.scramble(row.address, {
          preserve: [",", " "],
        }), // '741 Hazle Forks, Carmel 8164, Dominica' => 'tqynqduk@qjlrftv.fig'
      };
    },
  },
});

export default config;
```

Snaplet will also account for character limits this way when generating an example `transform.ts` config for you: if Snaplet sees a column containing PII that has a character limit, the example `transform.ts` config we generate for you will instead make use of [`copycat.scramble`](https://github.com/snaplet/copycat#copycatscramblestring-options) for that column.
