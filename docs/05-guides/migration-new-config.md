# New configuration migration guide

## Introduction

In version `0.50.0` we changed the way the configuration is defined. This change was necessary to allow us to add new features to the configuration. Here's a migration guide
to help you adopt the new configuration.

:::warning
The "old" configuration will be removed and no longer working in version `0.60.0` of snaplet. We recommend you to migrate your configuration as soon as possible.
:::

### What's changed?

The new configuration now offer a fully typed experience. This means that you will get type errors if you make a mistake in your configuration. It also means that you will get
intellisense in your IDE when writing your configuration.

This new configuration also deprecate some of the old configuration options. We will cover those in this guide.

### Automatic cloud migration
For our cloud users, we created a migration tool that will attempt to automatically migrate your configuration to the new format. It's available on your project under the `Data Editor` tab.

// TODO: add a screenshot of the webui interface

However, it might have some issues depending of the complexity of your current configuration. We recommend you to read this guide and manually migrate your configuration if you encounter any issue with his usage.

### On local machine
Previously the configurations were splited into several files. Now, everything is grouped in the same file. This means that you will need to move your configuration to the new file.

Previously you would had files like this `.snaplet/transform.ts`, `.snaplet/schema.json`, `.snaplet/structure.d.ts`.

Now you will have only one file for the configuration at the root of your project `snaplet.config.ts`. And one file for the types definition at `.snaplet/snaplet.d.ts`.

### (deprecated) Runtime object definition

In the previous configuration it was possible to do this kind of dynamic transform settings:

```ts
const transform  = ({ structure }) => {
return structure.$schemas.reduce((acc, schema) => ({
    ...acc,
    [schema]: {
    User: ({ row }) => ({
        name: row.name + " the best",
    })
    }
}), {})
}
export default transform
```

This won't work anymore. You will need to define your configuration in a static way. This means that you can't use variables or functions to define your configuration. This is because to provide type-safety we need to know the configuration at compile time. We think it's a good trade-off to have a better developer experience.

### (migrated) Schema exclusion

On the previous configuration the "exclusion" of the schemas and tables was done by setting the value to `false`. In another file. Now, everything is grouped in the same file.
Let's take an example to see what it means.

Before, you would have files like this:

```ts
// .snaplet/schema.json
{
    // exclude the private schema from the capture
    private: false
}
// .snaplet/transform.ts

const config: Transform = () => {
  return {
    pgboss: {
      // exclude the data for all the tables in pgboss schema
      archive: false,
      job: false,
      schedule: false,
      // except for the "version" table
      version: ({row}) => row
    },
    ...
  }
}
```

Now, you will move this configuration to the same file under the "select" property:

```ts
import { defineConfig } from "snaplet";
export default defineConfig({
  select: {
    // Exclude the private schema from the capture
    private: false,
    pgboss: {
      // Exclude the data for all the tables in pgboss schema
      $default: "structure",
      // Except for the "version" table
      version: true,
    }
  },
});
```


As you can see we introduced a new `$default` parameter which allow you to choose if you rather "include" or "exclude" mutiples tables under a schema per default. This was a long requested feature and we are happy to finally introduce it.

For more details, see [exclude](docs/04-references/data-operations/03-exclude.md)

### (migrated) Subset
The subset feature is now available under the "sample" property on the configuration. Nothing change much in it except that the types definition for it are much more precise allowing you to know in advance what you can do with it.

For example this configuration:

```ts
export const subset = {
  enabled: true,
  version: "3",
  targets: [
    {
      table: "public.User",
      percent: 5
    }
  ],
  keepDisconnectedTables: true,
  followNullableRelations: true,
  maxCyclesLoop: 1,
}
```

Will now translate to:

```ts
import { defineConfig } from "snaplet";
export default defineConfig({
  sample: {
    targets: [
      {
        table: "public.User",
        percent: 5
      }
    ],
    keepDisconnectedTables: true,
    followNullableRelations: true,
    maxCyclesLoop: 1,
  },
});
```

If you encounter any issue during your migration, please contact us on our discord server we'll be happy to assist you [Discord](https://app.snaplet.dev/chat).