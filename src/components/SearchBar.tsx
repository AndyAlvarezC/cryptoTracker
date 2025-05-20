import "../index.css"

export default function SearchBar() {
  return (
    <div>
      <form>
        <input
          className="text-[var(--color-text-primary)] focus:outline-none pl-2 pb-1 border-b-2 duration-300 focus:border-b-[var(--color-accent)]"
          type="text"
          placeholder="Search..."
        ></input>
      </form>
    </div>
  );
}
