import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { blogPosts } from "@/data/blogData";

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

// Extract niches from blog post slugs
const niches = [
  { id: "all", label: "All" },
  { id: "crypto", label: "Crypto" },
  { id: "airdrop", label: "Airdrop" },
  { id: "earning", label: "Online Earning" },
  { id: "ai-tools", label: "AI Tools" },
  { id: "side-hustle", label: "Side Hustle" },
  { id: "premium", label: "Premium Resources" },
  { id: "nft", label: "NFT" },
  { id: "forex", label: "Forex" },
  { id: "stocks", label: "Stocks" },
  { id: "trading", label: "Trading Signals" },
  { id: "dropshipping", label: "Dropshipping" },
  { id: "programming", label: "Programming" },
  { id: "gaming", label: "Gaming" },
  { id: "entertainment", label: "Entertainment" },
  { id: "betting", label: "Betting" },
  { id: "music", label: "Music" },
  { id: "fitness", label: "Fitness" },
  { id: "movies", label: "Movies" },
  { id: "books", label: "Books" },
  { id: "photography", label: "Photography" },
  { id: "language", label: "Language Learning" },
  { id: "cooking", label: "Cooking" },
  { id: "travel", label: "Travel" },
];

const Blog = () => {
  const [activeNiche, setActiveNiche] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    let posts = blogPosts;
    
    // Filter by niche
    if (activeNiche !== "all") {
      posts = posts.filter(post => 
        post.slug.includes(activeNiche) || 
        post.keywords.toLowerCase().includes(activeNiche)
      );
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.keywords.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
      );
    }
    
    return posts;
  }, [activeNiche, searchQuery]);

  return (
    <>
      <Helmet>
        <title>Blog - Best Telegram Channels for Crypto, Airdrops & Online Earning</title>
        <meta 
          name="description" 
          content="Discover the best Telegram channels for crypto, airdrops, online earning, AI tools, and side hustles. Free and active groups updated for 2025." 
        />
        <meta name="keywords" content="best telegram channels for crypto, free airdrop telegram group, online earning telegram, ai tools telegram, side hustle telegram" />
        <link rel="canonical" href="/blog" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Best Telegram Channels & Groups
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find the best Telegram channels for crypto, airdrops, online earning, AI tools, and more. 
                Curated lists of free and active communities.
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search topics, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10"
                  maxLength={100}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-10 max-w-6xl mx-auto">
              <div className="flex flex-wrap gap-2 justify-center">
                {niches.map((niche) => (
                  <button
                    key={niche.id}
                    onClick={() => setActiveNiche(niche.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeNiche === niche.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
                    }`}
                  >
                    {niche.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {filteredPosts.map((post) => (
                <Link key={post.slug} to={`/blog/${post.slug}`}>
                  <Card className="h-full bg-card border-border hover:border-primary/50 transition-all duration-300 group cursor-pointer overflow-hidden">
                    {/* Featured Image */}
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={categoryImages[post.category]} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                          {post.category}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <h2 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-2 text-primary text-sm font-medium">
                        Read More
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* No results message */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No posts found for this category.</p>
                <button 
                  onClick={() => setActiveNiche("all")}
                  className="mt-4 text-primary hover:underline"
                >
                  View all posts
                </button>
              </div>
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Blog;
