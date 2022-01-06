import { Link, useMatch, useLocation } from 'react-router-dom';

export const CustomLink = ({ to, children, ...props }) => {
  const match = useMatch({ path: to, end: true });
  const location = useLocation();

  const isActive = match || location.pathname.split('/').pop() === to;
  return (
    <Link
      to={to}
      style={{
        color: isActive ? '#2196f3' : '#000000',
        display: 'inline-block',
        margin: '0 15px',
        padding: '15px 10px',
      }}
      {...props}
    >
      {children}
    </Link>
  );
};
