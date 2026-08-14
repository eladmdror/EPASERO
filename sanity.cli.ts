import { defineCliConfig } from 'sanity/cli'
import { dataset, projectId } from './sanity/env'

/**
 * Config for the `sanity` command line tool — used for the one-off content
 * import and for any future dataset export/backup.
 *
 * It reads the same env values as the site itself, so there is a single place
 * the project ID is defined and the two cannot drift apart.
 */
export default defineCliConfig({
  api: { projectId, dataset },
})
