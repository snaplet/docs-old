---
sidebar_position: 2
---

# Add Transformations

Snaplet transforms your data based on a set of rules that you, and your team, specify. This means that you always have control about how you want your data to look in your development environment.

## Operations

### Exclude Data

Databases often contain information, such as `logs`, that aren't really helpful during development, but tend to take a ton of space. These kind of tables can be excluded. Snaplet will copy the structure, but none of the data.


<div style={{textAlign: 'center'}}>

![Exclude tables](/screenshots/onboarding_transform_exclude.png)

</div>


### Replace Column Data

We identify and suggest synthetic data replacements. You can combine, and remove syntheitc replacements, and strip out columns that aren't helpful during development.

<div style={{textAlign: 'center'}}>

![Replace column data](/screenshots/onboarding_transform_replace.png)

</div>

:::note

**Coming soon** Snaplet will analyze your data during snapshot creation and will categorize your data.

:::

### Generate data (Coming soon)

You've just created and don't have enough data? Don't want to write a seed script? You can use a column transformation rule to generate any amount of rows. Generation can be run locally on a per table & column basis.

:::note

**Coming soon!** Are you excited about this feature and want to see it in the world? Join us!

:::


### Subset data (Coming soon)

Ever wanted 10% of your `users` table? Or wanted all the data just for a specific user? Subsetting copies a set of data based on a constraint allows you to quickly gather "just enough" information to squash that bug in production!

:::note

**Coming soon!** Are you excited about this feature and want to see it in the world? Join us!

:::

