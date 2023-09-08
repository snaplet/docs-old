# Introspect

:::note Experimental

This is a preview feature. We would love your [feedback!](https://discord.gg/UvCJq68jSv)

:::

## Overview

To capture a snapshot and perform operations on it, Snaplet requires knowledge of your database structure, a process known as introspection. Introspection leverages database constraints (such as foreign keys and primary keys) to comprehend your data's structure.

While this automatic approach is generally reliable, there can be exceptions. Hence, we offer a way to manually configure the introspection process.

## Configurable Features

### Virtual Foreign Keys

Snaplet will automatically identify foreign keys in your database to determine the data structure. However, you may want to define "virtual" foreign keys, which are not enforced by the database but are acknowledged by Snaplet because they are enforced at the application level.

To configure this, use the virtualForeignKeys configuration option. Below is an example:

```typescript
import { defineConfig } from "snaplet";

export default defineConfig({
  introspection: {
    virtualForeignKeys: [
      // Define a simple foreign key relationship between two tables
      {
        fkTable: "public.User",
        targetTable: "public.Organization",
        keys: [
          {
            fkColumn: "organizationId",   // Column name in the User table
            targetColumn: "id",           // Column name in the Organization table
          }
        ]
      },
      // Virtual foreign keys can also support composite FKs
      {
        fkTable: "public.User",
        targetTable: "public.Member",
        keys: [
          {
            fkColumn: "organizationId",
            targetColumn: "id",
          },
          {
            fkColumn: "id",
            targetColumn: "userId",
          }
        ]
      },
      // Support for cross-schema virtual foreign keys
      {
        fkTable: "public.User",
        targetTable: "other.Extra",
        keys: [
          {
            fkColumn: "extraId",
            targetColumn: "id",
          }
        ]
      }
    ]
  }
})
```

This code snippet establishes virtual foreign key relationships between the tables `User`, `Organization`, `Member`, and `Extra`. These relationships are application-level and are communicated to Snaplet for its operations.

:::note Limitations of usage for now

As for now the `virtualForeignKeys` are only used during the [subsetting](docs/04-references/data-operations/04-reduce.md) operations.
This might get extended to other operations (like [generate](docs/04-references/data-operations/05-generate.md)) in the future.

:::