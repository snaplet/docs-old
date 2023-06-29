module.exports = {
  docs: [
    {
      type: "doc",
      id: "overview",
    },
    {
      type: "doc",
      id: "quickstart",
    },
    {
      type: "category",
      label: "Getting started",
      collapsible: false,
      items: [
        { type: "doc", id: "getting-started/start-here", label: "Start here!" },
        {
          type: "doc",
          id: "getting-started/configuration",
          label: "Configuration",
        },
        { type: "doc", id: "getting-started/restoring", label: "Restoring" },
        {
          type: "doc",
          id: "getting-started/data-operations",
          label: "Data operations",
        },
        { type: "doc", id: "getting-started/capturing", label: "Capturing" },
        { type: "doc", id: "getting-started/sharing", label: "Sharing" },
        {
          type: "doc",
          id: "getting-started/what-is-next",
          label: "What's next?",
        },
      ],
    },
    {
      type: "category",
      label: "References",
      collapsible: false,
      items: [
        {
          type: "category",
          label: "Data operations",
          collapsible: false,
          items: [
            {
              type: "doc",
              id: "references/data-operations/overview",
              label: "Overview",
            },
            {
              type: "doc",
              id: "references/data-operations/transform",
              label: "Transform",
            },
            {
              type: "doc",
              id: "references/data-operations/exclude",
              label: "Exclude",
            },
            {
              type: "doc",
              id: "references/data-operations/reduce",
              label: "Sample (Reduce) 🐥",
            },
            {
              type: "doc",
              id: "references/data-operations/generate",
              label: "Seed (Generate) 🐥",
            },
          ],
        },
        { type: "doc", id: "references/snapshots", label: "Snapshots" },
        {
          type: "doc",
          id: "references/snaplet-cloud-project",
          label: "Snaplet Cloud Projects",
        },
        {
          type: "doc",
          id: "references/preview-databases",
          label: "Preview databases 🐥",
        },
        { type: "doc", id: "references/cli-commands", label: "CLI Commands" },
        {
          type: "doc",
          id: "references/configuration-files",
          label: "Configuration files",
        },
        {
          type: "doc",
          id: "references/connection-strings",
          label: "Connection strings",
        },
      ],
    },
    {
      type: "category",
      label: "Guides",
      collapsible: false,
      items: [
        { type: "doc", id: "guides/tunnelbase", label: "Local Development Branching Workflow"},
        { type: "doc", id: "guides/self-hosting", label: "Self-hosting" },
        { type: "doc", id: "guides/postgresql", label: "PostgreSQL" },
        {
          type: "doc",
          id: "guides/netlify-preview-plugin",
          label: "Netlify preview plugin",
        },
        {
          type: "doc",
          id: "guides/migration-new-config",
          label: "Migration to new config",
        },
      ],
    },
    {
      type: "category",
      label: "Tutorials",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "tutorials/aws-rds",
          label: "AWS RDS",
        },
        {
          type: "doc",
          id: "tutorials/vercel-postgres",
          label: "Vercel Postgres",
        },
        {
          type: "doc",
          id: "tutorials/neon",
          label: "Neon",
        },
        {
          type: "doc",
          id: "tutorials/github-actions",
          label: "GitHub Actions & snapshots",
        },
        {
          type: "doc",
          id: "tutorials/supabase-clone-environments",
          label: "Supabase",
        },
        { type: "doc", id: "tutorials/prisma-seed", label: "Prisma Seed" }
      ],
    },
    {
      type: "category",
      label: "Other bits",
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "security",
          label: "Security",
        },
      ],
    },
  ],
};
