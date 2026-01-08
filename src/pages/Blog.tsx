import { useState, useMemo, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Search, X, Star, Clock, ArrowUpDown, Sparkles, TrendingUp, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { blogPosts, defaultAuthor } from "@/data/blogData";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const POSTS_PER_PAGE = 9;

type SortOption = "newest" | "oldest" | "alphabetical";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "alphabetical", label: "A-Z" },
];

const Blog = () => {
  const [activeNiche, setActiveNiche] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  // Get featured posts (first 2 posts as featured for demo, or those marked as featured)
  const featuredPosts = useMemo(() => {
    const featured = blogPosts.filter(post => post.featured);
    return featured.length > 0 ? featured.slice(0, 2) : blogPosts.slice(0, 2);
  }, []);

  const filteredPosts = useMemo(() => {
    let posts = [...blogPosts];
    
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

    // Sort posts
    switch (sortBy) {
      case "newest":
        posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case "oldest":
        posts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case "alphabetical":
        posts.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
    
    return posts;
  }, [activeNiche, searchQuery, sortBy]);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [activeNiche, searchQuery, sortBy]);

  const showFeatured = activeNiche === "all" && !searchQuery.trim();

  // Pagination calculations
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('ellipsis');
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('ellipsis');
      pages.push(totalPages);
    }
    return pages;
  };

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
            {/* Header with animation */}
            <div 
              className={`text-center mb-12 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Curated Resources</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                Best Telegram Channels & Groups
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Find the best Telegram channels for crypto, airdrops, online earning, AI tools, and more. 
                Curated lists of free and active communities.
              </p>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span><strong className="text-foreground">{blogPosts.length}+</strong> Articles</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-4 h-4 text-primary" />
                  <span><strong className="text-foreground">{niches.length - 1}</strong> Categories</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Updated <strong className="text-foreground">Daily</strong></span>
                </div>
              </div>
            </div>

            {/* Search Bar with animation */}
            <div 
              className={`max-w-md mx-auto mb-8 transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  type="text"
                  placeholder="Search topics, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-10 py-6 text-base rounded-full border-2 focus:border-primary/50 transition-all"
                  maxLength={100}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter & Sort with animation */}
            <div 
              className={`mb-12 max-w-6xl mx-auto transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {niches.map((niche, index) => (
                  <button
                    key={niche.id}
                    onClick={() => setActiveNiche(niche.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                      activeNiche === niche.id
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                        : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5"
                    }`}
                    style={{ animationDelay: `${index * 20}ms` }}
                  >
                    {niche.label}
                  </button>
                ))}
              </div>
              
              {/* Sort Dropdown */}
              <div className="flex justify-center">
                <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                  <SelectTrigger className="w-[180px] rounded-full">
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Featured Posts Section */}
            {showFeatured && featuredPosts.length > 0 && (
              <div 
                className={`mb-16 max-w-6xl mx-auto transition-all duration-700 delay-300 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <div className="flex items-center gap-2 mb-8">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Star className="w-5 h-5 text-primary fill-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Featured Posts</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {featuredPosts.map((post, index) => (
                    <Link key={post.slug} to={`/blog/${post.slug}`}>
                      <Card className="h-full bg-card border-2 border-primary/20 hover:border-primary/50 transition-all duration-500 group cursor-pointer overflow-hidden relative hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                        <Badge className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground shadow-lg">
                          <Star className="w-3 h-3 mr-1 fill-current" />
                          Featured
                        </Badge>
                        <div className="aspect-video overflow-hidden">
                          <img 
                            src={categoryImages[post.category]} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            loading={index > 0 ? "lazy" : "eager"}
                          />
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                              {post.category}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(post.date).toLocaleDateString()}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.readTime}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="w-7 h-7 ring-2 ring-background">
                                <AvatarImage src={(post.author || defaultAuthor).avatar} alt={(post.author || defaultAuthor).name} />
                                <AvatarFallback className="text-xs">{(post.author || defaultAuthor).name.slice(0, 2)}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-muted-foreground">{(post.author || defaultAuthor).name}</span>
                            </div>
                            <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                              Read More
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {paginatedPosts.map((post, index) => (
                <Link 
                  key={post.slug} 
                  to={`/blog/${post.slug}`}
                  className={`transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${400 + index * 50}ms` }}
                >
                  <Card className="h-full bg-card border-border hover:border-primary/50 transition-all duration-500 group cursor-pointer overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                    {/* Featured Image */}
                    <div className="aspect-video overflow-hidden relative">
                      <img 
                        src={categoryImages[post.category]} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                      
                      <h2 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6 ring-2 ring-background">
                            <AvatarImage src={(post.author || defaultAuthor).avatar} alt={(post.author || defaultAuthor).name} />
                            <AvatarFallback className="text-xs">{(post.author || defaultAuthor).name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">{(post.author || defaultAuthor).name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                          Read
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Empty State */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-16 max-w-md mx-auto">
                <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No articles found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <Button variant="outline" onClick={() => { setSearchQuery(""); setActiveNiche("all"); }}>
                  Clear filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && filteredPosts.length > 0 && (
              <div className="mt-12 max-w-6xl mx-auto">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-primary/10"}
                      />
                    </PaginationItem>
                    
                    {getPageNumbers().map((page, index) => (
                      <PaginationItem key={index}>
                        {page === 'ellipsis' ? (
                          <PaginationEllipsis />
                        ) : (
                          <PaginationLink
                            onClick={() => handlePageChange(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-primary/10"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Showing {startIndex + 1}-{Math.min(startIndex + POSTS_PER_PAGE, filteredPosts.length)} of {filteredPosts.length} articles
                </p>
              </div>
            )}

            {/* Newsletter CTA */}
            <div className="mt-20 max-w-4xl mx-auto">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-8 md:p-12">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                
                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Stay Updated</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Get Exclusive Updates
                  </h3>
                  <p className="text-muted-foreground max-w-lg mx-auto mb-8">
                    Join our Telegram channel for instant access to the best channels, groups, and earning opportunities. 
                    No spam, just value.
                  </p>
                  <Button size="lg" className="gap-2 shadow-lg shadow-primary/25" asChild>
                    <a href="https://t.me/joinleakempire" target="_blank" rel="noopener noreferrer">
                      <Users className="w-5 h-5" />
                      Join Telegram Channel
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Blog;
