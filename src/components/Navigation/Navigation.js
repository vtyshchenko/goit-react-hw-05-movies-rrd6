import { CustomLink } from '../CustomLink/CustomLink';

export default function Navigation() {
  return (
    <nav>
      <CustomLink to="/">Home</CustomLink>
      <CustomLink to="/movies">Movies</CustomLink>
    </nav>
  );
}
