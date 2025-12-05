import H1 from '@/app/components/h1';
import { fetchEvent } from '@/lib/server-utils';
import { Metadata } from 'next';
import Image from 'next/image';

type Props = {
  params: {
    slug: string;
  };
};

// Generate metadata for the page based on the event data
// Although we call fetch twice here, React will always memoise the result
// of the same call in a single render pass
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const eventData = await fetchEvent(params.slug);
  return { title: eventData.name };
}

// This tells Next.js to pre-render these event pages at build time
// When you run `next build`, some pages will be statically generated
// but pages with dynamic params are generated dynamically by the Node.js
// server in production
// However, by specifying static params here, we can have some pages for
// the specified params/slugs pre-rendered at build time
export function generateStaticParams() {
  return [{ slug: 'comedy-extravaganza' }, { slug: 'dj-practice-session' }];
}

export default async function Event({ params }: Props) {
  const slug = params.slug;
  const eventData = await fetchEvent(slug);

  /*
  The Image fill property is used to make the image cover the entire section as a background
  but fill automatically positions the Image absolutely, so we need to wrap it in a relative container.
  When using fill its best to specify sizes for better performance. This ultimately sets srcset in the img tag on
  the rendered page
  The z-index values are set to ensure the background image stays behind the foreground image.
  However z index only works on elements positioned other than the default static, so we set the position to relative
  on the element or its parent.
  We use a styling trick to create a blurred background effect by applying a large blur to the background image.
  We use object cover to ensure the image aspect ratio is maintained while covering the entire section.
  However because we blurred it making it large (3xl) it overflows the section, so we set overflow hidden on the section
  The priority prop is used to ensure this image is loaded as priority to avoid layout shift
  */
  return (
    <main>
      <section
        className="relative overflow-hidden
      flex flex-col items-center justify-center py-10 md:py-16"
      >
        <Image
          src={eventData.imageUrl}
          className="object-cover z-0 blur-3xl"
          alt="Event background image"
          fill
          quality={50}
          sizes="(max-width: 1280px) 100vw, 1280px"
          priority
        />
        <div className="z-1 flex flex-col gap-6 lg:gap-16 relative lg:flex-row">
          <Image
            src={eventData.imageUrl}
            alt={eventData.name}
            width={300}
            height={201}
            className="rounded-xl border-2 border-white/50 object-cover"
          />
          <div className="flex flex-col">
            {/* Add the name of the day followed by a comma then the name of the month then the day of the month
              from eventData.date
              for example "Saturday, June 15" */}
            <p className="text-white/75">
              {new Date(eventData.date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <H1 className="mb-2 mt-1 whitespace-nowrap lg:text-5xl">
              {eventData.name}
            </H1>
            <p className="whitespace-nowrap text-xl text-white/75">
              Organised by{' '}
              <span className="italic">{eventData.organizerName}</span>
            </p>
            {/* Note state-effects is a custom class we defined in
            globals.css that applies scale and transition effects */}
            <button
              className="bg-white/20 text-lg capitalize bg-blur mt-5 lg:mt-auto
              w-[95vw] rounded-md border-white/10 border-2 sm:w-full py-2
              state-effects"
            >
              Get tickets
            </button>
          </div>
        </div>
      </section>
      <div className="min-h-[75vh] text-center px-5 py-16">
        <Section>
          <SectionHeading>About this event</SectionHeading>
          <SectionContent>{eventData.description}</SectionContent>
        </Section>
        <Section>
          <SectionHeading>Location</SectionHeading>
          <SectionContent>{eventData.location}</SectionContent>
        </Section>
      </div>
    </main>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <section className="mb-12">{children}</section>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl mb-8">{children}</h2>;
}

function SectionContent({ children }: { children: React.ReactNode }) {
  return (
    <p className="max-w-4xl mx-auto text-lg leading-8 text-white/75">
      {children}
    </p>
  );
}
