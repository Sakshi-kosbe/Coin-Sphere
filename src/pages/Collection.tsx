import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Plus, Coins as CoinsIcon } from "lucide-react";
import CoinCard from "@/components/CoinCard";
import { toast } from "sonner";

type Coin = {
  id: string;
  name: string;
  country: string | null;
  year: number | null;
  denomination: string | null;
  obverse_image_url: string | null;
  reverse_image_url: string | null;
};

const Collection = () => {
  const navigate = useNavigate();
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchCoins();
    }
  }, [user]);

  const fetchCoins = async () => {
    try {
      const { data, error } = await supabase
        .from("coins")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCoins(data || []);
    } catch (error) {
      toast.error("Error loading coins");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 px-4 flex items-center justify-center">
          <p className="text-muted-foreground">Loading your collection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-bold mb-2">My Collection</h1>
              <p className="text-muted-foreground">
                {coins.length} {coins.length === 1 ? "coin" : "coins"} in your collection
              </p>
            </div>
            <Button
              onClick={() => navigate("/add-coin")}
              className="bg-primary hover:bg-primary/90 shadow-coin"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Coin
            </Button>
          </div>

          {coins.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <CoinsIcon className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold mb-3">No coins yet</h2>
              <p className="text-muted-foreground mb-6">
                Start building your collection by adding your first coin
              </p>
              <Button
                onClick={() => navigate("/add-coin")}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Your First Coin
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coins.map((coin) => (
                <CoinCard key={coin.id} coin={coin} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
