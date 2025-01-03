"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema";
import { CardWrapper } from "./card-wrapper";
import { useSearchParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "../../../actions/login";
import { useState, useTransition } from "react";
import Link from "next/link";

export const LoginForm = () => {
  const searchParams = useSearchParams()
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "email is already use" : ""
  const [error,setError ] = useState<string | undefined>("")
  const [sucess,setSucess] = useState<string | undefined>("")

  const [isPending,startTransition] = useTransition()
  const from = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (value : z.infer<typeof LoginSchema>) => {
    setError("");
    setSucess("");

    startTransition( () => {
      login(value)  
      .then((data) => {
        setError(data?.error)
        // todo : when 2fa 
        setSucess(data?.success)
      })
    })  
  }

  return (
    <div>
      <CardWrapper
        headerLable="Welcome Back"
        backButtonHref="/auth/register"
        backButtonLabel="Don't have an account?"
        showSocial
      >
        <Form {...from}>
          <form onSubmit={from.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={from.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="suraj@example.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={from.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Password"
                        type="Password"
                      />
                    </FormControl>
                    <Button
                    size="sm"
                    variant="link"
                    asChild
                    className="px-0 font-normal"
                    >
                      <Link href="/auth/reset"> 
                        forgot Password
                      </Link>
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error || urlError}/>
            <FormSuccess message={sucess}/>
            <Button
            disabled={isPending}
            type="submit"
            className="w-full"
            >
                Log in
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};
