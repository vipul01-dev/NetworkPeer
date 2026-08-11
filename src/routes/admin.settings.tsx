import { createFileRoute } from "@tanstack/react-router";
import { Bell, PlusCircle, ShieldCheck, Smartphone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { PageHeader } from "@/components/shell/portal-shell";
import { Chip, SectionCard } from "@/components/marketplace/primitives";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({ meta: [{ title: "Admin settings — NetworkPeers" }, { name: "description", content: "Console configuration and security controls." }] }),
  component: AdminSettings,
});

type SettingSection = "categories" | "regions" | "roles";

function AdminSettings() {
  const [categories, setCategories] = useState(["Inspection", "Photography", "Merchandising"]);
  const [regions, setRegions] = useState(["Delhi", "Mumbai", "Bengaluru"]);
  const [roles, setRoles] = useState(["Ops Lead", "Fraud Reviewer", "Finance"]);
  const [modal, setModal] = useState<SettingSection | null>(null);
  const [draft, setDraft] = useState("");

  const saveItem = () => {
    if (!modal) return;
    if (modal === "categories") {
      setCategories((prev) => (draft ? [...prev, draft] : prev));
      toast.success(`Category added: ${draft}`);
    }
    if (modal === "regions") {
      setRegions((prev) => (draft ? [...prev, draft] : prev));
      toast.success(`Region added: ${draft}`);
    }
    if (modal === "roles") {
      setRoles((prev) => (draft ? [...prev, draft] : prev));
      toast.success(`Role added: ${draft}`);
    }
    setDraft("");
    setModal(null);
  };

  return (
    <div className="animate-rise space-y-6">
      <PageHeader title="Settings" description="Manage categories, regions and role access." />

      <div className="grid gap-4 xl:grid-cols-2">
        <SectionCard title="Categories" description="Active service categories" action={<button type="button" onClick={() => { setModal("categories"); setDraft(""); }} className="rounded-xl border border-border bg-card px-3 py-2 text-base font-medium">Add</button>}>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => <Chip key={category}>{category}</Chip>)}
          </div>
        </SectionCard>

        <SectionCard title="Regions" description="Coverage areas" action={<button type="button" onClick={() => { setModal("regions"); setDraft(""); }} className="rounded-xl border border-border bg-card px-3 py-2 text-base font-medium">Add</button>}>
          <div className="flex flex-wrap gap-2">
            {regions.map((region) => <Chip key={region}>{region}</Chip>)}
          </div>
        </SectionCard>

        <SectionCard title="Roles" description="Operational permissions" action={<button type="button" onClick={() => { setModal("roles"); setDraft(""); }} className="rounded-xl border border-border bg-card px-3 py-2 text-base font-medium">Add</button>}>
          <div className="flex flex-wrap gap-2">
            {roles.map((role) => <Chip key={role}>{role}</Chip>)}
          </div>
        </SectionCard>
      </div>

      <Dialog open={Boolean(modal)} onOpenChange={(open) => !open && setModal(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{`Add ${modal}`}</DialogTitle>
            <DialogDescription>These changes remain in the mock admin state and surface to the UI immediately.</DialogDescription>
          </DialogHeader>
          <label className="block text-base">
            <span className="mb-1 block text-muted-foreground">New value</span>
            <input value={draft} onChange={(e) => setDraft(e.target.value)} className="h-10 w-full rounded-xl border border-border bg-background px-3 text-base" />
          </label>
          <DialogFooter>
            <button type="button" onClick={saveItem} className="press gradient-brand inline-flex items-center justify-center rounded-xl px-4 py-2 text-base font-semibold text-primary-foreground">Save</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
