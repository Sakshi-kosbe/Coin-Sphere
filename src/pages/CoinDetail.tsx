import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Coins, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Coin = {
  id: string;
  name: string;
  country: string | null;
  denomination: string | null;
  year: number | null;
  metal: string | null;
  weight: number | null;
  diameter: number | null;
  shape: string | null;
  edge_design: string | null;
  mint_mark: string | null;
  obverse_design: string | null;
  reverse_design: string | null;
  issue_type: string | null;
  security_features: string | null;
  obverse_image_url: string | null;
  reverse_image_url: string | null;
};

const CoinDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coin, setCoin] = useState<Coin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoin();
  }, [id]);

  const fetchCoin = async () => {
    try {
      const { data, error } = await supabase
        .from("coins")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setCoin(data);
    } catch (error) {
      toast.error("Error loading coin details");
      navigate("/collection");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase.from("coins").delete().eq("id", id);

      if (error) throw error;
      toast.success("Coin deleted successfully");
      navigate("/collection");
    } catch (error) {
      toast.error("Error deleting coin");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 px-4 flex items-center justify-center">
          <p className="text-muted-foreground">Loading coin details...</p>
        </div>
      </div>
    );
  }

  if (!coin) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 px-4 flex items-center justify-center">
          <p className="text-muted-foreground">Coin not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/collection")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Collection
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Images */}
            <div className="space-y-4">
              <Card className="overflow-hidden">
                <div className="aspect-square bg-muted">
                  {coin.obverse_image_url ? (
                    <img
                      src={coin.obverse_image_url}
                      alt={`${coin.name} - Obverse`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Coins className="w-24 h-24 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground text-center">
                    Obverse (Front)
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="aspect-square bg-muted">
                  {coin.reverse_image_url ? (
                    <img
                      src={coin.reverse_image_url}
                      alt={`${coin.name} - Reverse`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Coins className="w-24 h-24 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground text-center">
                    Reverse (Back)
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">{coin.name}</h1>
                {coin.country && (
                  <p className="text-xl text-muted-foreground">{coin.country}</p>
                )}
              </div>

              <div className="flex gap-3">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Coin</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this coin? This action
                        cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                  
                  {coin.denomination && (
                    <div>
                      <p className="text-sm text-muted-foreground">Denomination</p>
                      <p className="font-medium">{coin.denomination}</p>
                    </div>
                  )}
                  
                  {coin.year && (
                    <div>
                      <p className="text-sm text-muted-foreground">Year</p>
                      <p className="font-medium">{coin.year}</p>
                    </div>
                  )}
                  
                  {coin.issue_type && (
                    <div>
                      <p className="text-sm text-muted-foreground">Issue Type</p>
                      <p className="font-medium">{coin.issue_type}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Physical Characteristics</h2>
                  
                  {coin.metal && (
                    <div>
                      <p className="text-sm text-muted-foreground">Metal</p>
                      <p className="font-medium">{coin.metal}</p>
                    </div>
                  )}
                  
                  {coin.weight && (
                    <div>
                      <p className="text-sm text-muted-foreground">Weight</p>
                      <p className="font-medium">{coin.weight} g</p>
                    </div>
                  )}
                  
                  {coin.diameter && (
                    <div>
                      <p className="text-sm text-muted-foreground">Diameter</p>
                      <p className="font-medium">{coin.diameter} mm</p>
                    </div>
                  )}
                  
                  {coin.shape && (
                    <div>
                      <p className="text-sm text-muted-foreground">Shape</p>
                      <p className="font-medium">{coin.shape}</p>
                    </div>
                  )}
                  
                  {coin.edge_design && (
                    <div>
                      <p className="text-sm text-muted-foreground">Edge Design</p>
                      <p className="font-medium">{coin.edge_design}</p>
                    </div>
                  )}
                  
                  {coin.mint_mark && (
                    <div>
                      <p className="text-sm text-muted-foreground">Mint Mark</p>
                      <p className="font-medium">{coin.mint_mark}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {(coin.obverse_design || coin.reverse_design || coin.security_features) && (
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Design & Security</h2>
                    
                    {coin.obverse_design && (
                      <div>
                        <p className="text-sm text-muted-foreground">Obverse Design</p>
                        <p className="font-medium">{coin.obverse_design}</p>
                      </div>
                    )}
                    
                    {coin.reverse_design && (
                      <div>
                        <p className="text-sm text-muted-foreground">Reverse Design</p>
                        <p className="font-medium">{coin.reverse_design}</p>
                      </div>
                    )}
                    
                    {coin.security_features && (
                      <div>
                        <p className="text-sm text-muted-foreground">Security Features</p>
                        <p className="font-medium">{coin.security_features}</p>
                      </div>
                    )}
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

export default CoinDetail;
