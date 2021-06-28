import React from 'react';
import { Story, Meta } from '@storybook/react';
import { PureMenuList, MenuListProps } from 'src/components/MenuList';
import shopInfo from 'src/mocks/shop-sample';

export default {
  title: 'Molecule/MenuList',
  component: PureMenuList,
} as Meta;

const Template: Story<MenuListProps> = (args) => <PureMenuList {...args} />;

export const Mock1 = Template.bind({});
Mock1.args = {
  shopInfo,
};
