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

## Common issues

In order for snaplet to capture your database in a consistent way, we open a long running transaction for all the time
of the capture. This allows us to ensure that relationship between datas will be consistent and can be restored the database.

Depedings of your database settings, this might cause you some issues, some common ones are:

### Statement timeout error

Some database provider (like Supabase) might setup some default timeout values for statements to avoid long running queries from blocking your DB.
This can enter in conflict with the capture and cause the following error: `canceling statement due to statement timeout`.

In that case, the recommended fix is to allow longer running statements for the duration of the capture, this can be done
by setting the `statement_timeout` to a higher value or infinity on the database via `SET statement_timeout = 0;`.

You can also set an infinite timeout only for the `snaplet` user role if you created a dedicated one like recommended [here](/guides/postgresql#create-a-read-only-role) by running the following command:

```sql
ALTER ROLE snaplet_readonly SET statement_timeout = 0;
```

### Lag behind on read replica

Due to the long running transaction behaviour, if run on a read replica, snaplet may induce a lag on the replica.
This is because the replica will have to wait for the transaction to be commited before being able to apply the changes.

We recommend running the capture on the primary instance to avoid this issue.

If you really need to run the capture on a read replica, we recommend the following settings to avoid the replica lag:

```sql
max_standby_archive_delay = -1        # max delay before canceling queries
max_standby_streaming_delay = -1      # max delay before canceling queries -1 allows indefinite delay
hot_standby_feedback = on             # send info from standby to prevent
```

Note that this will increase "table bloat" and WAL on the primary instance as the data will need to live somewhere during the capture. You might also setup a dedicated read replica on which the lag behind is not an issue point snaplet to it.