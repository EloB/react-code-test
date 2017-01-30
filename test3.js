import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { createSelector } from 'reselect';

const initalState = {
  items: Array.from({ length: 10000 }).map((_, index) => Math.floor(Math.random() * 1000)),
};

const store = createStore(
  (state = initalState, action) => ({
    ...state,
  }),
);

const Test = ({ values }) => (
  <div>{values.join(', ')}</div>
);

const selectSorted = createSelector(
  ({ items }) => items,
  ({ limit }) => limit,
  ({ offset }) => offset,
  (items, limit, offset) => {
    const subItems = items.slice(offset, limit + offset);
    subItems.sort((a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    });
    return subItems;
  }
);
const TestContainer = connect(
  ({ items }, { limit, offset }) => ({
    values: selectSorted({ items, limit, offset }),
  })
)(Test);

setInterval(() => store.dispatch({ type: 'SIMULATE_ACTION' }), 1);

render((
  <Provider store={store}>
    <div>
      {Array.from({ length: 100 }).map((_, index) => (
        <div key={index}>
          <TestContainer limit={100} offset={index * 100} />
          <br />
        </div>
      ))}
    </div>
  </Provider>
  ),
  document.getElementById('container')
);
