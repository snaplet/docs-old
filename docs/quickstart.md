# Quickstart

Want to share a snapshot of a database with your team? You're in the right place! Here we'll create a snapshot of your database, whilst removing personally identifiable data, then sharing the snapshot so that your team can restore it.

## Capture a snapshot of your database

1. Install Snaplet CLI: `npm install -g @snaplet/cli`
2. Run `snaplet config setup` in the directory with your source code, this creates a configuration file that adjusts variables in the Snaplet CLI
3. Review `.snaplet/transform.ts` and debug the data transformations via `snaplet proxy`
4. Once happy, run `snaplet snapshot capture` to capture a snapshot of your database

The snapshot is stored in the `.snaplet/snapshots` directory. You now have "a nuggest of data 👑" that you can share with you team so that everyone can code against the same database!

## Sharing a snapshot

1. Run `snaplet auth login`
2. Create a project with `snaplet project setup`
3. Run `snaplet snapshot share --message "My first snapshot"`

The snapshot is uploaded to your project and ready to be restored by your team.

## Restoring a snapshot

1. Add the `.snaplet` folder to your repository. This allows your team to manage how future snapshots are captured
2. Invite members to your team
3. Run `snaplet snapshot list`
4. Run `snaplet snapshot restore`


## What's next...

The above example is slightly contrived since you captured a snapshot of your local database and your team may not want to code against that! Many teams capture from a staging or production database where they use transformations to remove all personally identifiable information and reduce the 


1. Read our more detailed "Getting started guide"
2. Capture snapshots in CI/CD [Coming soon...]
3. Learn about reducing the size of your snapshot via subsetting [Coming soon...]
4. Generate data via `snaplet proxy` [Coming soon...]
