# Ahoy

## **First time setup**
<br>

1. `git clone http://github.com/yhatahet/ahoy`
2. Move into the directory and run `npm i`
3. Make a copy of the `example.env` file in the same directory
4. Rename the copied file to `.env`
5. Fill in the port number and url of the mongoDB url. (Contact me to receive a link to a sample db)
6. Generate a secret key required for JWT. To generate a 32-bit base64 encrypted key, open a terminal and run `openssl rand -base64 32`
7. run `npm run dev` or `node .` to start

<br>
<br>

<br>
<br>

## Testing APIs
<br>

## **Testing APIs**

<br>

I have created a collection with all the APIs needed to test the server. These API's can be found in the following Postman collection. 

<br>
  
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/16ef0189fd6e2a25765d)