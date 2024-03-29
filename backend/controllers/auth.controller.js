export const login = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
    }
    catch (error) {
        console.log(error);
    };
};

export const logout = async (req, res) => {
    console.log('logout user');
    res.send('logout user');
};

export const signup = async (req, res) => {
    console.log('signup user');
    res.send('signup user');
};
