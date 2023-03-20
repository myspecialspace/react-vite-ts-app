import React, { SyntheticEvent } from 'react';
import styles from './SearchBar.module.scss';

interface Props {
  className?: string;
}

interface State {
  value: string;
}

class SearchBar extends React.Component<Props, State> {
  readonly SEARCH_KEY = 'search';

  constructor(props: Props) {
    super(props);
    this.state = {
      value: localStorage.getItem(this.SEARCH_KEY) || '',
    };
  }

  onInput = (event: SyntheticEvent) => {
    const value = (event.target as HTMLInputElement).value;
    this.setState({ value });
  };

  render() {
    return (
      <div className={styles.root}>
        <span className={styles.input}>
          <input
            type="text"
            placeholder="Search"
            defaultValue={this.state.value}
            onInput={this.onInput}
          />
          <span></span>
        </span>
      </div>
    );
  }

  componentWillUnmount() {
    localStorage.setItem(this.SEARCH_KEY, this.state.value);
  }
}

export default SearchBar;
