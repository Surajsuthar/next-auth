"use client"

import { CardWrapper } from "./card-wrapper"
import { BeatLoader } from "react-spinners"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect } from "react"

export const NewVefication = () => {
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const onSubmit = useCallback(() => {
        console.log(token)
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
                <BeatLoader/>
            </div>
        </CardWrapper>
    )
}