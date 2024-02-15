import Monster from "../models/monster.model.js";

export const getMonstersFromRepository = async (query) => {
  try {
    const monsters = await Monster.find(query);
    return monsters;
  } catch (e) {
    throw Error("Error while fetching monster(s)");
  }
}

export const updateMonstersInRepository = async (query, update) => {
  // can't update id 
  for (const item in update) {
    if (item=="id") {
      throw Error("Cannot update id field");
    }
  }
  try {
    // will only update provided fields so don't need to verify that required fields (name and imageUrl) are included 
    const monster = await Monster.findOneAndUpdate(
      { ...query },
      { ...update },
      { new: true }
    ).lean();
    return monster;
  } catch (e) {
    throw Error("Error while updating a monster");
  } 
}

export const deleteMonsterFromRepository = async (query) => {
  try {
    const monster = await Monster.findOneAndDelete({ ...query });
    return monster;
  } catch (e) {
    throw Error("Error while deleting a monster");
  }
}

export const createMonstersInRepository = async (payload) => {
  // make sure required fields are present, name and imageUrl
  if (!payload.name && !payload.image_url) {
    throw Error("name and image_url are required for creating a monster");
  }
  if (!payload.name) {
    throw Error("name is required for creating a monster");
  }
  if (!payload.image_url) {
    throw Error("image_url is required for creating a monster");
  }
  try {
    const newMonster = new Monster(payload);
    const savedMonster = await newMonster.save();
    return savedMonster;
  } catch (e) {
    throw Error("Error while creating a monster");
  }
}