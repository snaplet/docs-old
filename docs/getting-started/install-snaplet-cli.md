---
sidebar_position: 2
---

# Install CLI

Snaplet CLI restores snapshots to your PostgresQL database on your development environments.

macOS:
```terminal
brew install snaplet/brew/cli
```

If you don't want to use a package manager, you can install it directly for Windows/ Linux/ macOS:
```bash
curl -sL https://app.snaplet.dev/get-cli/ | bash
```

## Log in

In order for Snaplet CLI to access snapshots it needs an access token. For local development use `snaplet login` which will ask you to enter a personal access token to authenticate. This only needs to happen once. For CI/CD set the `SNAPLET_AUTH_TOKEN` environmental variable.

```bash
$ snaplet login
Get your personal access token from this page: https://app.snaplet.dev/access-token/cli
✔ Paste your access token … xxxx-xxxx-xxxx-xxxx
Verifying credentials...
✔ Updated config /Users/peterp/.snaplet/config.json
✔ Logged in as peter@snaplet.dev
```


<div style={{textAlign: 'center'}}>

![Snappy says "Sup!"](/img/snappy-lying-down-whistling.svg)

</div>

## Setup

Now that the CLI is installed, let's configure it for use with a datasource in your local development environment. Access to snapshots are scoped to a specific directory on your filesystem as this allows you to restore snapshots for multiple projects on a single machine.

The `snaplet init` command can be run for each project, this is usually run at the repository root directory level, where a configuration file is generated.

```bash
# Change to your project's directory
cd ./your/code

snaplet init
```

## Usage

Restore the latest snapshot using the `snaplet restore` command. This will download the snapshot, restore the schema and data, and delete your old database.

To create an on demand snapshot use `snaplet restore --new`

