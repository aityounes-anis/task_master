"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/lib/fetcher";
import { useModalStore } from "@/hooks/use-modal-store";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "project name must be at least 1 character.",
  }),
});

type ProjectType = {
  id: string;
};

export function ProjectCreateForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const { close } = useModalStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      const res = await fetcher<ProjectType>("/api/projects", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast("Project Created Successfully!");

      close();

      if (res?.id) {
        router.push(`/projects/${res.id}`);
      }
    } catch (error) {
      console.log(error);
      toast("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>name</FormLabel>
                <FormControl>
                  <Input placeholder="Task Master" {...field} />
                </FormControl>
                <FormDescription>
                  You can rename your project later.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="lg"
            className="cursor-pointer"
            disabled={isSubmitting}
          >
            Add Project
          </Button>
        </div>
      </form>
    </Form>
  );
}
