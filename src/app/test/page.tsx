'use client';

export default function SendTestMailButton() {
  const handleClick = async () => {
    const res = await fetch("/api/send-test", {
      method: "POST",
    });

    const data = await res.json();
    if (data.success) {
      alert("Test email sent successfully!");
    } else {
      alert("Failed to send test email: " + data.error);
    }
  };

  return (
    <button onClick={handleClick} className="px-4 py-2 bg-blue-500 text-white rounded">
      Send Test Email
    </button>
  );
}
