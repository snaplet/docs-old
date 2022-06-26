# Configuration

Run `snaplet config setup` in the directory with your source code, this command creates a `.snaplet` directory and the configuration files used by the CLI.
These configuration files should be added to your repository so that they can be shared with your team.

You'll need the connection string to the development database that your source code operates against, once you have that run `snaplet config setup`.

```bash
$ cd path/to/project-404/
# highlight-next-line
$ snaplet config setup

> > No existing configuration found. A configuration contains variables
that adjust the settings of the CLI
? Set up "~/gh/path/to/project-404"? [Y/n] y
> Updated ".gitignore"...

> > Enter development database connection credentials:
? postgresql://postgres@localhost:5432/my-project-database

> Introspecting database...
> Wrote ".snaplet/config.json"
> Wrote ".snaplet/structure.d.ts"
> Wrote ".snaplet/transform.ts"
```

Snaplet introspects your database and generats a `transform.ts` file with suggested functions for transforming personally identifiable information from your data, and a type definition file based on the structure of your database, which enables design-time type safety.
