import Link from "next/link";


const AdminPanelNavigation = () => {
  return (
    <nav className="flex min-h-[75vh] gap-4 flex-col bg-[var(--background-secondary)]   text-[var(--text-primary)] p-3 text-[16px] md:text-lg">
      <Link href="/admin/users" className="transition duration-200 rounded-lg shadow-md p-2 hover:bg-[var(--button)] hover:text-white hover:shadow-lg">All Users</Link>
      <Link href="/admin/products" className="transition duration-200 rounded-lg shadow-md p-2 hover:bg-[var(--button)] hover:text-white hover:shadow-lg">All Products</Link>
      <Link href="/admin/products/add-product" className="transition duration-200 rounded-lg shadow-md p-2 hover:bg-[var(--button)] hover:text-white hover:shadow-lg">Add Products</Link>
    </nav>
  );
};

export default AdminPanelNavigation;