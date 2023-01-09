## Exclude data

Databases often have tables that contain loads of machine generated data, like logs, that aren't really helpful during development.
Since the code doesn't operate against this data, it can be safely excluded.
Associating a `false` value to a table will prevent Snaplet from copying data.
Snaplet will still create the table's structure but skip the data.

```typescript
// .snaplet/transform.ts
export const config = () => {
  return {
    public: {
      AuditLog: false,
    },
  };
};
```

If you're using Snaplet Cloud ([app.snaplet.dev](https://app.snaplet.dev/)), you can exclude these schemas as follows:

- In the UI, navigate to the project you want to configure this for
- Click `Data Editor`
- Click the `Schema Operations` tab
- Click `Exclude` for the schema you want to exclude
- Click `Review & Save`
- If you're happy with the previewed changes, click `Save`

![Example of excluding a schema](/img/snaplet-supabase-schema-exclude.png)
