import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Submit a Restaurant | 757 Safe Eats: Chesapeake",
  description: "Submit a gluten-friendly restaurant to our guide.",
};

export default function SubmitRestaurantPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
       {/* Header */}
       <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12">
         <div className="max-w-4xl mx-auto px-4 text-center">
           <h1 className="text-4xl font-bold mb-4">Submit a Restaurant</h1>
           <p className="text-lg opacity-90">
             Know of a great gluten-free friendly restaurant in the 757 area?
             We'd love to hear from you!
           </p>
         </div>
       </section>

       {/* Form Section */}
       <section className="max-w-2xl mx-auto px-4 py-12">
         <div className="bg-white rounded-2xl shadow-lg p-8">
           <ContactForm />
         </div>
       </section>

       {/* Back Link */}
       <section className="text-center pb-12">
         <Link
          href="/"
          className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center"
         >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all restaurants
         </Link>
       </section>
     </main>
   );
}
