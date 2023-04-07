import classnames from 'classnames';
import styles from './SearchBar.module.scss';

export default function SearchBar(): JSX.Element {
  // const { search } = useSelector(mainSelectors.self);

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const nextSearch = (event.target as HTMLInputElement).value;
      mainActions.setSearch(nextSearch);
    }
  };

  return (
    <div className={classnames(styles.root)}>
      <span className={styles.input}>
        <input type="text" placeholder="Search" defaultValue={search} onKeyDown={onKeyDown} />
        <span />
      </span>
    </div>
  );
}
