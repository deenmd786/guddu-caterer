

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      
      {children}
      {/* Note about Catering Inclusions */}
      {/* <div className=" mx-4 p-4 max-w-4xl bg-white border border-gray-300 rounded-2xl shadow-lg flex flex-row justify-center items-center gap-6">
        <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <FaConciergeBell className="text-red-500" /> Catering Inclusions:
        </h4>
        <InclusionSection />
      </div> */}
    </div>
  );
}