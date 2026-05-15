import Link from "next/link";

export default function ThanksPage() {
  return (
     <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <svg className="w-16 h-16 text-green-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h1>
            <p className="text-gray-700 mb-8">
              Your restaurant submission has been received! We'll review it and get back to you soon.
            </p>
            <Link
              href="/"
              className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
             >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
     );
}
