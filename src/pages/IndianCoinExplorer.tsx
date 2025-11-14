import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, MapPin, Download } from "lucide-react";
import IndianCoinCard from "@/components/IndianCoinCard";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type IndianCoin = {
  id: string;
  name: string;
  denomination: string;
  year: number;
  series: string;
  metal: string;
  weight: number;
  diameter: number;
  thickness?: number;
  shape: string;
  edge_design: string;
  mint_mark: string;
  mint_city: string;
  obverse_image: string;
  reverse_image: string;
  obverse_description: string;
  reverse_description: string;
  issue_type: string;
  status: "active" | "discontinued";
  security_features?: string;
  commemorative?: string;
};

// Sample Indian coin data
const sampleIndianCoins: IndianCoin[] = [
  {
    id: "1",
    name: "New Rupee Symbol ₹10 Coin",
    denomination: "₹10",
    year: 2011,
    series: "New Symbol Series",
    metal: "Bimetallic (Outer: Nickel-Brass, Center: Nickel-Silver)",
    weight: 7.71,
    diameter: 27,
    thickness: 2.25,
    shape: "Circular",
    edge_design: "Reeded",
    mint_mark: "Mumbai •",
    mint_city: "Mumbai",
    obverse_image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=400&h=400&fit=crop",
    reverse_image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=400&h=400&fit=crop",
    obverse_description: "Ashoka Pillar with Lion Capital, 'भारत' and 'INDIA' inscribed below, with year of issue",
    reverse_description: "₹10 denomination in center, with stylized floral pattern, '₹' symbol on left",
    issue_type: "Regular",
    status: "active",
    security_features: "Bimetallic composition, micro-lettering, reeded edge"
  },
  {
    id: "2",
    name: "₹5 Nickel-Brass Coin",
    denomination: "₹5",
    year: 2009,
    series: "Unity in Diversity Series",
    metal: "Nickel-Brass",
    weight: 6.0,
    diameter: 23,
    thickness: 1.9,
    shape: "Circular",
    edge_design: "Plain with 'भारत INDIA' inscription",
    mint_mark: "Hyderabad ★",
    mint_city: "Hyderabad",
    obverse_image: "https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=400&h=400&fit=crop",
    reverse_image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=400&h=400&fit=crop",
    obverse_description: "Ashoka Pillar with three lions visible, denomination below",
    reverse_description: "Agricultural symbol with crossed grain stalks, value 5 prominently displayed",
    issue_type: "Regular",
    status: "active",
    security_features: "Edge inscription, distinctive weight"
  },
  {
    id: "3",
    name: "₹2 Ferritic Stainless Steel",
    denomination: "₹2",
    year: 2011,
    series: "New Symbol Series",
    metal: "Ferritic Stainless Steel",
    weight: 4.85,
    diameter: 25,
    thickness: 1.61,
    shape: "Circular",
    edge_design: "Plain",
    mint_mark: "Noida ◆",
    mint_city: "Noida",
    obverse_image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=400&h=400&fit=crop",
    reverse_image: "https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=400&h=400&fit=crop",
    obverse_description: "Ashoka Pillar with Lion Capital, 'भारत INDIA' and year",
    reverse_description: "₹2 with new rupee symbol, cross pattern in background",
    issue_type: "Regular",
    status: "active",
    security_features: "Stainless steel magnetic properties, unique weight-diameter ratio"
  },
  {
    id: "4",
    name: "₹20 Commemorative - Mahatma Gandhi",
    denomination: "₹20",
    year: 2019,
    series: "150th Birth Anniversary",
    metal: "Nickel-Silver",
    weight: 8.54,
    diameter: 27,
    thickness: 2.0,
    shape: "Circular",
    edge_design: "Security edge with micro-text",
    mint_mark: "Mumbai •",
    mint_city: "Mumbai",
    obverse_image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=400&h=400&fit=crop",
    reverse_image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=400&h=400&fit=crop",
    obverse_description: "Portrait of Mahatma Gandhi with spectacles, 'बापू' inscription",
    reverse_description: "₹20 denomination with ashoka chakra, commemorative text",
    issue_type: "Commemorative",
    status: "discontinued",
    security_features: "Enhanced security edge, special metal composition, embossed portrait",
    commemorative: "150th Birth Anniversary of Mahatma Gandhi"
  },
  {
    id: "5",
    name: "₹1 Stainless Steel Coin",
    denomination: "₹1",
    year: 2011,
    series: "New Symbol Series",
    metal: "Stainless Steel",
    weight: 3.79,
    diameter: 21.93,
    thickness: 1.45,
    shape: "Circular",
    edge_design: "Plain",
    mint_mark: "Kolkata (no mark)",
    mint_city: "Kolkata",
    obverse_image: "https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=400&h=400&fit=crop",
    reverse_image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=400&h=400&fit=crop",
    obverse_description: "Ashoka Pillar with lions, 'भारत' and 'INDIA' below, year of issue",
    reverse_description: "₹1 with new rupee symbol (₹), stylized grain stalks pattern",
    issue_type: "Regular",
    status: "active",
    security_features: "Tactile identification mark for visually impaired (lines on obverse)"
  },
  {
    id: "6",
    name: "75 Years of Independence ₹75 Commemorative",
    denomination: "₹75",
    year: 2022,
    series: "Azadi Ka Amrit Mahotsav",
    metal: "Quaternary Alloy (4 metals)",
    weight: 35.0,
    diameter: 44,
    thickness: 3.5,
    shape: "Circular",
    edge_design: "Inscribed with special text",
    mint_mark: "Mumbai •",
    mint_city: "Mumbai",
    obverse_image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=400&h=400&fit=crop",
    reverse_image: "https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=400&h=400&fit=crop",
    obverse_description: "Tricolor flag with Ashoka Chakra, '75' in Devanagari and English",
    reverse_description: "Map of India with unity themes, 'आजादी का अमृत महोत्सव' inscription",
    issue_type: "Commemorative",
    status: "discontinued",
    security_features: "Limited edition, special 4-metal alloy, edge inscription, holographic elements",
    commemorative: "75 Years of Independence - Azadi Ka Amrit Mahotsav"
  }
];

