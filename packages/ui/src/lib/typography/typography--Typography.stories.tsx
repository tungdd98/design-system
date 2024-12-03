import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './typography';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Typography> = {
  component: Typography,
  title: 'Typography',
};
export default meta;
type Story = StoryObj<typeof Typography>;

export const Primary = {
  args: {
    children: <>Welcome to Typography!</>,
    variant: 'h1',
  },
};

export const Heading: Story = {
  args: {
    children: <>Welcome to Typography!</>,
    variant: 'h1',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Typography!/gi)).toBeTruthy();
  },
};
