# Getting started

We believe that a good developer experience is when developer's are in flow, so it's our goal to "work where you work" by providing programatic primitives for transforming the data in your database, and integrating those with your development worflow.

<div style={{textAlign: 'center'}}>

![Be one with the database!](/img/snappy-flow.svg)

</div>

To transform the data in your database Snaplet needs two things:
1. A connection URL to the database that you want to transform (This can be your development database).
2. A `.snaplet/transformations.js` file that contains Transformations Functions.

Let's create those files.

## Setup: Generating transformation files

You should run `snaplet config setup` at the root of your codebase (in your git repo), so that the configuration and transformations files are versioned, and shareable with the rest of your team.

```bash
✔ Connection string … postgresql://localhost/snaplet_development
✔ Database connection: Testing...
✔ Project file config.json: Creating...
✔ Database connection: Testing...
✔ Database structure: Instrospecting...
✔ Project file transformations.d.ts: Creating...
✔ Project file transformations.js: Creating...
```

The first thing Snaplet needs is a **connection string to your database**, we use this to **introspect your database** and make **transformation suggestions** for columns that could contain personally identifiable information.

Regenerate these files with `snaplet config generate --type=typedef,transformations`

You can add the `.snaplet/transformations.d.ts` to your `.gitignore` configuration.

:::tip

A user account is _not required_, you only need a user account if you want to share snapshots with your team.

:::

## Validation: Testing Transformation Functions

Snaplet Proxy is "live reload" for your Transformation Functions. It runs between your database and database client whilst applying transformations to the data.

```terminal
snaplet proxy
Listening on postgresql://localhost:2345...
```

You'll be able to connect to `postgresql://localhost:2345`, where each query is passed along to your database, but the response is transformed in realtime via Transformation Functions. 

## Capturing a snapshot

Once you're happy with your Transformation Functions you can capture a snapshot of your database.

If you're using Snaplet Cloud to capture your snapshots you can push your `transformation.js` file to Snaplet via the `snaplet config push` command, and can boot off a snapshot via `snaplet snapshot create`.

:::tip

You can capture snapshots on your own machine using the _experimental_ `snaplet snapshot capture /path/to/save-snapshot` command. [Send us feedback](https://github.com/orgs/snaplet/discussions)

:::

## Restoring a snapshot

Use the `snaplet snapshot restore` command to restore a Snapshot from Snaplet Cloud.

:::tip

Restore locally using the _experimental_ `snaplet snapshot capture /path/to/snapshot` command. [Send us feedback](https://github.com/orgs/snaplet/discussions)

:::