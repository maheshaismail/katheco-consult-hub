import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Trash2, Plus, Pencil, X, Save } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  sort_order: number;
}

export const ServicesManager = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [benefitsText, setBenefitsText] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("sort_order", { ascending: true });
    if (!error && data) {
      setServices(data.map(s => ({ ...s, benefits: (s.benefits as any) || [] })));
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setBenefitsText("");
    setSortOrder(0);
    setEditingId(null);
    setShowForm(false);
  };

  const startEdit = (service: Service) => {
    setTitle(service.title);
    setDescription(service.description);
    setBenefitsText(service.benefits.join("\n"));
    setSortOrder(service.sort_order);
    setEditingId(service.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const benefits = benefitsText.split("\n").filter(b => b.trim());

    try {
      if (editingId) {
        const { error } = await supabase.from("services").update({ title, description, benefits, sort_order: sortOrder }).eq("id", editingId);
        if (error) throw error;
        toast({ title: "Updated", description: "Service updated successfully." });
      } else {
        const { error } = await supabase.from("services").insert({ title, description, benefits, sort_order: sortOrder });
        if (error) throw error;
        toast({ title: "Created", description: "Service created successfully." });
      }
      resetForm();
      fetchServices();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Service removed." });
      fetchServices();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Services ({services.length})</h2>
        <Button onClick={() => { resetForm(); setShowForm(!showForm); }}>
          {showForm ? <><X className="h-4 w-4 mr-2" /> Cancel</> : <><Plus className="h-4 w-4 mr-2" /> Add Service</>}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Edit Service" : "New Service"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Service title" />
                </div>
                <div className="space-y-2">
                  <Label>Sort Order</Label>
                  <Input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} required placeholder="Service description" rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Benefits (one per line)</Label>
                <Textarea value={benefitsText} onChange={(e) => setBenefitsText(e.target.value)} placeholder="Benefit 1&#10;Benefit 2&#10;Benefit 3" rows={5} />
              </div>
              <Button type="submit" disabled={loading}>
                <Save className="h-4 w-4 mr-2" /> {editingId ? "Update" : "Create"} Service
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {services.map((s) => (
          <Card key={s.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs bg-muted px-2 py-0.5 rounded">#{s.sort_order}</span>
                    <h3 className="font-semibold text-lg">{s.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-2">{s.description}</p>
                  {s.benefits.length > 0 && (
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {s.benefits.map((b, i) => <li key={i}>• {b}</li>)}
                    </ul>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm" onClick={() => startEdit(s)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(s.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
