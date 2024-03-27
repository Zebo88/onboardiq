import client from './client.js'; // Might need this

async function createSPLadder({ competency }) {
  try {
    const { rows: [createdCompetency] } = await client.query(`
      INSERT INTO sp_ladder (competency) 
      VALUES ($1) 
      RETURNING *;
    `, [competency]);
    
    console.log(`Competency "${createdCompetency.competency}" added to the Specialist Ladder`);
    
    return createdCompetency;
  } catch (error) {
    console.error(`Error creating competency "${competency}" for the Specialist Ladder:`, error.message);
    throw error;
  }
}

async function createSrLadder({ competency }) {
  try {
    const { rows: [createdCompetency] } = await client.query(`
      INSERT INTO sr_ladder (competency) 
      VALUES ($1) 
      RETURNING *;
    `, [competency]);
    
    console.log(`Competency "${createdCompetency.competency}" added to the Sr Specialist Ladder`);
    
    return createdCompetency;
  } catch (error) {
    console.error(`Error creating competency "${competency}" for the Sr Specialist Ladder:`, error.message);
    throw error;
  }
}

async function createLDLadder({ competency }) {
  try {
    const { rows: [createdCompetency] } = await client.query(`
      INSERT INTO ld_ladder (competency) 
      VALUES ($1) 
      RETURNING *;
    `, [competency]);
    
    console.log(`Competency "${createdCompetency.competency}" added to the Leader Ladder`);
    
    return createdCompetency;
  } catch (error) {
    console.error(`Error creating competency "${competency}" for the Leader Ladder:`, error.message);
    throw error;
  }
}

// ---- User Ladders Section ---- //
async function createUserSPLadder({ user_id, status, ladder_id }) {
  try {
    const { rows: [createdUserSPLadder] } = await client.query(`
      INSERT INTO user_sp_ladder (user_id, status, ladder_id) 
      VALUES ($1, $2, $3) 
      RETURNING *;
    `, [user_id, status, ladder_id]);
    
    console.log(`User Specialist Ladder entry created for user ${user_id} with status "${status}" and ladder_id ${ladder_id}`);
    
    return createdUserSPLadder;
  } catch (error) {
    console.error(`Error creating User Specialist Ladder entry for user ${user_id}:`, error.message);
    throw error;
  }
}

async function createUserSRLadder({ user_id, status, ladder_id }) {
  try {
    const { rows: [createdUserSRLadder] } = await client.query(`
      INSERT INTO user_sr_ladder (user_id, status, ladder_id) 
      VALUES ($1, $2, $3) 
      RETURNING *;
    `, [user_id, status, ladder_id]);
    
    console.log(`User Sr Specialist Ladder entry created for user ${user_id} with status "${status}" and ladder_id ${ladder_id}`);
    
    return createdUserSRLadder;
  } catch (error) {
    console.error(`Error creating User Sr Specialist Ladder entry for user ${user_id}:`, error.message);
    throw error;
  }
}


export {
  createSPLadder,
  createSrLadder,
  createLDLadder,
  createUserSPLadder,
  createUserSRLadder,
  
}