const IndianCoinExplorer = () => {
  const [coins, setCoins] = useState<IndianCoin[]>(sampleIndianCoins);
  const [filteredCoins, setFilteredCoins] = useState<IndianCoin[]>(sampleIndianCoins);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDenomination, setSelectedDenomination] = useState<string>("all");
  const [selectedMint, setSelectedMint] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"all" | "regular" | "commemorative">("all");

  useEffect(() => {
    filterCoins();
  }, [searchQuery, selectedDenomination, selectedMint, selectedStatus, viewMode]);

  const filterCoins = () => {
    let filtered = [...coins];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(coin => 
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.denomination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.commemorative?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Denomination filter
    if (selectedDenomination !== "all") {
      filtered = filtered.filter(coin => coin.denomination === selectedDenomination);
    }

    // Mint filter
    if (selectedMint !== "all") {
      filtered = filtered.filter(coin => coin.mint_city === selectedMint);
    }

    // Status filter
    if (selectedStatus !== "all") {
      filtered = filtered.filter(coin => coin.status === selectedStatus);
    }

    // View mode filter
    if (viewMode === "regular") {
      filtered = filtered.filter(coin => coin.issue_type === "Regular");
    } else if (viewMode === "commemorative") {
      filtered = filtered.filter(coin => coin.issue_type === "Commemorative");
    }

    setFilteredCoins(filtered);
  };

  const uniqueDenominations = Array.from(new Set(coins.map(c => c.denomination))).sort();
  const uniqueMints = Array.from(new Set(coins.map(c => c.mint_city))).sort();

  const handleDownloadPDF = () => {
    // PDF generation will be implemented
    console.log("Download PDF feature coming soon!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white">
              Indian Numismatics
            </Badge>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 bg-clip-text text-transparent">
              Indian Coin Explorer
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore the complete collection of Indian rupee coins from past to present. 
              Discover denominations, mint marks, metal compositions, and commemorative editions.
            </p>
          </div>

          {/* Filters and Search */}
          <div className="bg-card rounded-xl shadow-elevated p-6 mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by name, denomination, or commemorative..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Denomination Filter */}
              <Select value={selectedDenomination} onValueChange={setSelectedDenomination}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Denomination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Denominations</SelectItem>
                  {uniqueDenominations.map(denom => (
                    <SelectItem key={denom} value={denom}>{denom}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Mint Filter */}
              <Select value={selectedMint} onValueChange={setSelectedMint}>
                <SelectTrigger className="w-full md:w-48">
                  <MapPin className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Mint City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Mints</SelectItem>
                  {uniqueMints.map(mint => (
                    <SelectItem key={mint} value={mint}>{mint}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active Circulation</SelectItem>
                  <SelectItem value="discontinued">Discontinued</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Mode Tabs */}
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All Coins</TabsTrigger>
                <TabsTrigger value="regular">Regular Issue</TabsTrigger>
                <TabsTrigger value="commemorative">Commemorative</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center justify-between pt-2">
              <p className="text-sm text-muted-foreground">
                Showing {filteredCoins.length} of {coins.length} coins
              </p>
              <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
                <Download className="w-4 h-4 mr-2" />
                Download Catalog (PDF)
              </Button>
            </div>
          </div>

          {/* Coins Grid */}
          {filteredCoins.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCoins.map((coin) => (
                <IndianCoinCard key={coin.id} coin={coin} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Filter className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No coins found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndianCoinExplorer;
