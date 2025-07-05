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
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "task name must be at least 1 character.",
  }),
  description: z.string().min(1, {
    message: "Task Description must be at least 1 character.",
  }),
  dueDate: z.string().optional(),
});

type TaskFetchType = {
  id: string;
};

export function TaskCreateForm({ params }: { params: { projectId: string } }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const { close } = useModalStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      const res = await fetcher<TaskFetchType>(
        `/projects/${params.projectId}/tasks`,
        {
          method: "POST",
          body: JSON.stringify({
            ...values,
            dueDate: values.dueDate ? new Date(values.dueDate) : null,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast("Task Created Successfully!");

      close();

      if (res?.id) {
        router.push(`/projects/${params.projectId}/tasks/${res.id}`);
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
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Task Title..." {...field} />
                </FormControl>
                <FormDescription>
                  You can rename your task later.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter Task Description..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
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
            Add Task
          </Button>
        </div>
      </form>
    </Form>
  );
}
