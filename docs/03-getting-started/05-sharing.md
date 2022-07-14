# Sharing a snapshot

Now that you have a snapshot you'll likely want to share it with members of your team. You could upload it to S3, but then you'll need to write some glue-code and distribute keys, and that's no fun!
So, we'll just use a Snaplet Cloud Project to host your snapshots instead.

## Setup a Snaplet Cloud Project

Snaplet is designed to be self-hosted, but we also offer the ability partly or completely host it via a Snaplet Cloud Project.
A project can also capture snapshots, but in this guide we'll use it for sharing our snapshots.

1. You'll need a user account in order to create a project, run `snaplet auth setup` to log in or sign up
2. To associate your source code to a Snaplet Cloud Project, run `snaplet project setup`.
   This will update the `.snaplet/config.json` file, which should be added to your repository so that other developers on your team can restore from the same project

## Share!

Run `snaplet snapshot share` and select the snapshot you want to share.

```bash
$ snaplet snapshot share
✔ Snapshot › feed-synthesize                   71.2 MB 52 seconds ago
✔ Snapshot deployed: snaplet snapshot restore feed-synthesize [16s]
```

Your snapshot is encrypted, compressed and uploaded to your project. It's only accessible to developers that you've invited to your team.

**Note:** you can add the `--no-encrypt` flag if you want to keep your keys, but opt out.

## Inviting members to your project

Coming soon: Do this directly via the CLI with `snaplet project invite`

1. Head on over to https://app.snaplet.dev
2. Click on team members
3. Generate a token and share it with them
