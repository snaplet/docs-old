# Generate data

:::note Experimental

This is a preview feature. We would love your [feedback!](https://app.snaplet.dev/chat)

:::

## Understanding seed data

Seed data is a useful tool in software development, providing an initial set of data for your database.

Here's why it's beneficial:

- **Development:** Provides a consistent dataset for developers.
- **Testing:** Ensures predictability when verifying features.
- **Demonstration:** Showcases your software's abilities with example content.
- **Default Data:** Adds necessary built-ins, like country lists.
- **Onboarding:** Gives new users a filled-out starting point.
- **Performance:** Helps simulate heavy usage scenarios.
- **Guides:** Common reference in tutorials.

While seed data might be the unsung hero of early development, it can get a bit needy as software evolves. But don't sweat it! Our mission is to save you from the never-ending saga of maintaining those seed scripts. Who has time for that, right?

## The Snaplet Data Client

The key to effortless seed data is a tool that deeply understands your database's schema. By introspecting your database, we create a fully-typed client dedicated to data generation.

Here is what it looks like:

```typescript title="snaplet.config.ts"
import { defineConfig } from "snaplet";
import { copycat } from "@snaplet/copycat";

export default defineConfig({
   generate: {
      plan({ snaplet }) {
        return snaplet.Post({
          data: {
            title: "There is a lot of snow around here!"
            User: {
                data: {
                  email: copycat.email(seed, { domain: 'acme.org' })
                }
            },
            Comment: {
              count: 3,
            }
          }
        })
      }
   }
});
```

> We drew significant inspiration from our friends at [Prisma](https://www.prisma.io/). If you're familiar with Prisma, using the Snaplet Data Client will feel incredibly intuitive and seamless.

In the given example, here's what we're doing:

- Creating a post with the title "There is a lot of snow around here!".
- The author of the post has an email that ends with "acme.org".
- This post receives 3 comments.