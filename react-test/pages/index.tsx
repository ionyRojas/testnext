import Dashboard from '@components/Dashboard';
import Search from '@components/Search';
import { getComics } from '@api';
import Styles from './home.module.scss';

export async function getServerSideProps(context) {
  const [err, data] = await getComics();

  if (err) {
    return {
      props: {
        err,
      },
    };
  }

  return {
    props: {
      data,
    },
  };
}

function Home(props) {
  if (props.err) return 'something failed';

  return (
    <main className={Styles.main}>
      <Search />
      <Dashboard data={props.data?.data} />
    </main>
  );
}

export default Home;
