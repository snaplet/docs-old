# Quickstart

Want to share a snapshot of a database with your team? You're in the right place!

In the next few steps we'll create a snapshot of your database, whilst transforming the data, then sharing that snapshot with your team, so that they can restore it into their own development environment.

## Capture a snapshot of your database

1. Install Snaplet CLI, run: `curl -sL https://app.snaplet.dev/get-cli/ | bash`
2. Run `snaplet config setup` in the directory with your source code, this creates a configuration file that adjusts variables in the Snaplet CLI
3. Review `.snaplet/transform.ts` and debug it via `snaplet proxy`
4. Once happy, run `snaplet snapshot capture` to get your first snapshot of your database

The snapshot is stored in the `.snaplet/snapshots` directory.
You now have "a nuggest of data 🐥" that you can share with you team so that everyone can code against the same database!

## Sharing a snapshot

1. Run `snaplet auth setup`
2. Create a project with `snaplet project setup`. A project is where snapshots are shared with your team.
3. Run `snaplet snapshot share --message "My first snapshot"`
4. Run `snaplet snapshot list`

There you go! The snapshot is uploaded to your project and ready to be restored by your team.

## Restoring a snapshot

1. Add the `.snaplet` folder to your repository. The Snaplet CLI uses the configuration to link your source code to a Snaplet Project.
2. Invite members to your project at http://app.snaplet.dev
3. Get them to install the CLI, accept the project invite, and run `snaplet snapshot restore`

## What's next...

The example above is slightly contrived since you've captured a snapshot of your local development database and your team may not want to code against that.
You may want to capture from production or staging, so that the snapshots are an accurate reflection of the data your code runs against.

1. Read our step-by-step [Getting started guide](/getting-started/start-here/)
2. Read our self-hosted snaphost guide [coming soon...]
3. Learn about our [data operations](/references/data-operations/)
4. Learn about reducing the size of your snapshot via subsetting [Coming soon...]
5. Generate data [Coming soon...]
