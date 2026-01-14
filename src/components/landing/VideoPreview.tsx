import React, { useState } from 'react';
import { Lock } from 'lucide-react';

// This would ideally come from your Telegram channel data
const channelContent = [
  {
    id: 1,
    title: "Premium Collection #47",
    thumbnail: "/tg/1.jpg",
    duration: "12:34",
    isLocked: false,
    telegramLink: "https://t.me/joinleakempire"
  },
  {
    id: 2,
    title: "Exclusive Interview",
    thumbnail: "/tg/2.jpg",
    duration: "44:15",
    isLocked: true,
    telegramLink: "https://t.me/joinleakempire"
  },
  {
    id: 3,
    title: "Weekly Drop #47",
    thumbnail: "/tg/3.jpg",
    duration: "58:22",
    isLocked: true,
    telegramLink: "hhttps://t.me/joinleakempire"
  },
  {
    id: 4,
    title: "Fan Q&A Session",
    thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=300&fit=crop",
    duration: "32:10",
    isLocked: false,
    telegramLink: "https://t.me/joinleakempire"
  },
  {
    id: 5,
    title: "Day In My Life",
    thumbnail: "/tg/5.jpg",
    duration: "15:15",
    isLocked: false,
    telegramLink: "https://t.me/joinleakempire"
  },
  {
    id: 6,
    title: "Premium Tutorial",
    thumbnail: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=300&fit=crop",
    duration: "45:00",
    isLocked: true,
    telegramLink: "https://t.me/joinleakempire"
  }
];

const ContentCard = ({ content }) => {
  const handleClick = () => {
    if (content.isLocked) {
      // Redirect to Telegram channel for premium access
      window.open(content.telegramLink, '_blank');
    } else {
      // For free content, could preview or redirect
      window.open(content.telegramLink, '_blank');
    }
  };

  return (
    <div 
      className="group relative overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105"
      onClick={handleClick}
    >
      <div className="relative aspect-video">
        <img 
          src={content.thumbnail} 
          alt={content.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Lock Icon for Premium Content */}
        {content.isLocked && (
          <div className="absolute top-3 right-3 bg-yellow-500 text-black p-2 rounded-full">
            <Lock size={16} />
          </div>
        )}
        
        {/* Duration Badge */}
        <div className="absolute bottom-3 right-3 bg-black/90 px-2 py-1 rounded text-white text-sm font-semibold">
          {content.duration}
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-white text-center">
            <p className="text-lg font-semibold mb-2">
              {content.isLocked ? 'Join Channel' : 'View Now'}
            </p>
            <p className="text-sm opacity-90">
              {content.isLocked ? 'Premium Access Required' : 'Free Preview'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Title */}
      <div className="bg-gray-900 p-4">
        <h3 className="text-white font-semibold text-base group-hover:text-yellow-500 transition-colors">
          {content.title}
        </h3>
      </div>
    </div>
  );
};

const VideoPreview = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedContent = showAll ? channelContent : channelContent.slice(0, 6);

  return (
    <section className="bg-gray-950 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Latest Content</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get instant access to hundreds of exclusive videos when you join our Telegram channel
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedContent.map(content => (
            <ContentCard key={content.id} content={content} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-4">
          <button
            onClick={() => window.open('https://t.me/joinleakempire', '_blank')}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-300 inline-flex items-center gap-2"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161l-1.75 8.25c-.131.612-.474.762-.962.475l-2.656-1.963-1.281 1.232c-.143.143-.262.262-.537.262l.188-2.681 4.856-4.387c.212-.188-.044-.293-.331-.106l-6 3.788-2.587-.806c-.562-.175-.575-.562.119-.831l10.094-3.894c.469-.175.881.106.731.831z"/>
            </svg>
            Join Premium Channel
          </button>
          
          <p className="text-gray-500 text-sm">
            By joining, you agree to our <a href="#" className="text-yellow-500 hover:underline">Terms of Service</a> and <a href="#" className="text-yellow-500 hover:underline">Privacy Policy</a>
          </p>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="text-yellow-500 text-3xl font-bold mb-2">500+</div>
            <div className="text-gray-400">Exclusive Videos</div>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="text-yellow-500 text-3xl font-bold mb-2">Daily</div>
            <div className="text-gray-400">New Content</div>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="text-yellow-500 text-3xl font-bold mb-2">24/7</div>
            <div className="text-gray-400">Access Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoPreview;
