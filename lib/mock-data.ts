export interface Category {
  id: number
  name: string
  slug: string
  created_at: string
}

export interface Tag {
  id: number
  name: string
  slug: string
  created_at: string
}

export interface Story {
  id: string
  author_id: string | null
  title: string
  slug: string
  excerpt: string
  content: string
  thumbnail: string
  thumbnail_public_id: string | null
  category_id: number | null
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
  published_at: string | null
  created_at: string
  updated_at: string
  deleted_at: string | null
  author?: {
    id: string
    name: string
    picture: string | null
  }
  category?: Category
  tags?: Tag[]
  likes_count?: number
  comments_count?: number
  views_count?: number
  is_liked?: boolean
}

export interface Comment {
  id: string
  story_id: string
  user_id: string | null
  content: string
  created_at: string
  user?: {
    id: string
    name: string
    picture: string | null
  }
}

export interface Like {
  id: string
  user_id: string
  story_id: string
  created_at: string
}

export const mockCategories: Category[] = [
  { id: 1, name: "Music", slug: "music", created_at: "2024-01-01T00:00:00Z" },
  { id: 2, name: "Movies", slug: "movies", created_at: "2024-01-01T00:00:00Z" },
  { id: 3, name: "TV Shows", slug: "tv-shows", created_at: "2024-01-01T00:00:00Z" },
  { id: 4, name: "Celebrity News", slug: "celebrity-news", created_at: "2024-01-01T00:00:00Z" },
  { id: 5, name: "Awards", slug: "awards", created_at: "2024-01-01T00:00:00Z" },
]

export const mockTags: Tag[] = [
  { id: 1, name: "Pop", slug: "pop", created_at: "2024-01-01T00:00:00Z" },
  { id: 2, name: "Rock", slug: "rock", created_at: "2024-01-01T00:00:00Z" },
  { id: 3, name: "Hip Hop", slug: "hip-hop", created_at: "2024-01-01T00:00:00Z" },
  { id: 4, name: "Action", slug: "action", created_at: "2024-01-01T00:00:00Z" },
  { id: 5, name: "Drama", slug: "drama", created_at: "2024-01-01T00:00:00Z" },
  { id: 6, name: "Comedy", slug: "comedy", created_at: "2024-01-01T00:00:00Z" },
  { id: 7, name: "Thriller", slug: "thriller", created_at: "2024-01-01T00:00:00Z" },
  { id: 8, name: "Grammy", slug: "grammy", created_at: "2024-01-01T00:00:00Z" },
  { id: 9, name: "Oscar", slug: "oscar", created_at: "2024-01-01T00:00:00Z" },
  { id: 10, name: "Billboard", slug: "billboard", created_at: "2024-01-01T00:00:00Z" },
]

