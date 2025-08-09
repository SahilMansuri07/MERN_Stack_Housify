# Property Listing Platform - API Documentation

## 🏗️ **System Overview**

This is a complete property listing platform with **admin approval workflow**. All new listings go through admin review before being published on the main website.

## 🔐 **Authentication & Roles**

### **User Roles:**
- `guest` - Default role
- `buyer` - Can browse approved listings
- `seller` - Can create listings (pending approval)
- `admin` - Can approve/reject listings + access analytics

### **Authentication:**
All protected routes require JWT token in Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## 📋 **API Endpoints**

### **🏠 Public Listing Endpoints**

#### `GET /api/listing/`
Get all **approved and published** listings (public)
- **Query params:** `page`, `limit`, `propertyType`, `minPrice`, `maxPrice`, `city`
- **Response:** Only approved listings visible to public

#### `GET /api/listing/:id`
Get single listing details (public)
- **Params:** `id` - Listing ID
- **Response:** Single listing (any status)

---

### **👤 Seller Endpoints**

#### `POST /api/listing/create`
Create new listing (requires seller role)
- **Auth:** Required (seller role)
- **Body:** Form data with images
- **Files:** `images` (max 6 files, 5MB each)
- **Status:** Creates listing with status: `pending`
- **Response:** Success message + pending status info

#### `GET /api/listing/seller/my-listings`
Get seller's own listings with all statuses
- **Auth:** Required (seller role)
- **Query params:** `page`, `limit`, `status`
- **Response:** All seller's listings + status summary

#### `PUT /api/listing/:id`
Update listing (requires seller role)
- **Auth:** Required (seller role)

#### `DELETE /api/listing/:id`
Delete listing (requires seller role)
- **Auth:** Required (seller role)

---

### **👑 Admin Endpoints**

#### `GET /api/admin/analytics`
Get comprehensive analytics dashboard
- **Auth:** Required (admin role)
- **Response:** 
  ```json
  {
    "overview": {
      "totalListings": 150,
      "pendingListings": 12,
      "approvedListings": 120,
      "rejectedListings": 18,
      "totalUsers": 300,
      "totalSellers": 45,
      "totalBuyers": 200
    },
    "charts": {
      "listingsByStatus": [...],
      "propertyTypeDistribution": [...],
      "usersByRole": [...],
      "recentActivity": [...],
      "topSellers": [...]
    }
  }
  ```

#### `GET /api/admin/listings/pending`
Get all pending listings for review
- **Auth:** Required (admin role)
- **Query params:** `page`, `limit`
- **Response:** Paginated pending listings

#### `GET /api/admin/listings`
Get all listings with filters (admin view)
- **Auth:** Required (admin role)
- **Query params:** `status`, `page`, `limit`, `propertyType`
- **Response:** All listings with admin details

#### `GET /api/admin/listings/:listingId`
Get single listing for admin review
- **Auth:** Required (admin role)
- **Response:** Full listing details + admin review history

#### `PUT /api/admin/listings/:listingId/approve`
Approve a pending listing
- **Auth:** Required (admin role)
- **Body:** 
  ```json
  {
    "adminNotes": "Looks good, approved for publication"
  }
  ```
- **Effect:** Sets status to `approved`, `isPublished` to `true`

#### `PUT /api/admin/listings/:listingId/reject`
Reject a pending listing
- **Auth:** Required (admin role)
- **Body:** 
  ```json
  {
    "rejectionReason": "Missing property documents",
    "adminNotes": "Please provide legal documents"
  }
  ```
- **Effect:** Sets status to `rejected`, `isPublished` to `false`

---

## 🗄️ **Database Schema**

### **Listing Model:**
```javascript
{
  title: String (required),
  description: String (required),
  price: Number (required),
  propertyType: String (required),
  images: [String],
  userReference: ObjectId (required),
  
  // Admin Workflow Fields
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  adminReview: {
    reviewedBy: ObjectId,
    reviewedAt: Date,
    rejectionReason: String,
    adminNotes: String
  }
}
```

### **User Model:**
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required),
  role: {
    type: String,
    enum: ['guest', 'seller', 'buyer', 'admin'],
    default: 'guest'
  }
}
```

---

## 🚀 **Setup & Usage**

### **1. Create Admin User:**
```bash
cd backend
npm run create-admin
```

### **2. Start Server:**
```bash
npm run dev
```

### **3. Server URLs:**
- Main API: `http://localhost:3000`
- Images: `http://localhost:3000/uploads/images/`
- Admin Panel: `http://localhost:3000/api/admin/`

---

## 📊 **Workflow Process**

### **Seller Flow:**
1. Seller creates listing → Status: `pending`
2. Listing saved but NOT published
3. Seller can view their listings in dashboard

### **Admin Flow:**
1. Admin sees pending listings
2. Admin reviews listing details
3. Admin approves → Status: `approved`, Published: `true`
4. Admin rejects → Status: `rejected`, Published: `false`

### **Public Flow:**
1. Public sees only approved & published listings
2. Filtering and pagination available

---

## 🔧 **Error Handling**

All endpoints return consistent error format:
```json
{
  "message": "Human readable error message",
  "error": "ERROR_CODE",
  "details": "Additional error details (in development)"
}
```

### **Common Error Codes:**
- `UNAUTHORIZED` - Missing or invalid auth token
- `FORBIDDEN` - Insufficient permissions
- `MISSING_USER_ID` - User ID missing from token
- `INVALID_ID` - Invalid MongoDB ObjectId
- `NOT_FOUND` - Resource not found
- `VALIDATION_ERROR` - Data validation failed
- `FILE_TOO_LARGE` - Image file exceeds 5MB
- `TOO_MANY_FILES` - More than 6 images uploaded

---

## 📈 **Analytics Available**

- **Overview Stats:** Total counts for all entities
- **Status Distribution:** Pending/Approved/Rejected breakdown
- **Property Types:** Distribution of property categories
- **User Roles:** Breakdown by user types
- **Recent Activity:** 30-day activity timeline
- **Top Sellers:** Most active sellers by listing count

---

## 🔒 **Security Features**

- JWT-based authentication
- Role-based access control
- File type validation for uploads
- File size limits (5MB per image)
- Input validation and sanitization
- Protected admin routes
- CORS configuration

---

This system provides a complete admin approval workflow with comprehensive analytics and role-based access control!