import Characters from '@components/Characters';
import { FilterContext } from '@context/filtersProvider';
import { truncate } from 'lodash';
import { useContext, useEffect, useState } from 'react';
import ApplyFilters from '@helpers/applyFilters';
import Styles from './index.module.scss';

// TODO: move types to his own space
type CharactersType = Readonly<{
  available: number;
  items: Array<{
    name: string;
    collectionURI: string;
  }>;
}>;

type PriceType = Readonly<{
  price: string;
}>;

type ImageType = Readonly<{
  path: string;
  extension: string;
}>;

export type ResultsType = Readonly<{
  title: string;
  description: string;
  id: number;
  images: ImageType[];
  thumbnail: ImageType;
  prices: PriceType[];
  characters: CharactersType;
}>;

type Props = Readonly<{
  data: {
    results: ResultsType[];
  };
}>;

const renderCharacters = (characters: CharactersType) => {
  if (characters.available < 1)
    return <p className={Styles.characterItem}>No Characters Availables</p>;

  return (
    <ul>
      {characters?.items?.map(character => (
        <li
          className={Styles.characterItem}
          key={`character-${character?.name}-${character?.collectionURI}`}
        >
          {character?.name}
        </li>
      ))}
    </ul>
  );
};

const renderPrices = (prices: PriceType[]) => {
  const price = Number(prices?.[0]?.price);

  if (prices.length < 1 || price === 0) {
    return <p className={Styles.price}>No price</p>;
  }

  return <span className={Styles.price}>{price} USD</span>;
};

const getImageUrl = (images: ImageType[], thumbnail: ImageType): string => {
  let imageUrl = `${thumbnail.path}.${thumbnail.extension}`;

  if (images.length > 0) {
    imageUrl = `${images?.[0]?.path}.${images?.[0]?.extension}`;
  }

  return imageUrl;
};

const useFilterBySearch = (results: ResultsType[]) => {
  const [items, setItems] = useState<Array<ResultsType>>([]);
  const {
    state: { value, characterSelected },
  } = useContext(FilterContext);

  useEffect(() => {
    const newData = ApplyFilters(results)
      .searchFilter(value)
      .filterByCharacter(characterSelected)
      .getData();

    setItems(newData);
  }, [value, characterSelected]);

  return items;
};

const useCharactersList = (results: ResultsType[]) => {
  const charactersSet = new Set();

  results.forEach(item => {
    item.characters?.items?.forEach(character =>
      charactersSet.add(character.name),
    );
  });

  const charactersList = Array.from(charactersSet);

  return [charactersList];
};

function Dashboard(props: Props) {
  const { results } = props.data;

  const items = useFilterBySearch(results) as Array<ResultsType>;
  const [charactersList] = useCharactersList(results);

  return (
    <div className={Styles.container}>
      <Characters data={charactersList} />
      {items?.map(comic => {
        const {
          images,
          title,
          description,
          thumbnail,
          id,
          prices,
          characters,
        } = comic;

        const imageUrl = getImageUrl(images, thumbnail);

        return (
          <article className={Styles.article} key={`dashboard-${id}`}>
            <div className={Styles.imgContainer}>
              <img className={Styles.img} src={imageUrl} alt="" />
            </div>
            <div className={Styles.textContainer}>
              <h2 className={Styles.title}>{title}</h2>
              <p className={Styles.description}>
                {truncate(description, { length: 180 })}
              </p>
              {renderCharacters(characters)}
              {renderPrices(prices)}
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default Dashboard;
