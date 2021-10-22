# Setup the CLI

Now that the CLI is installed and you're logged in, there's one last step before you can restore a snapshot.

Access to snapshots are scoped to a specific directory on your filesystem as this allows you to restore multiple datasources on a single machine.

The `snaplet setup` command can be run for each repo, this is usually run at the repository root directory level, where a configuration file (`<projectRepo>/.snaplet/config.json`) is generated.

```bash
# Change to your project's directory
cd ./your/code

$ snaplet setup
✔ Restore snapshots from... › Snaplet
Testing connection credentials... ✔ Success
Connection credentials:
host       localhost
port       5432
user
password   
database   snaplet_development
Wrote project config
```

### Env-vars

You can overwrite the project configuration with the following envars:

- `SNAPLET_DATABASE_ID=xxx-xxx-xxx`: Skips the configuration and uses the datasource id.
- `SNAPLET_DATABASE_CONNECTION_STRING=pg://user:pasword@localhost:5432/database`: Skip the supplied database credentials.