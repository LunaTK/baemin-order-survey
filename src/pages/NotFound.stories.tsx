import React from 'react';
import { Story, Meta } from '@storybook/react';
import NotFound from 'src/pages/NotFound';

export default {
  title: 'Page/NotFound',
  component: NotFound,
} as Meta;

const Template: Story<{}> = (args) => <NotFound {...args} />;

export const Default = Template.bind({});
