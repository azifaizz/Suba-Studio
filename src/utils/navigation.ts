import { NavigateFunction, Location } from 'react-router-dom';

export const handleViewWork = (navigate: NavigateFunction, location: Location) => {
  if (location.pathname === '/') {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  } else {
    navigate('/?scrollTo=services');
  }
};
