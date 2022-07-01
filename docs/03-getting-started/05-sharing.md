# Sharing a snapshot

Use a Snaplet Project to share your snapshots. 

## Setup

1. You'll need a user account in order to create a project, run `snaplet auth setup` to log in or sign up
2. To associate your source code to a Snaplet Project, run `snaplet project setup`.
This will update the `.snaplet/config.json` file, which should be added to your repository so that other developers on your team can restore from the same project.

## Share!

Run `snaplet snapshot share` and select the snapshot you want to share.

```bash
$ snaplet snapshot share
✔ Snapshot › feed-synthesize                   71.2 MB 52 seconds ago
✔ Snapshot deployed: snaplet snapshot restore feed-synthesize [16s]
```

Your snapshot is compressed and uploaded to your project. It's only accessible to developers that you've invited to your team.

## Inviting members to your project

1. Head on over to https://app.snaplet.dev
2. Click on team members
3. Generate a token and share it with them

Coming soon: Do this directly via the CLI with `snaplet project invite`
