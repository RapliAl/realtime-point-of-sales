"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import {Form} from "@/components/ui/form"
import {useForm} from "react-hook-form";
import {LoginForm, loginSchemaForm} from "@/validations/auth-validation";
import FormInput from "@/components/common/form-input";

import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {startTransition, useActionState, useEffect} from "react";
import {login} from "@/app/(auth)/login/actions";

import {Loader2} from "lucide-react";
import {toast} from "sonner";
import {INITIAL_LOGIN_FORM, INITIAL_STATE_LOGIN_FORM} from "@/constants/auth-constants";

export default function Login() {
    const form = useForm<LoginForm>({
        resolver: zodResolver(loginSchemaForm),
        defaultValues: INITIAL_LOGIN_FORM
    });

    const [loginState, loginAction, isPendingLogin] = useActionState(
        login,
        INITIAL_STATE_LOGIN_FORM
    )

    const onSubmit = form.handleSubmit(async (data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });
        startTransition(() => {
            loginAction(formData);
        });
    })

    useEffect(() => {
        if (loginState?.status === 'error') {
            toast.error('Login Failed', {
                description: loginState.errors?._form?.[0]
            });
            startTransition(() => {
                loginAction(null)
            });
        }
    }, [loginAction, loginState])

    console.log(loginState)

    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-xl"> Welcome To KedaiKita! </CardTitle>
                <CardDescription> Login to access all features </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <FormInput
                            form={form}
                            type="email"
                            name="email"
                            label="Email"
                            placeholder="Insert Your Email Here"
                        />
                        <FormInput
                            form={form}
                            type="password"
                            name="password"
                            label="Password"
                            placeholder="Insert Your Password Here"
                        />
                        <Button type="submit" className="text-center hover:bg-blue-400 col-span-2"> {isPendingLogin? <Loader2 className="animate-spin"/> : "Login"} </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}