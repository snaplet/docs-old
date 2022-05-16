# Introduction

:::danger

This feature will be released on the 17th of May 2022.

:::

Snaplet transforms the data in your database via a JavaScript callback. This "Transformation Function" is associated to the structure of your database. As an example you have a `Users` table that contains an `email` column you would assign the callback to an object with the path `public.Users` and return an object containing `email`.

<div style={{textAlign: 'center'}}>

![Be one with the database!](/img/snappy-nervous.svg)

</div>

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

When a snapshot is captured the `email` columns are transformed to the value "my-new-email@example.org," which is fine, but you probably want to transform those values into something dynamic?

Which is exactly where `@snaplet/copycat` helps, it's a JavaScript package that generates deterministic fake values, by supplying an input (the original email address) it returns the same static value (a new email address). Which is great for testing!

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

Something to point out is that each Transformation Function receives a `row` object which contains the original row values, so you can perform conditional logic, or mutate a JSON object.

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

Copycat is open-source and has templates for names, addresses, phone numbers and [other common transformations!](https://github.com/snaplet/copycat/#api-reference)