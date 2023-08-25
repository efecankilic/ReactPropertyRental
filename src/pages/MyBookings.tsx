import React, { useEffect, useState } from "react";
import { Card, Typography, Button, Modal, Avatar } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;
const { Title } = Typography;
const { confirm } = Modal;

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/bookings`, {
          credentials: "include",
        });
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchBookings();
  }, []);

  const deleteBooking = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/bookings/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setBookings(bookings.filter((booking) => booking._id !== id));
        alert("Booking deleted successfully!");
      } else {
        throw new Error("Failed to delete booking.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete booking. Please try again.");
    }
  };

  const showDeleteConfirm = (bookingId) => {
    confirm({
      title: 'Are you sure delete this booking?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteBooking(bookingId);
      },
    });
  }

  return (
    <div className="booking-container">
      <Title level={2}>My Bookings</Title>
      {bookings.map((booking) => (
        <Card
          hoverable
          style={{ width: '100%', marginTop: 16, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'start', minHeight: '200px' }}
          key={booking._id}
        >
          <img alt={booking.property.title} src={booking.property.image} style={{ height: '180px', width: 'auto', marginRight: '20px' }}/>
          <div>
            <Title level={3}><Link to={`/details/${booking.property._id}`}>{booking.property.title}</Link></Title>
            <p>{booking.property.city}</p>
            <p>From: {new Date(booking.startDate).toLocaleDateString()} To: {new Date(booking.endDate).toLocaleDateString()}</p>
            <Button type="danger" onClick={() => showDeleteConfirm(booking._id)} style={{ marginTop: '10px' }}>Delete</Button>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default MyBookings;
