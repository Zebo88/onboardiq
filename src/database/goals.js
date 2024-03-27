import client from './client.js'; // Might need this

async function createGoals({ user_id, goal }) {
  try {
    const { rows: [createdGoal] } = await client.query(`
      INSERT INTO goals (user_id, goal) 
      VALUES ($1, $2) 
      RETURNING *;
    `, [user_id, goal]);
    
    console.log(`Goal "${createdGoal.goal}" created for user ${user_id} with goal_id ${createdGoal.goal_id}`);
    
    return createdGoal;
  } catch (error) {
    console.error(`Error creating goal for user ${user_id}:`, error.message);
    throw error;
  }
}


export {
  createGoals,
  
}