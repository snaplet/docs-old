# Preview Databases

:::note Work in Progress

This feature is actively under development and is subject to change. We would love your [feedback](https://app.snaplet.dev/chat)!

:::

## Why preview databases?

The typical Snaplet workflow involves restoring snapshots to your local development PostgreSQL database to code against. While working locally with snapshots allows for more flexibility, configurability, and the ability to work offline without network latency or connectivity interruptions, there are situations where being able to preview your snapshot on an instant serverless database (what we call "preview databases") is useful. 

For example, if you're currently in the process of evaluating Snaplet, being able to restore a snapshot to a preview database allows you to view that database without needing to download and install the Snaplet CLI. Preview databases are also easy to share with team members, and allow you to have [isolated preview databases](/guides/netlify-preview-plugin) for preview deployments.  

As such, Snaplet supports the creation of instant preview databases from snapshots, which allows users to view, code against, or run pull-request previews against a preview serverless PostgreSQL database. 

These preview databases can be created from within the [Snaplet Cloud](/references/preview-databases#creating-a-preview-database-on-snaplet-cloud) dashboard, or the [Snaplet CLI](/references/preview-databases#creating-a-preview-database-using-snaplet-cli-deprecated).

Each Snaplet Project receives a PostgreSQL server instance where multiple preview databases can be created. 

## Creating a preview database on Snaplet Cloud

To create a preview database from within Snaplet Cloud, you'll need to have captured a snapshot from your source database - refer to the [Getting Started](/getting-started/start-here/) guide if you need help. From the Snaplet dashboard, click on your snapshot, and then select the 'Previews' tab. From here, simply click the 'Create new preview database' button. 

<div style={{textAlign: 'center'}}>
    <img align="center" width="480" src="static/screenshots/preview-db/preview-database-01.png" alt="Create a new preview database" />
</div>

The first preview database may take a moment to create, depending on the size of your snapshot. Once done, you'll be able to copy the connection string for the database to import into your preferred database client.  

<div style={{textAlign: 'center'}}>
    <img align="center" width="480" src="static/screenshots/preview-db/preview-database-02.png" alt="Copy connection string" />
</div>


:::note Info

Currently, preview databases created from within the Snaplet CLI use a legacy database provider that's different from the provider used for preview databases created from within the Snaplet Cloud application. Our intention is to deprecate the current provider for Snaplet CLI databases, transition to the new provider, and harmonize preview databases on a single provider. **For now, we'd recommend using Snaplet Cloud to create preview databases**. 

:::


## Creating a preview database using Snaplet CLI (deprecated) 

:::note Info

Snaplet CLI preview databases are created on a different service to preview databases created from within the Snaplet Cloud application. We're in the process of harmonizing preview databases onto a single provider.

:::

The database server is hosted on a [Fly Machine](https://fly.io/docs/reference/machines/) with 1 shared CPU, 1GB of RAM and 10GB of persistent volume.

```bash
# highlight-next-line
$ snaplet database --help

snaplet database [action]

manage preview databases

Commands:
  snaplet database cache [snapshot]                   cache a snapshot into the preview database server  [aliases: ca]
  snaplet database create [database-name] [snapshot]  create a preview database from a snapshot  [aliases: c]
  snaplet database destroy                            destroy the database server  [aliases: ds]
  snaplet database drop [database-name]               drop a preview database  [aliases: delete, d]
  snaplet database list                               list preview databases  [aliases: ls]
  snaplet database setup                              create a preview database server  [aliases: s]
  snaplet database url [database-name]                show a preview database url  [aliases: u]
```

For the following commands, we will use the convenient alias `db` in place of `database`.

## Creating a database server

The first step is to create a database server in the region of your choice.

Run `snaplet db setup`

## Creating a database

To create a database from a snapshot, run `snaplet db create`:

```bash
# highlight-next-line
$ snaplet db create preview_db_tutorial
# You will be asked to pick a snapshot if you don't provide one using the --snapshot or --latest option
✔ Snapshot › v1-cassidy-underpass-interface 483 kB  4 days ago
# The snapshot is restored to the preview database
✔ Database preview_db_tutorial created from snapshot v1-cassidy-underpass-interface [12s]
# You can now use your database!
You can connect to your database at: postgresql://postgres:*********@<ipv4>:5432/preview_db_tutorial
```

If you don't want to provide an explicit name for the database, you can use the `--git` option. Your database will be named after your current branch name:

```bash
# highlight-next-line
$ snaplet db create --git --latest
# Assuming that we are on the branch "snappy/feature-meow"
✔ Database snappy_feature_meow created from snapshot v1-cassidy-underpass-interface [11s]
You can connect to your database at: postgresql://postgres:*********@snaplet-<orgId>-<projectId>.fly.dev:5432/snappy_feature_meow
```

The `--git` option is available for database creation, deletion and displaying the database url.

## Listing databases

To list all databases, run `snaplet db list`:

```bash
# highlight-next-line
$ snaplet db list
DATABASES
NAME                   SIZE     SNAPSHOT
preview_db_tutorial    14 MB    v1-cassidy-underpass-interface
snappy_feature_meow    14 MB    v1-cassidy-underpass-interface
```

You can see the database size and from which snapshot each database was created.

## Dropping a database

To drop a database, run `snaplet db drop`:

```bash
# highlight-next-line
$ snaplet db drop preview_db_tutorial
✔ Dropped database preview_db_tutorial
```

## Displaying a database url

To display a database url, run `snaplet db url`:

```bash
# highlight-next-line
$ snaplet db url snappy_feature_meow
postgresql://postgres:*********@snaplet-<orgId>-<projectId>.fly.dev:5432/snappy_feature_meow
```

This command is especially helpful in CI/CD or preview environments: `DATABASE_URL=$(snaplet db url --git) yarn prisma migrate deploy`

## Caching a snapshot into the database server

Waiting for a snapshot to be restored can be long, especially if your snapshot is big.
To avoid this problem, you can cache snapshots into the database server for truly preview databases creation!

To cache a snapshot into the database server, run `snaplet db cache`:

```bash
# highlight-next-line
$ snaplet db cache v1-cassidy-underpass-interface
✔ Snapshot v1-cassidy-underpass-interface cached into preview database server [12s]

# highlight-next-line
$ snaplet db create is_it_fast_enough --snapshot v1-cassidy-underpass-interface
✔ Database is_it_fast_enough created from cached snapshot v1-cassidy-underpass-interface [389ms] # Notice the time here!
You can connect to your database at: postgresql://postgres:*********@snaplet-<orgId>-<projectId>.fly.dev:5432/is_it_fast_enough
```

The cached snapshots will appear in the `snaplet db list` command:

```bash
# highlight-next-line
$ snaplet db list
DATABASES
NAME                   SIZE     SNAPSHOT
is_it_fast_enough      14 MB    v1-cassidy-underpass-interface

CACHED SNAPSHOTS
NAME                              SIZE
v1-cassidy-underpass-interface    14 MB
```

## Clearing a cached snapshot from the database server

To clear a cached snapshot, run `snaplet db cache --clear`:

```bash
# highlight-next-line
$ snaplet db cache v1-cassidy-underpass-interface --clear
Snapshot v1-cassidy-underpass-interface removed from the preview database server cache
```

## Destroying a the database server

If you want to restart from scratch, you can run the `snaplet db destroy` command.

It will delete the database server with all its preview databases.
