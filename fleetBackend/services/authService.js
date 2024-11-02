const { UniqueConstraintError } = require('sequelize');
const Driver = require('../models/driverModel');
const { Op } = require('sequelize');
const MainUsers = require('../models/mainUserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class AuthService {
  async getAllDrivers() {
    return await Driver.findAll();
  }

  async getDriverById(id) {
    const driver = await Driver.findByPk(id);
    if (!driver) {
      throw new Error('Driver not found');
    }
    return driver;
  }

  async login(data,res) {
    try {
            const { username, password } =data;
          
            // Check if user exists
            const user =await MainUsers.findOne({ where: { user_name: username } })
            if (!user) {
              throw new Error('Invalid credentials');
            }
          
            // Check if the password matches
            const passwordIsValid = bcrypt.compareSync(password, user.password);
            if (!passwordIsValid) {
              throw new Error('Invalid credentials');
            }
            // Generate JWT token
            const token = jwt.sign({ id: user.id, username: user.user_name,role:user.role }, process.env.JWT_SECRET, {
              expiresIn: process.env.JWT_EXPIRES_IN,
            });
          
            // Return token
            return {
              message: 'Login successful',
              token,
              user:user.id
            };
      } catch (error) {
        if (error instanceof UniqueConstraintError) {
          // Handle unique constraint error
          const duplicateField = error.errors[0].path; // This will tell you which field is duplicated
          throw new Error(`${duplicateField} already exists.`);
        }
        throw error;
      }
  }

  async updateDriver(id, updateData) {
    try {
        // Fetch the current driver to ensure the driver exists
        const driver = await Driver.findByPk(id);
        if (!driver) {
        throw new Error('Driver not found');
        }

        // Check if phoneNumber already exists for another user (excluding current driver)
        if (updateData.phoneNumber) {
        const existingPhoneNumber = await Driver.findOne({
            where: {
            phoneNumber: updateData.phoneNumber,
            id: { [Op.ne]: id } // Exclude the current driver
            }
        });
        if (existingPhoneNumber) {
            throw new Error('Phone number already exists');
        }
        }

        // Check if licenseNumber already exists for another user (excluding current driver)
        if (updateData.licenseNumber) {
        const existingLicenseNumber = await Driver.findOne({
            where: {
            licenseNumber: updateData.licenseNumber,
            id: { [Op.ne]: id }             }
        });
        if (existingLicenseNumber) {
            throw new Error('License number already exists');
        }
        
        }

        // Update the driver with the new data
        await driver.update(updateData);
        return driver;
    } catch (error) {console.log(3)
        if (error instanceof UniqueConstraintError) {
        // Handle unique constraint error
        const duplicateField = error.errors[0].path; // This will tell you which field is duplicated
        throw new Error(`${duplicateField} already exists.`);
        }
        throw error;
    }
  }

  async deleteDriver(id) {
    const driver = await Driver.findByPk(id);
    if (!driver) {
      throw new Error('Driver not found');
    }
    await driver.destroy();
    return { message: 'Driver deleted successfully' };
  }
}

module.exports = new AuthService();
