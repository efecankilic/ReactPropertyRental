import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, Typography, Button, List, Avatar, Divider, Tag, Space } from "antd";
import { EnvironmentOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import DatePickerComponent from "../components/DateRangePickerCustom";
import "./Details.css"; 
import AuthContext, { AuthContextType } from "../components/auth/AuthContext";
import { Navigate } from "react-router-dom";

const { Title, Text } = Typography;
const { Meta } = Card;

interface Review {
  reviewerName: string;
  rating: number;
  review: string;
}

interface Property {
  _id: string;
  title: string;
  image: string;
  description: string;
  summary: string;
  rating: number;
  city: string;
  street: string;
  country: string;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  dailyRate: number;
  maxGuests: number;
  host: string;
  hostImage: string;
  reviews: Review[];
}

const Details = () => {
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [selectedDates, setSelectedDates] = useState<[moment.Moment, moment.Moment] | null>(null);
  const { property_id } = useParams();
  const [authenticated, setAuthenticated] = useState(false)
  const auth = React.useContext(AuthContext) as AuthContextType;

  // const history = useHistory();

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/properties/${property_id}`
        );
        if (response.ok) {
          const data = await response.json();
          setProperty(data);
        } else {
          throw new Error("Error retrieving property details");
        }
      } catch (error) {
        console.error(error);
      }
    };

    setAuthenticated(auth.isLoggedIn)
    fetchPropertyDetails();
  }, [property_id]);

  const handleDateChange = (dates: [moment.Moment, moment.Moment]) => {
    setSelectedDates(dates);
  };

  const handleBooking = async (event) => {
    event.preventDefault()

    if (!authenticated) {
      navigate('/signin')
      return;
    }

    if (!selectedDates) {
      alert("Please select booking dates.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          propertyId: property_id,
          startDate: selectedDates[0].toISOString(),
          endDate: selectedDates[1].toISOString(),
        }),
      });

      if (response.ok) {
        alert("Booking created successfully!");
      } else {
        throw new Error("Failed to create booking.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!property) {
    return <p>Loading...</p>;
  }

  return (
    <div className="details-container">
      <Card
        hoverable
        cover={<img alt={property.title} src={property.image} style={{maxWidth: '400px', margin: 'auto'}}/>}
      >
        <Title level={2}>{property.title}</Title>
        <Text type="secondary">{property.summary}</Text>
        <Divider />

        <Title level={4}>Property Details</Title>
        <Text><EnvironmentOutlined /> {property.street}, {property.city}, {property.country}</Text><br></br>
        <Text><HomeOutlined /> Bedrooms: {property.bedrooms}, Bathrooms: {property.bathrooms}</Text><br></br>
        <Text>Max Guests: {property.maxGuests}</Text><br></br>
        <Text>Daily Rate: ${property.dailyRate}</Text><br></br>
        <Divider />

        <Title level={4}>Amenities</Title>
        <Space wrap>
          {property.amenities.map((amenity, index) => <Tag key={index}>{amenity}</Tag>)}
        </Space>
        <Divider />

        <Title level={4}>Host</Title>
        <Meta
          avatar={<Avatar src={property.hostImage} />}
          title={property.host}
        />
        <Divider />

        <DatePickerComponent onChange={handleDateChange} />
        <Button type="primary" onClick={handleBooking}>Reserve</Button>
        <br></br>
        <br></br>
        <Link to="/">Go back to Home</Link>
      </Card>
    </div>
  );
};

export default Details;
