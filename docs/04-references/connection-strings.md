# Connection strings

> Also known as Connection URLs

To connect to your database the CLI requires database credentials in the form of a connection string. A PostgreSQL connection url specifies the following parameters:

- **username** (the username used to connect to the database)
- **password** (the password used in the "user" parameter)
- **hostname** (the IP address or domain name of the machine where the server is running)
- **port** (port number on which the server is listening on)
- **database** (name of the database to connect to)

This connection string will also include a collection of parameter keywords (optional) that allow adjustments of various aspects of the url (e.g. SSL, timeouts, etc)

**Here's an example connection string:**

```
postgresql://username:password@hostname:5432/database_name
```

### Troubleshooting

When passing in a connection string to Snaplet, we will attempt to validate and encode the connection string, however you may still have problems with **database names** or **passwords** with special characters **`(%&/:=?@[])`**, you may have to encode these characters manually.

> **Encoding manually:** you can manually encode individual segments of your connection url (password, database, etc.) using [encodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)

If you have trouble configuring your connection string, you can to refer to this [short guide](https://www.prisma.io/dataguide/postgresql/short-guides/connection-uris) or reach out to us on [discord](https://app.snaplet.dev/chat) instead
