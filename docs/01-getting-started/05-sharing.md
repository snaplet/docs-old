# Sharing a snapshot

Use a Snaplet Project to share your snapshots. 
A project is a place where a team can share snapshots and boot up instant-on-demand databases (coming soon).

## Setup

1. You'll need a user account in order to create a project, run `snaplet auth setup` to log in or sign up
2. To associate your source code to a Snaplet Project, run `snaplet project setup`.
This will update the `.snaplet/config.json` file, which should be added to your repository so that it's shared with other developers on your team.

## Share!

Now that you've associated your source code to a Snaplet Project you'll be able to share snapshots. Your team will also be able to restore snapshots.

```bash
$ snaplet snapshot share
✔ Snapshot › feed-synthesize                   71.2 MB 52 seconds ago
✔ Snapshot deployed: snaplet snapshot restore feed-synthesize [16s]
```

Your snapshot is encrypted, compressed and uploaded to your project.
It's now ready to be restored by the rest of your team.

