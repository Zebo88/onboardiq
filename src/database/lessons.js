import client from './client.js'; // Might need this

async function createLessons({ lesson, category }) {
  try {
    const { rows: [createdLesson] } = await client.query(`
      INSERT INTO lessons (lesson, category) 
      VALUES ($1, $2) 
      RETURNING *;
    `, [lesson, category]);
    
    console.log(`Lesson "${createdLesson.lesson}" created under category "${createdLesson.category}"`);
    
    return createdLesson;
  } catch (error) {
    console.error(`Error creating lesson "${lesson}":`, error.message);
    throw error;
  }
}



// ----- Instructors Section ---- //
async function createInstructors({ user_id, firstname, lastname }) {
  try {
    const { rows: [createdInstructor] } = await client.query(`
      INSERT INTO instructors (user_id, firstname, lastname) 
      VALUES ($1, $2, $3) 
      RETURNING *;
    `, [user_id, firstname, lastname]);
    
    console.log(`Instructor "${createdInstructor.firstname} ${createdInstructor.lastname}" created for user ${user_id}`);
    
    return createdInstructor;
  } catch (error) {
    console.error(`Error creating instructor "${firstname} ${lastname}":`, error.message);
    throw error;
  }
}


// ----- User Lessons Section ---- //
async function createUserLessons({ lesson_id, user_id, is_completed, date_completed, notes, instructor_name }) {
  try {
    const { rows: [createdUserLesson] } = await client.query(`
      INSERT INTO user_lessons (lesson_id, user_id, is_completed, date_completed, notes, instructor_name) 
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING *;
    `, [lesson_id, user_id, is_completed, date_completed, notes, instructor_name]);
    
    console.log(`UserLesson created for user ${user_id} with lesson_id ${lesson_id}`);
    
    return createdUserLesson;
  } catch (error) {
    console.error(`Error creating user lesson for user ${user_id} with lesson_id ${lesson_id}:`, error.message);
    throw error;
  }
}


export {
  createLessons,
  createInstructors,
  createUserLessons,
  
}