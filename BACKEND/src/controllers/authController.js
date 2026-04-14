import UserAdmin from "../models/UserAdmin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) =>{
    try{
        const {email, password} = req.body;

        const hash = await bcrypt.hash(password,10);

        const user = await UserAdmin.create({
            email,
            password: hash
        });
        return res.status(201).json(user);

    } catch (error){
        return res.status(500).json({error: error.message});
    }
}

export const login = async (req, res) => {
    try{
        const {email, password} = req.body;

        const user = await UserAdmin.findOne({where: {email}});

        if(!user){
            return res.status(404).json({error: "Usuário não encontrado!"});
        }
        const valid = await bcrypt.compare(password, user.password);

        if(!valid){
            return res.status(401).json({erro: "Senha inválida"});
        }

        const token = jwt.sign(
            {id: user.id},
            process.env.JWT_SECRET,
            {expiresInd: 'id'}
        );

        return res.json({user, token});
    } catch(error){
        return res.status(500).json({error: error.message});
    }
}