import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, Skeleton, Grid, Box, Autocomplete, TextField } from "@mui/material";
import { styled } from "@mui/system";

const PropertyCard = styled(Card)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: theme.shadows[1],
  backgroundColor: theme.palette.mode === "dark" ? "#333" : "#fff",
  color: theme.palette.mode === "dark" ? "#fff" : "#333",
}));

const PropertyMedia = styled(CardMedia)(({ theme }) => ({
  height: 0,
  paddingTop: '56.25%', 
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
  flexGrow: 1,
}));

interface Property {
  _id: string;
  title: string;
  dailyRate: number;
  image: string;
  summary: string;
}

function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/properties`
        );
        const data = await response.json();
        setProperties(data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = properties.filter((property) =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={2}
    >
      <Autocomplete
        freeSolo
        options={properties.map((option) => option.title)}
        style={{ width: '90%', maxWidth: 500, marginBottom: 20 }}
        onInputChange={(event, newInputValue) => {
          setSearchTerm(newInputValue);
        }}
        renderInput={(params) => <TextField {...params} label="Search Properties" variant="outlined" />}
      />
      <Grid container spacing={2}>
        {loading ? (
          <Skeleton
            variant="rectangular"
            width={345}
            height={200}
            animation="wave"
          />
        ) : (
          filteredProperties.map((property) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={property._id}>
              <Link to={`/details/${property._id}`} style={{ textDecoration: 'none' }}>
                <PropertyCard>
                  <PropertyMedia
                    image={property.image}
                    alt={property.title}
                  />
                  <StyledCardContent>
                    <Typography variant="h6" noWrap>
                      {property.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      CAD {property.dailyRate} per Night
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {property.summary}
                    </Typography>
                  </StyledCardContent>
                </PropertyCard>
              </Link>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}

export default HomePage;
