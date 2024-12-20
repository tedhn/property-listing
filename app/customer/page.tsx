import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useAtom } from "jotai";
import Link from "next/link";
import React, { useState } from "react";
import { propertiesAtom } from "../data";

const CustomerPage = () => {
  const [properties] = useAtom(propertiesAtom);
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    minPrice: "",
    maxPrice: "",
  });
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    let filtered = properties;
    if (filters.location)
      filtered = filtered.filter((p) =>
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    if (filters.type)
      filtered = filtered.filter((p) => p.type === filters.type);
    if (filters.minPrice)
      filtered = filtered.filter((p) => p.price >= parseInt(filters.minPrice));
    if (filters.maxPrice)
      filtered = filtered.filter((p) => p.price <= parseInt(filters.maxPrice));
    setFilteredProperties(filtered);
  };

  return (
    <>
      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Location"
            variant="outlined"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            label="Type"
            variant="outlined"
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            fullWidth
          >
            <MenuItem value="">All Types</MenuItem>
            <MenuItem value="Apartment">Apartment</MenuItem>
            <MenuItem value="House">House</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Min Price"
            variant="outlined"
            name="minPrice"
            type="number"
            value={filters.minPrice}
            onChange={handleFilterChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Max Price"
            variant="outlined"
            name="maxPrice"
            type="number"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            fullWidth
          />
        </Grid>
      </Grid>

      <Button
        variant="contained"
        onClick={applyFilters}
        className="mb-6 bg-blue-500 text-white"
        style={{ margin: " 20px 0" }}
      >
        Apply Filters
      </Button>

      <Grid container spacing={4}>
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <Grid item xs={12} sm={6} md={4} key={property.id}>
              <Card className="rounded-lg shadow-md">
                <CardMedia
                  component="img"
                  image={property.photos[0]}
                  alt={property.location}
                  className="h-48"
                />
                <CardContent>
                  <Typography variant="h6">{property.location}</Typography>
                  <Typography>Type: {property.type}</Typography>
                  <Typography>
                    Price: ${property.price.toLocaleString()}
                  </Typography>
                  <Link href={`/property/${property.id}`} className="mt-10">
                    <Button variant="outlined" color="primary">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" className="mt-4">
              No properties found.
            </Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default CustomerPage;
