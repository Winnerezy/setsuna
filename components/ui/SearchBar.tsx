export const SearchBar = () => {
  return (
    <input
      type="text"
      className={`flex-grow max-w-[500px] h-8 rounded-full p-2 text-[var(--global-input-text)] outline-none border-2 focus:border-[var(--global-border-bg)]`}
      placeholder="Search here..."
    />
  );
}
