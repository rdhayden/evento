// If you include an opengraph-image.tsx file in folder
// Next.js will use it to generate the Open Graph image for any pages
// in that folder. This image is the preview image used when sharing links
// on social media platforms
import { ImageResponse } from 'next/og';

// Image metadata
export const alt = 'Evento';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Note the function doesn't have to return and image, ImagResponse
// can take any JSX and render it to an image
export default async function Image({ params }: { params: { slug: string } }) {
  return new ImageResponse(
    (
      <section>
        <h1>{params.slug}</h1>
        <p>Evento - Browse events around you</p>
      </section>
    )
  );
}
