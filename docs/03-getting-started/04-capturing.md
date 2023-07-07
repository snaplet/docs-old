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

## Common Issues

To ensure Snaplet captures your database in a consistent manner, we initiate a long-running transaction for the entire duration of the capture. This allows us to maintain consistent relationships between datasets and ensures we can restore the database accurately.

Depending on your database settings, you may encounter some issues. Here are some common ones:

### Statement Timeout Error

Some database providers (like Supabase) may set default timeout values for statements to prevent long-running queries from blocking your database. This can conflict with the capture process and result in the following error: `canceling statement due to statement timeout`.

To fix this, we recommend allowing longer running statements during the capture process. This can be achieved by setting the `statement_timeout` to a higher value or infinity in the database via the command `SET statement_timeout = 0;`.

If you've created a dedicated role for Snaplet, as recommended [here](/guides/postgresql#create-a-read-only-role), you can set an infinite timeout specifically for the `snaplet` user role with the following command:

```sql
ALTER ROLE snaplet_readonly SET statement_timeout = 0;
```

### Lag on Read Replica

Due to the long-running transaction, if Snaplet is run on a read replica, it may cause the replica to lag. This is because the replica has to wait for the transaction to be committed before it can apply changes.

We recommend running the capture on the primary instance to prevent this issue.

If you absolutely need to run the capture on a read replica, we recommend the following settings to minimize replica lag:

```sql
max_standby_archive_delay = -1        # max delay before canceling queries
max_standby_streaming_delay = -1      # max delay before canceling queries -1 allows indefinite delay
hot_standby_feedback = on             # send info from standby to prevent
```

Please note that these settings may increase "table bloat" and Write-Ahead Logging (WAL) on the primary instance, as the data will need to be stored somewhere during the capture. You could also set up a dedicated read replica for Snaplet where lag is not a concern.