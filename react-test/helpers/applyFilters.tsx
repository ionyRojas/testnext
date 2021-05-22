import { ResultsType } from '@components/Dashboard';

function ApplyFilters(result: Readonly<ResultsType[]>) {
  const data = [...result]

  return {
    _data: data as ResultsType[],
    _isFiltering: false as boolean,
    getDataToBeFiltered() {
      let dataToFilter = data;
      if (this._isFiltering) dataToFilter = this._data;

      return dataToFilter;
    },
    searchFilter(value: string) {
      const dataToFilter = this.getDataToBeFiltered();

      if (value.length > 0) {
        this._data = dataToFilter?.filter(item => {
          const lowerCaseTitle = item?.title?.toLowerCase() as string;

          if (lowerCaseTitle?.indexOf(value) > -1) {
            return true;
          }
        });

        this._isFiltering = true;
      }

      return this;
    },
    filterByCharacter(characterSelected: string) {
      const dataToFilter = this.getDataToBeFiltered();

      if (characterSelected.length > 0) {
        this._data = dataToFilter?.filter(item => {
          return item?.characters?.items?.some(character => {
            if (character?.name === characterSelected) {
              return true;
            }
          });
        });

        this._isFiltering = true;
      }
      return this;
    },
    getData(): ResultsType[] {
      return this._data;
    },
    reset() {
      this._data = data as ResultsType[];
    },
  };
}

export default ApplyFilters;
