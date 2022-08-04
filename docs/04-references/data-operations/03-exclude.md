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
