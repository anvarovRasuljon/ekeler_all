const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'nv4mugkl',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

module.exports = client
