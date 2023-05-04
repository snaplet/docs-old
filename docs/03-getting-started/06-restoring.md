# Restoring snapshots

With the Snaplet CLI installed and configured, and having gone through the Snaplet Cloud onboarding experience, at this point you should have a snapshot ready to restore into your target development database.

If you didn’t create a snapshot with Snaplet Cloud, you’ll need to do so, or create a snapshot manually. More advanced users can also capture a snapshot from inside the CLI. Go to our [Capturing](/getting-started/capturing) page for more info on how to do this.

Run `snaplet snapshot restore` to download the latest snapshot from a project and restore it into your target database. 

```bash
$ snaplet snapshot restore

┌ Resolution step
📡 Connected to database with "postgresql://postgres@localhost:5432/postgres"
✔ Snapshot > "ss-snapshot-name-12345" age: 45 minutes | tags: onboarding, docs

  Name: ss-snapshot-name-12345
  Tags: onboarding, docs
  Created: 2 days ago
  Updated: 45 minutes ago
  Size: 58.1 MB
  Tables:
	  public._prisma_migrations, public.actor,
    public.address, public.category, public.city,
    public.country, public.customer, public.film,
    public.film_actor, public.film_category,
    public.inventory, public.language, public.payment,
    public.payment_p2007_01, public.payment_p2007_02,
    public.payment_p2007_03, public.payment_p2007_04,
    public.payment_p2007_05, public.payment_p2007_06,
    public.rental, public.staff, public.store

┌ Restore step
✔ Database: Schemas dropped
✔ Import schema: Imported
✔ Table data: Imported
✔ Constraints: Created
✔ Database sequences: Reset
✔ Vacuum: Complete

Wrote restore.log

🎉 Snapshot restored
```

## You're done!
That's it! In a few minutes you captured, transformed, shared and restored a snapshot. 

What's next? If you haven't already, connect Snaplet to your own database. You can [self-host](/guides/self-hosting) Snaplet in your onw trusted infrastructure as well. 

You can also restore your snapshot to your database with more granularity, choosing to not drop the database, or to not restore the schemas or data.


## More granular control over restorations

Snapshot restoration happens in three key steps:

1. The target database is dropped.
2. The target database schemas are restored from the snapshot.
3. The target database data is restored from the snapshot.

It’s possible to omit any of the steps above during snapshot restoration by using an opt-out flag. For instance, when restoring to a [Supabase database](https://docs.snaplet.dev/tutorials/supabase-clone-environments/), it’s necessary to skip resetting the database itself. 

The follow opt-out flags can be used to omit steps in the restoration process.

1. Don’t drop the **target database** : `--no-reset` 
2. Don’t restore the schemas on the **target database:** `--no-schema` 
3. Don’t restore the data on the **target database:** `--no-data` 

Opt-out flags are appended to the `snaplet snapshot restore` command: 

```bash
snaplet snapshot restore --no-schema
```

If you’re having any issues restoring your snapshot to your target database, feel free to join us on  [Discord](https://app.snaplet.dev/chat) to troubleshoot your issue.
