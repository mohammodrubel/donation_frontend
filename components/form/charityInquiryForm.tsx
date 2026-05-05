"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useCreateInquiryMutation } from "@/lib/reudx/fetchers/charityInquiry/charityInquiryApi";
import { toast } from "sonner";

interface Props {
  charityId: string;
  charityName?: string;
  onSuccess?: () => void;
}

export function CharityInquiryForm({ charityId, charityName, onSuccess }: Props) {
  const [submit, { isLoading }] = useCreateInquiryMutation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Invalid email";
    if (!form.subject.trim()) next.subject = "Subject is required";
    if (!form.message.trim()) next.message = "Message is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await submit({ charityId, ...form }).unwrap();
      toast.success("Your message has been sent");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      onSuccess?.();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to send. Please try again.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {charityName && (
        <p className="text-sm text-muted-foreground">
          Send a message to <span className="font-medium text-foreground">{charityName}</span>
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="inq_name">Your name *</Label>
          <Input
            id="inq_name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="inq_email">Email *</Label>
          <Input
            id="inq_email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="inq_phone">Phone (optional)</Label>
          <Input
            id="inq_phone"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="inq_subject">Subject *</Label>
          <Input
            id="inq_subject"
            value={form.subject}
            onChange={(e) => update("subject", e.target.value)}
            className={errors.subject ? "border-red-500" : ""}
          />
          {errors.subject && <p className="text-xs text-red-500">{errors.subject}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="inq_message">Message *</Label>
        <Textarea
          id="inq_message"
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className={errors.message ? "border-red-500" : ""}
          placeholder="How would you like to support this charity?"
        />
        {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="submit" disabled={isLoading} className="gap-2">
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          Send message
        </Button>
      </div>
    </form>
  );
}
