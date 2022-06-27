# Configuration

Run `snaplet config setup` in the directory with your source code, this command creates a `.snaplet` directory and the configuration files used by the CLI.
These configuration files should be added to your repository so that they can be shared with your team.

You'll need the connection string to the development database that your code operates against, run `snaplet config setup`.

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

Snaplet introspected your database and generated:
  1. A `transform.ts` file with suggested functions for transforming personally identifiable information of your data
  2. A type definition file `structure.d.ts` based on the structure of your database, which enables design-time type safety.