import { Link } from 'react-router';

function NavigationDesktop() {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Search', path: '/search' },
    { name: 'Tags', path: '/tags' },
  ];

  return (
    <div className='hidden sm:block'>
      <ul className='flex items-center gap-8'>
        {links.map((link, i) => (
          <li key={i} className='hover:border-b'>
            <Link to={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default NavigationDesktop;
