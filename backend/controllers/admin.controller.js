import mongoose from "mongoose";
import Listing from "../models/PropertiesModel/createprops.js";
import User from "../models/User.js";
import Seller from "../models/Seller.js";

// ✅ Get all pending listings for admin review
const getPendingListings = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const pendingListings = await Listing.find({ status: 'pending' })
      .populate('userReference', 'username email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalPending = await Listing.countDocuments({ status: 'pending' });

    res.status(200).json({
      message: 'Pending listings retrieved successfully',
      data: {
        listings: pendingListings,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalPending / limit),
          totalListings: totalPending,
          hasNext: page * limit < totalPending,
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Error fetching pending listings:', error);
    res.status(500).json({
      message: 'Failed to fetch pending listings',
      error: 'SERVER_ERROR'
    });
  }
};

// ✅ Get all listings with status filter
const getAllListingsAdmin = async (req, res) => {
  try {
    const { status, page = 1, limit = 10, propertyType } = req.query;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};
    if (status && ['pending', 'approved', 'rejected'].includes(status)) {
      filter.status = status;
    }
    if (propertyType) {
      filter.propertyType = propertyType;
    }

    const listings = await Listing.find(filter)
      .populate('userReference', 'username email role')
      .populate('adminReview.reviewedBy', 'username email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalListings = await Listing.countDocuments(filter);

    res.status(200).json({
      message: 'Listings retrieved successfully',
      data: {
        listings,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalListings / limit),
          totalListings,
          hasNext: page * limit < totalListings,
          hasPrev: page > 1
        },
        filter: { status, propertyType }
      }
    });
  } catch (error) {
    console.error('Error fetching listings:', error);
    res.status(500).json({
      message: 'Failed to fetch listings',
      error: 'SERVER_ERROR'
    });
  }
};

// ✅ Approve a listing
const approveListing = async (req, res) => {
  try {
    const { listingId } = req.params;
    const { adminNotes } = req.body;
    const adminId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(listingId)) {
      return res.status(400).json({
        message: 'Invalid listing ID',
        error: 'INVALID_ID'
      });
    }

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({
        message: 'Listing not found',
        error: 'NOT_FOUND'
      });
    }

    if (listing.status !== 'pending') {
      return res.status(400).json({
        message: `Listing is already ${listing.status}. Only pending listings can be approved.`,
        error: 'INVALID_STATUS'
      });
    }

    // Update listing status
    listing.status = 'approved';
    listing.isPublished = true;
    listing.adminReview.reviewedBy = adminId;
    listing.adminReview.reviewedAt = new Date();
    listing.adminReview.adminNotes = adminNotes || '';
    listing.adminReview.rejectionReason = null; // Clear any previous rejection reason

    await listing.save();

    // Populate admin details for response
    await listing.populate('adminReview.reviewedBy', 'username email');

    res.status(200).json({
      message: 'Listing approved successfully',
      data: listing
    });
  } catch (error) {
    console.error('Error approving listing:', error);
    res.status(500).json({
      message: 'Failed to approve listing',
      error: 'SERVER_ERROR'
    });
  }
};

// ✅ Reject a listing
const rejectListing = async (req, res) => {
  try {
    const { listingId } = req.params;
    const { rejectionReason, adminNotes } = req.body;
    const adminId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(listingId)) {
      return res.status(400).json({
        message: 'Invalid listing ID',
        error: 'INVALID_ID'
      });
    }

    if (!rejectionReason || rejectionReason.trim() === '') {
      return res.status(400).json({
        message: 'Rejection reason is required',
        error: 'MISSING_REJECTION_REASON'
      });
    }

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({
        message: 'Listing not found',
        error: 'NOT_FOUND'
      });
    }

    if (listing.status !== 'pending') {
      return res.status(400).json({
        message: `Listing is already ${listing.status}. Only pending listings can be rejected.`,
        error: 'INVALID_STATUS'
      });
    }

    // Update listing status
    listing.status = 'rejected';
    listing.isPublished = false;
    listing.adminReview.reviewedBy = adminId;
    listing.adminReview.reviewedAt = new Date();
    listing.adminReview.rejectionReason = rejectionReason.trim();
    listing.adminReview.adminNotes = adminNotes || '';

    await listing.save();

    // Populate admin details for response
    await listing.populate('adminReview.reviewedBy', 'username email');

    res.status(200).json({
      message: 'Listing rejected successfully',
      data: listing
    });
  } catch (error) {
    console.error('Error rejecting listing:', error);
    res.status(500).json({
      message: 'Failed to reject listing',
      error: 'SERVER_ERROR'
    });
  }
};

// ✅ Get admin analytics dashboard data
const getAnalytics = async (req, res) => {
  try {
    // Get listing statistics
    const listingStats = await Listing.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get property type distribution
    const propertyTypeStats = await Listing.aggregate([
      {
        $match: { status: 'approved' } // Only approved listings
      },
      {
        $group: {
          _id: '$propertyType',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get user role statistics
    const userStats = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentActivity = await Listing.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            date: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt"
              }
            },
            status: "$status"
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.date": 1 }
      }
    ]);

    // Get top sellers by listing count
    const topSellers = await Listing.aggregate([
      {
        $match: { status: 'approved' }
      },
      {
        $group: {
          _id: '$userReference',
          listingCount: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $sort: { listingCount: -1 }
      },
      {
        $limit: 10
      },
      {
        $project: {
          username: '$user.username',
          email: '$user.email',
          listingCount: 1
        }
      }
    ]);

    // Format the data for frontend
    const analytics = {
      overview: {
        totalListings: await Listing.countDocuments(),
        pendingListings: await Listing.countDocuments({ status: 'pending' }),
        approvedListings: await Listing.countDocuments({ status: 'approved' }),
        rejectedListings: await Listing.countDocuments({ status: 'rejected' }),
        totalUsers: await User.countDocuments(),
        totalSellers: await User.countDocuments({ role: 'seller' }),
        totalBuyers: await User.countDocuments({ role: 'buyer' }),
        publishedListings: await Listing.countDocuments({ isPublished: true })
      },
      charts: {
        listingsByStatus: listingStats.map(stat => ({
          status: stat._id,
          count: stat.count
        })),
        propertyTypeDistribution: propertyTypeStats.map(stat => ({
          type: stat._id,
          count: stat.count
        })),
        usersByRole: userStats.map(stat => ({
          role: stat._id,
          count: stat.count
        })),
        recentActivity: recentActivity,
        topSellers: topSellers
      }
    };

    res.status(200).json({
      message: 'Analytics retrieved successfully',
      data: analytics
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({
      message: 'Failed to fetch analytics',
      error: 'SERVER_ERROR'
    });
  }
};

// ✅ Get single listing details for admin review
const getListingForReview = async (req, res) => {
  try {
    const { listingId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(listingId)) {
      return res.status(400).json({
        message: 'Invalid listing ID',
        error: 'INVALID_ID'
      });
    }

    const listing = await Listing.findById(listingId)
      .populate('userReference', 'username email role')
      .populate('adminReview.reviewedBy', 'username email');

    if (!listing) {
      return res.status(404).json({
        message: 'Listing not found',
        error: 'NOT_FOUND'
      });
    }

    res.status(200).json({
      message: 'Listing details retrieved successfully',
      data: listing
    });
  } catch (error) {
    console.error('Error fetching listing details:', error);
    res.status(500).json({
      message: 'Failed to fetch listing details',
      error: 'SERVER_ERROR'
    });
  }
};

export {
  getPendingListings,
  getAllListingsAdmin,
  approveListing,
  rejectListing,
  getAnalytics,
  getListingForReview
};