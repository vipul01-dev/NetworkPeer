import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Mail, ShieldCheck, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Field } from "@/components/auth/auth-ui";
import { PageHeader } from "@/components/shell/portal-shell";

export const Route = createFileRoute("/admin/account")({
  head: () => ({
    meta: [
      { title: "Admin account — NetworkPeers" },
      { name: "description", content: "Edit the admin account and sign out of the console." },
    ],
  }),
  component: AdminAccount,
});

const initialAdmin = {
  name: "Alex Lane",
  email: "alex.lane@networkpeers.com",
  role: "Operations Lead",
};

function clearAdminSession() {
  if (typeof window === "undefined") return;
  window.sessionStorage.clear();
}

function AdminAccount() {
  const router = useRouter();
  const [name, setName] = useState(initialAdmin.name);
  const [email, setEmail] = useState(initialAdmin.email);
  const [role, setRole] = useState(initialAdmin.role);

  const handleSave = () => {
    toast.success("Admin account updated.");
  };

  const handleSignOut = () => {
    clearAdminSession();
    router.navigate({ to: "/auth" });
  };

  return (
    <div className="animate-rise space-y-6">
      <PageHeader title="Account" description="Manage your admin profile and sign out of the console." />

      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-6 space-y-2">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Admin details</p>
            <h2 className="text-2xl font-semibold">Profile</h2>
            <p className="text-base text-muted-foreground">Update your name, email address, and role for the admin console.</p>
          </div>

          <div className="space-y-4">
            <Field label="Name" type="text" placeholder="Alex Lane" icon={User} value={name} onChange={(event) => setName(event.target.value)} />
            <Field label="Email" type="email" placeholder="alex@networkpeers.com" icon={Mail} value={email} onChange={(event) => setEmail(event.target.value)} />
            <Field label="Role" type="text" placeholder="Operations Lead" icon={ShieldCheck} value={role} onChange={(event) => setRole(event.target.value)} />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button type="button" onClick={handleSave} className="press gradient-brand shadow-glow inline-flex items-center justify-center rounded-xl px-4 py-3 text-base font-semibold text-primary-foreground">
              Save details
            </button>
            <button type="button" onClick={handleSignOut} className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-4 py-3 text-base font-semibold text-destructive transition hover:bg-destructive/10 hover:text-destructive">
              Sign Out
            </button>
          </div>
        </section>

        <aside className="rounded-3xl border border-border bg-muted/50 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Account info</p>
          <div className="mt-4 space-y-4 text-base">
            <div>
              <p className="text-muted-foreground">Name</p>
              <p className="font-semibold text-foreground">{name}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Email</p>
              <p className="font-semibold text-foreground">{email}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Role</p>
              <p className="font-semibold text-foreground">{role}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
