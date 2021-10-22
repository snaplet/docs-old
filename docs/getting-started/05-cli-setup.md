# Setup the CLI

## Login

For local development use `snaplet login` to associate your machine to your Snaplet account. You only need to do this once per machine, the access-token is stored in `~/.snaplet/config.json`. You can also set the `SNAPLET_ACCESS_TOKEN` env-var.

```bash
$ snaplet login
Get your personal access token from this page: https://app.snaplet.dev/access-token/cli
✔ Paste your access token … xxxx-xxxx-xxxx-xxxx
Verifying credentials...
✔ Logged in as peter@snaplet.dev
```

## Select a datasource

The CLI is installed and logged in, there's one final step before you can restore a snapshot, which is to associate your code's repository to the datasource you created in the first step.

Access to snapshots are scoped to a specific directory on your filesystem as this allows you to restore from multiple datasources on a single machine. 

The `snaplet setup` command can be run for each repo, this is usually run at the repository root directory level, where a configuration file (`<projectRepo>/.snaplet/config.json`) is generated.

```bash
# Change to your project's directory
cd ./your/code

$ snaplet setup
✔ Restore snapshots from... › Snaplet
Testing connection credentials... ✔ Success
Connection credentials:
user       postgres
host       localhost
port       5432
user
password   
database   snaplet_development
Wrote project config
```

## Environmental variables

You can overwrite the configuration:

- `SNAPLET_ACCESS_TOKEN=xxx-xxx-xxx`: Overwrite the access token, logging in with a different user.
- `SNAPLET_DATABASE_ID=xxx-xxx-xxx`: Overwrite the current datasource.
- `SNAPLET_DATABASE_CONNECTION_STRING=pg://user:pasword@localhost:5432/database`: Database connection credentials.