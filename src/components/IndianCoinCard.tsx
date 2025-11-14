import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Weight } from "lucide-react";
import type { IndianCoin } from "@/pages/IndianCoinExplorer";

type IndianCoinCardProps = {
  coin: IndianCoin;
};

const IndianCoinCard = ({ coin }: IndianCoinCardProps) => {
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <Card 
      className="overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
      onClick={() => navigate(`/indian-coin/${coin.id}`, { state: { coin } })}
    >
      {/* Flip Container */}
      <div 
        className="relative aspect-square bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 overflow-hidden"
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
      >
        {/* 3D Flip Effect */}
        <div 
          className="absolute inset-0 transition-transform duration-700 preserve-3d"
          style={{
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Obverse (Front) */}
          <div 
            className="absolute inset-0 backface-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <img
              src={coin.obverse_image}
              alt={`${coin.name} - Obverse`}
              className="w-full h-full object-cover p-8"
            />
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs">
              Obverse
            </div>
          </div>

          {/* Reverse (Back) */}
          <div 
            className="absolute inset-0 backface-hidden"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <img
              src={coin.reverse_image}
              alt={`${coin.name} - Reverse`}
              className="w-full h-full object-cover p-8"
            />
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs">
              Reverse
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 right-4 z-10">
          <Badge 
            variant={coin.status === "active" ? "default" : "secondary"}
            className={coin.status === "active" 
              ? "bg-green-500 hover:bg-green-600" 
              : "bg-gray-500 hover:bg-gray-600"
            }
          >
            {coin.status === "active" ? "In Circulation" : "Discontinued"}
          </Badge>
        </div>

        {/* Commemorative Badge */}
        {coin.issue_type === "Commemorative" && (
          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-amber-600 hover:bg-amber-700">
              Commemorative
            </Badge>
          </div>
        )}
      </div>

      {/* Card Details */}
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {coin.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-amber-600">{coin.denomination}</span>
            <span className="text-sm text-muted-foreground">• {coin.series}</span>
          </div>
        </div>

        {coin.commemorative && (
          <div className="bg-amber-50 dark:bg-amber-950 p-2 rounded-md">
            <p className="text-xs text-amber-800 dark:text-amber-200 font-medium line-clamp-2">
              🏆 {coin.commemorative}
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span>{coin.year}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Weight className="w-3 h-3" />
            <span>{coin.weight}g</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-3 h-3 text-muted-foreground" />
          <span className="text-muted-foreground">{coin.mint_city}</span>
          <span className="font-mono text-amber-600">{coin.mint_mark}</span>
        </div>

        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground line-clamp-1">
            {coin.metal}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndianCoinCard;
