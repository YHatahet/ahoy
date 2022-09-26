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

## **APIs**

<br>

## <u>Auth:</u>

### POST /auth/register
* Description: Create a user.
* Requirement: None
* Parameters: None
* Body: 
    ```
    {
        username: String, Required, Unique
        password: String, Required
        email: String, Required, Unique
    }
    ```
### POST /auth/login
* Description: Logs into an account, and returns a cookie with account info on successful login.
* Requirement: None
* Parameters: None
* Body: 
    ```
    {
        username: String, Required
        password: String, Required
    }
    ```
## <u>Hotels:</u>

### POST /hotels/create
* Description: Creates a hotel entry, owned by the logged in account.
* Requirement: To be logged in
* Parameters: None
* Body: 
    ```
    {
        name: String, Required, Unique
        description: String, Required
        address: String, Required
        city: String, Required
        distanceFromCenter: Number, Required
        featured: Boolean
    }
    ```

### GET /hotels/all/:page/:limit
* Description: Lists all hotels, paginated. Goes to selected page with the given number of results in that page.
* Requirement: None
* Parameters: 
    ```
    page: Number
    limit: Number
    ```
* Body: None

### GET /hotels/:id
* Description: Lists hotel with the selected id and its details, if exists.
* Requirement: None
* Parameters: 
    ```
    id: Object Id
    ```
* Body: None

### GET /hotels/topRated/:amount
* Description: Lists the top rated hotels in descending order, limited by the amount.
* Requirement: None
* Parameters: 
    ```
    amount: Number
    ```
* Body: None

### PUT /hotels/:id
* Description: Updates the hotel details of the selected hotel ID
* Requirement: To be owner of that hotel or Admin
* Parameters: 
    ```
    id : Object Id
    ```
* Body:
    ```
    {
        name: String,
        description: String
        address: String
        city: String
        distanceFromCenter: Number
    }
    ```

### DELETE /hotels/:id
* Description: Deletes the hotel entry of the selected hotel ID
* Requirement: To be owner of that hotel or Admin
* Parameters: 
    ```
    id : Object Id
    ```
* Body: None

<br>

## <u>Reviews:</u>

### POST /reviews/:id
### GET /reviews/all/:page/:limit
### GET /reviews/:id
### GET /reviews/hotel/:id
### PUT /reviews/:id
### DELETE /reviews/:id

<br>

## <u>Rooms:</u>

### POST /rooms/create/:id
### POST /rooms/book/:id
### GET /rooms/all/:page/:limit
### GET /rooms/:id
### GET /rooms/hotel/:id
### PUT /rooms/:id
### DELETE /rooms/:id
<br>

## <u>Users:</u>

### GET /users/all/:page/:limit
### GET /users/:id
### PUT /users/:id
### DELETE /users/:id

<br>
<br>

## **Testing APIs**

<br>

I have created a collection with all the APIs needed to test the server. These API's can be found in the following Postman collection. 

<br>
  
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/16ef0189fd6e2a25765d)