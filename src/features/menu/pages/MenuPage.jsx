import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";
import MenuList from "../components/MenuList";

const API = import.meta.env.VITE_API_URL;
const MENU_URL = API ? `${API}/api/menu` : "/menu.json";

function MenuPage() {
  const [query, setQuery] = useState("");

  const debounced = useDebounce(query, 400);

  const {
    data: dishes,
    isLoading,
    error,
  } = useFetch(MENU_URL);

  if (isLoading) {
    return <p>Loading menu...</p>;
  }

  if (error) {
    return <p>Could not load menu: {error}</p>;
  }

  const filtered = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(debounced.toLowerCase())
  );

  return (
    <div>
      <h1>CampusEats Dashboard</h1>

      <input
        type="text"
        placeholder="Search dishes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <MenuList dishes={filtered} />
    </div>
  );
}

export default MenuPage;