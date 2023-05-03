import ReactDOMServer, { RenderToPipeableStreamOptions } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import { App } from './App';
import { createStore } from './store/store';

export function render(url: string, opts: RenderToPipeableStreamOptions) {
  const store = createStore();
  return ReactDOMServer.renderToPipeableStream(
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
}
