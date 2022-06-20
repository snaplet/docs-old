# Configuration

Run `snaplet config setup` in the directory with your source code, this command creates a `.snaplet` directory and the config files used by the CLI.

You'll need the connection string for your development database. These configuration files should be added to your repository so that they can be shared with your team.

```bash
$ cd path/to/project-404/
# highlight-next-line
$ snaplet config setup

> > No existing configuration found. A configuration contains variables
that adjust the settings of the CLI.
? Set up "~/gh/path/to/project-404"? [Y/n] y
> Updated ".gitignore"...

> > Enter database connection credentials:
? postgresql://postgres@localhost:5432/my-project-database

> Introspecting database...
> Wrote ".snaplet/config.json"
> Wrote ".snaplet/structure.d.ts"
> Wrote ".snaplet/transform.ts"

😽 Snaplet has introspected your database structure and generated
suggested transformations for your data in ".snaplet/transform.ts". 
Review them
```

Once Snaplet has introspected your database it generates the following files i `.snaplet`:
- `transform.ts`: 
- `.snaplet/config.json`: variables that adjust the settings of the CLI.
