# Transform data

Snaplet supports transforming the data in your database before capturing it as a snapshot. It can do this transformation for you, or let you define how your data should be transformed.

Defining these data transformations is done via JavaScript callbacks. This "Transformation Function" is associated to the structure of your database. As an example if you have a `Users` table that contains an `email` column you would create the following:

```ts
// .snaplet/transform.ts
import { copycat } from '@snaplet/copycat';
import type { Transform } from './structure';

export const config: Transform = () => ({
  public: {
    Users() {
      return {
        // highlight-next-line
        email: 'my-new-email@example.org',
      };
    },
  },
});
```

When a snapshot is captured the `email` column is transformed to the value `"my-new-email@example.org,"` which is exactly what we wanted, but you probably want to generate a bunch of emails so the data looks realistic.

That's where [`@snaplet/copycat`](https://github.com/snaplet/copycat) comes in! It's a library that generates deterministic fake values: by supplying an input _(the original email address),_ copycat returns a static value (a fake email address). As long as the input remains the same, the output will remain the same.

Example:

```ts
// .snaplet/transform.ts
import { copycat } from '@snaplet/copycat';
import type { Transform } from './structure';

export const config: Transform = () => ({
  public: {
    Users({ row }) {
      return {
        // highlight-next-line
        email: copycat.email(row.email), // zakary.block356@gmail.com
      };
    },
  },
});
```

Each Transformation Function receives a `row` object that contains the original row's values, this allows you to perform conditional transformations, mutate a JSON object, or create deterministic faker values.

```js
// .snaplet/transform.ts
import { copycat } from '@snaplet/copycat';
import type { Transform } from './structure';

export const config: Transform = () => ({
  public: {
    Users({ row }) {
      // Transform our user's data, not our developer's data.
      // highlight-next-line
      if (row.role !== 'SUPERUSER') {
        return {
          name: copcat.fullName(row.name),
          email: copycat.email(row.email),
          password: copycat.password(row.password),
        };
      }
    },
  },
});
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

## Choosing the transform mode

The transformations you define in your config tell Snaplet how to transform your database data for the corresponding columns, but you might've noticed that Snaplet doesn't require you to specify each and every column, table and schema that is in your database. What Snaplet does for any values for columns that have not been given in the config depends on the _transform mode_:

- **`unsafe`** (default): The data for columns not specified in the config is simply copied over as is without transformation
- **`strict`**: Fail the capture if any columns, tables or schemas have not been specified in the config
- **`auto'`**: Automatically transform the data for any columns, tables or schemas that have not been specified in the config

### Changing the mode

For Snaplet Cloud, you can choose the transform mode within your config by specifying `mode` under `$options`:

```js
// .snaplet/transform.ts
import { copycat } from '@snaplet/copycat';
import type { Transform } from './structure';

export const config: Transform = () => ({
  $options: {
    mode: 'auto',
  },
});
```

If you're capturing your snapshots locally with `snaplet snapshot capture`, you can also choose the transform mode using your config (located at `.snaplet/transform.ts`) the same way as above. Alternatively, you can use the `--transform-mode` CLI option:

```
snaplet snapshot capture --transform-mode=auto

# or the shorthand form:
snaplet snapshot capture -t auto
```

If the option is given both via the config and with a CLI option, the option given in the config takes precendece.

### `unsafe` mode

`unsafe` mode copies over values without any transformation. If a transformation is given for a column in the config, the transformation will be used instead.

Lets say you have a `User` table with the columns `id`, `name` and `email`, with the original data in your production database looking like this:

```
| id | name             |    email          |
| -- | ---------------- | ------------------|
| 1  | Susan Altenwerth | susan@example.org |
| 2  | Frank Collier    | frank@example.org |
```

Then lets say your config looked like this:

```ts
export const config = () => ({
  $options: {
    mode: 'unsafe',
  },
  public: {
    User: ({ row }) => {
      email: 'user_' + row.id + '@example.org',
    },
  },
});
```

In this case, a transformation was given in the config for `email`, but not for `name` or `id`. The chosen mode is `unsafe` mode, so `name` and `id` are copied over as is, and the transformation in the config is used for `email`. The resulting snapshot would have data that looks something like this:

```
| id | name             |    email           |
| -- | ---------------- | ------------------ |
| 1  | Susan Altenwerth | user_1@example.org |
| 2  | Frank Collier    | user_2@example.org |
```

### `strict` mode

In `strict` mode, Snaplet expects a transformation to be given in the config for every column in the database. If any columns have not been provided in the config, Snaplet will not capture the snapshot, but instead tell you which columns, tables, or schemas have not been given.

Using the same example as above, lets say you have a `User` table with the columns `id`, `name` and `email`, with the original data in your production database looking like this:

```
| id | name             |    email          |
| -- | ---------------- | ------------------|
| 1  | Susan Altenwerth | susan@example.org |
| 2  | Frank Collier    | frank@example.org |
```

Then lets keep the config the same, except now choose `strict` mode:

```ts
export const config = () => ({
  $options: {
    mode: 'strict',
  },
  public: {
    User: ({ row }) => {
      email: 'user_' + row.id + '@example.org',
    },
  },
});
```

In this case, a transformation was given in the config for `email`, but not for `name` or `id`. The chosen mode is `strict` mode, so Snaplet will not capture the snapshot, but instead tell you that `name` is missing:

```
The following schemas, tables or columns are missing from your transform config. ...
* Columns: "public"."User"."name"
```

You'll notice that Snaplet said nothing about `id`: In `strict` mode, Snaplet will still copy across data for primary and foreign key columns as is.

To allow a snapshot to be created, lets add a `name` column to the config:

