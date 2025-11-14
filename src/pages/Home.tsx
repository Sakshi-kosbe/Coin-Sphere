import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Coins, BookOpen, Upload } from "lucide-react";
import Navigation from "@/components/Navigation";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const featuredCoins = [
    {
      id: 1,
      name: "American Eagle",
      country: "United States",
      year: 2023,
      image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Canadian Maple Leaf",
      country: "Canada",
      year: 2023,
      image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      name: "British Sovereign",
      country: "United Kingdom",
      year: 2022,
      image: "https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=400&h=400&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-background pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-card rounded-full shadow-sm">
            <Coins className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">A World of Coins</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
            Coin<span className="text-primary">Sphere</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            Scan. Collect. Learn.
          </p>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Build your digital numismatic collection. Discover coins from around the world, 
            preserve their history, and share your passion.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-coin">
              <Link to="/add-coin">
                <Upload className="w-5 h-5 mr-2" />
                Add Your First Coin
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/collection">
                <BookOpen className="w-5 h-5 mr-2" />
                View Collection
              </Link>
            </Button>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search coins by name, country, or year..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg shadow-elevated"
            />
          </div>
        </div>
      </section>

      {/* Featured Coins */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Coins</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCoins.map((coin) => (
              <div
                key={coin.id}
                className="bg-card rounded-xl overflow-hidden shadow-coin hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-square bg-muted overflow-hidden">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{coin.name}</h3>
                  <p className="text-muted-foreground mb-1">{coin.country}</p>
                  <p className="text-sm text-muted-foreground">Year: {coin.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Coins className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Comprehensive Database</h3>
              <p className="text-muted-foreground">
                Access detailed information about coins from every corner of the globe
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Collection Management</h3>
              <p className="text-muted-foreground">
                Upload images and track every detail of your personal collection
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Learn & Discover</h3>
              <p className="text-muted-foreground">
                Explore the rich history and fascinating stories behind each coin
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
