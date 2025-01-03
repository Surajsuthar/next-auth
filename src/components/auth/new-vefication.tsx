"use client"

import { CardWrapper } from "./card-wrapper"
import { BeatLoader } from "react-spinners"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { newVefication } from "@/actions/new-verification"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"

export const NewVefication = () => {
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const onSubmit = useCallback(() => {
        if(!token) {
            setError("Token doesnt exisit")
            return;
        }
        newVefication(token)
        .then((data) => {
            setError(data.error)
            setSuccess(data.success)
        });
    },[token])

    useEffect(() => {
        onSubmit()
    },[onSubmit])
    return (
        <CardWrapper
        headerLable="Confirmation of email"
        backButtonLabel="back to login"
        backButtonHref="/auth/login"
        >
            <div className="flex items-center justify-center w-full">
                { !success && !error && (
                    <BeatLoader/>
                )}
                <FormError message={error}/>
                <FormSuccess message={success}/>
            </div>
        </CardWrapper>
    )
}