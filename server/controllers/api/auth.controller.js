// const { Auth } = require("../../models/Auth");
// const { UserRole } = require("../../models/UserRole");
// const { LoginUserInfo } = require("../../models/LoginUserInfo");
// const { Role } = require("../../models/Role");
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// var moment = require('moment');

// New User Register module
async function register(req, res) {
 
    try{
        const {first_name, last_name, email, password , contact_no, emp_code, role } = req.body;
        // return res.json(req.body)
        let hashPassword = await bcrypt.hash(password, 5);

    // Create User
        let user = await Auth.create({
            first_name: first_name,
            last_name : last_name,
            email     : email,
            password  : hashPassword,
            contact_no: contact_no,
            emp_code  : emp_code
         });

        if(role) {
            let userRole = await UserRole.create({
                user_id : user.id,
                role_id : role
            })
        }
        // Send Success Response
        return res.status(200).json({
            status:true,
            message:"User Register Successfully!",
            user:user
        });

    }catch(error) {
        // Send error response
        return res.status(500).json({
            status:false,
            message:`Fail user:- ${error}`
        })
    }
    
}

// User Login
async function login(req, res) {
   try {
    const { emp_code, password } = req.body;
    
    //Employee Code and Password is required
    if (!emp_code || !password) {
        throw new Error("Employee Code & Password is required");
      }

    // Find user is exist
    const user = await Auth.findOne({
     where: {
       emp_code: req.body.emp_code,
      } 
    });
    
    // When user is not exist
    if(!user) {
      throw new Error("Employee code not exists for this user");
    }
 
    //Matched Password
    let matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new Error("You have entered wrong Password ");
    }

   // check This user already login or not
   let loginUserInfo = await LoginUserInfo.findOne({
     where: { user_id: `${user.id}` } 
    });

    let date = moment().format()
    // ADD 30 Minutes More
    date = moment(date).add({minutes: 30})

    //  MAKE OBJECT FOR PASS JWT TOKEN
    let payload = {
        user_id:user.id,
        user_mail: user.email,
        emp_code: user.emp_code,
        time: date
    }

    // CREATE TOKEN
    let token = jwt.sign( payload , 'secret', { expiresIn: '1h' });


    // if loginuserinfo not found then create loginUserInformation
    if(!loginUserInfo) {
        let userLoginInfo = await LoginUserInfo.create({
            user_id : user.id,
            user_name : user.first_name +' '+ user.last_name,
            token    : token,
            expire_date : date
        });
    }else{
        await LoginUserInfo.update({
                     expire_date : date,
                     token: token
                   }, {
                 where: { id: loginUserInfo.id },
               })
      }

    //Send Success respose
    return res.status(200).json({
        status:true,
        message:"Logged In",
        tokenKey: token
    });
   }catch(error) {
    return res.status(401).json({
        status: false,
        message: error.message,
    });
   }



}

// Update User
 async function update(req, res) {
    // return res.json(req.body)
    const { first_name }= req.body;
    let user_id = req.params.user_id;
    try {
        //Check user login ?
        let userLogin = await LoginUserInfo.findOne({
            where: { user_id: `${user_id}` }
        });
        
        if (!userLogin) {
            throw new Error("LoggIn Token expired ");
          }

          let updateUser = await Auth.update({ first_name: first_name}, {
            where:{
                id:user_id
            }
          });
         
          if(!updateUser) {
            throw new Error("User not update successfully!");
          }

          return res.status(200).json({
            status:200,
            message: "User Updated Successfully!",
            date:updateUser, 
          })
    }catch(error) {
        return res.status(401).json({
            status:401,
            message: error.message
        })
        
    }
    


    

}

// Delete User
async function deleteUser(req, res) {
   try{
    let user_id = req.params.id;
    // Delete everyone named "Jane"
       let data = await Auth.destroy({
            where: {
            id: user_id
            }
        });
        return res.status(200).json({
            status:true,
            message:'User Delete Successfuly',

        })
   }catch(error) {
    return res.status(401).json({
        status:false,
        message:error.message
    })
   }

        }
module.exports = {
    login,
    register,
    update,
    deleteUser
}