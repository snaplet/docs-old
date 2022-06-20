


module.exports = {
  docs: [
    {
      type: 'doc',
      id: 'overview',
    },
    {
      type: 'doc',
      id: 'quickstart',
    },
    {
      type: 'category',
      label: 'Getting started',
      collapsible: false,
      items: [
        { type: 'doc', id: 'getting-started/installation', label: 'Installation' },
        { type: 'doc', id: 'getting-started/configuration', label: 'Configuration' }
      ]
    }
  ]
  // "index",
  // {
  //   type: "category",
  //   label: "Introduction",
  //   items: [
  //     'index',
  //   ]
  // }
  //   "index",
  //   {
  //     type: "",
  //     label: "Quickstart",
  //     link: {
  //       type: ''
  //     }
  //   },
  //   {
  //     type: "category",
  //     label: "Getting Started",
  //     collapsed: true,
  //     items: [
  //       "getting-started/create-a-new-datasource",
  //       "getting-started/add-transformation",
  //       "getting-started/your-first-snapshot",
  //       "getting-started/cli-installation",
  //       "getting-started/cli-setup",
  //       "getting-started/cli-restore",
  //       "getting-started/invite-team-members",
  //       "getting-started/schedule-snapshots",
  //     ],
  //   },
  //   {
  //     type: "category",
  //     label: "Transforming data",
  //     collapsed: true,
  //     items: [
  //       "transformations/introduction",
  //       "transformations/getting-started",
  //       "transformations/javascript-runtime",
  //     ],
  //   },
  //   {
  //     type: "category",
  //     label: "Tutorials",
  //     collapsed: true,
  //     items: [
  //       "tutorials/github-actions-scheduled-restores",
  //       "tutorials/prisma-seed",
  //       "tutorials/supabase-clone-environments",
  //     ],
  //   },
  //   "snaplet-cli",
  //   {
  //     type: "category",
  //     label: "PostgresQL wiki",
  //     collapsed: true,
  //     items: [
  //       "postgresql/create-read-only-role",
  //       "postgresql/grant-ip-address-access",
  //       "postgresql/self-signed-certificates",
  //     ],
  //   },
  // ],
};
