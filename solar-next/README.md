# ☀️ SolarForce (Next.js Version)

This is the **Next.js** migration of the SolarForce website. It replaces the original Hono + HTML setup with a modern React framework.

## 🚀 Getting Started

1.  Navigate to this folder:
    ```bash
    cd solar-next
    ```

2.  Install dependencies (if not already):
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

    Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

*   `app/` - Pages and Routing (App Router)
    *   `page.tsx` - Homepage
    *   `layout.tsx` - Main layout (includes Navbar/Footer)
    *   `globals.css` - Global styles
*   `components/` - Reusable React components
    *   `Navbar.tsx`
    *   `Footer.tsx`
*   `lib/` - Shared logic (Google Sheets, Email, Calculator)
*   `public/` - Static assets (images, fonts)

## 🛠️ How to Add More Pages

To add a new page (e.g., `/about-us`):

1.  Create a folder `app/about-us`.
2.  Create a file `page.tsx` inside it.
3.  Paste the HTML content (converted to JSX) inside the default export function.

**Example:**
```tsx
export default function AboutPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold">About Us</h1>
      <p>Content here...</p>
    </div>
  );
}
```

## 📦 Deployment (Vercel)

This project is **Vercel-native**. To deploy:

1.  Push this code to GitHub.
2.  Import the repository in Vercel.
3.  **Important:** Set the **Root Directory** to `solar-next`.
4.  Add environment variables (SMTP, Google Sheets URL).
5.  Deploy! No extra configuration needed.
