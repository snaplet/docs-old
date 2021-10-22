# Transform your data

Now we can copy you're data, but before creating your snapshot, we still need to know how to transform it. In the next step you create a set of transformations operations that are applied to your data during the snapshot process.

## Operations

### Exclude data

Databases often have tables that contain loads of data that isn't really helpful during development. A lot of the time this is log information, and these tables can excluded. We'll still create the structure, but copy none of the data.

<div style={{textAlign: 'center'}}>

![Exclude tables](/screenshots/onboarding_transform_exclude.png)

</div>


### Replace column data

We identify personal information and suggest synthetic data replacements that match those types, for example if your column contains first names we'll suggest you replace it with a set of first name values.

Replacements can be combined with other replacements or static values, such as `${name.firstName()} ${name.lastName()}`

The replacements are consistent across snapshots, that means that a "user with id 107" will always be "Scott." Consistent values are great when writing tests!

<div style={{textAlign: 'center'}}>

![Replace column data](/screenshots/onboarding_transform_replace.png)

</div>

:::note

**Coming soon** Snaplet will analyze your data during snapshot creation and will categorize your data.

:::

### Generate data (Coming soon)

You've just created and don't have enough data? Don't want to write a seed script? You can use a column transformation rule to generate any amount of rows. Generation can be run locally on a per table & column basis.

:::info

**Coming soon!** Are you excited about this feature and want to see it in the world? Join us!

:::


### Subset data (Coming soon)

Ever wanted 10% of your `users` table? Or wanted all the data just for a specific user? Subsetting copies a set of data based on a constraint allows you to quickly gather "just enough" information to squash that bug in production!

:::info

**Coming soon!** Are you excited about this feature and want to see it in the world? Join us!

:::

## Your first snapshot...

We have all the right ingredients to bake your snapshot!