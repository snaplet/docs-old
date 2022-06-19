# Setup CLI config

Run `snaplet config setup` in the directory with your source code, this command creates a `.snaplet` directory which contains config files used by the CLI.

```bash
$ cd path/to/source-code/
# highlight-next-line
$ snaplet config setup

> > No existing configuration found. A configuration contains variables
that adjust the settings of the CLI.
? Set up "~/gh/my-project"? [Y/n] y
> Updated ".gitignore"...

> > Enter development database connection credentials:
? postgresql://postgres@localhost:5432/my-project-database

> Introspecting database...
> Wrote ".snaplet/config.json"
> Wrote ".snaplet/structure.d.ts"
> Wrote ".snaplet/transform.ts"

> > All done! Snaplet has introspected your database structure
and generated suggested transformations to your data
in ".snaplet/transform.ts".
```

This command creates 
