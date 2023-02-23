# EasyCart.com

Introducing a cutting-edge E-commerce project built on the T3 stack with advanced features such as AI integration, chatbots, and more. This full-stack, full-fledged project utilizes TypeScript, Next.js, Tailwind, Prisma, and Postgres for a secure and efficient shopping experience.

## Tech Stack

- TypeScript
- Next.js
- Tailwind
- Prisma
- Postgres
- trpc

## Features

- Authentication using google
- Clean UI
- Admin panel
- Seller panel
- Has normal_user, seller, admin authentication
- Custom Markdown editor
- AI Integration
- AI Chatbot
- Advanced search
  ...

## Current Status: Development

## Getting Started

To get started with this project, clone this repository and run the following command:

```
npm install
```

Configure the environment variables
Create `.env` file at the root directory and add the following:

```
  DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<database_name>"

  NEXTAUTH_URL="http://localhost:3000"
  NEXTAUTH_SECRET=<secret key fot jwt authentication>

  # Next Auth Discord Provider
  DISCORD_CLIENT_ID=
  DISCORD_CLIENT_SECRET=

  # Next Auth Google Provider
  GOOGLE_CLIENT_ID=
  GOOGLE_CLIENT_SECRET=
```

Run the following command to sync database with your application

```
npx prisma db push
```

You can check the database by the following command:

```
npx prisma studio
```

Run the application

```
npx run dev
```

or

```
yarn dev
```

## Contributing

We welcome all contributions to this project. Please read our contributing guidelines before making a pull request.
