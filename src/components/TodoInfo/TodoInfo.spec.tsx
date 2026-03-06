import { mount } from '@cypress/react18';
import { TodoInfo } from './TodoInfo';

const user1 = {
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
};

const user2 = {
  id: 2,
  name: 'Ervin Howell',
  username: 'Antonette',
  email: 'Shanna@melissa.tv',
};

const user3 = {
  id: 3,
  name: 'Clementine Bauch',
  username: 'Samantha',
  email: 'Nathan@yesenia.net',
};

const todo1 = {
  userId: 1,
  id: 1,
  title: 'Learn HTML',
  completed: true,
  user: user1,
};

const todo2 = {
  userId: 2,
  id: 10,
  title: 'Learn CSS',
  completed: false,
  user: user2,
};

const todo48 = {
  userId: 3,
  id: 48,
  title: 'sit reprehenderit omnis quia',
  completed: true,
  user: user3,
};

describe('TodoInfo', () => {
  it('should have a correct title', () => {
    mount(<TodoInfo todo={todo1} />);

    cy.get('.TodoInfo__title').should('have.text', 'Learn HTML');
  });

  it('should add TodoInfo--completed class for a completed todo', () => {
    mount(<TodoInfo todo={todo1} />);

    cy.get('.TodoInfo').should('have.class', 'TodoInfo--completed');
  });

  it('should NOT add TodoInfo--completed class for not completed todo', () => {
    mount(<TodoInfo todo={todo2} />);

    cy.get('.TodoInfo').should('not.have.class', 'TodoInfo--completed');
  });

  it('should have UserInfo', () => {
    mount(<TodoInfo todo={todo1} />);

    cy.get('.UserInfo').should('have.text', 'Leanne Graham');
  });

  it('should work with the other todo', () => {
    mount(<TodoInfo todo={todo48} />);

    cy.get('.TodoInfo__title').should(
      'have.text',
      'sit reprehenderit omnis quia',
    );

    cy.get('.TodoInfo').should('have.class', 'TodoInfo--completed');
    cy.get('.UserInfo').should('have.text', 'Clementine Bauch');
  });
});
