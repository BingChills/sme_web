import { Router } from 'express';
import { CharactersController } from '../controllers/charactersController';

const router = Router();
const charactersController = new CharactersController();

export const setRoutes = () => {
  router.get('/characters', charactersController.getAllCharacters);
  router.post('/characters', charactersController.addCharacter);
  router.put('/characters/selected', charactersController.updateSelectedCharacters);
  router.patch('/characters/deselect/:id', charactersController.deselectCharacter);
  router.get('/user_info', charactersController.getUserInfo);
  
  return router;
};