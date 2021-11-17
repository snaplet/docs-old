# Self-Signed Certificates

To make Snaplet work with servers using self-signed certificates. Please add `sslmode=no-verify` to the database connection string.

Example

```
export SNAPLET_DATABASE_CONNECTION_STRING='postgresql://<user>:<password>@<host>:<port>/<database>?sslmode=required&ssl=true&sslmode=no-verify'
```
