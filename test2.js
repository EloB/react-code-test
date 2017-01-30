import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

const initalState = {
  users: [
    {
      id: 1,
      name: 'Batman',
      image: 'https://s3.amazonaws.com/gs-geo-images/0f698000-ea7f-4cf5-bb34-cc463b571dc4.jpg',
    },
    {
      id: 2,
      name: 'Spiderman',
      image: 'https://lumiere-a.akamaihd.net/v1/images/open-uri20150610-21458-15grg7i_33835846.png?region=0%2C0%2C474%2C385',
    }
  ],
};

const store = createStore(
  (state = initalState, action) => state,
);

const TestList = ({ users }) => (
  <div>
    {users.map((userId, key) => <TestItemContainer userId={userId} key={key} />)}
  </div>
);

const TestItem = ({ user, currentTime }) => (
  <div>
    Live time: {new Intl.DateTimeFormat().format(new Date(currentTime))}
    <dl>
      <dt>Name</dt>
      <dd>{user.name}</dd>
      <dt>Image</dt>
      <dd>{user.image}</dd>
    </dl>
  </div>
);
const TestItemContainer = connect(
  ({ users }, { userId }) => ({
    user: users.find((user) => user.id === userId),
    currentTime: Date.now(),
  })
)(TestItem);

render((
  <Provider store={store}>
    <TestList users={[1, 2]} />
  </Provider>
  ),
  document.getElementById('container')
);
