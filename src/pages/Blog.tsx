import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar } from "lucide-react";
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

const Blog = () => {
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
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Best Telegram Channels & Groups
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find the best Telegram channels for crypto, airdrops, online earning, AI tools, and more. 
                Curated lists of free and active communities.
              </p>
            </div>
            
            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {blogPosts.map((post) => (
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
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Blog;
