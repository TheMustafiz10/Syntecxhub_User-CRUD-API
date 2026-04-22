
import User from '../models/User.js';


export const createUser = async (req, res, next) => {
  try {
    const { email, password, name, age, role, phoneNumber, address } = req.body;

    if (age !== undefined && Number(age) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Age must be greater than 0'
      });
    }
    

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists'
      });
    }
    

    const user = await User.create({
      name,
      email,
      password,
      age,
      role,
      phoneNumber,
      address
    });
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};


export const getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    

    const filter = {};
    if (req.query.role) filter.role = req.query.role;
    if (req.query.isActive) filter.isActive = req.query.isActive === 'true';
    if (req.query.minAge) filter.age = { $gte: parseInt(req.query.minAge) };
    if (req.query.maxAge) filter.age = { ...filter.age, $lte: parseInt(req.query.maxAge) };
    

    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    
    const users = await User.find(filter)
      .select('-password')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    
    const total = await User.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};


export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};



export const updateUser = async (req, res, next) => {
  try {
    const { password, ...updateData } = req.body;

    if (updateData.age !== undefined && Number(updateData.age) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Age must be greater than 0'
      });
    }
    
    if (updateData.email) {
      const existingUser = await User.findOne({ 
        email: updateData.email, 
        _id: { $ne: req.params.id } 
      });
      
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'Email already in use by another user'
        });
      }
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};


export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: {
        id: req.params.id,
        deletedUser: {
          name: user.name,
          email: user.email
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
