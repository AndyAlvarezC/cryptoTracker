
export default function Navbar() {
  return (
    <div className="flex m-auto gap-8">
      <h2 className="text-[var(--color-text-primary)] text-xl font-bold duration-300 hover:text-[var(--color-accent)] cursor-pointer">
        Home
      </h2>
      <h2 className="text-[var(--color-text-primary)] text-xl font-bold duration-300 hover:text-[var(--color-accent)] cursor-pointer">
        Portfolio
      </h2>
      <h2 className="text-[var(--color-text-primary)] text-xl font-bold duration-300 hover:text-[var(--color-accent)] cursor-pointer">
        Search
      </h2>
      <h2 className="text-[var(--color-text-primary)] text-xl font-bold duration-300 hover:text-[var(--color-accent)] cursor-pointer">
        Details
      </h2>
    </div>
  );
}
