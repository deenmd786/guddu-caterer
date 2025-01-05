import Button from "@/components/reuseable/Button";

// app/admin/page.tsx
const Dashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">User Dashboard</h1>
      <p className="text-gray-700">Welcome to the Dashboard panel! Manage your bookings and explore our services.</p>
      <div className="flex justify-between pt-4">
        <Button 
          label="Back to Home" 
          href="/" 
          className="catr-btn" 
        />
        <Button 
          label="Next: Book Buffet Menu" 
          href="/dashboard/book-buffet/menu" 
          className="catr-btn" 
        />
      </div>
    </div>
  );
};

export default Dashboard;
