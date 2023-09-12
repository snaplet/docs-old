## Exclude data

Databases often have tables that contain loads of machine generated data, like logs, that aren't really helpful during development.
Since the code doesn't operate against this data, it can be safely excluded.


### Excluding tables and schema:

Associating a `false` value to a table will exclude it from the capture process:

```typescript
import { defineConfig } from "snaplet";

export default defineConfig({
  select: {
    private: false, // Exclude the entire schema from the capture
    public: {
      EventLogs: false, // Exclude the EventLogs table from the capture
    },
  },
});
```

### structure
You can also leverage the `structure` keyword to skip dumping data but still dump the sturcture of the table (columns, indexes, etc):

```typescript
import { defineConfig } from "snaplet";

export default defineConfig({
  select: {
    private: 'structure', // Dump the structure (with all tables) but not the data
    public: {
      EventLogs: 'structure', // Dump EventLogs structure but not the data (restore an empty table)
    },
  },
});
```

### $default

Sometimes, it might be inconvenient to list all the tables you want to exclude. In this case, you can use the `$default` keyword to
set the "default" behaviour, and then include the ones you want to keep:

```typescript
import { defineConfig } from "snaplet";

export default defineConfig({
  select: {
    $default: 'structure', // Set the all the tables and schema to be dumped as structure only
    private: false, // Except for the private schema which will be completly excluded
    public: {
      $default: true, // Set all the tables in the public schema to be dumped as data
      EventLogs: 'structure', // Except for the EventLogs table for wich we only want the structure
      Logs: false, // And the Logs table which we want to exclude completly
    }
  },
});
```