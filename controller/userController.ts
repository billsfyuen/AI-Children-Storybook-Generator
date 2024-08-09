import { Request, Response } from "express";
import { UserService } from "../service/userService"
import bcrypt from 'bcrypt';

export class UserController {
    constructor(private service: UserService) { }

    checkLogin = async (req: Request, res: Response) => {
        if (req.session.userId) {
            let userId = req.session.userId;
            const userInfo = (await this.service.getUserInfo(userId as string))[0]
            return res.json({
                data: {
                    id: userId,
                    username: userInfo.username
                }
            })
        }
        return res.json({ message: "Did not login" })
    }

    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const user = (await this.service.login(email))[0]

            if (!user) {
                // If no user record is found, return a 401 Unauthorized error
                return res.status(401).json({ message: 'Invalid credentials user not exist' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                // If the password doesn't match, return a 401 Unauthorized error
                return res.status(401).json({ message: 'Invalid credentials password not match' });
            }

            req.session.userId = (user.id).toString()
            req.session.save()
            // The password matches, return a 202 Accepted response
            return res.status(202).json({ message: 'Login successful', data: user.id });
        } catch (error) {
            console.error('Error in login route:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }


    register = async (req: Request, res: Response) => {
        try {
            const { newUsername, newEmail, newPassword, confirmPassword } = req.body;
            // 1. Check if passwords match
            if (!newPassword || !confirmPassword) {
                return res.status(400).json({ message: 'Password and confirm password fields are required' });
            }

            if (newPassword !== confirmPassword) {
                return res.status(400).json({ message: 'Passwords do not match' });
            }

            const existingUser = await this.service.checkDuplicateUser(newUsername, newEmail)
            if (existingUser[0]) {
                return res.status(400).json({ message: 'Username or email already exists' });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const userId = await this.service.register(newUsername, newEmail, hashedPassword)
            
            req.session.userId = userId.toString()
            req.session.save()
            res.status(200).json({ message: 'Registration successful' });

        } catch (error) {
            console.error('Error in login route:', error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    logout = (req: Request, res: Response) => {
        try {
            req.session.destroy((e) => {
                res.json({ "message": "logoutSuccess" })
            })

        } catch (error) {
            console.error('Error in login route:', error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    getUserInfo = async (req: Request, res: Response) => {
        try {
            const userId = req.session.userId
            const data = (await this.service.getUserInfo(userId as string))[0]
            return res.json({ data })
        } catch (error) {
            console.error('Error in login route:', error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    getStorybookbyUserId = async (req: Request, res: Response) => {
        try {
            const userId = req.session.userId
            const data = await this.service.getStorybookbyUserId(userId as string)
            return res.json({ data })
        } catch (error) {
            console.error('Error in login route:', error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    editUsername = async (req: Request, res: Response) => {
        try {
            const { username } = req.body
            const userId = req.session.userId
            await this.service.editUsername(userId as string, username)
            res.json({ message: "Update Username Sucessfully" })
        } catch (error) {
            console.error('Error in login route:', error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    changePassword = async (req: Request, res: Response) => {
        try {
            const { orginalPassword, newPassword, confirmPassword } = req.body
            const userId = req.session.userId
            const data:any = await this.service.checkPassword(userId as string)

            
            const isPasswordValid = await bcrypt.compare(orginalPassword, data[0].password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials password not match' });
            }
            if (newPassword !== confirmPassword) {
                return res.status(400).json({ message: 'Passwords do not match' });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            await this.service.editPassword(userId as string,hashedPassword)
            
            res.json({message:"Update Password Sucessfully"})

        } catch (error) {
            console.error('Error in login route:', error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    checkFirstTrial = async (req: Request, res: Response) => {
        try {
            const userId = req.session.userId
            const data = await this.service.checkFreeTrial(userId as string)
            res.json({data})
        } catch (error) {
            console.error('Error in login route:', error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    firstAttemptFinish = async (req: Request, res: Response) => {
        try {
            const userId = req.session.userId
            await this.service.firstAttemptDone(userId as string)
            
        } catch (error) {
            console.error('Error in login route:', error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    }
}