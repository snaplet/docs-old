# Connection strings

> Also know as Connection URIs

To connect to your database the CLI requires database credentials in the form of a connection string. The connection string specifies parameters such as the protocol, username, password, hostname, port, database name and finally a [bunch of parameter keywords](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING) that allow adjustment of various aspects of the connection, like SSL, timeouts, etc.

Here's an example connection string:
```
postgresql://username:password@hostname:5432/database_name
```

## Encoding

The parameters of a connection string **must be percent encoded**, that means that the value `"p@ssword"` needs to be encoded as `"p%40ssword"`. This can be done via the `encodeURIComponent` function in your browser.

```
// TODO: Create a widget that helps people encode the parameters.
```