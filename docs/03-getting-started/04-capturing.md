# Capturing a snapshot

Now that you've reviewed your `snaplet.config.ts` file and are satisfied with the transformations, Snaplet will capture a snapshot of your _local development database_. As we mentioned, this may be a slightly contrived scenario, as you and the rest of your team may want to code against a snapshot of your production or staging database instead. 

Stick with us though, as the steps for capturing a snapshot of production (or any other database) are the same, the only difference being changing the connection string via a `SNAPLET_SOURCE_DATABASE_URL` environment variable. 

At the end of this guide we'll go over different ways of capturing your production database in a self-hosted environment, or as a Snaplet Cloud Project.

To snapshot your database, run `snaplet snapshot capture`

```terminal
# highlight-next-line
$ snaplet snapshot capture

Copying database schema to ".snaplet/snapshots/1656226289958-feed-synthesize/schemas.sql"
Copying data to ".snaplet/snapshots/1656226289958-feed-synthesize/tables"
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
snaplet snapshot share feed-synthesize
```

That's it! You've captured a snapshot of your local database, and you now have a fresh "nugget of data 🍗" that is saved to the `.snaplet/snapshots` directory.
The snapshot contains the schema, some metadata, and the data in CSV format (transformed as per your transformations).

Your snapshot has all the right ingredients your team members need to restore your database to their environment, so everyone on the team can code against the same data!
