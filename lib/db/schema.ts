import { pgTable, text, varchar, integer, timestamp, jsonb, boolean, index } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

// Learning Platform Tables
export const learningPaths = pgTable(
  'learning_paths',
  {
    id: text('id').primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description').notNull(),
    icon: varchar('icon', { length: 100 }).notNull(),
    order: integer('order').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    orderIdx: index('learning_paths_order_idx').on(table.order),
  })
)

export const articles = pgTable(
  'articles',
  {
    id: text('id').primaryKey(),
    pathId: text('path_id')
      .notNull()
      .references(() => learningPaths.id, { onDelete: 'cascade' }),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description').notNull(),
    readingTime: integer('reading_time').notNull(),
    difficulty: varchar('difficulty', { length: 50 }).notNull(), // 'beginner', 'intermediate', 'advanced'
    order: integer('order').notNull(),
    objectives: jsonb('objectives').$type<Array<{ title: string; description: string }>>().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    pathIdIdx: index('articles_path_id_idx').on(table.pathId),
    orderIdx: index('articles_order_idx').on(table.order),
  })
)

export const sections = pgTable(
  'sections',
  {
    id: text('id').primaryKey(),
    articleId: text('article_id')
      .notNull()
      .references(() => articles.id, { onDelete: 'cascade' }),
    title: varchar('title', { length: 255 }).notNull(),
    content: text('content').notNull(),
    order: integer('order').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    articleIdIdx: index('sections_article_id_idx').on(table.articleId),
    orderIdx: index('sections_order_idx').on(table.order),
  })
)

export const adminLogs = pgTable(
  'admin_logs',
  {
    id: text('id').primaryKey(),
    action: varchar('action', { length: 100 }).notNull(), // 'create', 'update', 'delete'
    entityType: varchar('entity_type', { length: 100 }).notNull(), // 'article', 'section', 'path'
    entityId: text('entity_id').notNull(),
    entityTitle: varchar('entity_title', { length: 255 }).notNull(),
    changes: jsonb('changes').$type<Record<string, { before: any; after: any }>>().notNull(),
    timestamp: timestamp('timestamp').defaultNow().notNull(),
  },
  (table) => ({
    timestampIdx: index('admin_logs_timestamp_idx').on(table.timestamp),
    entityTypeIdx: index('admin_logs_entity_type_idx').on(table.entityType),
  })
)
