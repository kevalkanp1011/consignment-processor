
# 📦 Consignment Processor

A modern web application to **upload and process consignment data** using a streamlined interface. Built with **Next.js**, **Tailwind CSS**, and **TypeScript**, it provides a responsive, clean, and fast experience for end users.

> This app enables users to upload Excel files, track processing status in real-time, and receive toast notifications on success/failure, with optional email reporting.

---

## 🧰 Tech Stack

| Tech            | Purpose                          |
|-----------------|----------------------------------|
| Next.js 15.x    | React-based fullstack framework  |
| Tailwind CSS 4  | Utility-first CSS styling        |
| TypeScript 5    | Static typing                    |
| Axios           | HTTP client for API requests     |
| Toastify.js     | Toast notifications              |
| xlsx            | Excel file parsing/handling      |
| Framer Motion   | Animations and transitions       |
| React Icons     | Icon library                     |

---

## ⚙️ Installation

### 1. Clone the Repo

```bash
git clone https://github.com/kevalkanp1011/consignment-processor.git
cd consignment-processor
````

### 2. Install Dependencies

```bash
npm install
# or
yarn
```

---

## 🔧 Environment Variables

Create a `.env.local` file at the root level:

```env
NEXT_PUBLIC_API_URL=https://your-api.com
```

> `NEXT_PUBLIC_API_URL` is used by `src/lib/api.ts` to send the upload request.

---

## 🚀 Running the App

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

---

## 📁 Folder Structure

```txt
src/
├── app/
│   ├── page.tsx              # Main UI
│   └── components/           # All reusable components
├── lib/
│   └── api.ts                # Axios logic for API upload
├── utils/
│   └── toast.ts              # Toast wrapper using toastify-js
├── styles/
│   └── globals.css           # Tailwind + base styles
public/
types/
  └── toastify-js.d.ts        # Type declarations for toastify-js
```

---

## 📬 API Logic (`src/lib/api.ts`)

Handles the file upload via Axios:

```ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const uploadConsignmentFile = async (file: File, email?: string, onProgress?: (percent: number) => void) => {
  const formData = new FormData();
  formData.append('file', file);
  if (email) formData.append('email', email);

  return axios.post(`API_URL/api/upload-consignments`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (event) => {
      if (onProgress && event.total) {
        const percent = Math.round((event.loaded * 100) / event.total);
        onProgress(percent);
      }
    },
  });
};
```

---

## 🧩 Components

Located in `src/app/components/`, includes:

* `FileDropZone.tsx` – drag & drop or file input for uploading
* `ProgressBar.tsx` – animated upload progress
* `ResultSummary.tsx` – display of success/fail counts
* `EmailInput.tsx` – optional email input field
* `ToastProvider.tsx` – mounts and styles toast notifications

---

## 🔔 Toast Notification Setup

`src/utils/toast.ts` provides a helper function:

```ts
import Toastify from 'toastify-js';

export const showToast = (message: string, type: 'success' | 'error' = 'success', duration = 5000) => {
  Toastify({
    text: message,
    duration,
    gravity: 'bottom',
    position: 'right',
    className: `toastify-${type}`,
    stopOnFocus: true,
  }).showToast();
};
```

> Requires styles: include Toastify CSS in `app/layout.tsx` or `_app.tsx`.

---

## 📦 Deployment

You can deploy this app to:

### ➤ [Vercel (Recommended)](https://vercel.com/)

Just push your GitHub repo and Vercel will handle:

* Environment vars via dashboard
* Build with `next build`
* CDN & SSR optimization

### ➤ Self-host / Docker

Use `next build && next start` with Node.js hosting or build a Docker image.

---

## 🧹 Linting & Formatting

```bash
npm run lint
```

Tailwind CSS and TypeScript are enforced throughout the project.

---

## 🧠 Tips

* Minify and obfuscate your code for production using `next build`
* All sensitive logic (like Firebase access or secrets) should reside in a secure backend API (not inside this frontend repo)
* Consider using a proxy route (`/api/upload`) in Next.js to further protect real backend URLs

---

## 🤝 Contributing

Want to improve this tool? Feel free to fork and create a PR.

```bash
git checkout -b feature/my-new-feature
```

Please make sure to:

* Write clean, typed code
* Add comments if logic is complex
* Test your changes locally before PR

---

## 📄 License

MIT © 2025 Keval Kanpariya

---

## 📬 Contact

For issues or enhancements, feel free to raise an issue or ping me on [GitHub](https://github.com/kevalkanp1011).

```

---
