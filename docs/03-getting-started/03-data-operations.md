# Data operations

Snaplet has four operations for customizing the data in a snapshot:
- **Transform:** Make existing data suitable for development
- **Exclude:** Ignore data in specific tables
- **Reduce (Subset):** Capture a subset of data whilst keeping referential integrity intact
- **Generate:** Seed values when you don't have any data

These operations are defined as code via config files and JavaScript functions.
This gives a team of developers control over the shape and needs of their data and introduces a _"gitops style workflow."_

In this guide we're going to focus on transforming data.

## Transforming data

In the previous step Snaplet generated a `.snaplet/transform.ts` file, where it identified columns that may contain personally identifiable information (PII), and associated a JavaScript function to those columns so that the values in the snasphot are anonymized.

The JavaScript functions are mapped to the structure of your database.
As an example, if you have a `User` table with an `email` column you can transform the original value to a new one with the following:

```typescript
// .snaplet/transform.ts
export default () => {
  return {
    public: {
      User: ({ row }) => {
        return {
          // highlight-next-line
          email: 'user_' + row.id + '@example.org', 
        }
      }
    }
  }
}
```

The function assigned to `public.User` receives the existing row values in the `row` variable.
Here we used the `id` value to create a new email address value: `"user_1@example.org", "user_2@example.org", etc...`

### Better fake values with Copycat

Copycat is our open-source library for generating fake-data that includes templates for names, addresses, phone numbers and [many other common transformations!](https://github.com/snaplet/copycat/#api-reference).

It produces _static values,_ so for any given input it'll produce the exact same output! Having static values is super helpful when coding or testing, as an example:
```js

copycat.email('a-real-email@domain.com') // => beth.cranshaw@example.org
copycat.email('a-real-email@domain.com') // => beth.cranshaw@example.org
copycat.email('1') // => jane.maplemoth@example.org
```

## Exclude

Databases often have tables that contain loads of machine generated data, like logs, that aren't really helpful during development.
Since the code doesn't operate against this data, it can be safely excluded.
Associating a `false` value to a table will prevent Snaplet from copying data.
Snaplet will still create the table's structure but skip the data.

```typescript
// .snaplet/transform.ts
export default () => {
  return {
    public: {
      AuditLog: false
    }
  }
}
```

## Debug transformations with "live preview"

Using JavaScript functions to tranform your data gives you an incredible amount of flexability, but that flexability comes at the cost of introducing bugs.
Snaplet provides a _live preview environment_ via the `snaplet proxy` command to debug transformations, when you boot up the proxy it connects to your database, reads the `transform.ts` file and waits for a client connection.
Then, you connect to the proxy with your favorite SQL querying tool, and validate your transformations in real time.


## Other data operations...

In this chapter we covered transforming and excluding data, but Snaplet can also reduces (subsets) and generates data.
Read more about those data operations in our [data operations reference](/references/data-operations).