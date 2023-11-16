"use client";

import { Button } from "@/src/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import GoogleIcon from "@/public/svg/google_logo.svg";
import Link from "next/link";
import React from "react";
import { z } from "zod";
import { useLoginMitra } from "@/src/application/hooks/mitraAuth/useLoginMitra";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { loginMitraMutation, isLoading } = useLoginMitra();

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    loginMitraMutation(values);
  };

  return (
    <div className="flex items-center px-[24px] xl:px-[240px] md:px-[100px] font-inter">
      <div>
        <h1 className="text-[#0F172A] text-lg lg:text-[48px] text-lg font-bold">
          Welcome Back
        </h1>
        <p className="text-[#929292] lg:text-[20px] leading-[51.27px] lg:mt-2">
          Welcome back please enter your user details
        </p>

        <Link
          href="/login"
          className="lg:text-[20px] text-blue-600 underline cursor-pointer"
        >
          Masuk Sebagai user ?
        </Link>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-4">
            <div className="space-y-4 mb-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-[16px]">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        className="md:text-[16px] h-[56px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="md:text-[16px]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-[16px]">Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        className="md:text-[16px] h-[56px]"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="md:text-[16px]" />
                  </FormItem>
                )}
              />
            </div>

            <Button
              disabled={isLoading}
              type="submit"
              className="md:text-[16px] h-[56px] w-full rounded-[8px] bg-[#020831] font-bold"
            >
              {isLoading ? "Loading..." : "Sign In"}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="md:text-[16px] h-[56px] w-full rounded-[8px] font-bold mt-2"
            >
              <GoogleIcon /> Sign in with Google
            </Button>

            <p className="text-[#797979] mt-4 text-center">
              Don&apos;t have an account?{" "}
              <Link href="/registerMitra" className="font-bold text-black">
                Sign up for free
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
