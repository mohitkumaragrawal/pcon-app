# Contributing

Thank you for considering contributing to PCON.

### Local Setup

1. First you need to fork this repository into your own github account
2. Clone your forked repository using the `git clone` command.
3. Create a new file in root directory of the project named .env and copy the contents of the .env.example to it.
4. Setup your PostgreSql database
   4.1 Option 1: Use some cloud providers like supabase or neon.tech and set the appropriate DATABASE_URL
   4.2 Option 2 (Using Docker): Install docker on your system, and just run the command `docker-compose up -d`

5. Create a new Google OAuth client and set the appropriate keys in the .env file
6. Setup ImgBB for image uploads and set the `IMGBB_API_KEY` in the .env file
7. Install the dependencies using `pnpm install`
8. Run `pnpm prisma:push`, this will automatically create all the necessary tables in the database and also ininitialize prisma client
9. Now you can finally the development server using `pnpm dev` command

### Reporting Bugs

#### Before Submitting a Bug Report

A good bug report shouldn't leave others needing to chase you up for more
information. Therefore, we ask you to investigate carefully, collect
information, and describe the issue in detail _in your report_. Following the
bug issue template should prompt you for any information we may need, but feel
free to include any information you feel is relevant to the bug.

## References

### Commits

| ✅ Good                                                               | ❌ Bad           |
| :-------------------------------------------------------------------- | :--------------- |
| Adds in [Cool New Feature Name]                                       | YOOOOOO          |
| fix: Stops a bug on challenge pages causing tests to fail incorrectly | fixing the thing |
| Updates caching strategy to revalidate based on hash key              | Trust me bro     |
