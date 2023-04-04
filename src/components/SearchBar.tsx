import { SyntheticEvent, useEffect, useState } from 'react';
import classnames from 'classnames';
import styles from './SearchBar.module.scss';
import { getSearchItem, setSearchItem } from '../../helpers/search';

interface Props {
  className: string;
  onChange: (value: string) => unknown;
}

export default function SearchBar({ className, onChange }: Props): JSX.Element {
  const [value, setValue] = useState(getSearchItem());

  const onInput = (event: SyntheticEvent) => {
    const val = (event.target as HTMLInputElement).value;
    setValue(val);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onChange(value);
    }
  };

  useEffect(() => {
    return () => {
      setSearchItem(value);
    };
  });

  return (
    <div className={classnames(styles.root, className)}>
      <span className={styles.input}>
        <input
          type="text"
          placeholder="Search"
          defaultValue={value}
          onInput={onInput}
          onKeyDown={onKeyDown}
        />
        <span />
      </span>
    </div>
  );
}
