import {Elysia} from 'elysia';
import { handleAbout } from "../controllers/aboutController";
import { handleHome } from '../controllers/homeController';


export const router = new Elysia()
    .get('/',handleHome)
    .get('/about',handleAbout)
    .get('*',() => '404 - not found')
    
