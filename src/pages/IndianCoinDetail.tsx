import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Download, Share2, Scale } from "lucide-react";
import { useState } from "react";
import type { IndianCoin } from "@/pages/IndianCoinExplorer";

const IndianCoinDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const coin = location.state?.coin as IndianCoin;
  const [activeImage, setActiveImage] = useState<"obverse" | "reverse">("obverse");

  if (!coin) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 px-4 text-center">
          <p className="text-muted-foreground">Coin not found</p>
          <Button onClick={() => navigate("/indian-coins")} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Explorer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate("/indian-coins")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Indian Coin Explorer
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Images Section */}
            <div className="space-y-4">
              {/* Main Image Display */}
              <Card className="overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950">
                <CardContent className="p-8">
                  <div className="aspect-square relative">
                    <img
                      src={activeImage === "obverse" ? coin.obverse_image : coin.reverse_image}
                      alt={`${coin.name} - ${activeImage}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <Badge variant="outline" className="text-sm">
                      {activeImage === "obverse" ? "Obverse (Front)" : "Reverse (Back)"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Thumbnail Toggles */}
              <div className="grid grid-cols-2 gap-4">
                <Card 
                  className={`cursor-pointer overflow-hidden transition-all ${
                    activeImage === "obverse" 
                      ? "ring-2 ring-amber-500 shadow-lg" 
                      : "hover:shadow-md"
                  }`}
                  onClick={() => setActiveImage("obverse")}
                >
                  <div className="aspect-square bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 p-4">
                    <img
                      src={coin.obverse_image}
                      alt="Obverse"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-2 text-center bg-card">
                    <p className="text-xs font-medium">Obverse</p>
                  </div>
                </Card>

                <Card 
                  className={`cursor-pointer overflow-hidden transition-all ${
                    activeImage === "reverse" 
                      ? "ring-2 ring-amber-500 shadow-lg" 
                      : "hover:shadow-md"
                  }`}
                  onClick={() => setActiveImage("reverse")}
                >
                  <div className="aspect-square bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 p-4">
                    <img
                      src={coin.reverse_image}
                      alt="Reverse"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-2 text-center bg-card">
                    <p className="text-xs font-medium">Reverse</p>
                  </div>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Scale className="w-4 h-4 mr-2" />
                  Compare
                </Button>
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Badge 
                    variant={coin.status === "active" ? "default" : "secondary"}
                    className={coin.status === "active" 
                      ? "bg-green-500" 
                      : "bg-gray-500"
                    }
                  >
                    {coin.status === "active" ? "In Active Circulation" : "Discontinued"}
                  </Badge>
                  {coin.issue_type === "Commemorative" && (
                    <Badge className="bg-amber-600">Commemorative</Badge>
                  )}
                </div>
                <h1 className="text-4xl font-bold mb-2">{coin.name}</h1>
                <p className="text-2xl text-amber-600 font-semibold">{coin.denomination}</p>
                <p className="text-muted-foreground mt-1">{coin.series}</p>
              </div>

              {coin.commemorative && (
                <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-amber-300">
                  <CardContent className="p-4">
                    <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">
                      🏆 {coin.commemorative}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Basic Information */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold">Basic Information</h2>
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Year of Issue</p>
                      <p className="font-semibold">{coin.year}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Denomination</p>
                      <p className="font-semibold">{coin.denomination}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Issue Type</p>
                      <p className="font-semibold">{coin.issue_type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Series</p>
                      <p className="font-semibold">{coin.series}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Physical Characteristics */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold">Physical Characteristics</h2>
                  <Separator />
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Metal Composition</p>
                    <p className="font-semibold">{coin.metal}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Weight</p>
                      <p className="font-semibold">{coin.weight} g</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Diameter</p>
                      <p className="font-semibold">{coin.diameter} mm</p>
                    </div>
                    {coin.thickness && (
                      <div>
                        <p className="text-sm text-muted-foreground">Thickness</p>
                        <p className="font-semibold">{coin.thickness} mm</p>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Shape</p>
                      <p className="font-semibold">{coin.shape}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Edge Design</p>
                      <p className="font-semibold">{coin.edge_design}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mint Information */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold">Mint Information</h2>
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Mint City</p>
                      <p className="font-semibold">{coin.mint_city}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Mint Mark</p>
                      <p className="font-semibold font-mono text-amber-600">{coin.mint_mark}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Design Details */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold">Design Details</h2>
                  <Separator />
                  
                  <div>
                    <p className="text-sm text-muted-foreground font-semibold mb-2">Obverse (Front)</p>
                    <p className="text-sm leading-relaxed">{coin.obverse_description}</p>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm text-muted-foreground font-semibold mb-2">Reverse (Back)</p>
                    <p className="text-sm leading-relaxed">{coin.reverse_description}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Security Features */}
              {coin.security_features && (
                <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-2">Security & Identification Features</h2>
                    <p className="text-sm leading-relaxed">{coin.security_features}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndianCoinDetail;
