import FiltersProvider from '@context/filtersProvider';
import '@styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <FiltersProvider>
      <Component {...pageProps} />
    </FiltersProvider>
  );
}

export default MyApp;
