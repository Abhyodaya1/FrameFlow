
# 🎞️ FrameFlow – Seamless Video Sharing App

FrameFlow is a **full-stack React Native mobile application** built using **Expo** and powered by **Appwrite**. It lets users upload and explore short-form videos in a minimal, modern interface. With real-time updates, search capabilities, and smooth playback, FrameFlow delivers a fluid video-sharing experience.

---

## 📸 Screenshots

| Home Feed | Upload Video | Search |
|----------|--------------|--------|
| ![Home](assets/screenshots/home.png) | ![Upload](assets/screenshots/upload.png) | ![Search](assets/screenshots/search.png) |

> 📍 *Replace these with actual screenshot paths from your repo (`/assets/screenshots/`).*

---

## 🚀 Features

- 📱 **Full-Stack React Native App** – Built using Expo, powered by Appwrite backend  
- 📤 **Post Your Favorite Video** – Easily upload and share your video content  
- 🆕 **Find the Latest Videos** – Discover newly uploaded and trending content  
- 🔍 **Play While Searching** – Seamlessly scroll and search without interrupting playback  
- 💡 **Smooth & Seamless UI** – Gradient styling, custom fonts, and responsive design  
- 🔐 **User Authentication** – Secure sign-up/sign-in flows with session management  
- 🎥 **Trending Feed** – Scrollable list of all videos with clean cards  
- 🔎 **Search Functionality** – Real-time keyword search across the video database  
- 💤 **Empty State Screens** – Friendly UI when no results or content is available  
- 🔁 **Pull to Refresh** – Instantly fetch the latest videos on swipe  

---

## 🛠️ Tech Stack

- **Frontend:** React Native + Expo + Tailwind CSS (via NativeWind)
- **Backend:** Appwrite (Database, Storage, Authentication)
- **Fonts:** Custom Google Fonts (Poppins Family)
- **Navigation:** `expo-router` for file-based routing
- **State Management:** Context API with GlobalProvider
- **Video Uploads:** Appwrite Storage Bucket integration

---

## 🧑‍💻 How to Run

### 1. Clone the repo

```bash
git clone https://github.com/your-username/frameflow.git
cd frameflow
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup `.env`

Create a `.env` file and add:

```env
APPWRITE_ENDPOINT=your_appwrite_endpoint
APPWRITE_PROJECT_ID=your_project_id
APPWRITE_BUCKET_ID=your_storage_bucket_id
```

### 4. Start the app

```bash
npx expo start
```

> Make sure your Appwrite server is running and properly configured.

---

## 📁 Folder Structure

```bash
├── app
│   ├── (auth)        # SignIn / SignUp screens
│   ├── (tabs)        # Bottom tab navigation screens
│   ├── search        # Dynamic search screen
│   └── _layout.jsx   # Root layout with splash + font handling
│
├── assets            # Fonts and images
├── components        # UI components (SearchInput, VideoCard, etc.)
├── context           # GlobalProvider (Context API)
├── constants         # Static assets and config
├── lib               # Appwrite integration and helpers
├── global.css        # Tailwind / NativeWind styles
```

---

## 🙌 Acknowledgements

- [Expo](https://expo.dev/)
- [Appwrite](https://appwrite.io/)
- [React Native](https://reactnative.dev/)
- [NativeWind (Tailwind for RN)](https://www.nativewind.dev/)
- [Poppins Font](https://fonts.google.com/specimen/Poppins)

---

## 💡 Author

**Abhyodaya Singh**  
🎓 CSE, MMMUT | 👨‍💻 Passionate about mobile dev and full-stack projects  
🔗 [LinkedIn](https://linkedin.com/in/your-profile) | [GitHub](https://github.com/your-username)
