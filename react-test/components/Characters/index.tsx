import Modal from 'react-modal';
import { FilterContext } from '@context/filtersProvider';
import { useCallback, useContext, useState } from 'react';
import Styles from './index.module.scss';

const customStyles = {
  content: {
    bottom: 'auto',
    left: '50%',
    marginRight: '-50%',
    right: 'auto',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#__next');

function Characters(props) {
  const { data } = props;
  const {
    actions: { setCharacterSelected },
  } = useContext(FilterContext);

  const onClickCharacterFilter = useCallback(value => {
    setCharacterSelected(value);
  }, []);

  const clearFilter = useCallback(()=> {
    setCharacterSelected('')
  }, [])

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className={Styles.container}>
      <button onClick={openModal} className={Styles.button}>
        Filter By Your Favorite Character
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Filter By Character Modal"
      >
        <div>
          <button onClick={closeModal}>Close Modal</button>
          <button onClick={clearFilter}>Delete Filter</button>
        </div>
        {data.map(value => (
          <button
            className={Styles.modalButtons}
            onClick={() => {
              onClickCharacterFilter(value)
              closeModal()
            }}
            key={`button-character-${value}`}
          >
            {value}
          </button>
        ))}
      </Modal>
    </div>
  );
}

export default Characters;
