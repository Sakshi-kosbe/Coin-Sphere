import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Coins } from "lucide-react";

type CoinCardProps = {
  coin: {
    id: string;
    name: string;
    country: string | null;
    year: number | null;
    denomination: string | null;
    obverse_image_url: string | null;
    reverse_image_url: string | null;
  };
};

const CoinCard = ({ coin }: CoinCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      className="overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      onClick={() => navigate(`/coin/${coin.id}`)}
    >
      <div className="aspect-square bg-muted overflow-hidden relative">
        {coin.obverse_image_url ? (
          <img
            src={coin.obverse_image_url}
            alt={coin.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Coins className="w-16 h-16 text-muted-foreground" />
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{coin.name}</h3>
        {coin.country && (
          <p className="text-sm text-muted-foreground mb-1">{coin.country}</p>
        )}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          {coin.year && <span>Year: {coin.year}</span>}
          {coin.denomination && <span>{coin.denomination}</span>}
        </div>
      </CardContent>
    </Card>
  );
};

export default CoinCard;
