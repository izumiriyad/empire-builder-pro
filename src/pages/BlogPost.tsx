import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Calendar, Clock } from "lucide-react";

import guidesThumbnail from "@/assets/blog/guides-thumbnail.jpg";
import listsThumbnail from "@/assets/blog/lists-thumbnail.jpg";
import insightsThumbnail from "@/assets/blog/insights-thumbnail.jpg";
import trendingThumbnail from "@/assets/blog/trending-thumbnail.jpg";
import communitiesThumbnail from "@/assets/blog/communities-thumbnail.jpg";

const categoryImages: Record<string, string> = {
  Guides: guidesThumbnail,
  Lists: listsThumbnail,
  Insights: insightsThumbnail,
  Trending: trendingThumbnail,
  Communities: communitiesThumbnail,
};

const blogContent: Record<string, {
  title: string;
  metaDescription: string;
  keywords: string;
  date: string;
  readTime: string;
  category: string;
  content: React.ReactNode;
}> = {
  "best-telegram-channels-exclusive-content": {
    title: "Best Telegram Channels for Exclusive Content in 2025",
    metaDescription: "Discover the top Telegram channels offering premium exclusive content, behind-the-scenes access, and VIP community experiences in 2025.",
    keywords: "best telegram channels, exclusive content telegram, premium telegram channels, telegram vip",
    date: "2025-01-08",
    readTime: "5 min read",
    category: "Guides",
    content: (
      <>
        <p className="text-lg text-muted-foreground mb-6">
          Looking for the <strong>best Telegram channels for exclusive content</strong>? You're in the right place. 
          Telegram has become the go-to platform for creators who want to share premium content directly with their audience.
        </p>
        
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Why Telegram for Exclusive Content?</h2>
        <p className="text-muted-foreground mb-4">
          Unlike other platforms that take massive cuts and restrict content, Telegram offers creators full control. 
          No algorithm changes, no shadow banning, just direct access to your audience.
        </p>
        
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Top Features to Look For</h2>
        <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
          <li>Regular content updates (weekly or more)</li>
          <li>Behind-the-scenes and exclusive drops</li>
          <li>Direct interaction with the creator</li>
          <li>VIP community access</li>
          <li>Early access to new releases</li>
        </ul>
        
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Our Top Pick</h2>
        <p className="text-muted-foreground mb-6">
          After reviewing dozens of channels, one stands out for quality, consistency, and value. 
          Join our recommended channel below for instant access to premium content.
        </p>
      </>
    ),
  },
  "free-premium-telegram-groups": {
    title: "Free Premium Telegram Groups You Need to Join",
    metaDescription: "Find the best free Telegram groups offering premium-quality content. Updated list of top free telegram channels and communities.",
    keywords: "free telegram groups, free premium telegram, telegram groups free, best free telegram",
    date: "2025-01-07",
    readTime: "4 min read",
    category: "Lists",
    content: (
      <>
        <p className="text-lg text-muted-foreground mb-6">
          Want access to <strong>premium content without paying</strong>? These <strong>free Telegram groups</strong> offer 
          incredible value and quality content at no cost.
        </p>
        
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Best Free Telegram Groups in 2025</h2>
        <p className="text-muted-foreground mb-4">
          The best creators often offer free previews of their content to build trust. Here's what to look for 
          in quality free groups.
        </p>
        
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">What Makes a Great Free Group?</h2>
        <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
          <li>Consistent posting schedule</li>
          <li>High-quality preview content</li>
          <li>Active community engagement</li>
          <li>Clear upgrade path for premium access</li>
        </ul>
        
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Get Started Free</h2>
        <p className="text-muted-foreground mb-6">
          Join our community channel for free access to exclusive previews and weekly content drops. 
          No payment required to get started.
        </p>
      </>
    ),
  },
  "telegram-vs-other-platforms": {
    title: "Why Creators Are Moving to Telegram in 2025",
    metaDescription: "Learn why top content creators are choosing Telegram over traditional platforms. Benefits, features, and how to find the best channels.",
    keywords: "telegram for creators, telegram vs patreon, telegram content platform, creator telegram",
    date: "2025-01-06",
    readTime: "6 min read",
    category: "Insights",
    content: (
      <>
        <p className="text-lg text-muted-foreground mb-6">
          There's a major shift happening in the creator economy. <strong>Telegram is rapidly becoming the 
          preferred platform</strong> for exclusive content delivery. Here's why.
        </p>
        
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">The Problem with Traditional Platforms</h2>
        <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
          <li>High platform fees (20-30% cuts)</li>
          <li>Algorithm changes affecting reach</li>
          <li>Content restrictions and bans</li>
          <li>No direct audience relationship</li>
        </ul>
        
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Why Telegram Wins</h2>
        <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
          <li>100% direct delivery - no algorithm</li>
          <li>Lower fees, more earnings for creators</li>
          <li>Built-in messaging and community features</li>
          <li>Privacy-focused platform</li>
          <li>Works worldwide without restrictions</li>
        </ul>
        
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Join the Movement</h2>
        <p className="text-muted-foreground mb-6">
          Ready to experience the difference? Join our Telegram channel and see why thousands of 
          members are making the switch.
        </p>
      </>
    ),
  },
  "telegram-viral-channels-trending": {
    title: "Top Telegram Viral Channels Going Trending in 2025",
    metaDescription: "Find the most viral Telegram channels with trending content. Discover channels blowing up with millions of subscribers.",
    keywords: "telegram viral channels, trending telegram, viral telegram groups, popular telegram channels",
    date: "2025-01-05",
    readTime: "5 min read",
    category: "Trending",
    content: (
      <>
        <p className="text-lg text-muted-foreground mb-6">
          Want to discover <strong>viral Telegram channels</strong> before everyone else? These trending channels 
          are exploding in popularity with fresh content daily.
        </p>
        
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">What Makes a Channel Go Viral?</h2>
        <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
          <li>Unique, high-quality content that stands out</li>
          <li>Consistent posting schedule</li>
          <li>Strong community engagement</li>
          <li>Exclusive drops and early access</li>
          <li>Word-of-mouth recommendations</li>
        </ul>
        
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Trending Channels to Watch</h2>
        <p className="text-muted-foreground mb-4">
          The best viral channels share one thing in common: they deliver value consistently. 
          Here's what sets the trending channels apart from the rest.
        </p>
        
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Join the Trend</h2>
        <p className="text-muted-foreground mb-6">
          Don't miss out on the next big thing. Join our viral channel and see why thousands 
          are subscribing every day.
        </p>
      </>
    ),
  },
  "exclusive-telegram-communities-join": {
    title: "Exclusive Telegram Communities Worth Joining",
    metaDescription: "Discover private and exclusive Telegram communities offering unique content, networking, and insider access in 2025.",
    keywords: "exclusive telegram communities, private telegram groups, telegram vip community, members only telegram",
    date: "2025-01-04",
    readTime: "4 min read",
    category: "Communities",
    content: (
      <>
        <p className="text-lg text-muted-foreground mb-6">
          Looking for <strong>exclusive Telegram communities</strong>? These private groups offer 
          content and connections you won't find anywhere else.
        </p>
        
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Benefits of Exclusive Communities</h2>
        <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
          <li>Access to members-only content</li>
          <li>Direct networking with like-minded people</li>
          <li>Insider information and early access</li>
          <li>Higher quality discussions</li>
          <li>Personal connections with creators</li>
        </ul>
        
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Finding Quality Communities</h2>
        <p className="text-muted-foreground mb-4">
          The best exclusive communities are curated and maintained by dedicated moderators. 
          Look for active engagement and regular content updates.
        </p>
        
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Get Exclusive Access</h2>
        <p className="text-muted-foreground mb-6">
          Ready to join an exclusive community? Click below to get instant access to our 
          members-only Telegram group.
        </p>
      </>
    ),
  },
  "telegram-private-channels-guide": {
    title: "How to Find Private Telegram Channels in 2025",
    metaDescription: "Complete guide to discovering and joining private Telegram channels with exclusive members-only content.",
    keywords: "private telegram channels, find telegram channels, telegram channel search, hidden telegram groups",
    date: "2025-01-03",
    readTime: "6 min read",
    category: "Guides",
    content: (
      <>
        <p className="text-lg text-muted-foreground mb-6">
          <strong>Private Telegram channels</strong> offer exclusive content that isn't available to the public. 
          Here's how to find and join the best ones.
        </p>
        
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Why Private Channels?</h2>
        <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
          <li>Exclusive content not available elsewhere</li>
          <li>Smaller, more engaged communities</li>
          <li>Direct access to premium creators</li>
          <li>Higher quality content curation</li>
        </ul>
        
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">How to Find Private Channels</h2>
        <p className="text-muted-foreground mb-4">
          Private channels aren't searchable on Telegram, so you need to know where to look. 
          The best way is through trusted recommendations and creator networks.
        </p>
        
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Join Our Private Channel</h2>
        <p className="text-muted-foreground mb-6">
          Skip the search and join our curated private channel directly. Get instant access 
          to exclusive content and a premium community.
        </p>
      </>
    ),
  },
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogContent[slug] : null;
  
  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Post Not Found</h1>
          <Link to="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  // JSON-LD structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.metaDescription,
    "datePublished": post.date,
    "author": {
      "@type": "Organization",
      "name": "CreatorHub"
    }
  };
  
  return (
    <>
      <Helmet>
        <title>{post.title} | CreatorHub</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="keywords" content={post.keywords} />
        <link rel="canonical" href={`https://creatorhub.com/blog/${slug}`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:image" content={categoryImages[post.category]} />
        <meta property="og:url" content={`https://creatorhub.com/blog/${slug}`} />
        <meta property="og:site_name" content="CreatorHub" />
        <meta property="article:published_time" content={post.date} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.metaDescription} />
        <meta name="twitter:image" content={categoryImages[post.category]} />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-24 pb-16">
          <article className="container mx-auto px-4 max-w-3xl">
            {/* Back link */}
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            
            {/* Featured Image */}
            <div className="aspect-video rounded-xl overflow-hidden mb-8">
              <img 
                src={categoryImages[post.category]} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Header */}
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {post.title}
              </h1>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>
            </header>
            
            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {post.content}
            </div>
            
            {/* CTA Box */}
            <div className="mt-12 p-8 bg-primary/5 border border-primary/20 rounded-2xl text-center">
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Ready to Join?
              </h3>
              <p className="text-muted-foreground mb-6">
                Get instant access to exclusive content. Join our Telegram channel now.
              </p>
              <Button size="lg" className="gap-2" asChild>
                <a href="https://t.me/joinleakempire" target="_blank" rel="noopener noreferrer">
                  Join Telegram Channel
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </article>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
