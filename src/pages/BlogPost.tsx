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
import { ExternalLink, Calendar, Clock, Home, Twitter, Facebook, Linkedin, Share2, Link2, Check, List, ArrowUp, ArrowRight, Sparkles } from "lucide-react";
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
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [copied, setCopied] = useState(false);
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeHeading, setActiveHeading] = useState<string>("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setReadProgress(Math.min(100, Math.max(0, progress)));
      setShowBackToTop(scrollTop > 400);
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  // Calculate reading time and extract headings
  useEffect(() => {
    if (contentRef.current) {
      const text = contentRef.current.textContent || "";
      const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
      const wordsPerMinute = 200;
      const minutes = Math.ceil(wordCount / wordsPerMinute);
      setTotalMinutes(minutes);
      setCalculatedReadTime(`${minutes} min read`);

      // Extract headings for TOC
      const headingElements = contentRef.current.querySelectorAll("h2, h3");
      const extractedHeadings = Array.from(headingElements).map((heading, index) => {
        const id = `heading-${index}`;
        heading.id = id;
        return {
          id,
          text: heading.textContent || "",
          level: heading.tagName === "H2" ? 2 : 3,
        };
      });
      setHeadings(extractedHeadings);
    }
  }, [post]);

  // Track active heading on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const headingElements = contentRef.current.querySelectorAll("h2, h3");
      let currentActive = "";
      
      headingElements.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 120) {
          currentActive = heading.id;
        }
      });
      
      setActiveHeading(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);
  
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
        "item": "https://leakempire.vercel.app"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://leakempire.vercel.app/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://leakempire.vercel.app/blog/${slug}`
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
        <div className="fixed top-0 left-0 right-0 z-50">
          <div className="h-1 bg-muted">
            <Progress value={readProgress} className="h-1 rounded-none" />
          </div>
          {readProgress > 0 && readProgress < 100 && totalMinutes > 0 && (
            <div className="absolute right-4 top-2 bg-background/90 backdrop-blur-sm border border-border rounded-full px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              {Math.ceil(totalMinutes * (1 - readProgress / 100))} min left
            </div>
          )}
        </div>
        
        <Navbar />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 flex gap-8">
            {/* Table of Contents - Desktop Only */}
            {headings.length > 2 && (
              <aside className="hidden xl:block w-64 shrink-0">
                <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-auto">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-4">
                    <List className="w-4 h-4" />
                    Table of Contents
                  </div>
                  <ul className="space-y-2 text-sm border-l border-border pl-4">
                    {headings.map((heading) => (
                      <li key={heading.id}>
                        <a
                          href={`#${heading.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(heading.id)?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className={`block py-1 transition-colors ${
                            heading.level === 3 ? "pl-3" : ""
                          } ${
                            activeHeading === heading.id
                              ? "text-primary font-medium"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </aside>
            )}

            <article className="flex-1 max-w-3xl mx-auto">
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
            <div className="aspect-video rounded-2xl overflow-hidden mb-8 ring-1 ring-border">
              <img 
                src={categoryImages[post.category]} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                  {post.category}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-6 border-b border-border">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {calculatedReadTime || post.readTime}
                </span>
              </div>

              {/* Social Share Buttons */}
              <div className="flex items-center gap-3 mt-6">
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Share2 className="w-4 h-4" />
                  Share:
                </span>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://leakempire.vercel.app/blog/${slug}`)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-card border border-border hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://leakempire.vercel.app/blog/${slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-card border border-border hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://leakempire.vercel.app/blog/${slug}`)}&title=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-card border border-border hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`https://leakempire.vercel.app/blog/${slug}`);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="p-2.5 rounded-full bg-card border border-border hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all"
                  aria-label="Copy link"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Link2 className="w-4 h-4" />}
                </button>
              </div>
            </header>
            
            {/* Content */}
            <div ref={contentRef} className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80">
              {post.content}
            </div>
            
            {/* CTA Box */}
            <div className="mt-16 relative overflow-hidden p-8 md:p-10 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-3xl text-center">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
                  <ExternalLink className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Ready to Join?
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Get instant access to exclusive content, premium resources, and active community discussions.
                </p>
                <Button size="lg" className="gap-2 shadow-lg shadow-primary/25" asChild>
                  <a href="https://t.me/joinleakempire" target="_blank" rel="noopener noreferrer">
                    Join Telegram Channel
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Related Posts Section */}
            {relatedPosts.length > 0 && (
              <section className="mt-20">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <ArrowRight className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Related Articles</h2>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                  {relatedPosts.map((relatedPost) => (
                    <Link 
                      key={relatedPost.slug} 
                      to={`/blog/${relatedPost.slug}`}
                      className="group block"
                    >
                      <article className="h-full bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
                        <div className="aspect-video overflow-hidden relative">
                          <img 
                            src={categoryImages[relatedPost.category]} 
                            alt={relatedPost.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="p-5">
                          <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                            {relatedPost.category}
                          </span>
                          <h3 className="mt-3 font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                          <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                            Read More
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>
          </div>
        </main>
        
        <Footer />

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110 ${
            showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
    </>
  );
};

export default BlogPost;
