import { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import styles from './Main.module.scss';
import CardList from '../../components/CardList/CardList';
import { Character } from '../../types/character';
import Status from '../../types/status';
import Modal from '../../components/Modal/Modal';
import ModalCharacter from '../../components/ModalCharacter/ModalCharacter';
import Loader from '../../components/Loader/Loader';
import { getSearchItem } from '../../helpers/search';

export default function MainPage() {
  const [search, setSearch] = useState(getSearchItem());
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState<string>('');
  const [status, setStatus] = useState<Status>(Status.INITIAL);
  const [modalCharacter, setModalCharacter] = useState<Character | null>();

  useEffect(() => {
    const request = async () => {
      setError('');
      setStatus(Status.PENDING);

      try {
        const res = await fetch(
          `https://api.potterdb.com/v1/characters?filter[name_cont]=${search}`
        );
        if (res.ok) {
          setStatus(Status.SUCCESS);
          const json = await res.json();
          setCharacters(json.data);
        } else {
          setStatus(Status.ERROR);
          setError(await res.text());
        }
      } catch (err) {
        setStatus(Status.ERROR);
        if (err instanceof TypeError) {
          setError(err.message);
        } else {
          setError('Произошла неизвестная ошибка');
        }
      }
    };

    request();
  }, [search]);

  const isLoading = status === Status.PENDING;
  const isSuccess = status === Status.SUCCESS;
  const isError = status === Status.ERROR;
  const isEmpty = isSuccess && characters.length === 0;

  return (
    <div className={styles.root}>
      <SearchBar className="search" onChange={(value) => setSearch(value)} />
      {isLoading && <Loader />}
      {isError && <div className={styles.error}>Произошла ошибка: {error}</div>}
      {isEmpty && (
        <div className={styles.empty}>Ничего не нашлось, попробуйте изменить параметры поиска.</div>
      )}
      {isSuccess && (
        <CardList characters={characters} onClick={(character) => setModalCharacter(character)} />
      )}
      <Modal isOpen={!!modalCharacter} onClose={() => setModalCharacter(null)}>
        <ModalCharacter character={modalCharacter!} />
      </Modal>
    </div>
  );
}
