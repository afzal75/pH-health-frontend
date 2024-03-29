import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import LocationOnIcon from '@mui/icons-material/LocationOn';


const TopRatedDoctors = async () => {
    const response = await fetch("http://localhost:5000/api/v1/doctor?page=1&limit=3")
    const { data: doctors } = await response.json()
    return (
        <Box sx={{
            my: 10,
            py: 30,
            backgroundColor: "rgba(20,20,20,0.1)",
            clipPath: "polygon(0 0, 100% 25%, 100% 100%, 0 75%)"
        }}>
            <Box sx={{ textAlign: "center" }}>
                <Typography variant="h4" fontWeight={600}>
                    Our Top Rated Doctors
                </Typography>
                <Typography component="p" fontWeight={400} fontSize={18}>
                    Access to expert physicians and surgenos,
                    advanced technologies
                </Typography>
                <Typography component="p" fontWeight={400} fontSize={18}>
                    and top-quality surgery facilities right here.
                </Typography>
            </Box>
            <Container sx={{ margin: "30px auto" }}>
                <Grid container spacing={2}>
                    {
                        doctors.map((doctor: any) => (
                            <Grid item key={doctor.id} md={4}>
                                <Card>
                                    <Image
                                        src={doctor.profilePhoto}
                                        alt="profilePhoto"
                                        width={500}
                                        height={100}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {doctor.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {doctor.qualification}, {doctor.designation},
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            mt={1}
                                        >
                                            <LocationOnIcon /> {doctor.address}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{
                                        justifyContent: "space-between",
                                        px: 2,
                                        paddingBottom: "20px"
                                    }}>
                                        <Button >Book Now</Button>
                                        <Button variant="outlined">
                                            View Profile</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
                <Box sx={{
                    textAlign: "center"
                }}>
                    <Button sx={{
                        marginTop: "20px"
                    }} variant="outlined">View All</Button>
                </Box>
            </Container>
        </Box>
    );
};

export default TopRatedDoctors;