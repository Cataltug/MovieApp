# 🎬 Movie Library App

Movie Library App is a React Native mobile application that lets users browse and search for movies using data from The Movie Database (TMDb). Users can log in, view trending and top-rated movies, see detailed movie info, and manage a personal favorites list.

## 🔑 Features

- Browse trending and top-rated movies
- Search by movie title
- Filter by genre and rating
- View movie details (poster, overview, cast, etc.)
- Add/remove favorites (saved with Firebase Firestore)
- Login/Register with Firebase Authentication
- Auto-login with saved credentials

## ⚙️ Setup

## **Clone the repo**

- git clone https://github.com/Cataltug/MovieApp.git
- cd MovieLibraryApp

## Install dependencies

- yarn install

## Create a .env file using your Firebase credentials and TMDb API:

- FIREBASE_API_KEY=your_api_key
- FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
- FIREBASE_PROJECT_ID=your_project_id
- FIREBASE_STORAGE_BUCKET=your_project.appspot.com
- FIREBASE_MESSAGING_SENDER_ID=your_sender_id
- FIREBASE_APP_ID=your_app_id
- TMDB_API_KEY=your_tmdb_api_key

## Start the app

- npx react-native start
- npx react-native run-android # or run-ios on macOS

# ✅ Requirements

- React Native CLI
- Firebase project with Email/Password Auth enabled
- TMDb API key
