"use client"
import BuffetSection from "../_components/BuffetSection";

const Page: React.FC = () => {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Buffet Dishes</h2>
      <BuffetSection title="Buffet 1" pricing="₹10,000 - ₹15,000" />
      <BuffetSection title="Buffet 2" pricing="₹15,000 - ₹20,000" />
    </main>
  );
};

export default Page;