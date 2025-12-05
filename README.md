This is an example event listing app using Next.js 13 with the App Router, Tailwind CSS, and Prisma.
It is heavily commented to help demonstrate how the various components and Next.js is used. Start
with `app/page.tsx` to see the main page code and follow the imports to see how the components
are structured.

Learning from this example app requires prior knowledge of React. Also understanding the basics of
Tailwind will help so perhaps check out the Tailwind docs linked below to get familiar with some of the
getting started concepts and examples. Much of the Tailwind usage is commented in the code so basic familiarity
should be sufficient.

Prisma isn't commented as well because a lot of the setup is done using prisma command line tools
so it is worth reviewing the Prisma docs described below separately. A Sqlite databse is setup as follows:
`npx prisma init --datasource-provider sqlite` which creates the `prisma/schema.prisma` file.
A schema is defined in that file and then the database and client are generated using `npx prisma db push`
A seed file is included to populate the database with some initial data. There is a script
in `package.json` called `seed` which you can run with `npx prisma db seed` to populate the database.
Prisma also has a UI you can use to view the database contents by running `npx prisma studio`.
Note we use Prisma 5.6.0, version 7 is out at the time of writing which has some breaking changes.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## More about Next.js

Next.js is a React framework that provides server-side rendering and static site generation out of the box.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## More about Tailwind CSS

Tailwind provides utility classes to avoid having separate CSS files.
To learn more about Tailwind CSS, take a look at the following resources:

- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - learn about Tailwind CSS features and API.
- [Tailwind CSS Play](https://play.tailwindcss.com/) - an interactive Tailwind CSS playground.

## More about Prisma

Prisma is used as the database ORM in this project with a SQLite database.

To learn more about Prisma, take a look at the following resources:

- [Prisma Documentation](https://www.prisma.io/docs/) - learn about Prisma features and API.
- [Prisma GitHub Repository](https://github.com/prisma/prisma) - source code and contributions.
