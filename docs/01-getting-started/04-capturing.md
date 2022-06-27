# Capturing a snapshot

Here we'll capture a snapshot of your _development database_ which may be a slightly contrived example, since the rest of your team would likely want to code against a transformed snapshot of production or staging.

Stick with us, since the steps for capturing a snapshot of production are the same, the only difference being the switching of the connection string via a `SNAPLET_DATABASE_URL` environmental variable. At the end of this guide we'll go over different ways of capturing your production database as self-hosted, or via a Snaplet Project.

To capture a transformed snapshot, run: `snaplet snapshot capture`

```terminal
# highlight-next-line
$ snaplet snapshot capture

Copying database schema to ".snaplet/snapshots/1656226289958-sensor-synthesize/schemas.sql"
Copying data to ".snaplet/snapshots/1656226289958-sensor-synthesize/tables"
public._prisma_migrations      | ████████████████████████████████████████ 100% | 77/77
public.BlogPost                | ████████████████████████████████████████ 100% | 559/559
public.Comments                | ████████████████████████████████████████ 100% | 14929/14929
public.Category                | ████████████████████████████████████████ 100% | 7/7
public.Member                  | ████████████████████████████████████████ 100% | 1/1
public.Organization            | ████████████████████████████████████████ 100% | 647/647
public.PricingPlan             | ████████████████████████████████████████ 100% | 2/2
public.Table                   | ████████████████████████████████████████ 100% | 154477/154477
public.User                    | ████████████████████████████████████████ 100% | 726/726

Capture complete!
To share this snapshot, run:
snaplet snapshot share sensor-synthesize
```

You now have a fresh nugget of transformed data that is saved to the `.snaplet/snapshots` directory.
The snapshot contains the database schema, and the table data in CSV format.