export const mockStories: Story[] = [
  {
    id: "1",
    author_id: "1",
    title: "Taylor Swift Breaks Another Record with Latest Album",
    slug: "taylor-swift-breaks-record-latest-album",
    excerpt:
      "The pop superstar has once again dominated the charts with her newest release, setting unprecedented streaming numbers.",
    content:
      '<h2>Record-Breaking Success</h2><p>Taylor Swift has once again proven her dominance in the music industry with her latest album release. The album has broken multiple streaming records across all major platforms within its first week.</p><p>Industry experts are calling this release a "cultural phenomenon" that transcends typical music boundaries. The album features collaborations with several renowned artists and showcases Swift\'s evolution as both a songwriter and performer.</p><blockquote>"This album represents a new chapter in my artistic journey," Swift commented during a recent interview.</blockquote><p>The success of this album further solidifies Swift\'s position as one of the most influential artists of our generation.</p>',
    thumbnail: "/placeholder.svg?height=400&width=600",
    thumbnail_public_id: null,
    category_id: 1,
    status: "PUBLISHED",
    published_at: "2024-12-06T10:00:00Z",
    created_at: "2024-12-06T09:00:00Z",
    updated_at: "2024-12-06T10:00:00Z",
    deleted_at: null,
    author: { id: "1", name: "John Smith", picture: "/placeholder.svg?height=40&width=40" },
    category: mockCategories[0],
    tags: [mockTags[0], mockTags[7]],
    likes_count: 245,
    comments_count: 32,
    views_count: 1250,
    is_liked: false,
  },
  {
    id: "2",
    author_id: "3",
    title: "Marvel Announces Phase 5 Movie Lineup",
    slug: "marvel-announces-phase-5-movie-lineup",
    excerpt: "The Marvel Cinematic Universe continues to expand with an exciting slate of upcoming superhero films.",
    content:
      "<h2>The Future of Marvel</h2><p>Marvel Studios has officially announced their Phase 5 movie lineup, featuring both beloved returning characters and exciting new additions to the MCU.</p><p>The announcement came during a special presentation that had fans around the world buzzing with excitement. The new phase promises to explore deeper storylines and introduce characters that have been long-awaited by comic book enthusiasts.</p><p>Key highlights include:</p><ul><li>Return of fan-favorite heroes</li><li>Introduction of new cosmic storylines</li><li>Exploration of multiverse concepts</li><li>Diverse casting choices</li></ul><p>This ambitious slate of films is expected to span the next four years, with each movie building toward an epic culmination.</p>",
    thumbnail: "/placeholder.svg?height=400&width=600",
    thumbnail_public_id: null,
    category_id: 2,
    status: "PUBLISHED",
    published_at: "2024-12-05T14:30:00Z",
    created_at: "2024-12-05T13:30:00Z",
    updated_at: "2024-12-05T14:30:00Z",
    deleted_at: null,
    author: { id: "3", name: "Sarah Wilson", picture: "/placeholder.svg?height=40&width=40" },
    category: mockCategories[1],
    tags: [mockTags[3], mockTags[6]],
    likes_count: 189,
    comments_count: 45,
    views_count: 980,
    is_liked: false,
  },
  {
    id: "3",
    author_id: "1",
    title: "Grammy Awards 2024: Complete Winners List",
    slug: "grammy-awards-2024-complete-winners-list",
    excerpt:
      "The biggest night in music delivered unforgettable performances and surprising wins across all categories.",
    content:
      "<h2>A Night to Remember</h2><p>The 2024 Grammy Awards ceremony was filled with spectacular performances, emotional speeches, and some unexpected wins that had the music industry talking.</p><p>This year's ceremony celebrated diversity in music like never before, with winners spanning multiple genres and representing artists from around the globe.</p><h3>Major Category Winners:</h3><ul><li><strong>Album of the Year:</strong> [Winner Name]</li><li><strong>Song of the Year:</strong> [Winner Name]</li><li><strong>Best New Artist:</strong> [Winner Name]</li><li><strong>Record of the Year:</strong> [Winner Name]</li></ul><p>The ceremony also featured tribute performances honoring music legends and showcased the incredible talent of both established and emerging artists.</p>",
    thumbnail: "/placeholder.svg?height=400&width=600",
    thumbnail_public_id: null,
    category_id: 5,
    status: "PUBLISHED",
    published_at: "2024-12-04T20:00:00Z",
    created_at: "2024-12-04T19:00:00Z",
    updated_at: "2024-12-04T20:00:00Z",
    deleted_at: null,
    author: { id: "1", name: "John Smith", picture: "/placeholder.svg?height=40&width=40" },
    category: mockCategories[4],
    tags: [mockTags[7], mockTags[0]],
    likes_count: 312,
    comments_count: 67,
    views_count: 1890,
    is_liked: false,
  },
  {
    id: "4",
    author_id: "3",
    title: "Netflix Original Series Breaks Viewing Records",
    slug: "netflix-original-series-breaks-viewing-records",
    excerpt: "The streaming giant's latest drama series has become the most-watched show in the platform's history.",
    content:
      "<h2>Streaming Success Story</h2><p>Netflix's newest original series has shattered all previous viewing records, becoming the most-watched show in the platform's history within just two weeks of its release.</p><p>The series, which combines elements of drama, thriller, and mystery, has captivated audiences worldwide with its compelling storyline and outstanding performances.</p><p>Critics have praised the show for its:</p><ul><li>Exceptional writing and character development</li><li>High production values</li><li>Diverse and talented cast</li><li>Innovative storytelling techniques</li></ul><p>The success of this series has already led to discussions about potential spin-offs and a confirmed second season.</p>",
    thumbnail: "/placeholder.svg?height=400&width=600",
    thumbnail_public_id: null,
    category_id: 3,
    status: "PUBLISHED",
    published_at: "2024-12-03T16:45:00Z",
    created_at: "2024-12-03T15:45:00Z",
    updated_at: "2024-12-03T16:45:00Z",
    deleted_at: null,
    author: { id: "3", name: "Sarah Wilson", picture: "/placeholder.svg?height=40&width=40" },
    category: mockCategories[2],
    tags: [mockTags[4], mockTags[6]],
    likes_count: 156,
    comments_count: 28,
    views_count: 743,
    is_liked: false,
  },
  {
    id: "5",
    author_id: "1",
    title: "Hip-Hop Artist Announces World Tour",
    slug: "hip-hop-artist-announces-world-tour",
    excerpt: "The chart-topping rapper will embark on a massive global tour spanning six continents.",
    content:
      "<h2>Global Tour Announcement</h2><p>One of hip-hop's biggest stars has announced an ambitious world tour that will take them to over 50 cities across six continents.</p><p>The tour, which is expected to be one of the largest hip-hop tours in recent history, will feature state-of-the-art production and special guest appearances in select cities.</p><p>Fans can expect:</p><ul><li>Performances of all the biggest hits</li><li>New unreleased material</li><li>Interactive stage experiences</li><li>Meet and greet opportunities</li></ul><p>Tickets are expected to sell out quickly, with pre-sales beginning next week for fan club members.</p>",
    thumbnail: "/placeholder.svg?height=400&width=600",
    thumbnail_public_id: null,
    category_id: 1,
    status: "PUBLISHED",
    published_at: "2024-12-02T12:00:00Z",
    created_at: "2024-12-02T11:00:00Z",
    updated_at: "2024-12-02T12:00:00Z",
    deleted_at: null,
    author: { id: "1", name: "John Smith", picture: "/placeholder.svg?height=40&width=40" },
    category: mockCategories[0],
    tags: [mockTags[2]],
    likes_count: 203,
    comments_count: 41,
    views_count: 892,
    is_liked: false,
  },
  {
    id: "6",
    author_id: "1",
    title: "Upcoming Blockbuster Gets Early Reviews",
    slug: "upcoming-blockbuster-gets-early-reviews",
    excerpt: "Critics are raving about the highly anticipated summer blockbuster ahead of its worldwide release.",
    content:
      '<h2>Critical Acclaim</h2><p>Early reviews for this summer\'s most anticipated blockbuster are overwhelmingly positive, with critics praising both the spectacular visual effects and compelling storytelling.</p><p>The film, which has been in development for over three years, represents a significant investment from the studio and features an all-star cast.</p><p>Review highlights include:</p><ul><li>"A masterpiece of modern cinema" - Entertainment Weekly</li><li>"Visually stunning and emotionally resonant" - The Hollywood Reporter</li><li>"Sets a new standard for the genre" - Variety</li></ul><p>With such positive early reception, industry experts are predicting this could be one of the highest-grossing films of the year.</p>',
    thumbnail: "/placeholder.svg?height=400&width=600",
    thumbnail_public_id: null,
    category_id: 2,
    status: "DRAFT",
    published_at: null,
    created_at: "2024-12-01T14:20:00Z",
    updated_at: "2024-12-01T14:20:00Z",
    deleted_at: null,
    author: { id: "1", name: "John Smith", picture: "/placeholder.svg?height=40&width=40" },
    category: mockCategories[1],
    tags: [mockTags[3], mockTags[6]],
    likes_count: 0,
    comments_count: 0,
    views_count: 0,
    is_liked: false,
  },
  {
    id: "7",
    author_id: "3",
    title: "The Rise of AI in Music Production: A Game Changer",
    slug: "ai-music-production-game-changer",
    excerpt: "How artificial intelligence is revolutionizing the way artists create and produce music in 2024.",
    content:
      "<h2>The AI Revolution in Music</h2><p>Artificial intelligence is transforming the music industry in unprecedented ways. From composition to mastering, AI tools are becoming essential for modern music production.</p><p>Artists are now using AI to generate melodies, create harmonies, and even write lyrics. This technology is not replacing human creativity but enhancing it, allowing musicians to explore new sonic territories.</p>",
    thumbnail: "/placeholder.svg?height=400&width=600",
    thumbnail_public_id: null,
    category_id: 1,
    status: "PUBLISHED",
    published_at: "2024-12-06T14:30:00Z",
    created_at: "2024-12-06T13:30:00Z",
    updated_at: "2024-12-06T14:30:00Z",
    deleted_at: null,
    author: { id: "3", name: "Sarah Wilson", picture: "/placeholder.svg?height=40&width=40" },
    category: mockCategories[0],
    tags: [mockTags[0], mockTags[1]],
    likes_count: 89,
    comments_count: 23,
    views_count: 1420,
    is_liked: false,
  },
  {
    id: "8",
    author_id: "1",
    title: "Behind the Scenes: Making of the Year's Biggest Blockbuster",
    slug: "behind-scenes-biggest-blockbuster",
    excerpt:
      "An exclusive look at the production challenges and creative decisions that shaped this year's most anticipated film.",
    content:
      "<h2>Inside the Production</h2><p>Creating a blockbuster film requires months of planning, coordination, and creative problem-solving. This year's biggest hit faced unique challenges that pushed the boundaries of filmmaking.</p><p>From innovative special effects to complex action sequences, every aspect of production was carefully crafted to deliver an unforgettable cinematic experience.</p>",
    thumbnail: "/placeholder.svg?height=400&width=600",
    thumbnail_public_id: null,
    category_id: 2,
    status: "PUBLISHED",
    published_at: "2024-12-05T16:45:00Z",
    created_at: "2024-12-05T15:45:00Z",
    updated_at: "2024-12-05T16:45:00Z",
    deleted_at: null,
    author: { id: "1", name: "John Smith", picture: "/placeholder.svg?height=40&width=40" },
    category: mockCategories[1],
    tags: [mockTags[3], mockTags[4]],
    likes_count: 156,
    comments_count: 34,
    views_count: 2340,
    is_liked: false,
  },
  {
    id: "9",
    author_id: "3",
    title: "Streaming Platform Wars: Who's Winning in 2024?",
    slug: "streaming-platform-wars-2024",
    excerpt:
      "A comprehensive analysis of subscriber numbers, content quality, and market positioning across major platforms.",
    content:
      "<h2>The Streaming Landscape</h2><p>The competition between streaming platforms has never been fiercer. Each service is fighting for viewer attention with exclusive content, competitive pricing, and innovative features.</p><p>Our analysis reveals surprising trends in subscriber growth, content preferences, and market share that are reshaping the entertainment industry.</p>",
    thumbnail: "/placeholder.svg?height=400&width=600",
    thumbnail_public_id: null,
    category_id: 3,
    status: "PUBLISHED",
    published_at: "2024-12-04T12:20:00Z",
    created_at: "2024-12-04T11:20:00Z",
    updated_at: "2024-12-04T12:20:00Z",
    deleted_at: null,
    author: { id: "3", name: "Sarah Wilson", picture: "/placeholder.svg?height=40&width=40" },
    category: mockCategories[2],
    tags: [mockTags[4], mockTags[6]],
    likes_count: 203,
    comments_count: 45,
    views_count: 1890,
    is_liked: false,
  },
]

