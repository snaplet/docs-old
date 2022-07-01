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
        { type: 'doc', id: 'getting-started/what-is-next', label: "What's next..." },
      ]
    },
    {
      type: 'category',
      label: 'References',
      collapsible: false,
      items: [
        { type: 'doc', id: 'references/data-operations', label: 'Data operations' },
        { type: 'doc', id: 'references/snapshots', label: 'Snapshots'}
        // Snapshot Capture
        // Snapshot Restore
        // Snaplet Project
        // Instant Database  
      ]
    },
    {
      type: 'category',
      label: 'Guides',
      collapsible: false,
      items: [
        // Self-hosting
        // Capturing a small sample of your database
        // Generating data
        { type: 'doc', id: 'guides/postgresql', label: 'PostgreSQL'}
        // GitHub Actions
      ]
    },
    {
      type: 'category',
      label: 'Tutorials',
      collapsible: false,
      items: [
        { type: 'doc', id: 'guides/prisma-seed', label: 'GitHub Actions: Scheduled Snapshot Restoration'},
        { type: 'doc', id: 'guides/prisma-seed', label: 'Prisma Seed'},
        { type: 'doc', id: 'guides/supabase-clone-environments', label: 'Supabase Clone Environments'}
      ]
    }
  ]
};
