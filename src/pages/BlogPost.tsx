import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Progress } from "@/components/ui/progress";
import { ExternalLink, Calendar, Clock, Home, Twitter, Facebook, Linkedin, Share2 } from "lucide-react";
import { blogContentMap, blogPosts, getRelatedPosts } from "@/data/blogData";

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
  const relatedPosts = slug ? getRelatedPosts(slug, blogPosts, 3) : [];
  const [readProgress, setReadProgress] = useState(0);
  const [calculatedReadTime, setCalculatedReadTime] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setReadProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  // Calculate reading time based on word count
  useEffect(() => {
    if (contentRef.current) {
      const text = contentRef.current.textContent || "";
      const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
      const wordsPerMinute = 200; // Average reading speed
      const minutes = Math.ceil(wordCount / wordsPerMinute);
      setCalculatedReadTime(`${minutes} min read`);
    }
  }, [post]);
  
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

  // Breadcrumb structured data for SEO
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://leakempire.io"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://leakempire.io/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://leakempire.io/blog/${slug}`
      }
    ]
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
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background">
        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted">
          <Progress value={readProgress} className="h-1 rounded-none" />
        </div>
        
        <Navbar />
        
        <main className="pt-24 pb-16">
          <article className="container mx-auto px-4 max-w-3xl">
            {/* Breadcrumb Navigation */}
            <Breadcrumb className="mb-8">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/" className="flex items-center gap-1">
                      <Home className="w-4 h-4" />
                      Home
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/blog">Blog</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1 max-w-[200px] md:max-w-none">
                    {post.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
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
                  {calculatedReadTime || post.readTime}
                </span>
              </div>

              {/* Social Share Buttons */}
              <div className="flex items-center gap-3 mt-4">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Share2 className="w-4 h-4" />
                  Share:
                </span>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://leakempire.io/blog/${slug}`)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-card border border-border hover:border-primary/50 hover:text-primary transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://leakempire.io/blog/${slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-card border border-border hover:border-primary/50 hover:text-primary transition-colors"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://leakempire.io/blog/${slug}`)}&title=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-card border border-border hover:border-primary/50 hover:text-primary transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </header>
            
            {/* Content */}
            <div ref={contentRef} className="prose prose-lg max-w-none">
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

            {/* Related Posts Section */}
            {relatedPosts.length > 0 && (
              <section className="mt-16">
                <h2 className="text-2xl font-bold text-foreground mb-6">Related Articles</h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {relatedPosts.map((relatedPost) => (
                    <Link 
                      key={relatedPost.slug} 
                      to={`/blog/${relatedPost.slug}`}
                      className="group block"
                    >
                      <article className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors">
                        <div className="aspect-video overflow-hidden">
                          <img 
                            src={categoryImages[relatedPost.category]} 
                            alt={relatedPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                            {relatedPost.category}
                          </span>
                          <h3 className="mt-2 font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
