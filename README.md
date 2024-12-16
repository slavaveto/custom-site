# Set up:

# Clone repository from github

    # type in terminal: git clone https://github.com/AJormand/custom-site.git

# Create .env file in the custom-site root folder

    #Store the following keys:
    DATABASE_URL=

# Create .env.local file in the custom-site root folder

    #Store the following keys:
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
    NEXT_PUBLIC_EMAILJS_YOUR_SERVICE_ID=
    NEXT_PUBLIC_EMAILJS_YOUR_TEMPLATE_ID=

# 1. Register at https://www.mongodb.com/ to create database

    # Store your key in the environment variable DATABASE_URL

# 2. Register at https://www.emailjs.com/ to set up service for sending email

    # Store the following keys in environment variables:
    # NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    # NEXT_PUBLIC_EMAILJS_YOUR_SERVICE_ID
    # NEXT_PUBLIC_EMAILJS_YOUR_TEMPLATE_ID

    # Create Email Template -> e.g.:
        Hello,
        You got a new message from {{name}}:
        Page: {{page}}
        Email: {{email}}
        Email: {{someSelect}}
        Telegram: {{telegram}}
        {{message}}
        Best wishes,
        EmailJS team

# 3. Run in terminal: npx prisma generate -> to generate collections in the database

# 4. Update create-documents.js file - to the data that you want to have in the database

# 5. run: npm run create-documents --> to push the data from create-documents.js file to the database (npm run clear-documents will emppty the db if needed)

# 6. run: npm run dev --> to run the website locally on port: http://localhost:3000/

# 7. deploy website to Vercel

    # dont forget that all the variables in the .env and .env.local need to be stored in the local variables when deploying the website to vercel
