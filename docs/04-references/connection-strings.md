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

If you having trouble configuring your connection string, you can refer to this [short guide](https://www.prisma.io/dataguide/postgresql/short-guides/connection-uris) put together by the Prisma team.
