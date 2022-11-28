//Your first step is to "require" this module at the top of your server.js file so that we can use it to
//interact with the data from server.js

// var fs=require('fs');
// var employees=[];
// var departments=[];


const Sequelize = require('sequelize');
 var sequelize = new Sequelize('bbbcozqo', 'bbbcozqo', 'EVwNg2akSd9LuaexUWcrd3W61yr0P94j', {
 host: 'peanut.db.elephantsql.com',
 dialect: 'postgres',
 port: 5432,
 dialectOptions: {
 ssl: true
},
query:{raw: true} // update here. You need it.
});

sequelize.authenticate().then(()=> console.log('Connection success.'))
.catch((err)=>console.log("Unable to connect to DB.", err));


var Employee = sequelize.define('Employee', {
    employeeNum: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: Sequelize.STRING,
    last_name: Sequelize.STRING,
    email: Sequelize.STRING,
    SSN: Sequelize.STRING,
    addressStreet: Sequelize.STRING,
    addressCity: Sequelize.STRING,
    addressState: Sequelize.STRING,
    addressPostal: Sequelize.STRING,
    maritalStatus: Sequelize.STRING,
    isManager: Sequelize.BOOLEAN,
    employeeManagerNum: Sequelize.INTEGER,
    status: Sequelize.STRING,
    department: Sequelize.INTEGER,
    hireDate: Sequelize.STRING
});

var Department = sequelize.define('Department', {
    departmentId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    departmentName: Sequelize.STRING
});





exports.initialize=function() {
    return new Promise(function(resolve, reject){
        sequelize.sync().then(function(){
            resolve();
        }).catch(function(){
            reject("unable to sync the database");
        });
    });
}

   



exports.getAllEmployees=function(){
    return new Promise(function(resolve,reject){

        Employee.findAll().then(function(data){
            resolve(data);
        }).catch(function(){
            reject("no results returned");
        });
    });
}



exports.getEmployeesByStatus=function(Status){
    return new Promise(function(resolve,reject){
        Employee.findAll({
            where: {
                status: Status
            }
        }).then(function(data){
            resolve(data);
        }).catch(function(){
            reject("no results returned");
        });
    });
}

      

exports.getManagers=function(){
    return new Promise(function(resolve,reject){
        reject();
    });
}



exports.getDepartments=function(){
    return new Promise(function(resolve,reject){
        Department.findAll().then(function(data){
            resolve(data);
        }).catch(function(){
            reject("no results returned");
        });
    });
}







exports.getEmployeesByDepartment=function(department){
    return new Promise(function(resolve,reject){

        Employee.findAll({
            where: {
                department: department
            }
        }).then(function(data){
            resolve(data);
        }).catch(function(){
            reject("no results returned");
        });
    });
}





exports.getEmployeesByManager=function(manager){
    return new Promise(function(resolve,reject){
        Employee.findAll({
            where: {
                employeeManagerNum: manager
            }
        }).then(function(data){
            resolve(data);
        }).catch(function(){
            reject("no results returned");
        });
    });
}



exports.getEmployeeByNum=function(num){
    return new Promise(function(resolve,reject){
        Employee.findAll({
            where: {
                employeeNum: num
            }
        }).then(function(data){
            resolve(data[0]);
        }).catch(function(){
            reject("no results returned");
        });
    });
}



exports.addEmployee=function(employeeData){
    return new Promise(function(resolve,reject){
       
        employeeData.isManager = (employeeData.isManager) ? true : false;
        for(var i in employeeData){
            if(employeeData[i] == ""){
                employeeData[i] = null;
            }
        }
        Employee.create(employeeData).then(function(){
            resolve();
        }).catch(function(){
            reject("unable to create employee");
        });

    });
}







exports.updateEmployee=function(employeeData){
    return new Promise(function(resolve,reject){
        employeeData.isManager = (employeeData.isManager) ? true : false;
        for(var i in employeeData){
            if(employeeData[i] == ""){
                employeeData[i] = null;
            }
        }
        Employee.update(employeeData,{
            where: {
                employeeNum: employeeData.employeeNum
            }
        }).then(function(){
            resolve();
        }).catch(function(){
            reject("unable to update employee");
        });
    });
}




exports.addDepartment=function(departmentData){

    return new Promise(function(resolve,reject){
        for(var i in departmentData){
            if(departmentData[i] == ""){
                departmentData[i] = null;
            }
        }
        Department.create(departmentData).then(function(){
            resolve();
        }).catch(function(){
            reject("unable to create department");
        });
    });
}





exports.updateDepartment=function(departmentData){
    return new Promise(function(resolve,reject){
        for(var i in departmentData){
            if(departmentData[i] == ""){
                departmentData[i] = null;
            }
        }
        Department.update(departmentData
            ,{
            where: {
                departmentId: departmentData.departmentId
            }
        }).then(function(){
            resolve();
        }).catch(function(){
            reject("unable to update department");
        });
    });
}






exports.getDepartmentById=function(id){
    return new Promise(function(resolve,reject){
        Department.findAll({
            where: {
                departmentId: id
            }
        }).then(function(data){
            resolve(data[0]);
        }).catch(function(){
            reject("no results returned");
        });
    });
}




exports.deleteEmployeeByNum=function(empNum){
    return new Promise(function(resolve,reject){
        Employee.destroy({
            where: {
                employeeNum: empNum
            }
        }).then(function(){
            resolve();
        }).catch(function(){
            reject("unable to delete employee");
        });
    });
}






