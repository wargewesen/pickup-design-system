import type { Preview } from '@storybook/react-vite';
import '../src/tokens/tokens.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: { expanded: true, matchers: { color: /(background|color)$/i } },
    backgrounds: {
      options: {
        background: { name: 'Background (mist-200)', value: '#deedf2' },
        card: { name: 'Card (white)', value: '#ffffff' },
        neutral: { name: 'Neutral 100', value: '#f6f6f6' },
      },
    },
    options: {
      storySort: { order: ['Introduction', 'Foundations', 'Inputs', 'Feedback', 'Overlays', 'Surfaces', 'Compositions', 'Brand', 'Prototype'] },
    },
  },
  initialGlobals: { backgrounds: { value: 'background' } },
  decorators: [
    (Story) => (
      <div style={{ fontFamily: 'var(--font-sans)', color: 'var(--foreground)' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default preview;
