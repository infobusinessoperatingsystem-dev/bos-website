'use server'

import { createPath, createArticle, createSection } from './content'

export async function seedDatabase() {
  try {
    console.log('[v0] Starting database seed...')

    // 1. Product Strategy Path
    const productStrategyId = await createPath({
      title: 'Product Strategy',
      description: 'Master the fundamentals of product strategy, from market analysis to competitive positioning and product roadmapping.',
      icon: '🎯',
      order: 1,
    })

    const productStrategyArticle1 = await createArticle({
      pathId: productStrategyId,
      title: 'Introduction to Product Strategy',
      description: 'Understand the core principles of product strategy and how it drives business success.',
      readingTime: 8,
      difficulty: 'beginner',
      order: 1,
      objectives: [
        { title: 'Define Product Strategy', description: 'Learn what product strategy is and why it matters' },
        { title: 'Understand Market Positioning', description: 'Explore how to position your product in the market' },
        { title: 'Identify Key Stakeholders', description: 'Recognize the different stakeholders involved in product decisions' },
      ],
    })

    await createSection({
      articleId: productStrategyArticle1,
      title: 'What is Product Strategy?',
      content: `# What is Product Strategy?

Product strategy is a high-level plan that guides a company's approach to building, marketing, and evolving a product or service. It defines what the product does, who it serves, and how it creates value in the marketplace.

## Key Components

**Vision**: A clear picture of what you want the product to become
**Mission**: The specific purpose and goals of the product
**Target Market**: The specific customers you aim to serve
**Value Proposition**: What unique value your product provides
**Competitive Advantage**: How your product stands out from competitors

## Why Product Strategy Matters

A solid product strategy:
- Aligns teams around a common vision
- Helps prioritize features and investments
- Guides decision-making during uncertainty
- Creates focus in a crowded marketplace
- Enables sustainable competitive advantage`,
      order: 1,
    })

    await createSection({
      articleId: productStrategyArticle1,
      title: 'The Product Strategy Framework',
      content: `# The Product Strategy Framework

A robust product strategy framework includes several key layers:

## Market Analysis
- Industry trends and market size
- Customer needs and pain points
- Competitive landscape
- Regulatory environment

## Business Objectives
- Revenue targets
- Market share goals
- Growth milestones
- Profitability targets

## Product Positioning
- Target customer segments
- Key features and capabilities
- Unique value proposition
- Brand positioning

## Execution Plan
- Roadmap and timelines
- Resource requirements
- Success metrics
- Risk mitigation strategies

## Measurement
- Key performance indicators (KPIs)
- Customer satisfaction metrics
- Market penetration rates
- Financial metrics`,
      order: 2,
    })

    // 2. Market Analysis Path
    const marketAnalysisId = await createPath({
      title: 'Market Analysis',
      description: 'Learn techniques for analyzing markets, understanding customer segments, and identifying business opportunities.',
      icon: '📊',
      order: 2,
    })

    const marketAnalysisArticle1 = await createArticle({
      pathId: marketAnalysisId,
      title: 'Customer Segmentation Essentials',
      description: 'Deep dive into customer segmentation strategies and how to identify your most valuable market segments.',
      readingTime: 10,
      difficulty: 'intermediate',
      order: 1,
      objectives: [
        { title: 'Understand Segmentation', description: 'Learn the different approaches to customer segmentation' },
        { title: 'Analyze Segment Value', description: 'Determine which segments offer the most opportunity' },
        { title: 'Create Buyer Personas', description: 'Develop detailed personas for your target segments' },
      ],
    })

    await createSection({
      articleId: marketAnalysisArticle1,
      title: 'Customer Segmentation Methods',
      content: `# Customer Segmentation Methods

Customer segmentation is the process of dividing a market into distinct groups of customers with similar needs, characteristics, or behaviors. Different segmentation approaches provide different insights.

## Demographic Segmentation
- Age, gender, income level
- Education, occupation
- Family status, location

## Psychographic Segmentation
- Values and beliefs
- Lifestyle and interests
- Attitudes and personality traits

## Behavioral Segmentation
- Purchase history
- Usage patterns
- Brand loyalty
- Response to marketing

## Geographic Segmentation
- Country, region, city
- Climate and terrain
- Urban vs. rural

## Firmographic Segmentation (B2B)
- Company size and industry
- Revenue and growth rate
- Location and maturity`,
      order: 1,
    })

    // 3. Competitive Analysis Path
    const competitiveAnalysisId = await createPath({
      title: 'Competitive Analysis',
      description: 'Master frameworks for analyzing competitors, understanding market dynamics, and identifying your competitive advantage.',
      icon: '⚔️',
      order: 3,
    })

    const competitiveAnalysisArticle1 = await createArticle({
      pathId: competitiveAnalysisId,
      title: 'Porter\'s Five Forces Framework',
      description: 'Learn to use Porter\'s Five Forces to analyze competitive intensity and profitability in your industry.',
      readingTime: 12,
      difficulty: 'intermediate',
      order: 1,
      objectives: [
        { title: 'Understand Five Forces', description: 'Identify the five forces that shape industry competition' },
        { title: 'Analyze Your Industry', description: 'Apply the framework to your specific market' },
        { title: 'Identify Strategic Implications', description: 'Determine how forces affect your strategy' },
      ],
    })

    await createSection({
      articleId: competitiveAnalysisArticle1,
      title: 'The Five Forces',
      content: `# Porter's Five Forces Analysis

Porter's Five Forces is a framework for analyzing the competitive intensity and attractiveness of an industry. It identifies five key forces that shape competition.

## 1. Threat of New Entrants
The ease or difficulty of entering the market and competing with existing players.

Factors affecting entry:
- Capital requirements
- Economies of scale
- Brand loyalty
- Access to distribution
- Switching costs

## 2. Bargaining Power of Suppliers
The leverage suppliers have over you in terms of pricing and quality.

Key considerations:
- Number of suppliers available
- Availability of substitutes
- Switching costs
- Supplier concentration
- Importance of your business to suppliers

## 3. Bargaining Power of Buyers
The leverage your customers have in negotiating terms.

Influencing factors:
- Number of buyers
- Buyer concentration
- Product differentiation
- Switching costs
- Price sensitivity

## 4. Threat of Substitute Products
The availability of alternative products or services that meet the same need.

Assessment points:
- Alternative solutions
- Switching costs
- Relative performance
- Price-to-performance ratio

## 5. Competitive Rivalry
The intensity of competition among existing players in the market.

Determining factors:
- Number of competitors
- Industry growth rate
- Exit barriers
- Product differentiation
- Fixed costs`,
      order: 1,
    })

    // 4. Go-to-Market Strategy Path
    const gtmId = await createPath({
      title: 'Go-to-Market Strategy',
      description: 'Develop effective go-to-market strategies for launching products, entering new markets, and accelerating growth.',
      icon: '🚀',
      order: 4,
    })

    const gtmArticle1 = await createArticle({
      pathId: gtmId,
      title: 'Crafting Your Go-to-Market Strategy',
      description: 'Learn the essential components of a successful go-to-market plan and execution framework.',
      readingTime: 11,
      difficulty: 'intermediate',
      order: 1,
      objectives: [
        { title: 'Understand GTM Components', description: 'Learn the key elements of a go-to-market strategy' },
        { title: 'Develop Sales Strategy', description: 'Create a sales approach for your target market' },
        { title: 'Plan Marketing Activities', description: 'Design marketing campaigns and initiatives' },
      ],
    })

    await createSection({
      articleId: gtmArticle1,
      title: 'GTM Strategy Components',
      content: `# Go-to-Market Strategy Components

A comprehensive go-to-market strategy addresses how you will reach customers and achieve adoption of your product or service.

## Target Market Definition
- Customer segments
- Customer persona details
- Market size and opportunity
- Geographic focus

## Value Proposition
- Core benefits offered
- Differentiation vs. competitors
- Key success factors
- Customer problems solved

## Sales Strategy
- Sales model (direct, indirect, hybrid)
- Sales organization structure
- Sales process and cycle
- Pricing and packaging
- Channel partners

## Marketing Strategy
- Brand positioning
- Marketing channels
- Content and messaging
- Demand generation tactics
- Customer acquisition cost targets

## Implementation Timeline
- Key milestones
- Resource requirements
- Budget allocation
- Success metrics
- Risk mitigation`,
      order: 1,
    })

    // 5. Business Model Innovation Path
    const businessModelId = await createPath({
      title: 'Business Model Innovation',
      description: 'Explore innovative business models and how to design sustainable and scalable revenue models.',
      icon: '💡',
      order: 5,
    })

    const businessModelArticle1 = await createArticle({
      pathId: businessModelId,
      title: 'The Business Model Canvas',
      description: 'Master the Business Model Canvas framework for designing and testing business models.',
      readingTime: 9,
      difficulty: 'beginner',
      order: 1,
      objectives: [
        { title: 'Understand Business Model Canvas', description: 'Learn the nine key components of the canvas' },
        { title: 'Design Your Business Model', description: 'Apply the canvas to your own business' },
        { title: 'Test and Iterate', description: 'Develop a process for validating your model' },
      ],
    })

    await createSection({
      articleId: businessModelArticle1,
      title: 'Nine Components of the Business Model Canvas',
      content: `# The Business Model Canvas

The Business Model Canvas is a strategic management template for developing new or documenting existing business models. It divides a business model into nine key components.

## Key Partners
- Strategic alliances and partnerships
- Key supplier relationships
- Co-development partnerships
- Joint ventures

## Key Activities
- Production
- Problem solving
- Platform or network management
- Design and development

## Key Resources
- Physical resources
- Intellectual property
- Human resources
- Financial resources

## Value Propositions
- Newness, performance, customization
- Getting a job done
- Design, brand, status
- Risk reduction
- Price, convenience, accessibility

## Customer Relationships
- Dedicated personal assistance
- Self-service
- Automated service
- Communities
- Co-creation

## Channels
- Awareness (awareness raising)
- Evaluation (help customers evaluate)
- Purchase (enable customer purchase)
- Delivery (deliver value proposition)
- After sales (provide customer support)

## Customer Segments
- Mass market
- Niche market
- Segmented
- Diversified
- Multi-sided platforms

## Cost Structure
- Fixed costs vs. variable costs
- Economies of scale vs. economies of scope
- Direct costs vs. indirect costs

## Revenue Streams
- Asset sales, usage fees, subscription fees
- Lending/renting/leasing
- Licensing, brokerage fees
- Advertising, freemium models`,
      order: 1,
    })

    console.log('[v0] Database seed completed successfully!')
    return { success: true, message: 'Database seeded with learning content' }
  } catch (error) {
    console.error('[v0] Seed error:', error)
    return { success: false, error: String(error) }
  }
}
