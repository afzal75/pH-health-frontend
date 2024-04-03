"use client"
import { Container, Stack, Box, Typography, Grid, TextField, Button } from "@mui/material";
import Image from "next/image";
import assets from '@/assets'
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { userLogin } from "@/services/actions/userLogin";
import { toast } from "sonner";
import { storeUserInfo } from "@/services/auth.services";
import { useRouter } from "next/navigation";

export type FormValues = {
    email: string;
    password: string
}

const LoginPage = () => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormValues>()


    const
        onSubmit: SubmitHandler<FormValues> = async (values) => {

            console.log(values)
            try {
                const res = await userLogin(values)
                if (res?.data?.accessToken) {
                    toast.success(res.message)
                    storeUserInfo({ accessToken: res?.data?.accessToken })
                    router.push('/')
                }
            }
            catch (err: any) {
                console.error(err.message)
            }
        }
    return (
        <Container>
            <Stack sx={{
                height: "100vh",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Box sx={{
                    maxWidth: "600",
                    width: "50%",
                    boxShadow: 4,
                    textAlign: "center",
                    borderRadius: 1,
                    p: 4
                }}>
                    <Stack
                        sx={{
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Box>
                            <Image
                                src={assets.svgs.logo}
                                alt="logo"
                                width={50}
                                height={50}
                            />
                        </Box>
                        <Box>
                            <Typography variant="h6" fontWeight={600}>
                                Login PH HelthCare
                            </Typography>
                        </Box>
                    </Stack>
                    <Box>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2} my={2}>
                                <Grid item md={6}>
                                    <TextField
                                        label="Email"
                                        type="email"
                                        variant="outlined"
                                        size="small"
                                        fullWidth={true}
                                        {...register("email")}
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <TextField
                                        label="Password"
                                        type="password"
                                        variant="outlined"
                                        size="small"
                                        fullWidth={true}
                                        {...register("password")}

                                    />
                                </Grid>
                            </Grid>
                            <Typography
                                textAlign="end"
                                component="p"
                                fontWeight={300}>
                                Forgot Password?
                            </Typography>
                            <Button
                                type="submit"
                                sx={{
                                    margin: "10px 0px"
                                }} fullWidth={true}>Login
                            </Button>
                            <Typography component="p" fontWeight={300}>
                                Don&apos; have an account?
                                <Link href="/register"> Create an Account</Link>
                            </Typography>
                        </form>
                    </Box>
                </Box>
            </Stack>
        </Container>
    );
};

export default LoginPage;