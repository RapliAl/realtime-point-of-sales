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

export default function Login() {
    const form = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: INITIAL_LOGIN_FORM
    })

    const onSubmit = form.handleSubmit(async (data) => {})

    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-xl"> Welcome To KedaiKita! </CardTitle>
                <CardDescription> Login to access all features </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field: {...rest} }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        {...rest}
                                        type="email"
                                        placeholder="Email"
                                        autoComplete="off"
                                        required
                                    />
                                </FormControl>
                                <FormDescription>
                                    Place Your Email Here!
                                </FormDescription>
                                <FormMessage className="text-xs"/>
                            </FormItem>
                        )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field: {...rest} }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...rest}
                                            type="password"
                                            placeholder="Your Password"
                                            autoComplete="off"
                                            required
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Place Your Password Here!
                                    </FormDescription>
                                    <FormMessage className="text-xs"/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="items-center"> Login </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}