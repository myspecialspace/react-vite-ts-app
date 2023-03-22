import React, { SyntheticEvent } from 'react';
import classnames from 'classnames';
import styles from './SearchBar.module.scss';

interface Props {
  className: string;
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

  componentWillUnmount() {
    localStorage.setItem(this.SEARCH_KEY, this.state.value);
  }

  onInput = (event: SyntheticEvent) => {
    const { value } = event.target as HTMLInputElement;
    this.setState({ value });
  };

  render() {
    return (
      <div className={classnames(styles.root, this.props.className)}>
        <span className={styles.input}>
          <input
            type="text"
            placeholder="Search"
            defaultValue={this.state.value}
            onInput={this.onInput}
          />
          <span />
        </span>
      </div>
    );
  }
}

export default SearchBar;
