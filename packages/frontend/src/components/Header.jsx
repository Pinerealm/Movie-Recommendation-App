import Navbar from './Navbar';
import SearchBar from './SearchBar';

const Header = () => {
  const handleSearch = (query) => {
    console.log('Searching for:', query);
    // Handle search logic here
  };

  return (
    <header>
      <Navbar />
      <SearchBar onSearch={handleSearch} />
    </header>
  );
};

export default Header;
