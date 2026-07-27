export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export interface LearningObjective {
  title: string
  description: string
}

export interface Article {
  id: string
  title: string
  description: string
  readingTime: number
  difficulty: Difficulty
  objectives: LearningObjective[]
  pathId: string
  order: number
  sections: ArticleSection[]
}

export interface ArticleSection {
  id: string
  title: string
  content: string
  type: 'text' | 'diagram' | 'callout' | 'timeline'
  illustration?: string
}

export interface LearningPath {
  id: string
  title: string
  description: string
  color: string
  icon: string
  articles: Article[]
  learningOutcomes: string[]
}

export interface LearningHub {
  featuredArticles: Article[]
  learningPaths: LearningPath[]
}

// Learning Paths Data
export const learningPaths: LearningPath[] = [
  {
    id: 'business-fundamentals',
    title: 'Business Fundamentals',
    description: 'Core principles of modern business operations and management',
    color: '#0969da',
    icon: '📊',
    learningOutcomes: [
      'Understand core business principles',
      'Learn organizational structures',
      'Master financial basics'
    ],
    articles: [
      {
        id: 'article-1',
        title: 'Understanding Business Operations',
        description: 'A comprehensive guide to how businesses operate and manage resources',
        readingTime: 8,
        difficulty: 'beginner',
        pathId: 'business-fundamentals',
        order: 1,
        objectives: [
          { title: 'Business Operations', description: 'Learn core operational concepts' },
          { title: 'Resource Management', description: 'Master resource allocation strategies' }
        ],
        sections: [
          {
            id: 'sec-1-1',
            title: 'What is a Business?',
            content: 'A business is an organized entity focused on delivering products or services to customers while generating sustainable value.',
            type: 'text'
          },
          {
            id: 'sec-1-2',
            title: 'Core Business Functions',
            content: 'Modern businesses operate through interconnected functions: Operations, Finance, Human Resources, Sales, and Customer Service.',
            type: 'text'
          }
        ]
      },
      {
        id: 'article-2',
        title: 'Organizational Structures',
        description: 'Explore different organizational models and hierarchies',
        readingTime: 6,
        difficulty: 'beginner',
        pathId: 'business-fundamentals',
        order: 2,
        objectives: [
          { title: 'Org Structures', description: 'Understand different organizational designs' }
        ],
        sections: [
          {
            id: 'sec-2-1',
            title: 'Types of Organizational Structures',
            content: 'Organizations can be structured hierarchically, in matrix formats, or as flat organizations depending on their needs.',
            type: 'text'
          }
        ]
      }
    ]
  },
  {
    id: 'business-systems',
    title: 'Business Systems',
    description: 'Enterprise systems that power modern organizations',
    color: '#28a745',
    icon: '⚙️',
    learningOutcomes: [
      'Master enterprise systems',
      'Understand process automation',
      'Learn integration strategies'
    ],
    articles: [
      {
        id: 'article-3',
        title: 'Enterprise Resource Planning',
        description: 'Deep dive into ERP systems and their role in modern business',
        readingTime: 10,
        difficulty: 'intermediate',
        pathId: 'business-systems',
        order: 1,
        objectives: [
          { title: 'ERP Fundamentals', description: 'Understand ERP systems' }
        ],
        sections: [
          {
            id: 'sec-3-1',
            title: 'What is ERP?',
            content: 'Enterprise Resource Planning systems integrate all aspects of business operations into a single, unified system.',
            type: 'text'
          }
        ]
      }
    ]
  },
  {
    id: 'software-architecture',
    title: 'Software Architecture',
    description: 'Designing scalable and robust software systems',
    color: '#6f42c1',
    icon: '🏗️',
    learningOutcomes: [
      'Master architectural patterns',
      'Design scalable systems',
      'Understand microservices'
    ],
    articles: [
      {
        id: 'article-4',
        title: 'Microservices Architecture',
        description: 'Building systems with microservices',
        readingTime: 12,
        difficulty: 'advanced',
        pathId: 'software-architecture',
        order: 1,
        objectives: [
          { title: 'Microservices', description: 'Learn microservices architecture' }
        ],
        sections: [
          {
            id: 'sec-4-1',
            title: 'Introduction to Microservices',
            content: 'Microservices architecture breaks down applications into small, independent services that communicate over APIs.',
            type: 'text'
          }
        ]
      }
    ]
  },
  {
    id: 'digital-transformation',
    title: 'Digital Transformation',
    description: 'Navigating business modernization and technology adoption',
    color: '#fd7e14',
    icon: '🚀',
    learningOutcomes: [
      'Understand digital trends',
      'Master transformation strategies',
      'Lead technology adoption'
    ],
    articles: [
      {
        id: 'article-5',
        title: 'Digital Transformation Strategy',
        description: 'Creating effective digital transformation roadmaps',
        readingTime: 9,
        difficulty: 'intermediate',
        pathId: 'digital-transformation',
        order: 1,
        objectives: [
          { title: 'Transformation Strategy', description: 'Build digital strategies' }
        ],
        sections: [
          {
            id: 'sec-5-1',
            title: 'What is Digital Transformation?',
            content: 'Digital transformation is the integration of digital technology into all aspects of business operations.',
            type: 'text'
          }
        ]
      }
    ]
  },
  {
    id: 'case-studies',
    title: 'Case Studies',
    description: 'Real-world examples of successful implementations',
    color: '#dc3545',
    icon: '📖',
    learningOutcomes: [
      'Learn from real implementations',
      'Understand success patterns',
      'Identify best practices'
    ],
    articles: [
      {
        id: 'article-6',
        title: 'Enterprise Modernization Case Study',
        description: 'How a traditional enterprise adopted modern software systems',
        readingTime: 11,
        difficulty: 'intermediate',
        pathId: 'case-studies',
        order: 1,
        objectives: [
          { title: 'Case Study Analysis', description: 'Analyze real-world implementations' }
        ],
        sections: [
          {
            id: 'sec-6-1',
            title: 'Background',
            content: 'This case study explores how a Fortune 500 company successfully modernized their legacy systems.',
            type: 'text'
          }
        ]
      }
    ]
  }
]

export function getLearningPath(pathId: string): LearningPath | undefined {
  return learningPaths.find((path) => path.id === pathId)
}

export function getArticle(pathId: string, articleId: string): Article | undefined {
  const path = getLearningPath(pathId)
  return path?.articles.find((article) => article.id === articleId)
}

export function getAllArticles(): Article[] {
  return learningPaths.flatMap((path) => path.articles)
}

export function getFeaturedArticles(): Article[] {
  const featured = getAllArticles().slice(0, 3)
  return featured
}
