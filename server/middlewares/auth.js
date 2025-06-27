import jwt from 'jsonwebtoken'


const userAuth = async (req, res, next)=>{
    const {token} = req.headers;

    if (!token) {
        return res.json({sucess: false, message: 'Not Authorised. Login Again'})
    }

    try{
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.id) {

            if (!req.body) {
                req.body = {};
            }
            
            req.body.userId = tokenDecode.id;
        }else{
            return res.json({sucess: false, message: 'Not Authorised. Login Again'});
        }

        next();
    }catch(error){
    res.json({sucess: false, message: error.message});
    }
};

export default userAuth;

