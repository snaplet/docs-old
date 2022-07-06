# Instant Database

:::warning Work in progress

This is an unreleased feature.

:::

We are currently evaluating the feature to give developers an "instant database" to code, or run PR previews against. Each Snaplet Cloud Project receives a single PostgresQL instance where multipled databases can be created.

## Creating a database

To create a database, run: `snaplet db create`.

```bash
# highlight-next-line
$ snaplet db create

Database up, took 300ms.
Connection URL: postgresql://postgres:[password]@host.name/[git-branch-name]
```

The database is automatically named after your git-branch, but can also be specified, run `snaplet db create my-name`.

## Connection information

To view a list of available databases, run `snaplet db list`.
To get the connection string for run: `snaplet db url [git-branch-name]`.

This command is especially helpful in CI/CD or preview environments:
`DATABASE_URL=$(snaplet db url) yarn prisma migrate deploy`


## "Scale to zero"

The database will automatically shut down after 5 minutes of inactivity, so called "scale-to-almost-zero," and resume when a connection is detected. Under the hood we're using Fly Machines.
