# Generate data

:::note Experimental

This is a preview feature. We would love your feedback.

:::

## Use cases
Imagine you created a new project with a new database, you designed the schema, and now you need some data to test against. Snaplet allows you to generate fake data for your database. Now you can write tests againt the new data and also experience your UX and UI with the new data.

In another scenario, you have a populated database. You are busy with a feature which adds a new table. No need to write a seed script, Snaplet lets you generate data for the new table.

## Generate data
1. Run `snaplet seed`
2. Select which tables you would like to exclude from the generation process. These tables will also not be cleared.
3. Next enter the amount of rows you would like to generate. 

Snaplet will generate data for the tables in your database while keeping relationships intact.

:::note Nullable Relationships

Forgein keys are used to determine the relationships between tables. Because circular relationships can occur, Snaplet will not generate data for nullable relationships (Forgein keys, where the foreign key can be null).

:::