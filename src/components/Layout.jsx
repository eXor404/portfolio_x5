/* Layout — app shell: Nav + routed <Outlet> + Footer. Scrolls to top on every
   route change so each "site" opens from the masthead. */
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from './Nav.jsx';
import Footer from './Footer.jsx';
import PersistentMap from './PersistentMap.jsx';

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <>
      <Nav />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
      {/* Boots the /about swisstopo embed once and keeps it alive session-wide. */}
      <PersistentMap />
    </>
  );
}
