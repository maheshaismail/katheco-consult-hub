import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Save, Plus, Trash2, X } from "lucide-react";

interface SiteSetting {
  id: string;
  setting_key: string;
  setting_value: string;
  setting_type: string;
}

const DEFAULT_SETTINGS = [
  { key: "hero_title", label: "Hero Title", type: "text" },
  { key: "hero_subtitle", label: "Hero Subtitle", type: "text" },
  { key: "whatsapp_number", label: "WhatsApp Number", type: "text" },
  { key: "whatsapp_group_link", label: "WhatsApp Group Link", type: "text" },
  { key: "email", label: "Contact Email", type: "text" },
  { key: "phone", label: "Phone Number", type: "text" },
  { key: "address", label: "Office Address", type: "text" },
  { key: "facebook_url", label: "Facebook URL", type: "text" },
  { key: "instagram_url", label: "Instagram URL", type: "text" },
];

export const SiteSettingsManager = () => {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [customKey, setCustomKey] = useState("");
  const [customValue, setCustomValue] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .order("setting_key");
    if (!error) setSettings(data || []);
  };

  const getSettingValue = (key: string) => {
    return settings.find(s => s.setting_key === key)?.setting_value || "";
  };

  const saveSetting = async (key: string, value: string, type: string = "text") => {
    setLoading(true);
    const existing = settings.find(s => s.setting_key === key);
    
    try {
      if (existing) {
        const { error } = await supabase
          .from("site_settings")
          .update({ setting_value: value })
          .eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("site_settings")
          .insert({ setting_key: key, setting_value: value, setting_type: type });
        if (error) throw error;
      }
      toast({ title: "Saved", description: `${key} updated.` });
      fetchSettings();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const fileName = `logo-${Date.now()}.${file.name.split(".").pop()}`;
      const { error: uploadError } = await supabase.storage.from("announcements").upload(fileName, file);
      if (uploadError) throw uploadError;
      const { data: urlData } = supabase.storage.from("announcements").getPublicUrl(fileName);
      await saveSetting("logo_url", urlData.publicUrl);
      toast({ title: "Logo Updated" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const deleteSetting = async (id: string) => {
    const { error } = await supabase.from("site_settings").delete().eq("id", id);
    if (!error) {
      toast({ title: "Deleted" });
      fetchSettings();
    }
  };

  const handleAddCustom = async () => {
    if (!customKey.trim()) return;
    await saveSetting(customKey, customValue);
    setCustomKey("");
    setCustomValue("");
    setShowCustom(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Site Settings</h2>

      {/* Logo Upload */}
      <Card>
        <CardHeader><CardTitle>Logo</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {getSettingValue("logo_url") && (
            <img src={getSettingValue("logo_url")} alt="Current logo" className="h-20 object-contain rounded border p-2" />
          )}
          <div className="space-y-2">
            <Label>Upload New Logo</Label>
            <Input type="file" accept="image/*" onChange={handleLogoUpload} disabled={loading} />
          </div>
        </CardContent>
      </Card>

      {/* Default Settings */}
      <Card>
        <CardHeader><CardTitle>General Settings</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {DEFAULT_SETTINGS.map((ds) => (
            <SettingRow
              key={ds.key}
              label={ds.label}
              value={getSettingValue(ds.key)}
              onSave={(val) => saveSetting(ds.key, val, ds.type)}
              loading={loading}
            />
          ))}
        </CardContent>
      </Card>

      {/* Custom Settings */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Custom Settings</CardTitle>
            <Button size="sm" variant="outline" onClick={() => setShowCustom(!showCustom)}>
              {showCustom ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {showCustom && (
            <div className="flex gap-2 items-end">
              <div className="space-y-1 flex-1">
                <Label>Key</Label>
                <Input value={customKey} onChange={(e) => setCustomKey(e.target.value)} placeholder="setting_key" />
              </div>
              <div className="space-y-1 flex-1">
                <Label>Value</Label>
                <Input value={customValue} onChange={(e) => setCustomValue(e.target.value)} placeholder="Value" />
              </div>
              <Button onClick={handleAddCustom} disabled={loading}><Save className="h-4 w-4" /></Button>
            </div>
          )}
          {settings
            .filter(s => !DEFAULT_SETTINGS.some(ds => ds.key === s.setting_key) && s.setting_key !== "logo_url")
            .map((s) => (
              <div key={s.id} className="flex gap-2 items-center">
                <span className="text-sm font-medium min-w-[120px]">{s.setting_key}</span>
                <span className="text-sm text-muted-foreground flex-1 truncate">{s.setting_value}</span>
                <Button variant="destructive" size="sm" onClick={() => deleteSetting(s.id)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  );
};

const SettingRow = ({ label, value, onSave, loading }: { label: string; value: string; onSave: (val: string) => void; loading: boolean }) => {
  const [val, setVal] = useState(value);
  const [dirty, setDirty] = useState(false);

  useEffect(() => { setVal(value); setDirty(false); }, [value]);

  return (
    <div className="flex gap-2 items-end">
      <div className="space-y-1 flex-1">
        <Label className="text-xs">{label}</Label>
        <Input
          value={val}
          onChange={(e) => { setVal(e.target.value); setDirty(true); }}
          placeholder={label}
        />
      </div>
      {dirty && (
        <Button size="sm" onClick={() => { onSave(val); setDirty(false); }} disabled={loading}>
          <Save className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
