import { useCallback, useContext } from 'react';
import SearchIcon from '@public/search.svg';
import Styles from './index.module.scss';
import { FilterContext } from '@context/filtersProvider';

function Search() {
  const {
    actions: { setValue },
  } = useContext(FilterContext);

  const onChangeInput = useCallback(event => {
    const { value } = event.target;
    setValue(value.toLowerCase());
  }, []);

  return (
    <div className={Styles.searchContainer}>
      <SearchIcon className={Styles.searchIcon} />
      <input className={Styles.input} type="text" onChange={onChangeInput} />
    </div>
  );
}

export default Search;
