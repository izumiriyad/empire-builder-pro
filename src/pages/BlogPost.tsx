import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Calendar, Clock } from "lucide-react";
import { blogContentMap } from "@/data/blogData";

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

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogContentMap[slug] : null;
  
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
      "name": "LeakEmpire"
    }
  };

  // FAQ structured data for SEO boost
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are Telegram channels free to join?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most Telegram channels are free to join, but some offer premium access with exclusive content and features."
        }
      },
      {
        "@type": "Question",
        "name": "Is Telegram safe?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Telegram is safe if you join trusted channels and avoid scams. Always verify admin accounts and never share private information."
        }
      }
    ]
  };
  
  return (
    <>
      <Helmet>
        <title>{post.title} | LeakEmpire</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="keywords" content={post.keywords} />
        <link rel="canonical" href={`https://leakempire.com/blog/${slug}`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:image" content={categoryImages[post.category]} />
        <meta property="og:url" content={`https://leakempire.com/blog/${slug}`} />
        <meta property="og:site_name" content="LeakEmpire" />
        <meta property="article:published_time" content={post.date} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.metaDescription} />
        <meta name="twitter:image" content={categoryImages[post.category]} />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
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
                If you want regular updates without noise, joining a few quality Telegram channels is a good idea.
                Get instant access to exclusive content now.
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
