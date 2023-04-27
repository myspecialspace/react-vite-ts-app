import ReactDOMServer, { RenderToPipeableStreamOptions } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { App } from './App';
import { createStore } from './store/store';

export function render(url: string, opts: RenderToPipeableStreamOptions) {
  const store = createStore();
  const APP_HTML = ReactDOMServer.renderToPipeableStream(
    <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Provider>,
    {
      ...opts,
      bootstrapScriptContent: `window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())};`,
    }
  );

  return {
    APP_HTML,
    APP_STATE: store.getState(),
  };
}
