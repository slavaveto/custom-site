# Set up:

# 1. Register at https://www.mongodb.com/ to create database

    # Store your key in the environment variable DATABASE_URL

# 2. Register at https://www.emailjs.com/ to set up service for sending email

    # Store the following keys in environment variables:
    # NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    # NEXT_PUBLIC_EMAILJS_YOUR_SERVICE_ID
    # NEXT_PUBLIC_EMAILJS_YOUR_TEMPLATE_ID


# 3. Run in terminal: npx prisma generate -> to generate collections in the database

# 4. Update create-documents.js file - to the data that you want to have in the database

# 5. run: npm run create-documents --> to push the data from create-documents.js file to the database (npm run clear-documents will emppty the db if needed)