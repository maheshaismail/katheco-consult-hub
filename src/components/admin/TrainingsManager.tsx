import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Trash2, Plus, Pencil, X, Save } from "lucide-react";

interface Training {
  id: string;
  title: string;
  description: string;
  duration: string;
  outline: string[];
  sort_order: number;
}

export const TrainingsManager = () => {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [outlineText, setOutlineText] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    const { data, error } = await supabase
      .from("trainings")
      .select("*")
      .order("sort_order", { ascending: true });
    if (!error && data) {
      setTrainings(data.map(t => ({ ...t, outline: (t.outline as any) || [] })));
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDuration("");
    setOutlineText("");
    setSortOrder(0);
    setEditingId(null);
    setShowForm(false);
  };

  const startEdit = (t: Training) => {
    setTitle(t.title);
    setDescription(t.description);
    setDuration(t.duration);
    setOutlineText(t.outline.join("\n"));
    setSortOrder(t.sort_order);
    setEditingId(t.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const outline = outlineText.split("\n").filter(o => o.trim());

    try {
      if (editingId) {
        const { error } = await supabase.from("trainings").update({ title, description, duration, outline, sort_order: sortOrder }).eq("id", editingId);
        if (error) throw error;
        toast({ title: "Updated", description: "Training updated." });
      } else {
        const { error } = await supabase.from("trainings").insert({ title, description, duration, outline, sort_order: sortOrder });
        if (error) throw error;
        toast({ title: "Created", description: "Training created." });
      }
      resetForm();
      fetchTrainings();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this training?")) return;
    const { error } = await supabase.from("trainings").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted" });
      fetchTrainings();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Trainings ({trainings.length})</h2>
        <Button onClick={() => { resetForm(); setShowForm(!showForm); }}>
          {showForm ? <><X className="h-4 w-4 mr-2" /> Cancel</> : <><Plus className="h-4 w-4 mr-2" /> Add Training</>}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Edit Training" : "New Training"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g. 3-5 days" />
                </div>
                <div className="space-y-2">
                  <Label>Sort Order</Label>
                  <Input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Outline (one per line)</Label>
                <Textarea value={outlineText} onChange={(e) => setOutlineText(e.target.value)} rows={5} placeholder="Topic 1&#10;Topic 2" />
              </div>
              <Button type="submit" disabled={loading}>
                <Save className="h-4 w-4 mr-2" /> {editingId ? "Update" : "Create"} Training
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {trainings.map((t) => (
          <Card key={t.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs bg-muted px-2 py-0.5 rounded">#{t.sort_order}</span>
                    <h3 className="font-semibold text-lg">{t.title}</h3>
                    {t.duration && <span className="text-xs text-muted-foreground">({t.duration})</span>}
                  </div>
                  <p className="text-muted-foreground mb-2">{t.description}</p>
                  {t.outline.length > 0 && (
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {t.outline.map((o, i) => <li key={i}>• {o}</li>)}
                    </ul>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm" onClick={() => startEdit(t)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(t.id)}>
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
