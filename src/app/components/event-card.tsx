'use client';

import { EventoEvent } from '@prisma/client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

type EventCardProps = {
  event: EventoEvent;
};

// Usually with framer motion we can use motion.htmlElement e.g. motion.div
// that creates a motion component but we want to return a Link component from
// next/link so we need to wrap the Link component with motion() to create a motion
// component
// Also note that motion uses hooks so we have to make this a client component
const MotionLink = motion(Link);

export default function EventCard({ event }: EventCardProps) {
  // Create a ref, link it to the MotionLink component below
  // then use useScroll to get scrollYProgress for that ref
  // frame motion scrollYProgress is a value from 0 to 1 that indicates how
  // far the target element has been scrolled into view with 0 being not
  // visible and 1 being fully visible (useScroll also returns scrollXProgress
  // and scrollX, scrollY which give a value in pixels)
  // The offset array configures when the scrollYProgress should start and end
  // '0 1' means the start of the target (0) hits the end of the viewport (1)
  // '1.5 1' means when the target has been scrolled 1.5 times its height
  // past the end of the viewport (1)
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1', '1.5 1'],
  });

  // useTransform can be used to map input ranges to output ranges
  // Here we map scrollYProgress (0 to 1) to a scale value (0.8 to 1)
  // so that when the card is not visible (0) it is scaled down to 0.8
  // and when it is fully visible (1) it is scaled to 1
  // and we do something similar for opacity
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  // The parent container is a flex container so flex-1 makes the card take
  // 1 part of the available space, basis-80 sets the minimum size of the card
  // to 80 (20rem) so that when the screen is wide enough more cards can fit
  // on a row. max-w-[500px] sets the maximum width of the card to 500px so
  // that on very wide screens the cards don't become too wide.
  // And we use inline styles to scale the card based on scrollProgress
  //
  // Also note that Typescript doesn't know about the Link/href prop on MotionLink
  // So it may indicate that scale and opacity are not valid properties, but they
  // are valid for links so we tell Typescript to ignore the error with @ts-ignore
  //
  // And finaly we set the initial state of the card to be scaled down and
  // transparent because if we don't, when the first cards to load are already
  // in view they will pop in at full size and opacity rather than animating
  // in smoothly
  return (
    <MotionLink
      ref={ref}
      className="flex-1 basis-80 h-[380px] max-w-[500px]"
      href={`/event/${event.slug}`}
      style={{
        // @ts-ignore
        scale: scaleProgress,
        // @ts-ignore
        opacity: opacityProgress,
      }}
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
    >
      {/*
        width and height are set to full so they take up the full size of the parent
        overflow-hidden is set to stop the image overflowing the rounded corners
        relative is set so that absolute positioned children are positioned
        relative to this container, in this case the section with the date is
        positioned absolutely relative to this container

        Also note state-effects is a custom class we defined in globals.css that
        applies scale and transition effects
        */}
      <section
        className="flex flex-col w-full h-full
    bg-white/[3%] rounded-xl overflow-hidden relative state-effects"
      >
        {/* Even though the Image component has a height and width we still need to
      set the size in CSS, in this case set the height and use object-fit to
      maintain the aspect ratio */}
        <Image
          src={event.imageUrl}
          alt={event.name}
          width={500}
          height={280}
          className="h-[60%] object-cover"
        />
        {/* justify-center centers content vertically however the div does extend to the
      bottom of the parent container. So we made the parent section a flex container
      then the div becomes a flex item, and flex-1 makes a flex item take up the
      remaining space. The div in this case is also a flex container, a flex container
      in a flex container is also a flex item */}
        <div className="flex flex-col flex-1 justify-center items-center">
          <h2 className="text-2xl font-semibold">{event.name}</h2>
          <p className="italic text-white/75">{event.organizerName}</p>
          <p className="text-sm text-white/50 mt-4">{event.location}</p>
        </div>

        <section
          className="absolute flex flex-col justify-center items-center top-[12px]
      left-[12px] h-[45px] w-[45px] bg-black/30 rounded-md"
        >
          {/* the negative margin -mb-[5px] brings the day down closer to the month*/}
          <p className="text-xl font-bold -mb-[5px]">
            {new Date(event.date).toLocaleDateString('en-US', {
              day: '2-digit',
            })}
          </p>
          <p className="text-xs uppercase text-accent">
            {new Date(event.date).toLocaleDateString('en-US', {
              month: 'short',
            })}
          </p>
        </section>
      </section>
    </MotionLink>
  );
}
