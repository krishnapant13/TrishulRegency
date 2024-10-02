import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Collapse,
  Box,
  CircularProgress,
  Badge,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, subDays } from "date-fns";
import Header from "./Header";
import { server } from "../server";

const Admin = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState({}); // For collapsible rows
  //   const [startDate, setStartDate] = useState(subDays(new Date(), 7)); // Default start date: past week
  //   const [endDate, setEndDate] = useState(new Date()); // Default end date: today

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${server}/booking/get-bookings`);
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        setBookings(data.data); // Adjust to your response structure
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const toggleRow = (id) => {
    setOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  // Filter bookings based on the selected date range
  //   const filteredBookings = bookings
  //     .filter((booking) => {
  //       const checkIn = new Date(booking.checkInDate);
  //       return checkIn >= startDate && checkIn <= endDate;
  //     })
  //     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div className="h-screen">
      <Header name="Admin" />
      <div className="flex justify-between items-center my-4">
        <Typography variant="h6">{bookings.length} Bookings</Typography>
        {/* <div className="flex space-x-4">
          <ReactDatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy/MM/dd"
            placeholderText="Start Date"
          />
          <ReactDatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="yyyy/MM/dd"
            placeholderText="End Date"
          />
        </div> */}
      </div>

      <TableContainer component={Paper} className="mt-4">
        <Table sx={{ minWidth: 650 }} aria-label="collapsible bookings table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f97316db" }}>
              <TableCell />
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Room</TableCell>
              <TableCell>Check-in</TableCell>
              <TableCell>Check-out</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking, index) => {
              const isExpired = new Date(booking.checkOutDate) < new Date();
              return (
                <React.Fragment key={booking._id}>
                  <TableRow
                    sx={{
                      backgroundColor:
                        index % 2 === 0 ? "lightyellow" : "white",
                    }}
                  >
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => toggleRow(booking._id)}
                      >
                        {open[booking._id] ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell>{booking._id}</TableCell>
                    <TableCell>{`${booking.guest.firstName} ${booking.guest.lastName}`}</TableCell>
                    <TableCell>{booking.guest.phoneNumber}</TableCell>
                    <TableCell>{booking.room.heading}</TableCell>
                    <TableCell>
                      {format(new Date(booking.checkInDate), "yyyy-MM-dd")}
                    </TableCell>
                    <TableCell>
                      {format(new Date(booking.checkOutDate), "yyyy-MM-dd")}
                    </TableCell>
                    <TableCell>
                      <Badge
                        color={isExpired ? "error" : "success"}
                        badgeContent={isExpired ? "Expired" : "Active"}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      sx={{ paddingBottom: 0, paddingTop: 0 }}
                    >
                      <Collapse
                        in={open[booking._id]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box margin={2}>
                          <Typography variant="h6" gutterBottom>
                            Booking Details
                          </Typography>
                          <Typography variant="body2">
                            <strong>Room:</strong> {booking.room.heading}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Facilities:</strong>{" "}
                            {booking.room.facility.join(", ")}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Guests:</strong>
                          </Typography>
                          <ul>
                            {booking.guests.map((guest, index) => (
                              <li
                                key={index}
                              >{`${guest.title} ${guest.name}, Age: ${guest.age}`}</li>
                            ))}
                          </ul>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Admin;
