import { Router } from 'express';
import { CharactersController } from '../controllers/charactersController';

const router = Router();
const charactersController = new CharactersController();

export const setRoutes = () => {
  router.get('/api/characters', charactersController.getAllCharacters);
  router.post('/api/characters', charactersController.addCharacter);
  router.put('/api/characters/selected', charactersController.updateSelectedCharacters);
  router.patch('/api/characters/deselect/:id', charactersController.deselectCharacter);
  router.get('/api/user_info', charactersController.getUserInfo);
  
  return router;
  
  return router;
};