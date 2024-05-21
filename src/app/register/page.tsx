"use client"

import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
import {
    Box, Button, Container, Grid, Stack, Typography
} from "@mui/material";
import Image from "next/image";
import assets from '@/assets'
import Link from "next/link";
import { modifyPayload } from "@/utils/modifyPayload";
import { registerPatient } from "@/services/actions/registerPatient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const patientValidationSchema = z.object({
    name: z.string().min(1, "Please Enter your name"),
    email: z.string().email("Please enter your valid email address"),
    contactNumber: z.string().regex(/^\d{11}$/, "Please Provide a valid phone number"),
    address: z.string().min(1, "Please Enter your address")
})

export const validationSchema = z.object({
    password: z.string().min(6, "Must be at least 6 characters"),
    patient: patientValidationSchema,
});

export const defaultValues = {
    password: "",
    patient: {
        name: "",
        email: "",
        contactNumber: "",
        address: ""
    }
}

const RegisterPage = () => {
    const router = useRouter()
    const handleRegister = async (values: FieldValues) => {
        const data = modifyPayload(values)

        try {
            const res = await registerPatient(data)
            if (res?.data?.id) {
                toast.success(res.message);
                const result = await userLogin(
                    {
                        password: values.password,
                        email: values.patient.email
                    })
                if (result?.data?.accessToken) {
                    storeUserInfo({ accessToken: result?.data?.accessToken })
                    router.push('/dashboard')
                }
            }
        }
        catch (err: any) {
            console.error(err.message)
        }
    }

    return (
        <Container>
            <Stack
                sx={{
                    height: "100vh",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Box
                    sx={{
                        maxWidth: "600",
                        width: "50%",
                        boxShadow: 4,
                        textAlign: "center",
                        borderRadius: 1,
                        p: 4
                    }}
                >
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
                                Patient Register
                            </Typography>
                        </Box>
                    </Stack>
                    <Box>
                        <PHForm
                            onSubmit={handleRegister}
                            resolver={zodResolver(validationSchema)}
                            defaultValues={defaultValues}
                        >
                            <Grid container spacing={2} my={2}>
                                <Grid item md={12}>
                                    <PHInput
                                        label="Name"
                                        fullWidth={true}
                                        name="patient.name"
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <PHInput
                                        label="Email"
                                        type="email"
                                        fullWidth={true}
                                        name="patient.email"
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <PHInput

                                        label="Password"
                                        type="password"
                                        fullWidth={true}
                                        name="password"
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <PHInput
                                        label="Contact Number"
                                        type="tel"
                                        fullWidth={true}
                                        name="patient.contactNumber"
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <PHInput
                                        label="Address"
                                        type="text"
                                        fullWidth={true}
                                        name="patient.address"

                                    />
                                </Grid>
                            </Grid>
                            <Button sx={{
                                margin: "10px 0px"
                            }} fullWidth={true}
                                type="submit"
                            >Register
                            </Button>
                            <Typography component="p" fontWeight={300}>
                                Do you already have an account?
                                <Link href="/login">Login</Link>
                            </Typography>
                        </PHForm>
                    </Box>
                </Box>
            </Stack>
        </Container>
    );
};

export default RegisterPage;