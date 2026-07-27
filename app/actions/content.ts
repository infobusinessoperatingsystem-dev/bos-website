'use server'

import { db } from '@/lib/db'
import { learningPaths, articles, sections, adminLogs } from '@/lib/db/schema'
import { eq, desc, asc } from 'drizzle-orm'

// Learning Paths
export async function getLearningPaths() {
  return db.select().from(learningPaths).orderBy(asc(learningPaths.order))
}

export async function getPathById(pathId: string) {
  const result = await db.select().from(learningPaths).where(eq(learningPaths.id, pathId))
  return result[0]
}

export async function createPath(data: { title: string; description: string; icon: string; order: number }) {
  const id = crypto.randomUUID()
  const now = new Date()
  await db.insert(learningPaths).values({
    ...data,
    id,
    createdAt: now,
    updatedAt: now,
  })

  await logChange('create', 'path', id, data.title, {})
  return id
}

export async function updatePath(pathId: string, data: Partial<typeof learningPaths.$inferInsert>) {
  const existing = await getPathById(pathId)
  if (!existing) throw new Error('Path not found')

  const changes: Record<string, { before: any; after: any }> = {}
  Object.keys(data).forEach((key) => {
    if (data[key as keyof typeof data] !== existing[key as keyof typeof existing]) {
      changes[key] = {
        before: existing[key as keyof typeof existing],
        after: data[key as keyof typeof data],
      }
    }
  })

  await db
    .update(learningPaths)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(learningPaths.id, pathId))

  if (Object.keys(changes).length > 0) {
    await logChange('update', 'path', pathId, existing.title, changes)
  }
}

export async function deletePath(pathId: string) {
  const path = await getPathById(pathId)
  if (!path) throw new Error('Path not found')

  await db.delete(learningPaths).where(eq(learningPaths.id, pathId))
  await logChange('delete', 'path', pathId, path.title, {})
}

// Articles
export async function getArticles(pathId: string) {
  return db.select().from(articles).where(eq(articles.pathId, pathId)).orderBy(asc(articles.order))
}

export async function getArticleById(articleId: string) {
  const result = await db.select().from(articles).where(eq(articles.id, articleId))
  return result[0]
}

export async function createArticle(data: {
  pathId: string
  title: string
  description: string
  readingTime: number
  difficulty: string
  order: number
  objectives: Array<{ title: string; description: string }>
}) {
  const id = crypto.randomUUID()
  const now = new Date()
  await db.insert(articles).values({
    ...data,
    id,
    createdAt: now,
    updatedAt: now,
  })

  await logChange('create', 'article', id, data.title, {})
  return id
}

export async function updateArticle(articleId: string, data: Partial<typeof articles.$inferInsert>) {
  const existing = await getArticleById(articleId)
  if (!existing) throw new Error('Article not found')

  const changes: Record<string, { before: any; after: any }> = {}
  Object.keys(data).forEach((key) => {
    if (JSON.stringify(data[key as keyof typeof data]) !== JSON.stringify(existing[key as keyof typeof existing])) {
      changes[key] = {
        before: existing[key as keyof typeof existing],
        after: data[key as keyof typeof data],
      }
    }
  })

  await db
    .update(articles)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(articles.id, articleId))

  if (Object.keys(changes).length > 0) {
    await logChange('update', 'article', articleId, existing.title, changes)
  }
}

export async function deleteArticle(articleId: string) {
  const article = await getArticleById(articleId)
  if (!article) throw new Error('Article not found')

  await db.delete(articles).where(eq(articles.id, articleId))
  await logChange('delete', 'article', articleId, article.title, {})
}

// Sections
export async function getSections(articleId: string) {
  return db.select().from(sections).where(eq(sections.articleId, articleId)).orderBy(asc(sections.order))
}

export async function getSectionById(sectionId: string) {
  const result = await db.select().from(sections).where(eq(sections.id, sectionId))
  return result[0]
}

export async function createSection(data: { articleId: string; title: string; content: string; order: number }) {
  const id = crypto.randomUUID()
  const now = new Date()
  await db.insert(sections).values({
    ...data,
    id,
    createdAt: now,
    updatedAt: now,
  })

  await logChange('create', 'section', id, data.title, {})
  return id
}

export async function updateSection(sectionId: string, data: Partial<typeof sections.$inferInsert>) {
  const existing = await getSectionById(sectionId)
  if (!existing) throw new Error('Section not found')

  const changes: Record<string, { before: any; after: any }> = {}
  Object.keys(data).forEach((key) => {
    if (data[key as keyof typeof data] !== existing[key as keyof typeof existing]) {
      changes[key] = {
        before: existing[key as keyof typeof existing],
        after: data[key as keyof typeof data],
      }
    }
  })

  await db
    .update(sections)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(sections.id, sectionId))

  if (Object.keys(changes).length > 0) {
    await logChange('update', 'section', sectionId, existing.title, changes)
  }
}

export async function deleteSection(sectionId: string) {
  const section = await getSectionById(sectionId)
  if (!section) throw new Error('Section not found')

  await db.delete(sections).where(eq(sections.id, sectionId))
  await logChange('delete', 'section', sectionId, section.title, {})
}

// Admin Logs
export async function getLogs(limit: number = 100) {
  return db.select().from(adminLogs).orderBy(desc(adminLogs.timestamp)).limit(limit)
}

async function logChange(
  action: string,
  entityType: string,
  entityId: string,
  entityTitle: string,
  changes: Record<string, { before: any; after: any }>
) {
  const id = crypto.randomUUID()
  await db.insert(adminLogs).values({
    id,
    action,
    entityType,
    entityId,
    entityTitle,
    changes,
    timestamp: new Date(),
  })
}
