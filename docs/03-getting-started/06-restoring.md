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
