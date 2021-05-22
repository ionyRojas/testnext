import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useState,
} from 'react';

type ContextType = {
  state: {
    value: string;
    characterSelected: string;
  };
  actions: {
    setValue: Dispatch<SetStateAction<string>>;
    setCharacterSelected: Dispatch<SetStateAction<string>>;
  };
};

type Props = {
  children: React.ReactNode;
};

export const FilterContext = createContext<ContextType>({} as ContextType);

function FiltersProvider(props: Props): ReactElement<any, any> {
  const { children } = props;
  const [value, setValue] = useState<string>('');
  const [characterSelected, setCharacterSelected] = useState<string>('');

  return (
    <FilterContext.Provider
      value={{
        state: { value, characterSelected },
        actions: { setValue, setCharacterSelected },
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export default FiltersProvider;
