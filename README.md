# Project
# FashionConnect App

- ### User Roles:

    - <b>Fashion Enthusiast
    - Busy Professional
    - Fashion Influencer/Blogger
    - Brand Loyalist
    - Fashion Conscious Shopper
    - Fashion Gift Shopper</b>

-   ### User Personas:
    - <b>Fashion Enthusiast</b>

        - Demographics: Age range 18-35, both genders.
        - Characteristics: Keeps up with fashion trends, enjoys exploring different styles, seeks convenience in shopping.
        - Goals: Discover new fashion brands, stay updated on the latest trends, easily browse and shop for fashionable items.
          
    - <b> Busy Professional</b>
    
        - Demographics: Age range 25-45, both genders.
        - Characteristics: Limited time for shopping, values efficiency and convenience.
        - Goals: Find and store fashion items quickly, access a wide range of brands in one place easily.
          
    - <b>Fashion Influencer/Blogger</b>
    
        - Demographics: Age range 20-35, both genders.
        - Characteristics: Actively promotes fashion on social media platforms, seeks unique and trendy items.
        - Goals: Explore new brands and styles, access exclusive offers, share fashion finds with followers.

    - <b> Brand Loyalist</b>
    
        - Demographics: Age range 18-40, both genders.
        - Characteristics: Shows loyalty to specific fashion brands, prefers personalized shopping experiences.
        - Goals: Easily access and save items from favorite brands, receive personalized recommendations and offers.

    - <b> Fashion Conscious Shopper</b>
    
        - Demographics: Age range 18-40, both genders.
        - Characteristics: Values sustainability and ethical practices in fashion, seeks information on brand values.
        - Goals: Discover and support eco-friendly and ethical fashion brands, access information on sustainability practices.

    - <b>Fashion Gift Shopper</b>
    
        - Demographics: Age range 25-55, both genders.
        - Characteristics: Buys fashion items as gifts for others, prefers a wide variety of options.
        - Goals: Find diverse fashion items suitable for gifting, easily browse and compare gift options.
          
-   ### User Stories:

    ### Shopping/Browsing
    
    - As a user, I should be able to browse products for a given brand.
    - As a user, I should be able to search for a given product of a given brand.
    - As a user, I should be able to view detailed product information including descriptions, images, and customer reviews.
    
    ### Account Management
    
    - As a user, I should be able to create an account with a username and password.
    - As a user, I should be able to manage my account/profile, including changing password, editing first name, last name, etc.
    - As a user, I should be able to see my saved collections and make changes as necessary.
    - As a user, I should be able to reset my password in case I forget it.
    - As a user, I should be able to view and edit my shipping and billing information.
    
    ### Collections
    
    - As a user, I should be able to add products to my collection.
    - As a user, I should be able to save multiple collections to my account.


    ## Stretch Features

1. **Profile Picture:** Allow users to upload and display their profile picture for a more personalized profile.

2. **Social Media Integration / Cross-Platform Sharing:** Implement social media sharing functionality, allowing users to share their favorite products or collections on platforms like Instagram, Facebook, or Twitter.


- ## Categories
    - Women's Clothing
    - Men's Clothing
    - Shoes

- ## API Endpoints

    - User Registration and Authentication
    - Candidate Endpoint
    - Price Tracking Endpoint

- # Navigation
    - ## Home/Explore
        - This screen displays featured fashion brands, trending products, and personalized recommendations.
    
    - ## Search
        - Users will be able to search for specific products by name or fashion brand
    
    - ## Brand/Product Lists
        - This Screen will show a list of fashion brands and products based on user search  or category selection.
    
    - ## Product Detail
        - This screen will provide detailed information about a specific fashion product, including images, descriptions, pricing and customer reviews
    
    - ## User Profile
        - This screen will allow users to manage their account settings and view saved collections.
    
    - ## Collection
        - This screen will display a collection of saved fashion items, allowing users to organize and access them easily

- ### Data Model

    - ## USER
        - Username
        - Password
        - First_Name
        - Last_Name
        - Email
        - SavedCollections
    
    - ## CATEGORY
        - CatergoryID
        - Name
        - Image_Url
    
    - ## PRODUCT
        - ProductID
        - Created_at
        - Modified_at
        - Name
        - Description
        - Price
        - Image_URL
        - CategoryID
        - BrandID
        - ReviewID
    
   - ## REVIEWS
        - ReviewID
        - Created_at
        - Modified_at
        - Text
        - Score
        - ProductID
    
    - ## COLLECTION
        - CollectionID
        - Created_at
        - Modified_at
        - Name
        - Description
        - UserID
        - ProductID


- ### API Routes

    - ## GET/products
        - Retrieves a list of fashion products
    
    - ## GET/products/{ProductD}
        - Retrieves detailed information about a specific fashion product
    
    - ## POST/users
        - Creates a new user account
    
    - ## GET/users/{UserID}
        - Retrieves information about a specific user
    
    - ## POST/collections
        - Creates a new collection for a user
    
   - ## GET/collections/{CollectionID}
        - Retrieves information about a specific collection
    
   - ## POST/collections/{CollectionID}
        - Adds a product to a user’s collection
    
   - ## GET/collections/{CollectionID}/products
        - Retrieves a list of products in a user’s collection

### MILESTONES

## MILESTONE 1
- [x] User can login
- [x] User can create an account
- [x] User passwords are encrypted in the database for security

## MILESTONE 2
- [x] User can browse products for a given brand
- [ ] User can view detailed product information including descriptions, images, reviews

## MILESTONE 3
- [ ] User can create/edit/delete collections
- [ ] User can save multiple collections
- [x] User can view a page of clothing products
- [ ] User can view similar products and compare their prices
- [x] Users can successfully login into their accounts.
- [ ] User can access their collections on multiple devices

## STRETCH
- [ ] User can share their collection to social media platforms like Twitter and Facebook
- [ ] User can upload and display their profile picture for a personalized profile view
- [ ] User can add the app as a Chrome plugin (extension)





## WIREFRAME
![image](https://github.com/folusho-adeyemi/CapStone_Project/assets/98936202/e802dd3e-319a-44b9-979b-b08e51eb908f)

## Progress
# Milestone  1
<a href="https://www.loom.com/share/f62f6752fed94fd5ae44926bf6ddad0e">
    <p>FashionConnect - 11 July 2023 - Watch Video</p>
    <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/f62f6752fed94fd5ae44926bf6ddad0e-with-play.gif">
  </a>

<div style="position: relative; padding-bottom: 62.5%; height: 0;"><iframe src="https://www.loom.com/embed/f62f6752fed94fd5ae44926bf6ddad0e?sid=4dd93bd8-36d0-46c0-bde8-5be4f363f36c" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

