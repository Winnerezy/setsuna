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
import CustomInput from "./CustomInput";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AuthForm({ type }: { type: string }) {
  const [user, setUser] = useState(null);

  const router = useRouter()

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (type === "sign-in") {
        try {
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
        }

    } 
    if(type === 'sign-up'){
         try {
            const body = {
                firstname: data.firstname,
                lastname: data.lastname,
                username: data.username,
                email: data.email,
                password: data.password
            };
           const res = await axios.post("/api/register", body);
           const authToken = res.data;
           localStorage.setItem("authToken", authToken);
           router.push('/home')
         } catch (error) {
           console.error({ message: error.message });
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
                <CustomInput
                  control={form.control}
                  label="First Name"
                  name="firstname"
                  placeholder="Enter your first name"
                  className={"max-w-80"}
                />

                <CustomInput
                  control={form.control}
                  label="Last Name"
                  name="lastname"
                  placeholder="Enter your last name"
                  className={"max-w-80"}
                />
              </div>

              <CustomInput
                control={form.control}
                label="Username"
                name="username"
                placeholder="Enter your username"
                className=""
              />

              <CustomInput
                control={form.control}
                label="Email"
                name="email"
                placeholder="Enter your email address"
                className=""
              />

              <CustomInput
                control={form.control}
                label="Password"
                name="password"
                placeholder="Enter your password"
                className=""
              />
            </main>
          ) : (
            <main className="space-y-8">
              <CustomInput
                control={form.control}
                label="Username"
                name="username"
                placeholder="Enter your username"
                className=""
              />

              <CustomInput
                control={form.control}
                label="Password"
                name="password"
                placeholder="Enter your password"
                className=""
              />
            </main>
          )}

          <CustomButton type={type} />
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
