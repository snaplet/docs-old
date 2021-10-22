# Your first snapshot

You've made it! You've done all the work required to create your first snapshot. We'll boot up a snapshot-worker which is a distinct container that'll connect to your database, copy and transform your data, and then upload your snapshot into a private bucket.

<div style={{textAlign: 'center'}}>

![Snappy says "Sup!"](/img/workflow.svg)

</div>

Snapshots are emphemeral, if they're not restored in 7 days, they're deleted and purged.


<div style={{textAlign: 'center'}}>

![Snapshots](/screenshots/onboarding_snapshots.png)
![Snapshots Details](/screenshots/onboarding_snapshots_details.png)

</div>

Whilst you wait... it's the perfect time to install the Snaplet CLI, which allows you to restore snapshots onto your development environments.