import React from 'react';
import {shallow} from 'enzyme';
import Story from '../../src/components/Story';

describe('Testing Story component', () => {
  const baseProps = {
    image: '',
    headline: 'IStory headline',
    authors: 'Hang Reusch',
    onStoryClicked: () => {},
  };
  it('should render with base props', () => {
    const component = shallow(<Story {...baseProps} />);
    expect(component).toMatchSnapshot();
  });
});
