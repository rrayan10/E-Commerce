import { Layout } from '@/components/layout/Layout';

export default function About() {
  return (
    <Layout>
      <div className="container py-16 lg:py-24">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="font-display text-4xl lg:text-5xl tracking-tight mb-6">About ShopMart</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We believe in timeless style over fleeting trends. Founded with a vision to create 
            wardrobe essentials that transcend seasons, ShopMart curates pieces designed to be 
            worn, loved, and passed on.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-12 mb-24">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
              <svg className="w-8 h-8 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="font-display text-xl mb-3">Sustainable Sourcing</h3>
            <p className="text-sm text-muted-foreground">
              We partner with ethical manufacturers and prioritize sustainable materials 
              in every collection we create.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
              <svg className="w-8 h-8 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="font-display text-xl mb-3">Crafted with Care</h3>
            <p className="text-sm text-muted-foreground">
              Every piece is designed with intention and crafted to last, 
              ensuring quality that stands the test of time.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
              <svg className="w-8 h-8 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-display text-xl mb-3">Timeless Design</h3>
            <p className="text-sm text-muted-foreground">
              We focus on classic silhouettes and neutral palettes that 
              remain stylish year after year.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-2xl lg:text-3xl tracking-tight text-center mb-8">Our Story</h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              ShopMart was born from a simple idea: fashion should be effortless. In a world of 
              fast fashion and endless trends, we wanted to create something different—a 
              curated collection of essentials that form the foundation of a timeless wardrobe.
            </p>
            <p>
              Our journey began in a small studio, where we spent countless hours sourcing 
              the finest fabrics and perfecting every detail. Today, we continue that same 
              dedication to quality, working with skilled artisans who share our vision.
            </p>
            <p>
              Every piece in our collection is designed to be versatile, comfortable, and 
              enduring. We believe that true style isn't about following trends—it's about 
              knowing yourself and dressing with intention.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
