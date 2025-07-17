import Link from "next/link";

export default function Custom404() {
  return (
    <main className="min-h-dvh flex items-center justify-center text-center px-4">
      <div>
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600">
          Sorry, the page you’re looking for doesn’t exist.
        </p>
        <Link
          href="/"
          className="m-5 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </main>
  );
}
