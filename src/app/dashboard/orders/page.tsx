export const metadata = {
  title: "Your Order History | Guddu Catering Service",
  description: "View your past catering bookings with Guddu Catering Service. Keep track of your event history or book a new event effortlessly in Delhi.",
};

const Page = () => {
  return (
      <>
    <div className="p-8 text-center">

      {/* Main Content */}
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      <p className="text-gray-700">You have not booked any event.!!!</p>
      <p className="mt-2">
        Ready to plan your next event?{" "}
        <a
          href="/dashboard/book-buffet/menu"
          className="text-blue-600 hover:underline"
        >
          Book a Buffet Now
        </a>
      </p>
    </div>
      </>
  );
};

export default Page;
