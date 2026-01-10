"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"

import { Input } from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {LoginForm, loginSchema} from "@/validations/auth-validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {INITIAL_LOGIN_FORM} from "@/constants/auth-constants";
import {Button} from "@/components/ui/button";
import FormInput from "@/components/common/form-input";

export default function Login() {
    const form = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: INITIAL_LOGIN_FORM
    })

    const onSubmit = form.handleSubmit(async (data) => {
        console.log(data);
    })

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
                        <Button type="submit" className="items-center"> Login </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}