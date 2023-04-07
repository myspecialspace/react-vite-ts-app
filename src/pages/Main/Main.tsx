import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SearchBar from '../../components/SearchBar/SearchBar';
import styles from './Main.module.scss';
import CardList from '../../components/CardList/CardList';
import Modal from '../../components/Modal/Modal';
import CharacterModal from '../../components/CharacterModal/CharacterModal';
import Loader from '../../components/Loader/Loader';
import { getStatus } from '../../helpers/status';

export default function MainPage() {
  const { search, characters, error, status } = useSelector(mainSelectors.self);
  const characterModal = useSelector(characterModalSelectors.character);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCharacters(search));
  }, [search, dispatch]);

  const { isError, isLoading, isSuccess } = getStatus(status);
  const isEmpty = isSuccess && characters.length === 0;

  return (
    <div className={styles.root}>
      <SearchBar />
      {isLoading && <Loader />}
      {isError && <div className={styles.error}>Произошла ошибка: {error}</div>}
      {isEmpty && (
        <div className={styles.empty}>Ничего не нашлось, попробуйте изменить параметры поиска.</div>
      )}
      {isSuccess && (
        <CardList
          characters={characters}
          onClick={(character) => dispatch(characterModalActions.set(character))}
        />
      )}
      <Modal isOpen={!!characterModal} onClose={() => dispatch(characterModalActions.reset())}>
        <CharacterModal character={characterModal!} />
      </Modal>
    </div>
  );
}
