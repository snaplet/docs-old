# Sharing a snapshot

Now that you have a snapshot you'll likely want to share it with members of your team. While you can always self-host your snapshots on your own cloud service, Snaplet Cloud makes it super easy to host and share your snapshots with your team from within the CLI.  

## Setup a Snaplet Cloud Project

In order to share your snapshots with your team, you'll need a Snaplet Cloud user account. (Snaplet Cloud can also be used to capture snapshots, but we'll just be using it here for sharing.)

1. You need a user account to create a project. Run `snaplet auth setup` to log in or sign up to Snaplet Cloud
2. Link your source code to a Snaplet Cloud Project. Run `snaplet project setup`.
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

Invite members to your project directly via the CLI with `snaplet project invite`

You can also manage invites via the Snaplet web app:
1. Head on over to https://app.snaplet.dev
2. Click on team members
3. Generate a token and share it with them



## Sharing without Snaplet Cloud
Don't want Snaplet to host and share your snapshots? Upload them to your own cloud hosting service instead! You'll need to write some glue code and distribute keys, but snapshots can be hosted exclusively on your own environment if that's your preference. 
