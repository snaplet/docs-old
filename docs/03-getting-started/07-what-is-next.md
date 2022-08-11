# What's next?

In this getting started guide we've shown you how to capture, transform, share and restore snapshots of your local development database. In doing so, we hope to have demonstrated how Snaplet can empower you and your team with a safe, minimized version of a database with production-realistic data that you can all code against.

## Adopting Snaplet in your team

So you've evaluated Snaplet, you like it, and want to adopt it for the rest of your team, using your production or staging database? We're so glad! Snaplet is designed so that you can entirely or partly self-host it in your own environment, depending on your own security requirements and workflow.

1. If you're comfortable with a 3rd party connecting to your staging/production database (with read-only credentials) then use a **Snaplet Cloud Project** to capture snapshots.
If not, you can self-host the capture process in your own trusted environment (eg: GitHub Actions, Fargate worker, EC2 instance).

2. If you're comfortable with uploading encrypted and transformed snapshots to a 3rd party (Snaplet cannot decrypt your snapshots) then use a **Snaplet Cloud Project** to share snapshots. If not, you can self-host and manage the storage workflow in an environment that you trust.

Read our [self-hosting guide.](/guides/self-hosting/)

## Learn more!

1. Learn more about our other [data operations](/references/data-operations/overview)
2. Need a preview database in a snap? Learn more about [preview-databases](/references/preview-databases/)
