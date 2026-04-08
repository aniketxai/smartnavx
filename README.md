# Smart Campus Resource Optimizer

A smart IoT-based campus system that enables real-time resource booking
and automated access control using RFID and ESP32.

------------------------------------------------------------------------

## Problem Statement

Campus resources such as labs, classrooms, and study spaces are often
underutilized due to lack of real-time tracking and inefficient booking
systems.

------------------------------------------------------------------------

## Solution

This project provides a smart campus system that:

-   Enables real-time booking of resources\
-   Uses RFID for seamless user identification\
-   Automates access using ESP32 and servo motor\
-   Tracks usage and improves efficiency

------------------------------------------------------------------------

## Key Features

-   Real-time room and resource booking\
-   RFID-based authentication (no login required)\
-   Automated access control using ESP32\
-   Resource availability tracking\
-   Campus navigation system\
-   Web-based interface using React

------------------------------------------------------------------------

## System Architecture

ESP32 (RFID + IR Sensor + Servo)\
↓\
Node.js Backend (API and logic)\
↓\
MongoDB Atlas (cloud database)\
↓\
React Frontend (user interface)

------------------------------------------------------------------------

## Tech Stack

### Frontend

-   React (JavaScript)\
-   Axios\
-   Tailwind CSS

### Backend

-   Node.js\
-   Express.js\
-   MongoDB Atlas\
-   Mongoose

### Hardware

-   ESP32\
-   RFID Module\
-   IR Sensor\
-   Servo Motor

------------------------------------------------------------------------

## API Endpoints

  Method   Endpoint            Description
  -------- ------------------- ------------------------
  GET      /api/rooms          Get all rooms
  POST     /api/book           Book a resource
  GET      /api/bookings       Get all bookings
  POST     /api/check-access   RFID access validation

------------------------------------------------------------------------

## How It Works

1.  User books a room through the web application\
2.  Booking is stored in the database\
3.  User scans RFID card at the door\
4.  ESP32 sends request to backend\
5.  Backend validates booking\
6.  If valid, servo motor unlocks the door

------------------------------------------------------------------------

## Sample API Request

### Check Access

POST /api/check-access

{ "rfid": "123ABC", "roomId": "R101" }

------------------------------------------------------------------------

## Getting Started

### Clone Repository

git clone https://github.com/your-username/smart-campus.git\
cd smart-campus

### Install Dependencies

npm install

### Setup Environment Variables

Create a `.env` file:

MONGO_URI=your_mongodb_atlas_url

### Run Server

node server.js

------------------------------------------------------------------------

## Future Improvements

-   Mobile application support\
-   AI-based resource usage prediction\
-   QR code-based backup access\
-   Real-time campus map navigation

------------------------------------------------------------------------

## Team

-   Your Name\
-   Team Members

------------------------------------------------------------------------

## Contact

Email: your-email@example.com
