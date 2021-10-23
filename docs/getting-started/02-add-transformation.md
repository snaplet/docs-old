# Transform your data

Before creating your snapshot we want to know how to transform your data during the snapshot process.

## Operations

### Exclude data

Databases often have tables that contain loads of machine generated data, like logs, that aren't really helpful during development. Since the code doesn't operate against this data, it can be safely excluded, and Snaplet will still create the table's structure, but copy none of the data.

<div style={{textAlign: 'center'}}>

![Exclude tables](/screenshots/onboarding_transform_exclude.png)

</div>


### Replace column data

We identify personal information and suggest synthetic data replacements that match those types, for example if your column contains "first names" we'll suggest you replace it with a set of synthetic first name values.

synthetic values can be combined with other synthetic values and static values, such as `Mr ${name.firstName()} ${name.lastName()}`

The replacements are consistent across snapshots, so that means that a "user with id 107" will always be "Scott." Consistent values are great when writing tests!

<div style={{textAlign: 'center'}}>

![Replace column data](/screenshots/onboarding_transform_replace.png)

</div>

:::note

**Coming soon** Snaplet will analyze your data during snapshot creation and categorize your data.

:::

### Generate data (Coming soon)

Just added a column and don't have good data? Define a set of synthetic values and Snaplet can generate any amount of rows.

:::info

**Coming soon!** Are you excited about this feature and want to see it in the world? Join us!

:::


### Subset data (Coming soon)

Only want 10% of your `users` table? Or want all the data for a specific user? Subsetting copies a set of data based on a constraint. Snaplet quickly gathers "just enough" information to squash that bug in production!

:::info

**Coming soon!** Are you excited about this feature and want to see it in the world? Join us!

:::

## Your first snapshot...

We have all the right ingredients to bake your snapshot!