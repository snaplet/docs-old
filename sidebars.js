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
        { type: 'doc', id: 'getting-started/start-here', label: 'Start here!' },
        { type: 'doc', id: 'getting-started/configuration', label: 'Configuration' },
        { type: 'doc', id: 'getting-started/data-operations', label: 'Data operations' },
        { type: 'doc', id: 'getting-started/capturing', label: 'Capturing' },
        { type: 'doc', id: 'getting-started/sharing', label: 'Sharing' },
        { type: 'doc', id: 'getting-started/restoring', label: 'Restoring' },
        { type: 'doc', id: 'getting-started/what-is-next', label: "What's next?" },
      ]
    },
    {
      type: 'category',
      label: 'References',
      collapsible: false,
      items: [
        {
          type: 'category', label: 'Data operations', items: [
            { type: 'doc', id: 'references/data-operations/overview', label: 'Overview' },
            { type: 'doc', id: 'references/data-operations/transform', label: 'Transform' },
            { type: 'doc', id: 'references/data-operations/exclude', label: 'Exclude' },
            { type: 'doc', id: 'references/data-operations/reduce', label: 'Reduce (Subset) 🐥' },
            { type: 'doc', id: 'references/data-operations/generate', label: 'Generate (Seed) 🐥' },
          ]
        },
        { type: 'doc', id: 'references/snapshots', label: 'Snapshots' },
        { type: 'doc', id: 'references/snaplet-projects', label: 'Snaplet Project' },
        { type: 'doc', id: 'references/instant-database', label: 'Instant database 🥚' },
        { type: 'doc', id: 'references/cli-commands', label: 'CLI Commands' },
      ]
    },
    {
      type: 'category',
      label: 'Guides',
      collapsible: false,
      items: [
        { type: 'doc', id: 'guides/self-hosting', label: 'Self-hosting' },
        { type: 'doc', id: 'guides/postgresql', label: 'PostgreSQL' },
      ]
    },
    {
      type: 'category',
      label: 'Tutorials',
      collapsible: false,
      items: [
        { type: 'doc', id: 'tutorials/github-actions', label: 'GitHub Actions & snapshots' },
        { type: 'doc', id: 'tutorials/prisma-seed', label: 'Prisma Seed' },
        { type: 'doc', id: 'tutorials/supabase-clone-environments', label: 'Supabase Clone Environments' }
      ]
    }
  ]
};
