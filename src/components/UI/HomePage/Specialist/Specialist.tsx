import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";

const Specialist = async () => {
    const response = await fetch("http://localhost:5000/api/v1/specialties", {
        next: {
            revalidate: 30,
        }
    })
    const { data: specialties } = await response.json()
    // console.log(specialties)
    return (
        <Container>
            <Box sx={{
                margin: "40px 0px",
                textAlign: "center"
            }}>
                <Box sx={{
                    textAlign: "start",
                }}>
                    <Typography variant="h4" fontWeight={600}>
                        Explore Treatments across specialties
                    </Typography>
                    <Typography component="p" fontWeight={300} fontSize={18}>
                        Experienced Doctors across all specialties
                    </Typography>
                </Box>
                <Stack direction="row" gap={4} mt={5}>
                    {
                        specialties.slice(0, 6).map((specialty: any) => (
                            <Box key={specialty.id}
                                sx={{
                                    flex: 1,
                                    width: "150px",
                                    backgroundColor: "rgba(245,245,245,1)",
                                    border: "1xp,solid rgba(250,250,250,1)",
                                    borderRadius: "10px",
                                    textAlign: "center",
                                    padding: "40px 10px",
                                    "& img": {
                                        width: "50px",
                                        height: "50px",
                                        margin: "0 auto"
                                    },
                                    "&:hover": {
                                        border: "1px solid blue",
                                        borderRadius: "10px",
                                        padding: "40px 10px",
                                    }
                                }}
                            >
                                <Image
                                    src={specialty.icon}
                                    alt="specialty"
                                    width={100}
                                    height={100}
                                />
                                <Box>
                                    <Typography component="p" mt={2} fontWeight={600}>
                                        {specialty.title}
                                    </Typography>
                                </Box>
                            </Box>
                        ))
                    }
                </Stack>
                <Button sx={{
                    marginTop: "20px"
                }} variant="outlined">View All</Button>
            </Box>
        </Container>
    );
};

export default Specialist;