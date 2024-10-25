const { UniqueConstraintError } = require('sequelize');
const MainUsers = require('../models/mainUserModel');

const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const Fleet = require('../models/fleetModel');
const Shop = require('../models/shopModel');

class ShopService {
  async getAllShops(limit,page) {
    try {
        // Calculate offset
        const offset = (page - 1) * limit;
    
        // Fetch fleets with pagination
        const shops = await Shop.findAll({
        limit: limit,
        offset: offset,
        });
    
        // Get the total count of fleets for pagination info
        const totalShops = await Shop.count();
    
        // Fetch associated users for the fetched fleets
        const shopWithUsernames = await Promise.all(
        shops.map(async (shop) => {
            const user = await MainUsers.findOne({
            where: { shop_id: shop.id },
            });
    
            return {
            ...shop.dataValues,
            username: user ? user.user_name : null,
            };
        })
        );
    
        // Calculate total pages
        const totalPages = Math.ceil(totalShops / limit);
    
        return {
        total: totalShops,
        totalPages: totalPages,
        currentPage: page,
        data: shopWithUsernames,
        };
    } catch (error) {
        console.error('Error fetching shops with usernames:', error);
        throw error;
    }  
}

  async getShopById(id) {
    try{
        const shops = await Shop.findByPk(id, {
            include: [
                { model: Fleet, as: 'fleet' },  
            ]
        });
        if (!shops) {
        throw new Error('Shop not found');
        }
        // Step 2: Fetch the user_name from MainUsers using the shop_id
        const mainUser = await MainUsers.findOne({
            where: { shop_id: id },
            attributes: ['user_name']  // Fetch only the user_name field
        });

        // Step 3: Combine the shop data with the user_name
        const result = {
            ...shops.get(),  // Get shop data
            user_name: mainUser ? mainUser.user_name : null  // Add user_name if found, otherwise null
        };

        return result;
    } catch (error) {
        console.error('Error fetching shops with usernames:', error);
        throw error;
    }  
  }

  async createShop(shopData,createdUser) {
    try {
         const ExistingUsername = await MainUsers.findOne({
            where: {
            user_name: shopData.username
            }
        });
        if (ExistingUsername) {
            throw new Error('Username already exists');
        }
        const shopDatam ={
            name:shopData.name,
            address:shopData.address,
            warehouse_address:shopData.warehouse_address,
            fleet_id:shopData.fleet_id,
            createdBy:createdUser
        }
        const shops = await Shop.create(shopDatam);
        if(shops)
            {
                const hashedPassword = await bcrypt.hash(shopData.password, 10);
                const mainUserData ={
                    user_name:shopData.username,
                    password:hashedPassword,
                    role:'shop',
                    shop_id:shops.id,
                    createdBy:createdUser
                }
                const userData = await MainUsers.create(mainUserData);
            }
        return shops;
      } catch (error) {
        if (error instanceof UniqueConstraintError) {
          // Handle unique constraint error
          const duplicateField = error.errors[0].path; // This will tell you which field is duplicated
          throw new Error(`${duplicateField} already exists.`);
        }
        throw error;
      }
  }

  async updateShop(id, updateData) {
    try {
        // Fetch the current driver to ensure the driver exists
        const shop = await Shop.findByPk(id);
        if (!shop) {
        throw new Error('Shop not found');
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
        await shop.update(updateData);
        const main_users = await MainUsers.findOne({ where: { shop_id: id } });
        await main_users.update({user_name:updateData.username})
        return shop;
    } catch (error) {console.log(3)
        if (error instanceof UniqueConstraintError) {
        // Handle unique constraint error
        const duplicateField = error.errors[0].path; // This will tell you which field is duplicated
        throw new Error(`${duplicateField} already exists.`);
        }
        throw error;
    }
  }

  async deleteShop(id) {
    const shop = await Shop.findByPk(id);
    if (!shop) {
      throw new Error('Shop not found');
    }
    const main_users = await MainUsers.findOne({ where: { shop_id: id } });

    await shop.destroy();
    await main_users.destroy();

    return { message: 'Shop deleted successfully' };
  }
}

module.exports = new ShopService();
