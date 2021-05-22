function ApplyFilters(result) {
  const data = result;
  return {
    _data: data,
    _isFiltering: false,
    getDataToBeFiltered() {
      let dataToFilter = data;
      if (this._isFiltering) dataToFilter = this._data;

      return dataToFilter;
    },
    searchFilter(value) {
      const dataToFilter = this.getDataToBeFiltered();

      if (value.length > 0) {
        this._data = dataToFilter.filter(item => {
          const lowerCaseTitle = item?.title?.toLowerCase();

          if (lowerCaseTitle.indexOf(value) > -1) {
            return true;
          }
        });

        this._isFiltering = true;
      }

      return this;
    },
    filterByCharacter(characterSelected) {
      const dataToFilter = this.getDataToBeFiltered();

      if (characterSelected.length > 0) {
        this._data = dataToFilter.filter(item => {
          return item?.characters?.items?.some(character => {
            if (character.name === characterSelected) {
              return true;
            }
          });
        });

        this._isFiltering = true;
      }
      return this;
    },
    getData() {
      return this._data;
    },
    reset() {
      this._data = data;
    },
  };
}

export default ApplyFilters;
