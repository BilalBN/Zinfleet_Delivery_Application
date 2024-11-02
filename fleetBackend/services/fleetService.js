const { UniqueConstraintError } = require('sequelize');
const MainUsers = require('../models/mainUserModel');
const bcrypt = require('bcrypt');

const { Op } = require('sequelize');
const Fleet = require('../models/fleetModel');
const Shop = require('../models/shopModel');
const Driver = require('../models/driverModel');

class FleetService {
    async getAllFleets(limit, page) {
        try {
          // Determine if pagination is needed
          const shouldPaginate = limit && page;
      
          // Calculate offset only if pagination parameters are provided
          const offset = shouldPaginate ? (page - 1) * limit : undefined;
      
          // Fetch fleets with or without pagination
          const fleets = await Fleet.findAll({
            limit: shouldPaginate ? limit : undefined,
            offset: offset,
          });
      
          // Get the total count of fleets for pagination info
          const totalFleets = await Fleet.count();
      
          // Fetch associated users for the fetched fleets
          const fleetsWithUsernames = await Promise.all(
            fleets.map(async (fleet) => {
              const user = await MainUsers.findOne({
                where: { fleet_id: fleet.id },
              }); 
              const totalShops = await Shop.findAndCountAll({where:{fleet_id:fleet.id}})
              const totalDrivers = await Driver.findAndCountAll({where:{fleet_id:fleet.id}})

              return {
                ...fleet.dataValues,
                username: user ? user.user_name : null,
                total_shops:totalShops.count,
                total_drivers:totalDrivers.count
              };
            })
          );
      
          // Calculate total pages only if pagination parameters are provided
          const totalPages = shouldPaginate ? Math.ceil(totalFleets / limit) : 1;
      
          return {
            total: totalFleets,
            totalPages: totalPages,
            currentPage: page || 1,
            data: fleetsWithUsernames,
          };
        } catch (error) {
          console.error('Error fetching fleets with usernames:', error);
          throw error;
        }
      }
      
      
    async getFleetsById(id) {
        try{
            console.log(id,'koko')

            const fleets = await Fleet.findByPk(7);
            console.log(fleets)
            if (!fleets) {
            throw new Error('Fleets not found');
            }
            // Step 2: Fetch the user_name from MainUsers using the shop_id
            const mainUser = await MainUsers.findOne({
                where: { fleet_id: id },
                attributes: ['user_name']  // Fetch only the user_name field
            });

            // Step 3: Combine the shop data with the user_name
            const result = {
                ...fleets.get(),  // Get shop data
                user_name: mainUser ? mainUser.user_name : null  // Add user_name if found, otherwise null
            };

            return result;
        } catch (error) {
            console.error('Error fetching fleets with usernames:', error);
            throw error;
        }  
    }
    
  async createFleet(fleetData,createdUser) {
    try {
        const existingPhoneNumber = await Fleet.findOne({
            where: {
            phoneNumber: fleetData.phoneNumber,
            }
        });
        if (existingPhoneNumber) {
            throw new Error('Phone number already exists');
        }
        

        const existingEmail = await Fleet.findOne({
            where: {
            email: fleetData.email
            }
        });
        if (existingEmail) {
            throw new Error('Email already exists');
        }

        const ExistingUsername = await MainUsers.findOne({
            where: {
            user_name: fleetData.username
            }
        });
        if (ExistingUsername) {
            throw new Error('Username already exists');
        }
        const fleetDatam ={
            name:fleetData.name,
            address:fleetData.address,
            email:fleetData.email,
            phoneNumber:fleetData.phoneNumber,
            createdBy:createdUser
        }
        const fleet = await Fleet.create(fleetDatam);
        if(fleet)
            {
                const hashedPassword = await bcrypt.hash(fleetData.password, 10);
                const mainUserData ={
                    user_name:fleetData.username,
                    password:hashedPassword,
                    role:'fleet',
                    fleet_id:fleet.id,
                    createdBy:createdUser
                }
                const userData = await MainUsers.create(mainUserData);
            }
        return fleet;
      } catch (error) {
        if (error instanceof UniqueConstraintError) {
          // Handle unique constraint error
          const duplicateField = error.errors[0].path; // This will tell you which field is duplicated
          throw new Error(`${duplicateField} already exists.`);
        }
        throw error;
      }
  }

  async updateFleet(id, updateData) {
    try {
        // Fetch the current driver to ensure the driver exists
        const fleet = await Fleet.findByPk(id);
        if (!fleet) {
        throw new Error('Fleet not found');
        }

        // Check if phoneNumber already exists for another user (excluding current driver)
        if (updateData.phoneNumber) {
        const existingPhoneNumber = await Fleet.findOne({
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
        if (updateData.email) {
        const existingEmail = await Fleet.findOne({
            where: {
            email: updateData.email,
            id: { [Op.ne]: id }             }
        });
        if (existingEmail ) {
            throw new Error('Email already exists');
        }
        
        }
        // Check if phoneNumber already exists for another user (excluding current driver)
        if (updateData.username) {
            const existingUsername = await MainUsers.findOne({
                where: {
                user_name: updateData.username,
                fleet_id: { [Op.ne]: id } // Exclude the current driver
                }
            });
            if (existingUsername) {
                throw new Error('Username already exists');
            }
            }
        // Update the driver with the new data
        await fleet.update(updateData);
        const main_users = await MainUsers.findOne({ where: { fleet_id: id } });
        await main_users.update({user_name:updateData.username})

        return fleet;
    } catch (error) {console.log(3,'ppppp')
        if (error instanceof UniqueConstraintError) {
        // Handle unique constraint error
        const duplicateField = error.errors[0].path; // This will tell you which field is duplicated
        throw new Error(`${duplicateField} already exists.`);
        }
        throw error;
    }
  }

  async deleteFleet(id) {
    const fleet = await Fleet.findByPk(id);
    if (!fleet) {
      throw new Error('Fleet not found');
    }
    const main_users = await MainUsers.findOne({ where: { fleet_id: id } });

    await fleet.destroy();
    await main_users.destroy();

    return { message: 'Fleet deleted successfully' };
  }
}

module.exports = new FleetService();
