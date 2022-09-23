# Configuration files

The CLI's settings can be modified by a configuration file or via environmental variables.
Snaplet typically operates against the database associated to your codebase, which means that you should add the configuration files to your repository, so that you don't have to set it up again.

Snaplet searches from the current working directory upwards for a `.snaplet/config.json` file.

Snaplet has a global configuration file (for authentication state), and a local per-project configuration file:
- local, per project: `<codebase>/.snaplet/config.json`
- global, `<homedir>/.snaplet/config.json`

## Environmental variables

| Name                        | Description                                                       |
| :-------------------------- | :---------------------------------------------------------------- |
| `SNAPLET_ACCESS_TOKEN`      | Access token to authentication as Snaplet Project (Cloud hosting) |
| `SNAPLET_PROJECT_ID`        | Run CLI commands against Snaplet Project (Cloud hosting)          |
| `SNAPLET_DATABASE_URL`      | The connection string used to capture and restore snapshots       |
| `SNAPLET_CWD`               | The current working directory                                     |
| `SNAPLET_DISABLE_TELEMETRY` | Snaplet no phone home                                             |

