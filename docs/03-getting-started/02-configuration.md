# Configuration

Once you’ve installed the Snaplet CLI, you’ll need to configure Snaplet for your project. 

1. Run `snaplet config setup` in the directory containing your project’s source code.
    1. This command creates a `.snaplet` directory and the configuration files used by the CLI.
    2. Add these files (`.snaplet/config.json`, `.snaplet/snaplet.d.ts`, `.snaplet/id_rsa`, and `snaplet.config.ts`) to your project’s code repository. This will ensure your team uses the values you've specified.
2. This command will also prompt you to provide your **target database credentials** in the form of a connection string.

_💡 Note: Your **target database** is where snapshots are restored to by Snaplet - it’s typically your local development database that your code operates against. Your **source database** is what we capture a snapshot from - typically your production database._

If you intend to code against your local database, use those credentials when prompted for your target database credentials. If you intend to restore this snapshot to an external database that’s acting as your development database, for instance, a Vercel or Neon database, use the connection string from that provider here when prompted. 


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
> Wrote ".snaplet/snaplet.d.ts"
> Wrote ".snaplet/id_rsa"
```


:::note Typescript support

For the `snaplet.config.ts` file to have its full autocompletion capabilities, you need to turn on two typescript compiler options in the `tsconfig.json` of your project:
    
    ```json
    {
        "compilerOptions": {
            "strict": true,
            "noImplicitAny": true
        }
    }
    ```

:::



We have guides specifically for [Vercel](/tutorials/vercel-postgres) and [Neon](/tutorials/neon) integrations if you need more information.

If you’re having connection string issues, read more about connection strings and encoding [here](/references/connection-strings/).

With your configuration set up, you're ready to start restore your first snapshot using the Snaplet CLI! Let's [restore that snapshot](/getting-started/restoring) now. 

If you get stuck, you can always get help on [Discord](https://app.snaplet.dev/chat).
