const bcrypt = require("bcryptjs");


// function to hash users' passwords 
exports.hashUsersPassword = async (usersData) => {
    // console.log("users data:", usersData);

    const salt = await bcrypt.genSalt(10);

    const usersPromiseMap = usersData.map(async (user) => {
        user.password = await bcrypt.hash(user.password, salt);
        return user;
    });

    const expectedResult = Promise.all(usersPromiseMap);

    return expectedResult;
}
