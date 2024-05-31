# GeoLoginApp

GeoLoginApp is a React Native mobile application built with Expo. It features a login screen for user authentication and a home screen that displays geolocation information based on IP addresses using an external API. The app uses React hooks and reducers for state management.

## Table of Contents
- [Project Structure](#project-structure)
- [Features](#features)
- [Technical Requirements and Restrictions](#technical-requirements-and-restrictions)

## Project Structure

### Backend API (Node.js)
The backend API is implemented using Node.js and Express to handle the login functionality. A user seeder script is included to create initial login credentials for testing.

### Frontend (React Native/Expo)
The frontend consists of two main screens: Login Screen and Home Screen.

## Features

### Login Screen
- A simple login form with email and password fields.
- Validates credentials against the backend API.
- Redirects to the Home Screen upon successful login.
- Displays error messages for incorrect credentials.

### Home Screen
- Displays IP and geolocation information of the logged-in user.
- Allows users to enter a new IP address to fetch and display its geolocation information.
- Validates the IP address format and shows error messages for invalid IPs.
- Provides a clear search functionality to revert to the user's IP geolocation.
- Maintains a history of searched IP addresses and displays them in a list.

## Technical Requirements and Restrictions
- Utilizes React hooks and reducers for state management.
- Avoids using Context API for state management.
- Uses the following APIs:
  - Login API URL: `http://localhost:8000/api/login`
  - Home API URL: `https://ipinfo.io/<ip-address>/geo`

