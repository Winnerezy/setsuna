"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../@/components/ui/form";
import CustomButton from "./CustomButton";
import { authFormSchema } from "../lib/utils/authFormSchema";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "../@/components/ui/input";

export default function AuthForm({ type }: { type: string }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (type === "sign-in") {
        try {
          setIsLoading(true)
                  const body = {
                    username: data.username,
                    password: data.password,
                  };
                 const res = await axios.post("/api/login", body);
                 const authToken = res.data
                 localStorage.setItem('authToken', authToken)
                 router.push("/home");
        } catch (error) {
            console.error({ message: error.message })
        } finally {
          setIsLoading(false)
        }

    } 
    if(type === 'sign-up'){
         try {
          setIsLoading(true)
           const body = {
             firstname: data.firstname,
             lastname: data.lastname,
             username: data.username,
             email: data.email,
             password: data.password,
           };
           const res = await axios.post("/api/register", body);
           const authToken = res.data;
           localStorage.setItem("authToken", authToken);
           router.push("/home");
         } catch (error) {
           console.error({ message: error.message });
         } finally {
           setIsLoading(false);
         }
    }
  }

  return (
    <section className="relative flex flex-col gap-1 w-[500px] min-h-[600px] items-center justify-center py-10">
      <header className="flex flex-col absolute top-8 left-2 gap-y-2">
        <p className="text-3xl font-bold text-[var(--global-secondary-text)]">
          Setsuna
        </p>
        <h1 className="font-bold text-2xl tracking-wide self-start">
          {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
        </h1>
        <p>Please enter your details below</p>
      </header>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col w-full p-2"
        >
          {type === "sign-up" ? (
            <main className="space-y-6 mt-36">
              <div className="flex gap-x-4">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem className="w-full flex-grow space-y-2">
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your first name"
                          {...field}
                          className={`p-2 rounded-[10px] w-full flex-grow outline-none text-black`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem className="w-full flex-grow space-y-2">
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your last name"
                          {...field}
                          className={`p-2 rounded-[10px] w-full flex-grow outline-none text-black`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="w-full flex-grow space-y-2">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        {...field}
                        className={`p-2 rounded-[10px] w-full flex-grow outline-none text-black`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full flex-grow space-y-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email address"
                        {...field}
                        className={`p-2 rounded-[10px] w-full flex-grow outline-none text-black`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full flex-grow space-y-2">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        {...field}
                        className={`p-2 rounded-[10px] w-full flex-grow outline-none text-black`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </main>
          ) : (
            <main className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="w-full flex-grow space-y-2">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        {...field}
                        className={`p-2 rounded-[10px] w-full flex-grow outline-none text-black`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full flex-grow space-y-2">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        {...field}
                        className={`p-2 rounded-[10px] w-full flex-grow outline-none text-black`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </main>
          )}

          <CustomButton type={type} isLoading={isLoading} />
        </form>
      </Form>
      <p>
        {type === "sign-in" ? "Don't have an account ?" : "Have an account ?"}{" "}
        <Link
          href={type === "sign-in" ? "sign-up" : "sign-in"}
          className="text-[var(--global-secondary-text)] hover:text-[var(--global-tetiary-text)]"
        >
          {type === "sign-in" ? "Sign Up" : "Sign In"}
        </Link>
      </p>
    </section>
  );
}
