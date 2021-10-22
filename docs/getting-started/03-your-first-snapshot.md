# Your first snapshot

Snaplet boots up a "snapshot-worker," we call them "piglets," each worker is a distinct container running in an isolated environement.

The worker copies your database objects and data. The data is transformed in stream and uploaded to private storage where it waits to be restored.

<div style={{textAlign: 'center'}}>

![Snappy says "Sup!"](/img/workflow.svg)

</div>

Snapshots are emphemeral, if they're not restored in 7 days, they're deleted and purged.


<div style={{textAlign: 'center'}}>

![Snapshots](/screenshots/onboarding_snapshots.png)
![Snapshots Details](/screenshots/onboarding_snapshots_details.png)

</div>

Whilst your snapshot is booting, and doing _all the work_, it's the perfect time to install the Snaplet CLI, which allows you to restore snapshots onto your development environments.