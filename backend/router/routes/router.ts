import { Router } from "express";
import { getUsers, registerUsers, loginUser, protectRouter1} from "../controllers/controller";
import { authToken } from "../middlewareAuthToken";

const router = Router();

router.get('/', getUsers);
router.post('/register', registerUsers)
router.post('/login', loginUser)
router.get('/protectRouter', authToken, protectRouter1)

export default router