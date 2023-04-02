import { SyntheticEvent, useEffect, useState } from 'react';
import classnames from 'classnames';
import styles from './SearchBar.module.scss';

interface Props {
  className: string;
}

const SEARCH_KEY = 'search';

export default function SearchBar(props: Props) {
  const [value, setValue] = useState(localStorage.getItem(SEARCH_KEY) || '');

  const onInput = (event: SyntheticEvent) => {
    setValue((event.target as HTMLInputElement).value);
  };

  useEffect(() => {
    return () => {
      localStorage.setItem(SEARCH_KEY, value);
    };
  });

  return (
    <div className={classnames(styles.root, props.className)}>
      <span className={styles.input}>
        <input type="text" placeholder="Search" defaultValue={value} onInput={onInput} />
        <span />
      </span>
    </div>
  );
}
