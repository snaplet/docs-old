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
    <img align="center" width="480" src="/screenshots/preview-db/preview-database-01.png" alt="Create a new preview database" />
</div>

The first preview database may take a moment to create, depending on the size of your snapshot. Once done, you'll be able to copy the connection string for the database to import into your preferred database client.

<div style={{textAlign: 'center'}}>
    <img align="center" width="480" src="/screenshots/preview-db/preview-database-02.png" alt="Copy connection string" />
</div>

:::note Info

Currently, preview databases created from within the Snaplet CLI use a legacy database provider that's different from the provider used for preview databases created from within the Snaplet Cloud application. Our intention is to deprecate the current provider for Snaplet CLI databases, transition to the new provider, and harmonize preview databases on a single provider. **For now, we'd recommend using Snaplet Cloud to create preview databases**.

:::

## Creating a preview database using Snaplet CLI

:::note Info

Snaplet CLI preview databases are created on a different service to preview databases created from within the Snaplet Cloud application. We're in the process of harmonizing preview databases onto a single provider.

:::

The database server is hosted on a [Fly Machine](https://fly.io/docs/reference/machines/) with 1 shared CPU, 1GB of RAM and 10GB of persistent volume.

```bash
# highlight-next-line
$ snaplet preview-database --help

snaplet preview-database [action]

manage preview databases

Commands:
  snaplet preview-database create [snapshot]          create a preview database from a snapshot  [aliases: c]
  snaplet preview-database url [name]                 get a connection URL for a specified preview database [aliases: u]
  snaplet preview-database list [snapshot]            shows all preview databases created from a specific snapshot [aliases: ls]
  snaplet preview-database drop [name]                drops a specified preview database [aliases: d]
```

For the following commands, we will use the convenient alias `db` in place of `database`.

## `create [snapshot]`

The create subcommand generates a new preview database using a specified snapshot:

**Examples**

```bash
# To create a new preview database from a specific snapshot, run:
snaplet preview-database create preview_db_tutorial
```

## `url [name]`

This command retrieves the connection URL for a specified preview database. The name parameter is optional and if not provided, the most recent preview database will be used.

**Examples**

```bash
# To get the connection URL for a specific preview database, run:
snaplet preview-database url preview_db_tutorial
```

## `reset [name]`

This command reset the state of a specified preview database.

**Examples**

```bash
# To reset the state of a specific preview database, run:
snaplet preview-database reset preview_db_tutorial
```

## `list [snapshot]`

The list subcommand shows all preview databases created from a specific snapshot:

```bash
# To list all preview databases that have been created from a specific snapshot, run:
snaplet preview-database list preview_db_tutorial
```

## `drop [name]`

This command drops a specified preview database. The name parameter is required and specifies the name of the preview database to drop.

```bash
snaplet preview-database drop preview_db_tutorial
```

