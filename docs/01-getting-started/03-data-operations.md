# Data operations

Snaplet has four operations for customizing the data in a snapshot:
- Transform: Make existing values suitable for development
- Exclude: Ignore data in specific tables
- Reduce (Subset): Capture a subset of data whilst keeping referential integrity intact
- Generate: Seed values when you don't have any data to transform

These operations are defined as code via config files and JavaScript functions.
This allows complete control over the shape of data in snapshots and introduces "gitops style workflow" so that a team of developers can own the data that they code against.

During onboarding Snaplet generated a `.snaplet/transform.ts` file, where we identified columns that may contain personally identifiable information (PII), and associated a JavaScript function to that column so that the values captured are anonymized.

## Transform

Snaplet transforms the data in your database using JavaScript functions that are mapped to the structure of your database.
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

The function assigned to `public.User` receives the existing row values in the `row` variable. Here we used the `id` value to create a new email address value: `"user_1@example.org", "user_2@example.org", etc...` 

## Exclude

Databases often have tables that contain loads of machine generated data, like logs, that aren't really helpful during development.
Since the code doesn't operate against this data, it can be safely excluded.
Associating a `false` value to a table will prevent Snaplet from copying data.
Snaplet will still create the table's structure but copy none of the data.

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

Using JavaScript functions to tranform your data gives an incredible amount of flexability, but that complexity comes at the cost of writing syntax errors and introducing bugs.
Snaplet provides a "live preview environment" via the `snaplet proxy` command to debug transformations, when you boot up the proxy it connects to your database, reads the `transform.ts` file and waits for a client connection.
Then, you connect to the proxy with your favorite SQL querying tool, and validate your transformations in real time.


## Other data operations...

In this chapter we covered transforming and excluding data, but Snaplet can also reduces (subsets) and generates data.
Read more about those data operations in our data operation guide. [Coming soon]