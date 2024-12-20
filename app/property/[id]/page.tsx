"use client";
import React from "react";
import { Card, CardMedia, Typography, Grid, Container } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

const allProperties = [
  {
    id: 1,
    location: "New York, NY",
    city: "New York",
    state: "NY",
    type: "Apartment",
    rooms: 3,
    bathrooms: 2,
    price: 1200000,
    photos: ["/images/property1.jpg", "/images/property1-2.jpg"],
  },
];

const PropertyDetail = () => {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split("/")[2];

  if (!id) {
    return (
      <Container>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          mt={20}
        >
          Invalid Property
        </Typography>
        <div
          onClick={() => router.back()}
          className="my-4 text-center hover:underline cursor-pointer hover:text-blue-600"
        >
          Go Back
        </div>
      </Container>
    );
  }

  // Find the property by ID
  const property = allProperties.find(
    (prop) => prop.id === parseInt(id + "", 10)
  );

  if (!property) {
    return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Property Not Found
        </Typography>
        <div
          onClick={() => router.back()}
          className="my-4 text-center hover:underline cursor-pointer hover:text-blue-600"
        >
          Go Back
        </div>
      </Container>
    );
  }
  return (
    <div className="container mx-auto p-6">
      <div
        onClick={() => router.back()}
        className="my-4 text-left hover:underline cursor-pointer hover:text-blue-600"
      >
        Go Back
      </div>
      <Typography variant="h4" className="mb-4 font-bold">
        {property.location}
      </Typography>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Details</Typography>
          <Typography>City: {property.city}</Typography>
          <Typography>State: {property.state}</Typography>
          <Typography>Type: {property.type}</Typography>
          <Typography>Rooms: {property.rooms}</Typography>
          <Typography>Bathrooms: {property.bathrooms}</Typography>
          <Typography>Price: ${property.price.toLocaleString()}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className="mb-4">
            Photos
          </Typography>
          <Grid container spacing={2}>
            {property.photos.map((photo, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    image={photo}
                    alt={`Photo ${index + 1}`}
                    className="rounded shadow"
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default PropertyDetail;
