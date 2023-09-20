# Data operations

Snaplet has four operations for manipulating the data in a snapshot:

- **Transform:** Make existing data suitable for development by transforming the original value into a new one
- **Exclude:** Remove data in specific schemas and tables
- **Subset (Subset):** Capture a subset of data whilst keeping referential integrity intact
- **Generate:** Seed values when you don't have any data

These operations are defined as code via config files and JavaScript functions.
This gives a development team control over the shape of their data, and introduces a _"gitops style workflow"_ for database snapshot management.

In this guide we're going to focus on transforming and excluding data.

## Transforming data

In the previous step Snaplet generated a `snaplet.config.ts` file, where it identified columns that may contain personally identifiable information (PII), and associated a JavaScript function to those columns so that the values in the snapshot are anonymized.

The JavaScript functions are mapped to the structure of your database.
As an example, if you have a `User` table with an `email` column you can transform the original value to a new one with the following:

```typescript
import { defineConfig } from "snaplet";

export default defineConfig({
  transform: {
    public: {
      User: ({ row }) => {
        return {
          // highlight-next-line
          email: 'user_' + row.id + '@example.org',
        };
      },
    },
  },
});
```

The function assigned to `public.User` receives the existing row values in the `row` variable.
Here we used the `id` value to create a new email address value: `"user_1@example.org", "user_2@example.org", etc...`

### Choosing the transform mode

For any columns that you haven't given in your config, Snaplet will instead copy over the values for those columns as is (without transforming them). But what if you wanted to make sure you weren't accidentally passing through any sensitive production data? You can instead tell Snaplet to automatically transform values for columns you haven't given in your config, or alternatively to tell you about any columns you haven't given in your config. You can read more about this in our [transformations reference](/references/data-operations/transform).

### Better fake values with Copycat

Copycat is our open-source library for generating fake-data that includes templates for names, addresses, phone numbers and [many other common transformations!](https://github.com/snaplet/copycat/#api-reference)

It produces _deterministic values,_ so for any given input it'll always produce the exact same output! For example:

```typescript
copycat.email('a-real-email@domain.com'); // => beth.cranshaw@example.org
copycat.email('a-real-email@domain.com'); // => beth.cranshaw@example.org
copycat.email('1'); // => jane.maplemoth@example.org
```

Having predictable, deterministic values is helpful when coding or testing, as your transformed values are always handled consistently.

## Exclude Tables

Databases often have tables that contain loads of machine generated data, like logs, that aren't really necessary or helpful during development.
Since the code doesn't operate against this data, it can be safely excluded.
To do so you can tell the `select` field that you want to only capture the `"structure"` to prevent Snaplet from copying the data.
Snaplet will still create the table's structure but skip the data, speeding up both snapshot capture and restoration.

```typescript
import { defineConfig } from "snaplet";

export default defineConfig({
  select: {
    public: {
      AuditLog: "structure",
    },
  },
});
```

To exclude multiples tables and include only the ones you desire from a specific schema, you can leverage the `$default` parameter.
```typescript
import { defineConfig } from "snaplet";

export default defineConfig({
  select: {
    public: {
      // Will only capture the "structure" of all tables inside the public schema.
      $default: "structure",
      // Except for the table "User" where the data will be captured as well
      User: true,
    },
  },
});
```

## Exclude Schemas

Databases also often have schemas that are used for operations that are isolated from one another. There will be cases where you want to ignore a schema when capturing a snapshot. Associating a false value to a schema in your `snaplet.config.ts` file will prevent Snaplet from copying data.

```typescript
import { defineConfig } from "snaplet";

export default defineConfig({
  select: {
    public: false
  },
});
```

You can also exclude specific tables from the capture process:
```typescript
import { defineConfig } from "snaplet";

export default defineConfig({
  select: {
    public: {
      EventLogs: false,
    },
  },
});
```

## Reduce (Subset)

When creating a representative snapshot of your database to code against, you will typically need to capture only a small portion of the data in that database. Snaplet lets you capture a subset of your data when creating a snapshot, which reduces your snapshot's size and by extension, the time spent uploading and downloading snapshots. This is especially useful if you're connecting directly to a production or staging database that is many GBs in size. For the purpose of this getting started guide, we won't be subsetting your snapshot, but you can read more about subsetting your database snapshots [here](/references/data-operations/reduce).

## Other data operations...

In this chapter we covered transforming and excluding data, but Snaplet can also reduce (subset) and generate data.
Read more about those data operations in our [data operations reference](/references/data-operations/overview).
