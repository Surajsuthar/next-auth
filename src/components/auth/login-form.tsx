"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema";
import { CardWrapper } from "./card-wrapper";
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

export const LoginForm = () => {
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
        setError(data.error)
        setSucess(data.success)
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error}/>
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
