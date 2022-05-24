/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
module.exports = {
  docs: [
    "index",
    {
      type: "category",
      label: "Getting Started",
      items: [
        "getting-started/create-a-new-datasource",
        "getting-started/add-transformation",
        "getting-started/your-first-snapshot",
        "getting-started/cli-installation",
        "getting-started/cli-setup",
        "getting-started/cli-restore",
        "getting-started/invite-team-members",
        "getting-started/schedule-snapshots",
      ],
    },
    {
      type: "category",
      label: "Transforming data",
      items: [
        "transformations/introduction",
        "transformations/getting-started",
        "transformations/javascript-runtime",
      ],
    },
    {
      type: "category",
      label: "Tutorials",
      items: [
        "tutorials/github-actions-scheduled-restores",
        "tutorials/prisma-seed",
        "tutorials/supabase-clone-environments",
      ],
    },
    "snaplet-cli",
    {
      type: "category",
      label: "PostgresQL wiki",
      items: [
        "postgresql/create-read-only-role",
        "postgresql/grant-ip-address-access",
        "postgresql/self-signed-certificates",
      ],
    },
  ],
};
