import { Container, Stack, Box, Typography, Grid, TextField, Button } from "@mui/material";
import Image from "next/image";
import assets from '@/assets'
import Link from "next/link";

const LoginPage = () => {
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
                        <form>
                            <Grid container spacing={2} my={2}>
                                <Grid item md={6}>
                                    <TextField
                                        label="Email"
                                        type="email"
                                        variant="outlined"
                                        size="small"
                                        fullWidth={true}
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <TextField
                                        label="Password"
                                        type="password"
                                        variant="outlined"
                                        size="small"
                                        fullWidth={true}
                                    />
                                </Grid>
                            </Grid>
                            <Typography
                                textAlign="end"
                                component="p"
                                fontWeight={300}>
                                Forgot Password?
                            </Typography>
                            <Button sx={{
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