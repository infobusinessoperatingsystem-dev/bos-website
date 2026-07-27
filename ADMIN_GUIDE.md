# Business OS Learning Platform - Admin Guide

## Overview

The Business OS Learning Platform is a comprehensive content management system for professional learning and development. This guide explains how to access and manage the learning content through the admin dashboard.

## Access & Authentication

### Admin Login
- Navigate to `/admin/login`
- Enter your 4-digit PIN (stored in the `ADMIN_PIN` environment variable)
- Access is granted for 7 days before requiring re-authentication

### Environment Setup
Ensure the following environment variables are configured:
- `ADMIN_PIN`: Your 4-digit access code (e.g., "1234")
- `DATABASE_URL`: Neon Postgres connection string
- `BETTER_AUTH_SECRET`: Random string for session management

## Admin Dashboard Features

### 1. Dashboard Overview
The overview tab displays key metrics:
- **Total Learning Paths**: Number of active learning paths
- **Total Articles**: Complete count of published articles
- **Recent Changes**: Track of modifications in the last 24 hours
- **Quick Start Guide**: Links to key features

### 2. Content Manager
Comprehensive content management with three-tier structure:

#### Learning Paths
A path is a collection of related articles organized around a topic.

**Create/Edit Path**:
- Title: Name of the learning path
- Description: Overview of what students will learn
- Icon: Single emoji representing the path
- Display Order: Determines position in the learning hub

**Available Paths**:
1. **Product Strategy** (🎯) - Master product strategy fundamentals
2. **Market Analysis** (📊) - Analyze markets and customer segments  
3. **Competitive Analysis** (⚔️) - Understand competitive dynamics
4. **Go-to-Market Strategy** (🚀) - Launch products effectively
5. **Business Model Innovation** (💡) - Design sustainable business models

#### Articles
Articles are in-depth content pieces within a path, containing multiple sections.

**Create/Edit Article**:
- Title: Article headline
- Description: Brief overview
- Reading Time: Estimated minutes to complete
- Difficulty: Beginner, Intermediate, or Advanced
- Display Order: Position within the path
- Learning Objectives: What students will achieve (add multiple)

**Article Properties**:
- Each objective has a title and description
- Objectives are displayed on the learning hub
- Reading time helps students plan their learning

#### Sections
Sections are content blocks within articles, supporting Markdown formatting.

**Create/Edit Section**:
- Title: Section heading
- Content: Write in Markdown format
- Display Order: Position within the article
- Live Preview: See formatted content as you type

**Markdown Support**:
```markdown
# Heading 1
## Heading 2
**Bold text**
*Italic text*
- Bullet lists
- Multiple items
[Links](https://example.com)
```code blocks```
```

### 3. Logs & Audit Trail
Track all content changes with detailed audit information.

**Log Features**:
- **Filter by Action**: View created, updated, or deleted items
- **Detailed Change History**: See before/after values for edits
- **Timestamps**: Know when each change occurred
- **Entity Reference**: Track which item was modified

**Change Information**:
- Action type (create/update/delete)
- Entity type (path/article/section)
- Entity title for reference
- Complete change details with before/after values

## Database Schema

### Tables

#### learning_paths
```sql
- id: TEXT PRIMARY KEY
- title: VARCHAR(255)
- description: TEXT
- icon: VARCHAR(100)
- order: INTEGER
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

#### articles
```sql
- id: TEXT PRIMARY KEY
- path_id: TEXT FOREIGN KEY → learning_paths.id
- title: VARCHAR(255)
- description: TEXT
- reading_time: INTEGER
- difficulty: VARCHAR(50) -- 'beginner', 'intermediate', 'advanced'
- order: INTEGER
- objectives: JSONB -- Array of {title, description}
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

#### sections
```sql
- id: TEXT PRIMARY KEY
- article_id: TEXT FOREIGN KEY → articles.id
- title: VARCHAR(255)
- content: TEXT (Markdown)
- order: INTEGER
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

#### admin_logs
```sql
- id: TEXT PRIMARY KEY
- action: VARCHAR(100) -- 'create', 'update', 'delete'
- entity_type: VARCHAR(100) -- 'path', 'article', 'section'
- entity_id: TEXT
- entity_title: VARCHAR(255)
- changes: JSONB -- {fieldName: {before, after}}
- timestamp: TIMESTAMP
```

## Initial Setup

### 1. Seed the Database
Run the seed operation to populate the database with professional learning content:

```bash
# Navigate to the seed page
http://localhost:3000/admin/seed

# Click "Seed Database" to initialize with 5 learning paths and sample content
```

This creates:
- 5 learning paths with professional descriptions
- 5+ detailed articles with real-world examples
- 12+ comprehensive sections with structured content
- Complete audit trail of all operations

### 2. Customize Content
After seeding, you can:
- Edit existing paths, articles, and sections
- Delete items you don't need
- Add your own content
- Rearrange ordering

## Best Practices

### Content Organization
- Keep path descriptions concise (1-2 sentences)
- Use difficulty levels consistently
- Set reading times based on actual content length
- Order items logically for learning flow

### Markdown Writing
- Use headers to structure content (h2, h3)
- Keep paragraphs short and scannable
- Include code examples in fenced code blocks
- Use lists for step-by-step instructions
- Add relevant links to external resources

### Change Management
- Review the logs regularly to track activity
- Use descriptive titles for clarity
- Keep objectives specific and measurable
- Test sections before publishing

### Performance
- Keep article titles under 100 characters
- Use concise objective descriptions
- Optimize section content length
- Consider readability and engagement

## Troubleshooting

### Cannot Access Admin
- Verify PIN is correct (check `.env` file)
- Ensure cookies are enabled in your browser
- Try clearing browser cache and logging in again

### Changes Not Saving
- Check database connection (DATABASE_URL)
- Verify all required fields are filled
- Look at browser console for error messages
- Check server logs in v0_debug_logs.log

### Missing Learning Paths
- Run the seed operation if database is empty
- Verify database tables exist
- Check logs to see what items were created

## API & Database Access

The system uses:
- **Neon Postgres**: Primary database
- **Drizzle ORM**: Type-safe database queries
- **Next.js Server Actions**: Backend operations
- **Cookies**: Admin session management

All database operations include automatic audit logging.

## Security Notes

- PIN-based access is suitable for internal admin use
- For production, consider adding role-based access control
- Never share your PIN in code repositories
- Logs contain audit trails for accountability
- Session cookies expire after 7 days

---

For more information about the Business OS Learning Platform, visit the main dashboard or contact your administrator.
