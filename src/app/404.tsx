// src/app/(your-directory)/Custom404.tsx

import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="mt-4 text-lg text-gray-600">Sorry, the page you are looking for does not exist.</p>
        <Link href="/">
          <a className="mt-6 inline-block px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition">
            Go back to Home
          </a>
        </Link>
      </div>
    </div>
  );
}