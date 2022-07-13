# Quickstart

Need data to code against? You're in the right place!

In this tutorial we'll create a snapshot of your database, transform the data, and then share that snapshot with your team, so that they can restore it into their own development environments. In doing so, you'll get a basic understanding of how Snaplet works.  

## Capture a snapshot of your database

1. Start by installing the Snaplet CLI. Run: `curl -sL https://app.snaplet.dev/get-cli/ | bash`
2. Run `snaplet config setup` in the directory with your source code. This creates a configuration file that adjusts variables in the Snaplet CLI
3. Review `.snaplet/transform.ts` and debug it via `snaplet proxy`
4. Once happy, run `snaplet snapshot capture` to get your first snapshot of your database

The snapshot is stored in the `.snaplet/snapshots` directory. You now have "a nugget of data 🍗" that you can code against. 

You can also share this snapshot with your team so that everyone can code against the same database!

## Creating a Cloud Project to share snapshots

1. Run `snaplet auth setup`
2. Create a Snaplet Cloud Project with `snaplet project setup`. This is where snapshots are shared with your team
3. Run `snaplet snapshot share --message "My first snapshot"`
4. Run `snaplet snapshot list`

There you go! The snapshot is uploaded to your project and ready to be restored by your team. You can also manage team access and sharing directly from within the [Snaplet cloud application](https://app.snaplet.dev/).   

## Inviting team members and restoring a snapshot

1. Add the `.snaplet` folder to your repository.
The Snaplet CLI uses the configuration to link your source code to a Snaplet Cloud Project.
2. To invite members to your Snaplet Cloud Project, run `snaplet project invite`.
3. Get them to install the CLI, accept the project invite, and have them run `snaplet snapshot restore` to restore your snapshot.

## What's next...

The example above is slightly contrived since you've captured a snapshot of your local development database and your team may not want to code against that.
You may prefer to capture from production or staging, so that the snapshots are a more accurate reflection of the data your code runs against.

1. Read our step-by-step [Getting started guide](/getting-started/start-here/)
2. Read our [self-hosted guide](/guides/self-hosting/)
3. Learn about our [data operations](/references/data-operations/overview)
4. Learn about reducing the size of your snapshot via [subsetting](/references/data-operations/reduce)
5. Empty database? [Generate data!](/references/data-operations/generate)
