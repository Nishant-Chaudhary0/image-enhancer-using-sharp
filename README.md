Image Enhancer Using Sharp

A simple full-stack app that lets you upload an image and apply enhancement filters (contrast, brightness, sharpness, width) using the sharp
 library on the backend, and a minimal React frontend.

Project Overview

This project is a simple image enhancement tool built as a web-app:

You upload an image from your browser.

The backend (Node.js + Express) uses multer to handle the file upload (in-memory storage) so the image buffer is available to the sharp library.

sharp then applies one or more enhancement filters (e.g., adjust contrast, brightness, width, sharpness) and returns the processed image to the client.

The frontend (React) presents a clean minimal UI, allows uploading the image, shows preview and allows you to download the enhanced version.

The goal is to keep things simple, easy to extend, and demonstrate how sharp + multer + React can be used for an image-processing use-case.

Features

Upload images via the browser.

Adjust parameters like:

Brightness

Contrast

Sharpness

Width / resize (optional)

Preview of the original and enhanced image.

Download the enhanced image.

Minimal UI focused on function, not styling complexity.

Backend handles image processing in memory for speed and simplicity.

Tech Stack

Frontend: React (vite) — clean, simple UI for upload + controls.

Backend: Node.js + Express.js — API endpoint(s) for image upload + process.

File upload & handling: multer (in-memory storage) to capture the uploaded image buffer.

Image processing: sharp library — perform brightness/contrast/sharpness adjustments, resizing.

Communication: REST endpoint(s) — frontend posts image + parameters, receives processed image file.

Architecture
User (browser)
   ⇩ Upload image + select parameters
React Frontend
   ⇩ POST request (multipart/form-data) → Backend
Node.js + Express + multer
   ⇩ Receive image buffer + params
   ⇩ Pass to sharp
sharp processes image buffer → output buffer
   ⇩ Send processed image back (as response, e.g., image/jpeg or image/png)
Frontend receives processed image → show preview


All image processing happens on the server side (so the client remains light).

Using in-memory storage avoids writing to disk (faster, simpler) — but note: for large images this may have memory-implications.

Getting Started
Prerequisites

Node.js (version 14+ or whatever you tested)

npm or yarn

Basic React build tool (if frontend is separate)

Installation

Clone the repository:

git clone https://github.com/Nishant-Chaudhary0/image-enhancer-using-sharp.git
cd image-enhancer-using-sharp


Navigate into backend folder and install dependencies:

cd backend
npm install


Navigate into frontend folder and install dependencies:

cd ../frontend
npm install

Running the App

Start backend:

cd backend
npm start


(By default it might run on http://localhost:5000 or whatever is configured).

Start frontend:

cd ../frontend
npm start


(Frontend may run on http://localhost:3000 and proxy requests to backend).

Open your browser to the frontend URL (e.g., http://localhost:3000), upload an image, tweak values, apply enhancements, download.

Usage

On the UI:

Click the upload button → select an image file (e.g., .jpg, .png).

Use sliders or input fields to adjust brightness, contrast, sharpness, width (if resize option is present).

Example: Set brightness to +0.2 (makes image brighter)

Set contrast to +0.5 (makes darker & lighter parts more distinct)

Click “Enhance” or similar button → wait a moment for backend.

Preview of enhanced image appears.

Backend endpoint (example):

POST /api/enhance (multipart) with fields: imageFile, brightness, contrast, sharpness, width.

Response: processed image file (binary) with correct Content-Type.

Configuration & File Structure
/image-enhancer-using-sharp
│
├── backend/
│   ├── index.js – sets up Express, multer, sharp handlers
│   ├── package.json
│   ├── routes/
│   └── … 
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx / App.js
│   │   ├── components/ – upload form
│   │   └── …  
│   ├── package.json  
│   └── …  
│
└── README.md  (this file)

You may optionally add file size limits in multer, allowed file types, etc.

How It Works (Under the Hood)

The uploaded image file is stored in memory by multer (i.e., storage: multer.memoryStorage()) so we get a buffer.

The backend receives the buffer and enhancement parameters.

sharp(buffer) creates a sharp instance. Then methods like .modulate({ brightness, contrast }), .sharpen(sharpness), .resize(width) are applied (the specific API calls depend on your code).

The processed output is obtained via .toBuffer() or .pipe(res).

The server sends the processed image back to the client (setting appropriate headers, e.g., Content-Type: image/jpeg).

The client receives the image blob and presents it (via URL.createObjectURL(blob)) or as a download link.

The UI allows the user to download or replace the original.

Easy Example: Suppose you upload a photo that’s dark and somewhat blurry.

You set brightness = +0.3 (make it brighter).

You set contrast = +0.4 (increase contrast).

You set sharpness = 2 (make edges more crisp).

You click enhance → the backend uses sharp to apply those adjustments → you download a cleaner, brighter sharper image.

Limitations & Known Issues

Memory usage: large images processed in memory may cause high memory usage or slow performance.

No persistent storage: processed images are not saved on server — if you restart the server the data will be lost.

UI is very basic: only minimal styling, no advanced UX.

Limited filters: currently supports only brightness, contrast, sharpness, width/resize — other filters (e.g., saturation, hue, blur) are not implemented.

No user authentication or rate-limiting: if deployed publicly, may face abuse.

Error handling might be basic (e.g., unsupported file types or too large files).

Mobile/responsive behavior might be limited.

Thank you for checking out this project! Feel free to fork, star, and contribute if you like.
Pull requests, suggestions and improvements are very welcome.

— Nishant
