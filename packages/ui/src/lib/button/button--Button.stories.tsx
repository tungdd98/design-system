import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Button',
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary = {
  args: {
    children: <>Welcome to Button!</>,
  },
};

export const Heading: Story = {
  args: {
    children: <>Welcome to Button!</>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Button!/gi)).toBeTruthy();
  },
};
