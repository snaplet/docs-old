# Your first snapshot

You've done all the work required to create your first snapshot. We'll boot up a snapshot worker that'll connect to your database, copy and transform your data, and then upload the snapshot into a private bucket.

<div style={{textAlign: 'center'}}>

![Snappy says "Sup!"](/img/workflow.svg)

</div>

Snapshots are emphemeral, if they're not restored in 7 days, they're deleted and purged.


<div style={{textAlign: 'center'}}>

![Snapshots](/screenshots/onboarding_snapshots.png)
![Snapshots Details](/screenshots/onboarding_snapshots_details.png)

</div>

Install the Snaplet CLI whilst you're waiting for the snapshot to finish.
