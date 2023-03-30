# Restoring a snapshot

Run `snaplet snapshot restore` to download the latest snapshot from a project, restore the schema and insert the table data.

```bash
# highlight-next-line
$ snaplet snapshot restore
┌ Resolution step
📡 Connected to database with "postgresql://postgres@localhost:5432/postgres"
✔ Snapshot: Found "feed-synthesize"

  Name: feed-synthesize
  Created: 14 hours ago
  Updated: 36 minutes ago
  Size: 58.1 MB
  Tables:
    public.BlogPost, public.Comments,
    public.Category, public.Member,
    public.InviteToken, public.Member,
    public.Organization, public.PricingPlan,
    public.Project, public.ReleaseVersion,
    public.Table, public.User,
    public._prisma_migrations

┌ Fetch step
✔ Schema: Downloaded
✔ Table data: Downloaded
┌ Restore step
✔ Database: Schemas dropped
✔ Import schema: Imported
✔ Table data: Imported
✔ Database indexes: Created
✔ Database sequences: Reset


Wrote restore.log

🎉 Snapshot restored
```

That's it! In a few minutes you captured, transformed, shared and restored a snapshot.

### Opting out

Running the restore command will go through 3 key steps. The command includes opt-out flags that will allow you to exclude any one of these steps (listed in order of operation below):

1. **Reset (`—-reset`):** Drop the **target database** (skip this step with the `--no-reset` flag).
2. **Schema (`—-schema`):** Restore the schemas on the **target database** (skip this step with the `--no-schema` flag).
3. **Data (`—-data`):** Restore the data on the **target database** (skip this step with the `--no-data` flag).
