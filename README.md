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
* Description: Updates the hotel details of the selected hotel ID.
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
* Description: Deletes the hotel entry of the selected hotel ID.
* Requirement: To be owner of that hotel or Admin
* Parameters: 
    ```
    id : Object Id
    ```
* Body: None

<br>

## <u>Reviews:</u>

### POST /reviews/:id
* Description: Leaves a rating and review to the selected hotel ID.
* Requirement: To be logged in
* Parameters: 
    ```
    id : Object Id
    ```
* Body:
    ```
    {
       rating: Number <0 to 5>
       review: String
    }
    ```

### GET /reviews/all/:page/:limit
* Description: Lists all reviews, paginated. Goes to selected page with the given number of results in that page.
* Requirement: None
* Parameters: 
    ````
    page: Number
    limit: Number
    ```
* Body: None

### GET /reviews/:id
* Description: Lists review with the selected id and its details, if exists.
* Requirement: None
* Parameters: 
    ```
    id: Object Id
    ```
* Body: None
### GET /reviews/hotel/:id
* Description: Lists reviews for the hotel with the selected id, if exists.
* Requirement: None
* Parameters: 
    ```
    id: Object Id
    ```
* Body: None
### PUT /reviews/:id
* Description: Updates the review details of the selected review ID.
* Requirement: To be owner of that review or Admin
* Parameters: 
    ```
    id : Object Id
    ```
* Body:
    ```
    {
        rating: Number
        review: String
    }
    ```
### DELETE /reviews/:id
* Description: Deletes the review entry of the selected review ID.
* Requirement: To be owner of that review or Admin
* Parameters: 
    ```
    id : Object Id
    ```
* Body: None
<br>

## <u>Rooms:</u>

### POST /rooms/create/:id
* Description: Creates a room entry inside the hotel with the selected id.
* Requirement: To be owner of the hotel or Admin
* Parameters:  
    ```
    id: Object Id
    ```
* Body: 
    ```
    {
        title: String, Required, Unique
        description: String, Required
        maxTenants: Number, Required
        pricePerNight: Number, Required
        rooms: [
            {
                number: Number, required
            },
        ]
    }
    ```

### GET /rooms/all/:page/:limit
* Description: Lists all rooms, paginated. Goes to selected page with the given number of results in that page.
* Requirement: None
* Parameters: 
    ```
    page: Number
    limit: Number
    ```
* Body: None
### GET /rooms/:id
* Description: Lists room with the selected id and its details, if exists.
* Requirement: None
* Parameters: 
    ```
    id: Object Id
    ```
* Body: None
### GET /rooms/hotel/:id
* Description: Lists rooms inside the selected hotel ID, if they exist.
* Requirement: None
* Parameters: 
    ```
    id: Object Id
    ```
* Body: None
### PUT /rooms/:id
* Description: Updates room with the selected room ID, if it exists.
* Requirement: To be owner of the hotel where the room is or Admin
* Parameters: 
    ```
    id: Object Id
    ```
* Body:
    ```
    {
        title: String
        description: String
        maxTenants: Number
        pricePerNight: Number
    }
    ```
### POST /rooms/book/:id
* Description: Book a room with the selected room id
* Requirement: To be logged in
* Parameters: 
    ```
    id: Object Id
    ```
* Body:
    ```
    { 
        roomNumber: Number
        startDate: Stringified Date - "YYYY-MM-DD"
        endDate: Stringified Date - "YYYY-MM-DD"
        numOfTenants: Number
    }
    ```
### DELETE /rooms/:id
* Description: Deletes the room entry of the selected room ID.
* Requirement: To be owner of that hotel or Admin
* Parameters: 
    ```
    id : Object Id
    ```
* Body: None

<br>

## <u>Users:</u>

### GET /users/all/:page/:limit
* Description: Lists all user and their details, paginated. Goes to selected page with the given number of results in that page.
* Requirement: To be an Admin
* Parameters: 
    ```
    page: Number
    limit: Number
    ```
* Body: None
### GET /users/:id
* Description: Lists user with the selected id and its details, if exists.
* Requirement: To be owner of that account or Admin
* Parameters: 
    ```
    id: Object Id
    ```
* Body: None
### PUT /users/:id
* Description: Updates the user's details of the selected user ID.
* Requirement: To be owner of that user account or Admin
* Parameters: 
    ```
    id : Object Id
    ```
* Body:
    ```
    {
        username: String, Unique
        email: String, Unique
        password: String
    }
    ```

    
### DELETE /users/:id
* Description: Deletes the account of the selected user ID.
* Requirement: To be owner of that user acount or Admin
* Parameters: 
    ```
    id : Object Id
    ```
* Body: None

<br>
<br>

## **Testing APIs**

<br>

I have created a collection with all the APIs needed to test the server. These API's can be found in the following Postman collection. 

<br>
  
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/16ef0189fd6e2a25765d)