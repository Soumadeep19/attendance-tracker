import { createClassService, enrollClassService, fetchClassForStudentService, fetchClassForTeacherService } from "../services/class.service.js";


//only teachers can access this method
export const createClass = async (req, res) => {
    const { name } = req.body;
    const teacherId = req.user.id;
    const teacherName = req.user.name;
    const teacherProfilePic = req.user.profilePic;

    try {
        //check name length
        if (name.length < 4) {
            return res.status(400).json({
                message: "Class name must be at least 4 characters"
            });
        }

        //check for empty fields
        if (name == "") {
            return res.status(400).json({
                message: "Please fill all the fields"
            })
        }


        //send to service
        const result = await createClassService({
            name, teacherId, teacherName, teacherProfilePic
        })

        res.status(201).json({
            result,
            message: "CLASS CREATED SUCCESSFULLY"
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Invalid Data"
        });
    }
}

export const enrollClass = async (req, res) => {
    const { classId } = req.body;
    const userId = req.user.id;

    try {
        //check for empty fields
        if (classId == "") {
            return res.status(400).json({
                message: "Please fill all the fields"
            })
        }

        //send to service
        const result = await enrollClassService({
            classId, userId
        })

        return res.status(200).json({
            result,
            message: "Enrolled in class successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Invalid Data"
        });
    }
}

export const fetchClass = async (req, res) => {
    const user = req.user;


    try {

        let result = null;

        if (user.role === "TEACHER") {
            result = await fetchClassForTeacherService(user.id);
        } else {
            result = await fetchClassForStudentService(user.id);
        }

        return res.status(200).json({
            result,
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Invalid Data"
        });
    }
}