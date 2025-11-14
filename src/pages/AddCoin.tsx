import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Upload, Loader2 } from "lucide-react";
import { z } from "zod";

const coinSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  country: z.string().trim().max(100).optional(),
  denomination: z.string().trim().max(100).optional(),
  year: z.number().min(1).max(new Date().getFullYear() + 1).optional(),
  metal: z.string().trim().max(100).optional(),
  weight: z.number().positive().optional(),
  diameter: z.number().positive().optional(),
});

const AddCoin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    denomination: "",
    year: "",
    metal: "",
    weight: "",
    diameter: "",
    shape: "",
    edge_design: "",
    mint_mark: "",
    obverse_design: "",
    reverse_design: "",
    issue_type: "",
    security_features: "",
  });

  const [obverseImage, setObverseImage] = useState<File | null>(null);
  const [reverseImage, setReverseImage] = useState<File | null>(null);

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

  const uploadImage = async (file: File, side: string) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}/${Date.now()}_${side}.${fileExt}`;

    const { error: uploadError, data } = await supabase.storage
      .from("coin-images")
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from("coin-images")
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const coinData = {
        name: formData.name,
        country: formData.country || null,
        denomination: formData.denomination || null,
        year: formData.year ? parseInt(formData.year) : null,
        metal: formData.metal || null,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        diameter: formData.diameter ? parseFloat(formData.diameter) : null,
      };

      coinSchema.parse(coinData);

      setLoading(true);

      let obverseUrl = null;
      let reverseUrl = null;

      if (obverseImage) {
        obverseUrl = await uploadImage(obverseImage, "obverse");
      }

      if (reverseImage) {
        reverseUrl = await uploadImage(reverseImage, "reverse");
      }

      const { error } = await supabase.from("coins").insert({
        user_id: user.id,
        ...formData,
        year: formData.year ? parseInt(formData.year) : null,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        diameter: formData.diameter ? parseFloat(formData.diameter) : null,
        obverse_image_url: obverseUrl,
        reverse_image_url: reverseUrl,
      });

      if (error) throw error;

      toast.success("Coin added successfully!");
      navigate("/collection");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Error adding coin");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Add New Coin</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Coin Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      name="year"
                      type="number"
                      value={formData.year}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="denomination">Denomination</Label>
                    <Input
                      id="denomination"
                      name="denomination"
                      value={formData.denomination}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="issue_type">Issue Type</Label>
                    <Input
                      id="issue_type"
                      name="issue_type"
                      placeholder="Regular, Commemorative, etc."
                      value={formData.issue_type}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Physical Characteristics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="metal">Metal</Label>
                    <Input
                      id="metal"
                      name="metal"
                      placeholder="Gold, Silver, Bronze..."
                      value={formData.metal}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight">Weight (g)</Label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      step="0.01"
                      value={formData.weight}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="diameter">Diameter (mm)</Label>
                    <Input
                      id="diameter"
                      name="diameter"
                      type="number"
                      step="0.01"
                      value={formData.diameter}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="shape">Shape</Label>
                    <Input
                      id="shape"
                      name="shape"
                      placeholder="Round, Polygonal..."
                      value={formData.shape}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edge_design">Edge Design</Label>
                    <Input
                      id="edge_design"
                      name="edge_design"
                      placeholder="Plain, Reeded..."
                      value={formData.edge_design}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="mint_mark">Mint Mark</Label>
                    <Input
                      id="mint_mark"
                      name="mint_mark"
                      value={formData.mint_mark}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Design Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="obverse_design">Obverse Design</Label>
                  <Textarea
                    id="obverse_design"
                    name="obverse_design"
                    placeholder="Describe the front side of the coin..."
                    value={formData.obverse_design}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="reverse_design">Reverse Design</Label>
                  <Textarea
                    id="reverse_design"
                    name="reverse_design"
                    placeholder="Describe the back side of the coin..."
                    value={formData.reverse_design}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="security_features">Security Features</Label>
                  <Textarea
                    id="security_features"
                    name="security_features"
                    placeholder="List any security features..."
                    value={formData.security_features}
                    onChange={handleChange}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Images</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="obverse">Obverse (Front) Image</Label>
                  <div className="mt-2">
                    <input
                      id="obverse"
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setObverseImage(e.target.files?.[0] || null)
                      }
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("obverse")?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {obverseImage ? obverseImage.name : "Choose File"}
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="reverse">Reverse (Back) Image</Label>
                  <div className="mt-2">
                    <input
                      id="reverse"
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setReverseImage(e.target.files?.[0] || null)
                      }
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("reverse")?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {reverseImage ? reverseImage.name : "Choose File"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={loading}
                className="bg-primary hover:bg-primary/90"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding Coin...
                  </>
                ) : (
                  "Add Coin"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/collection")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCoin;
