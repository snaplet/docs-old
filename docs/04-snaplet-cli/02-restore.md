
To create an on demand snapshot use `snaplet restore --new`. This will boot up a snapshot-worker, poll the status of that snapshot, and continue restoring it when it's completed.

## Command flags:

- `--new`: Create a new snapshot, wait for it to complete, and restore it.
- `--no-backup`: Do not ask to backup the database. Just remove it.
- `--no-data`: Only restore the database structure, skip the data.
- `--db-name=my_database_name`: Restore to a databased named "my_database_name"
