import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { App } from './App';
import { createStore } from './store/store';

export function render(url: string) {
  const store = createStore();
  // TODO pipeablestream
  // TODO context
  const APP_HTML = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Provider>
  );

  return {
    APP_HTML,
    APP_STATE: store.getState(),
  };
}
