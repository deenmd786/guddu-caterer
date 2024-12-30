import Button from "../../components/reuseable/Button";

// app/admin/page.tsx
const Dashboard = () => {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">User Dashboard</h1>
        <p>Welcome to the Dashboard panel!</p>
        <div className="flex justify-between pt-4">
          <Button label="Back to home" href="/" className="catr-btn" />
          <Button label="Next" href="/dashboard/book-buffet/menu"/>
        </div>
      </div>
    );
  };
  
  export default Dashboard;
  