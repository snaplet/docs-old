# Self-hosting

:::info

This feature and documentation is currently a work in progress.

:::

  In this case you run the command to capture a snapshot of your database on a machine that you trust.

## Hosting the capture process

The Snaplet CLI requires access to your `.snaplet` config directory in order to know _how you want to modify your snapshots._
Many people capture snapshots in CI/CD because it's already trusted, already has access to the `.snaplet` config directory via the source code and fits into a gitops development workflow.

1. Install Snaplet CLI
2. Checkout your source code from repository
3. Run `SNAPLET_DATABASE_URL=[secret] snaplet snapshot capture /tmp/my-snapshot` 

That's it, you have now a snapshot in `/tmp/my-snapshot` that you can upload and share with your team.

## Sharing snapshot via a Snaplet Cloud Project

Run `snaplet snapshot share /tmp/my-snapshot` to upload it to a Snaplet Cloud Project.
