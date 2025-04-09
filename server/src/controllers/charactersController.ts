import { Request, Response } from 'express';
import { db } from '../db';

export class CharactersController {
  public async getAllCharacters(req: Request, res: Response): Promise<void> {
    try {
      const characters = await db.collection('pets').find().toArray();
      res.json(characters);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch characters' });
    }
  }

  public async addCharacter(req: Request, res: Response): Promise<void> {
    try {
      const newCharacter = req.body;
      const result = await db.collection('pets').insertOne(newCharacter);
      res.status(201).json({ ...newCharacter, _id: result.insertedId });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add character' });
    }
  }

  public async getUserInfo(req: Request, res: Response): Promise<void> {
    try {
      const users = await db.collection('sme_info').find().toArray();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user info' });
    }
  }

  public async updateSelectedCharacters(req: Request, res: Response): Promise<void> {
    try {
      const { selectedIds } = req.body;
      console.log('Received selectedIds:', selectedIds);
      
      if (!Array.isArray(selectedIds) || selectedIds.length === 0) {
        console.log('Invalid or empty selectedIds array');
        res.status(400).json({ error: 'No valid selectedIds provided' });
        return;
      }
      
      // Look at how your documents are structured in MongoDB
      // If you're using MongoDB's _id instead of id, you'll need to convert the ids
      console.log('Updating documents with ids:', selectedIds);
      
      // Check what field represents the id in your MongoDB documents
      const result = await db.collection('pets').updateMany(
        { id: { $in: selectedIds } },  // Change to _id if that's what your docs use
        { $set: { selected: true } }
      );
      
      console.log('Update result:', result);
      res.status(200).json({ 
        updatedCount: result.modifiedCount,
        matchedCount: result.matchedCount 
      });
    } catch (error) {
      console.error('Error updating selected characters:', error);
      res.status(500).json({ error: 'Failed to update selected characters' });
    }
  }

  public async deselectCharacter(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      console.log('Deselecting character with id:', id);
      if (!id) {
        res.status(400).json({ error: 'No character id provided' });
        return;
      }
      
      // Update the document where the custom 'id' equals the supplied id
      const result = await db.collection('pets').updateOne(
        { id: id }, 
        { $set: { selected: false } }
      );
      
      if (result.modifiedCount > 0) {
        res.status(200).json({ message: 'Character deselected' });
      } else {
        res.status(404).json({ error: 'Character not found or already deselected' });
      }
    } catch (error) {
      console.error('Error deselecting character:', error);
      res.status(500).json({ error: 'Failed to deselect character' });
    }
  }
}