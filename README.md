# Eshop (FrontEnd)

The project is made with React and uses the API provided by [shop project](https://github.com/tkoleo84119/shop/tree/main).

- **template of:** vite + react
- **tailwindcss:** v3.x

## Live DEMO
Please click [here](https://kerwin-eshop.netlify.app/) to go to DEMO website.

## Feature

- User can create an account with email to buy Eshop website products.
- User can see all product on the website, filter product by category, and search product by title.
- User can click `Add` button to add a product in their cart.
- User can use a test credit card (details are at the bottom of the README) to check out.
- User can see the detail of their order and write the review of the product they bought.
- User can change their information and password in the user Information page.
- Admin can create, update, delete product information in ProductList page.
- Admin can manage all orders(include payment fail) in OrderList page.
- Admin can manage all review in 

## Started
1. Download project to local
```
git clone https://github.com/tkoleo84119/shop-client.git
```
2. Enter project folder
```
cd shop-client
```
3. Install package
```
npm install
```
4. Change API URL(Enter `/src/apis/shopApi.jsx`)
```
baseURL: 'http://localhost:3000/api/v1'
```
5. Download [BackEnd project](https://github.com/tkoleo84119/shop/tree/main) and setting  

## Develop
```
npm run dev
```

## Build
```
npm run build
```

## Test Account
* admin account： admin@example.com  
  admin password： 12345678
* user account： test2@example.com  
  user password： 12345678
* user account： test3@example.com  
  user password： 12345678  

## Test Credit Card
* Card Number: 4242 4242 4242 4242
* CVV Code: 222
* Exp. Date: 5/29

