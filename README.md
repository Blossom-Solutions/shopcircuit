# Shop Circuit
Shop Circuit is an E-Commerce Site which handles User Authentications, Cart Management and CheckOut procedures.

## Front-End
The Front-End uses Material-UI components for ease-of-use, streamlined , User Experience. It's made upon ReactJS, and the State is handled By Redux. The XHTML Requests are handled by the Axios Library

## Back-End

The Back-End is built using ExpressJS and Node, which are then sent on request to the API hosted by Firebase's Cloud Functions. User Authorizations are handled by middlewares which make use of JWT and Firebase configurations.
The Users and Products information is handled by FireStore, a NO-SQL database, while the Products photos are located on an Application Bucket provided by Firebase