export const mockComments: Comment[] = [
  {
    id: "1",
    story_id: "1",
    user_id: "2",
    content: "Taylor Swift never fails to amaze! This album is absolutely incredible.",
    created_at: "2024-12-06T11:30:00Z",
    user: { id: "2", name: "Jane Doe", picture: "/placeholder.svg?height=40&width=40" },
  },
  {
    id: "2",
    story_id: "1",
    user_id: "3",
    content: "The production quality on this album is next level. Every track is a masterpiece.",
    created_at: "2024-12-06T12:15:00Z",
    user: { id: "3", name: "Sarah Wilson", picture: "/placeholder.svg?height=40&width=40" },
  },
  {
    id: "3",
    story_id: "2",
    user_id: "2",
    content: "So excited for Phase 5! Marvel keeps getting better and better.",
    created_at: "2024-12-05T15:45:00Z",
    user: { id: "2", name: "Jane Doe", picture: "/placeholder.svg?height=40&width=40" },
  },
]

export const mockLikes: Like[] = [
  {
    id: "1",
    user_id: "2",
    story_id: "1",
    created_at: "2024-12-06T11:00:00Z",
  },
  {
    id: "2",
    user_id: "3",
    story_id: "2",
    created_at: "2024-12-05T15:00:00Z",
  },
]
