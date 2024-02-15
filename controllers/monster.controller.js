import { getMonstersFromRepository, updateMonstersInRepository, deleteMonsterFromRepository, createMonstersInRepository } from '../repositories/monster.repository.js';
import Monster from "../models/monster.model.js";

export const getMonsters = async (req, res) => {
  try {
    const monsters = await getMonstersFromRepository({});
    res.status(200).send(monsters);
  } catch (e) {
    res.status(500).send(`Failed to fetch a list of monsters: ${e.message}`); 
  }
}

export const getMonster = async (req, res) => {
  const { id } = req.params; // **** use "id" not "_id" ****

  try {
    const monster = await getMonstersFromRepository({ id: id });
    res.status(200).send(monster);
  } catch (e) {
    res.status(500).send(`Failed to fetch monster with id = ${id} Error: ${e.message}`); 
  }
}

export const updateMonster = async (req, res) => {
  const { id } = req.params; // **** use "id" not "_id" ****
  const { body } = req; // if a field in the body is not entered as a string it will still be saved as a string 

  try {
    const monster = await updateMonstersInRepository({ id: id }, body);
    res.status(200).send(monster);
  } catch (e) {
    res.status(500).send(`Failed to fetch monster with id = ${id} Error: ${e.message}`); 
  }
}

export const deleteMonster = async (req, res) => {
  const { id } = req.params; // **** use "id" not "_id" ****

  try {
    const monster = await deleteMonsterFromRepository({ id: id });
    if (monster) {
      res.status(204).send();
    } else {
      res.status(500).send(`Failed to delete monster ${id} Error: ${e.message}`); 

    };
  } catch (e) {
    res.status(500).send(`Failed to delete monster with id = ${id} Error: ${e.message}`); 
  }
};

export const createMonster = async (req, res) => {
  const { body } = req; // if a field in the body is not entered as a string it will still be saved as a string 
  try {
    // Find the highest id in the database
    const highestIdMonster = await Monster.findOne({}).sort({ id: -1 });

    // Determine the new id for the monster
    const newId = highestIdMonster ? highestIdMonster.id + 1 : 1;

    // Create the new monster with the determined id
    const monster = await createMonstersInRepository({ ...body, id: newId });
    
    res.status(200).send(monster);
  } catch (e) {
    res.status(500).send(`Failed to send monster: ${e.message}`);  
  }
}