**PROJECT TITLE **
    BEAUNIX - Full Stack E-Commerce App
*DESCRIPTION*
    BEAUNIX is a full-stack e-commerce platform featuring a Customer and Admin Portal with role-based authentication, product/order/customer management, custom branding, and a premium user interface.

🎬 Demo Video (Watch the working demo of the customer portal, Admin Portal and Backend in action):
🔗https://drive.google.com/file/d/1hwnjndLA4e19DiIi3Z4YFCZPOi5AmP1n/view?usp=drive_link

💻 Full Source Code (Drive Link)
   You can download or view the complete source code (Admin Portal + Backend + Customer Portal):
🔗https://drive.google.com/drive/folders/1v9qw1pTvxoV0oygOLo7rhrbKksO2QdZS?usp=drive_link


*FEATURES*
    - JWT Authentication (Login/Register)
    - Role-Based Access Control (Admin vs Customer)
    - Product Filtering, Sorting, and Pagination
    - Admin CRUD for Products, Orders, Customers
    - Order Tracking & Impersonation Feature
    - Custom Branding System
*TECH STACK*
    MEN Stack: MongoDB – Express – Node.js (with Vanilla JS frontend)
    Frontend: HTML, CSS, JavaScript(Vanilla)  
    Backend: Node.js, Express.js, MongoDB, Mongoose  
    Auth: JWT, bcryptjs  
    Deployment: github
*FOLDER STRUCTURE*
BEAUNIXPROJECT/
│
├── controllers/                 
│   ├── authController.js
│   ├── customerController.js
│   └── productController.js
│
├── models/                      
│   ├── Order.js
│   ├── Product.js
│   └── User.js
│
├── routes/                      
│   ├── authRoutes.js
│   ├── customerRoutes.js
│   ├── orderRoutes.js
│   ├── productRoutes.js
│   └── uploadRoutes.js
│
├── public/                      
│   ├── img/                     
│   ├── app.js                   
│   ├── main.js                  
│   ├── productAdmin.js          
│   ├── style.css                
│   ├── style1.css               
│   ├── index.html               
│   ├── login.html               
│   ├── dashboard.html           
│   ├── customerAdmin.html       
│   ├── product.html             
│   ├── productDetail.html       
│   ├── productAdmin.html        
│   ├── order.html               
│   ├── orderAdmin.html          
│   ├── orderHistory.html        
│   ├── orderSuccess.html        
│   ├── review.html              
│   └── read.html                
│
├── .env                         
├── .gitignore                   
├── package.json                 
├── package-lock.json            
├── README.md                    
└── server.js                    




*INSTALLATION INSTRUCTIONS*
  # Clone the repo
  git clone- https://github.com/Varshinijaya/Beaunixproject.git
  cd BEAUNIXPROJECT

  # Install backend dependencies
  npm install express
  node server.js
  
  #RUN ON 
  http://localhost:5000
    

*ENVIRONMENT VARIABLES*
  # For Backend (.env)
  PORT=5000
  MONGO_URI=mongodb://localhost:27017/beaunix
  JWT_SECRET=your_jwt_secret
  

*CONTRIBUTIONS*
  Contributions are welcome! Please open an issue or submit a pull request.
*LICENSE*
  MIT License
*AUTHOR*
  Made with by JAYAVARSHINI RAMESH (https://github.com/Varshinijaya)