```ts
export const config = () => ({
  $options: {
    mode: 'strict',
  },
  public: {
    User: ({ row }) => {
      email: 'user_' + row.id + '@example.org',
      name: `User ${row.id}
    },
  },
});
```

Snaplet now has everything it needs to create a snapshot in strict mode. The resulting data in the snapshot will look something like this:

```
| id | name             |    email           |
| -- | ---------------- | ------------------ |
| 1  | User 1           | user_1@example.org |
| 2  | User 2           | user_2@example.org |
```

### `auto` mode

In `auto` mode, if there are any columns not given in the config, Snaplet will try to automitically transform them.

Using the same example as above, lets say you have a `User` table with the columns `id`, `name` and `email`, with the original data in your production database looking like this:

```
| id | name             |    email          |
| -- | ---------------- | ------------------|
| 1  | Susan Altenwerth | susan@example.org |
| 2  | Frank Collier    | frank@example.org |
```

Then lets keep the config the same, except now choose `auto` mode:

```ts
export const config = () => ({
  $options: {
    mode: 'auto',
  },
  public: {
    User: ({ row }) => {
      email: 'user_' + row.id + '@example.org',
    },
  },
});
```

In this case, a transformation was given in the config for `email`, but not for `name` or `id`. The chosen mode is `auto` mode, so Snaplet will use the transformation given for `email`, but transform data for `name` automatically. Data for `id` will be copied over as is - in `auto` mode, Snaplet does not do any transformations of its own to primary or foreign key columns.

The resulting data in the snapshot will look something like this:

```
| id | name             |    email           |
| -- | ---------------- | ------------------ |
| 1  | Oyhbz Bxctktpard | user_1@example.org |
| 2  | Csdif Xloqvvh    | user_2@example.org |
```

You could even provide no transformations at all for the columns in `User`:

```ts
export const config = () => ({
  $options: {
    mode: 'auto',
  },
});
```

In which case, resulting data in the snapshot will look something like this:

```
| id | name             |    email           |
| -- | ---------------- | ------------------ |
| 1  | Oyhbz Bxctktpard | ahmai@gfngqph.vcx  |
| 2  | Csdif Xloqvvh    | wjhse@djdegod.kkg  |
```

#### How `auto` transform mode works

Snaplet relies on [`copycat.scramble`](https://github.com/snaplet/copycat#copycatscramblestring-options) for most of auto-transform mode, but also makes use of a few different pieces of information to transform the data more accurately:

- The _type_ of the column: Snaplet accounts for the type of the column as it appears in the database when transforming data. For example, if the column in question is an enum type, the resulting transformations will still be valid enum values for that enum type.

- The _shape_ of the column: Snaplet will try infer the semantic "shape" of the column. For example, the column may be of type `text` in the database, but if the name of the column is `email`, Snaplet will infer that that the column represents email addresses, and account for this when transforming. In the `email` column in the example above, Snaplet made use of [`copycat.scramble`](https://github.com/snaplet/copycat#copycatscramblestring-options), but made sure to preserve the email address structure.

#### Limitations of `auto` transform mode

#### Application logic

Auto-transform mode is able to transform your database data into data that is still valid according to what your database is expecting, but it may not always be what your application's logic is expecting.

For example, imagine an application for previewing source code. Let's say this application's database has a table called `File`, with a `sourceCode` column of type `text` representing the programming language source code contained in a file. In this case, auto-transform would simply use `copycat.scramble()` on the data for this `sourceCode` column, resulting in data that is not actually valid programming language source code. In other words, Snaplet did not enough about the application to know how to automatically transform this value to something that is still what the application is expecting (programming language source code).

Our goal is for auto-transform mode to automatically transform as much of your database data as possible, but it is likely that you'll still need to tell us how to transform some of your fields.

#### Not all types are supported yet

While we aim to be able to support auto-transforming as many data types as we can, there are types that we're still working on adding support for. These include:

- Composite types
- Geometric types
- Network address types
- Range types
- User-defined types
- Bit-string types

#### Performance

We're still working on optimising auto-transform to be fast enough to be useful on large datasets and datasets with large values in them. For this same reason, we also currently truncate text values at 1000 characters before transforming them.

This said, auto-transform still may well be efficient enough for use on your own database - it is worth trying it out to see for yourself first.

If you find you are not able to capture snapshots fast enough with auto-transform mode for it to be useful on your own database, we'd like to know about it! Please feel free to reach out to us [on Discord](https://app.snaplet.dev/chat) about this.

## Dealing with character limits

One challenge when it comes to replacing data, is that some character varying (`varchar`) columns have a defined maximum character length.

For example, lets say you had an `address` column with the type `varchar(16)`. Simply using `copycat.postalAddress()` for this column would not always work, since copycat might give back an address that is longer than 16 characters.

In these cases, [`copycat.scramble`](https://github.com/snaplet/copycat#copycatscramblestring-options) might be more helpful for you: it transforms each character in the string, but preserves the string's length. Since the original value is less than the character limit, the transformed result will also be.

```ts
// .snaplet/transform.ts
import { copycat } from '@snaplet/copycat';
import type { Transform } from './structure';

export const config: Transform = () => ({
  public: {
    Users({ row }) {
      return {
        // highlight-next-line
        address: copycat.scramble(row.address, {
          preserve: [',', ' '],
        }), // '741 Hazle Forks, Carmel 8164, Dominica' => 'tqynqduk@qjlrftv.fig'
      };
    },
  },
});
```

Snaplet will also account for character limits this way when generating an example `transform.ts` config for you: if Snaplet sees a column containing PII that has a character limit, the example `transform.ts` config we generate for you will instead make use of [`copycat.scramble`](https://github.com/snaplet/copycat#copycatscramblestring-options) for that column.
