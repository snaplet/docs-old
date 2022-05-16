# Introduction

:::danger

This feature will be released on the 17th of May 2022.

:::

Snaplet transforms the data in your database via JavaScript callbacks. This "Transformation Function" is associated to the structure of your database. As an example if have a `Users` table that contains an `email` column you would create the following:

```js
// .snaplet/transformations.js
module.exports = () => {
  return {
    public: {
      Users: () => {
        return {
          // highlight-next-line
          email: 'my-new-email@example.org'
        }
      }
    }
  }
}
```

When a snapshot is captured the `email` column is transformed to the value "my-new-email@example.org," which is exactly what we wanted, but you probably want to generate a bunch of emails so the data looks realistic.

That's where `@snaplet/copycat` comes in! It's a library that generates deterministic fake values: By supplying an input _(the original email address),_ copycat returns a static value (a fake email address). As long as the input remains the same, the output will remain the same.

Example:

```js
// .snaplet/transformations.js
const { copycat } = require('@snaplet/copycat')

module.exports = () => {
  return {
    public: {
      // highlight-next-line
      Users: ({ row }) => {
        return {
          // highlight-next-line
          email: copycat.email(row.email) // zakary.block356@gmail.com
        }
      }
    }
  }
}
```

Each Transformation Function receives a `row` object that contains the original row's values, this allows you to perform conditional transformations, mutate a JSON object, or create deterministic faker values.

```js
// .snaplet/transformations.js
const { copycat } = require('@snaplet/copycat')

module.exports = () => {
  return {
    public: {
      Users: ({ row }) => {
        // Transform our user's data, not our developer's data.
        // highlight-next-line
        if (row.role !== 'SUPERUSER') {
          return {
            name: copcat.fullName(row.name),
            email: copycat.email(row.email),
            password: copycat.password(row.password)
          }
        }
      }
    }
  }
}
```

Copycat is open-source and has templates for names, addresses, phone numbers and [many other common transformations!](https://github.com/snaplet/copycat/#api-reference)