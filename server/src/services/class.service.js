import prisma from "../config/prisma.js";


export const createClassService = async ({ name, teacherId, teacherName, teacherProfilePic }) => {
    //save to db
    const newClass = await prisma.classroom.create({
        data: {
            name,
            teacherId,
            teacherName,
            teacherProfilePic
        }
    })
    return newClass;
}

export const enrollClassService = async ({ classId, userId }) => {

    //save to db
    const newEnrollment = await prisma.userClass.create({
        data: {
            classId,
            userId
        }
    })

    //get details of the class
    const classDetails = await prisma.classroom.findUnique({
        where: {
            classId: newEnrollment.classId
        }
    })

    return classDetails;
}

export const fetchClassForTeacherService = async (teacherId) => {

    const classes = await prisma.classroom.findMany({
        where: {
            teacherId: teacherId
        }
    })

    return classes;

}

export const fetchClassForStudentService = async (studentId) => {

    const classes = await prisma.userClass.findMany({
        where: {
            userId: studentId
        },
        select: {
            class: true
        }
    });

    const mappedClasses = classes.map((item) => item.class)

    return mappedClasses;
}