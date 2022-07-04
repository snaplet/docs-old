# Sharing a snapshot

Now that you have a snapshot you'll likely want to share it with members of your team. You could upload it to S3, but then you'll need to write some glue-code and distribute keys, and that's no fun!
So, we'll just use a Snaplet Project to host your snapshots instead.

## Setup a Snaplet Project

Snaplet is designed to be self-hosted, but we also offer the ability partly or completely host it via a Snaplet Project.
A project can also capture snapshots, but in this guide we'll use it for sharing our snapshots.

1. You'll need a user account in order to create a project, run `snaplet auth setup` to log in or sign up
2. To associate your source code to a Snaplet Project, run `snaplet project setup`.
This will update the `.snaplet/config.json` file, which should be added to your repository so that other developers on your team can restore from the same project

## Share!

Run `snaplet snapshot share` and select the snapshot you want to share.

```bash
$ snaplet snapshot share
✔ Snapshot › feed-synthesize                   71.2 MB 52 seconds ago
✔ Snapshot deployed: snaplet snapshot restore feed-synthesize [16s]
```

Your snapshot is compressed and uploaded to your project. It's only accessible to developers that you've invited to your team.

Public/ Priavate key encrpytion is coming soon!

## Inviting members to your project

Coming soon: Do this directly via the CLI with `snaplet project invite`

1. Head on over to https://app.snaplet.dev
2. Click on team members
3. Generate a token and share it with them


