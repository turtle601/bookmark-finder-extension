import Image from './';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Image> = {
  title: 'Image',
  component: Image,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://picsum.photos/400/300?random=1',
    alt: 'Random image from Picsum',
    width: '400px',
    height: '300px',
  },
};

export const WithFallback: Story = {
  args: {
    src: 'https://invalid-url.com/image.jpg',
    alt: 'Image with fallback',
    fallbackSrc: 'https://picsum.photos/400/300?random=2',
    width: '400px',
    height: '300px',
  },
};

export const WithCustomFallback: Story = {
  args: {
    src: 'https://invalid-url.com/image.jpg',
    alt: 'Image with custom fallback component',
    fallbackComponent: (
      <div
        style={{
          width: '400px',
          height: '300px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f3f4f6',
          border: '2px dashed #d1d5db',
          borderRadius: '8px',
          color: '#6b7280',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🖼️</div>
        <div style={{ fontSize: '16px', fontWeight: '500' }}>
          Image not available
        </div>
        <div style={{ fontSize: '14px', marginTop: '4px' }}>
          Please check the URL
        </div>
      </div>
    ),
  },
};
export const Rounded: Story = {
  args: {
    src: 'https://picsum.photos/300/300?random=4',
    alt: 'Rounded image',
    width: '300px',
    height: '300px',
    style: {
      borderRadius: '50%',
      objectFit: 'cover',
    },
  },
};

export const Thumbnail: Story = {
  args: {
    src: 'https://picsum.photos/150/150?random=5',
    alt: 'Thumbnail image',
    width: '150px',
    height: '150px',
    style: {
      borderRadius: '8px',
      objectFit: 'cover',
      border: '2px solid #e5e7eb',
    },
  },
};

export const Gallery: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        padding: '20px',
      }}
    >
      <Image
        src="https://picsum.photos/200/200?random=6"
        alt="Gallery image 1"
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '8px',
        }}
      />
      <Image
        src="https://picsum.photos/200/200?random=7"
        alt="Gallery image 2"
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '8px',
        }}
      />
      <Image
        src="https://invalid-url.com/image.jpg"
        alt="Broken image"
        fallbackSrc="https://picsum.photos/200/200?random=8"
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '8px',
        }}
      />
      <Image
        src="https://invalid-url.com/image.jpg"
        alt="Custom fallback"
        fallbackComponent={
          <div
            style={{
              width: '100%',
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f3f4f6',
              borderRadius: '8px',
              color: '#6b7280',
            }}
          >
            <span style={{ fontSize: '24px' }}>🖼️</span>
          </div>
        }
      />
    </div>
  ),
};
