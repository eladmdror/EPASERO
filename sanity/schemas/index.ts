import type { SchemaTypeDefinition } from 'sanity'
import { project } from './project'
import { faq } from './faq'
import { post } from './post'

export const schemaTypes: SchemaTypeDefinition[] = [project, faq, post]
