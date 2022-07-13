import React from 'react';
import {Image} from 'react-native';
import {shallow} from 'enzyme';
import StoryImage from '../../src/components/StoryImage';

const baseProps = {
  source: '',
  style: {},
};

describe('Test StoryImage component', () => {
  it('should load unavailable icon if story image loading fails', () => {
    const component = shallow(<StoryImage {...baseProps} />);
    component
      .find(Image)
      .first()
      .simulate('error', {nativeEvent: {error: 'code:404'}});
    expect(component).toMatchSnapshot();
  });

  it('should render with base props', () => {
    const component = shallow(<StoryImage {...baseProps} />);
    expect(component.find('Image').exists()).toEqual(true);
    expect(component).toMatchSnapshot();
  });
});
