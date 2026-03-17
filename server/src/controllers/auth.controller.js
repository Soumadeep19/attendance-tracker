import { registerService, loginService } from "../services/auth.service.js";
import { generateToken } from "../utils/jwt.js";

export const registerUser = async (req, res) => {

    const { name, institutionId, section, department, role, password } = req.body;

    try {
        //check password length
        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters"
            });
        }

        //check for empty fields
        if (name == "" || institutionId == "" || password == "" || department == "" || role == "") {
            return res.status(400).json({
                message: "Please fill all the fields"
            })
        }

        //send to service
        const result = await registerService({
            name, institutionId, section, department, role, password
        })

        res.status(201).json({
            message: "USER CREATED"
        })


    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Invalid Data"
        });
    }
}


export const loginUser = async (req, res) => {
    const { institutionId, password } = req.body;

    try {

        //check for empty fields
        if (institutionId == "" || password == "") {
            return res.status(400).json({
                message: "Please fill all the fields"
            })
        }


        const result = await loginService(institutionId, password);



        //check for error
        if (result.status) {
            return res.status(result.status).json({
                message: result.message
            });

        }

        //generate jwt 
        const jwt = generateToken(result.user.id, res);

        res.status(200).json({
            user: result.user,
            jwt: jwt,
            message: "Login Successful 😍"
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}


export const checkAuth = (req, res) => {

    try {
        req.user = {
            ...req.user,
            institutionId: req.user.institutionId.toString()
        }
        res.status(200).json(
            req.user
        );
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }

}