import AppFooter from './AppFooter';
import AppHeader from './AppHeader';
import Meta from './Meta';

export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <AppHeader />
          {children}
      <AppFooter />
    </>
  );
}