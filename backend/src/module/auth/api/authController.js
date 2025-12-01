import { prisma } from "../../../lib/prisma.js"
import { checkValidationRules, sendApiResponse } from "../../../middleware/PreMiddileware.js"
import SC from "../../../config/statusCode.js"
import bcrypt from "bcrypt"
import {registerSchema , loginSchema} from "../validationRules.js"
import utils from "../../../middleware/util.js"

export const register = async (req, res) => {
    try {
        const { valid, message } = checkValidationRules(req , registerSchema)
        if (!valid) {
            sendApiResponse(req, res, SC.BAD_REQUEST, {
                keyword: "VALIDATION_ERROR", components: {}
            }, message)
        }
        const { email, name } = req.body;
        let password = req.body.password
        password = await bcrypt.hash(password,12);

        const existUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (existUser) {
            return sendApiResponse(req, res, SC.BAD_REQUEST, {
                keyword: "USER_ALREAY_EXIST", components: {}
            })
        }

        const newUser = await prisma.user.create({
            data: {
                email: email,
                name: name,
                password: password
            }
        })
        const token = utils.generateToken(newUser)

        return sendApiResponse(req, res, SC.OK, {
            keyword: "USER_CREATED", components: {}
        },{token,newUser})

    } catch (error) {
        console.log(error);
        sendApiResponse(req, res, SC.INTERNAL_SERVER_ERROR, {
            keyword: "INTERNAL_SERVER_ERROR", components: {}
        }, error)
    }
}

export const login = async (req, res) => {
    try {
        const { valid, message } = checkValidationRules(req , loginSchema)
        if (!valid) {
            sendApiResponse(req, res, SC.BAD_REQUEST, {
                keyword: "VALIDATION_ERROR", components: {}
            }, message)
        }
        const { email } = req.body;
        let password = req.body.password

        const existUser = await prisma.User.findUnique({
            where: {
                email: email
            }
        })
        const ismatch = await bcrypt.compare(password , existUser.password);

        if (!ismatch) {
            return sendApiResponse(req, res, SC.BAD_REQUEST, {
                keyword: "INVALID_PASSWORD_OR_EMAIL", components: {}
            })
        }

        const token = utils.generateToken(existUser)

        return sendApiResponse(req, res, SC.OK, {
            keyword: "LOGIN_SUCCESS", components: {}
        },{token,email : existUser.email})

    } catch (error) {
        console.log(error);
        sendApiResponse(req, res, SC.INTERNAL_SERVER_ERROR, {
            keyword: "INTERNAL_SERVER_ERROR", components: {}
        }, error)
    }
}