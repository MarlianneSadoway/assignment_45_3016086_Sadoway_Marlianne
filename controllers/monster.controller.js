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
    // check that id is a valid id (monster exists in the database)
    const monsterExists = await checkMonsterExists(id);
    if (!monsterExists) {
      res.status(404).send(`Monster with id = ${id} not found`);
      return;
    }
    
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
    // check that id is a valid id (monster exists in the database)
    const monsterExists = await checkMonsterExists(id);
    if (!monsterExists) {
      res.status(404).send(`Monster with id = ${id} not found`);
      return;
    }

    const monster = await updateMonstersInRepository({ id: id }, body);
    res.status(200).send(monster);
  } catch (e) {
    res.status(500).send(`Failed to fetch monster with id = ${id} Error: ${e.message}`); 
  }
}

export const deleteMonster = async (req, res) => {
  const { id } = req.params; // **** use "id" not "_id" ****

  try {
    // check that id is a valid id (monster exists in the database)
    const monsterExists = await checkMonsterExists(id);
    if (!monsterExists) {
      res.status(404).send(`Monster with id = ${id} not found`);
      return;
    }

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
    // Get the monster with the highest id 
    const highestIdMonster = await Monster.findOne({}).sort({ id: -1 });
    // Use the monster with the highest id to get the new id for the monster, or 1 if there are no monsters in the database
    const newId = highestIdMonster ? highestIdMonster.id + 1 : 1;
    // Create the new monster with the new id
    const monster = await createMonstersInRepository({ ...body, id: newId });
    res.status(200).send(monster);
  } catch (e) {
    res.status(500).send(`Failed to send monster: ${e.message}`);  
  }
}

// Returns true if monster exists, false otherwise
export const checkMonsterExists = async (id) => {
    try {
      const monster = await Monster.findOne({ id: id });
      return !!monster; 
    } catch (e) {
      throw Error("Error while checking if monster exists");
    }
  };