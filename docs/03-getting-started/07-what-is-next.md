# What's next...

In this getting started guide we've shown you how to capture, transform, share and restore snapshots of your database of your local database.

## Adopting Snaplet in your team

So you've evaluated Snaplet? You like it, and want to adopt it for the rest of your team! Amaze.
Snaplet is designed so that you can entirely or partly self-host it in your own environment.
The easiest path is to use a Snaplet Project, but the decision for doing so is based on your security requirements:

1. If you're comfortable with a 3rd party connecting to you production database (with read-only credentials) then use a **Snaplet Project** to capture snapshots.
If not, then self-host the capture process on a machine that you trust (Like in GitHub Actions).

2. If you're comfortable with uploading encrypted and transformed snapshots to a 3rd party (Snaplet cannot decrypt your snapshots) then use a **Snaplet Project** to share snapshots. If not, then self-host the storage workflow in an environment taht you trust.

Read our [self-hosting guide.](/guides/self-hosting/)

## What's next?

1. Learn more about our other [data operations](/references/data-operations/)
2. Learn more about instant-databases `[coming soon]`
