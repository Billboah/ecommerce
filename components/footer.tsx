"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 text-sm text-gray-600 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-center md:text-left">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold">My Online Store</span>. Built by{" "}
          <a
            href="https://www.linkedin.com/in/your-link"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            William Yeboah
          </a>
        </p>

        <div className="flex items-center gap-3">
          <span>Made with</span>
          <span role="img" aria-label="heart">
            ❤️
          </span>
          <span>using</span>
          <a
            href="https://nextjs.org"
            className="text-black hover:underline font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js
          </a>
          <span>&</span>
          <a
            href="https://tailwindcss.com"
            className="text-teal-600 hover:underline font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tailwind CSS
          </a>
        </div>
      </div>
    </footer>
  );
}
