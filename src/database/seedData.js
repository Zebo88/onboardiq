// Import the database adapter functions
import { createUser } from './user.js';
import { createProduct } from './products.js';
import { createCart } from './cart.js';
import { createCartProduct } from './cart_products.js';
import { createOrder, createOrderItem } from './orders.js';
import client from './client.js';

async function dropTables() {
  console.log('Dropping All Tables...');
  // drop all tables to ensure the seed data is created correctly...

  try {
    await  client.query(`
    DROP TABLE IF EXISTS user_1yr_plan CASCADE;
    DROP TABLE IF EXISTS user_6mo_plan CASCADE;
    DROP TABLE IF EXISTS 1_year_plan CASCADE;
    DROP TABLE IF EXISTS 6_month_plan CASCADE;
    DROP TABLE IF EXISTS user_90_plan CASCADE;
    DROP TABLE IF EXISTS user_60_plan CASCADE;
    DROP TABLE IF EXISTS user_30_plan CASCADE;
    DROP TABLE IF EXISTS 90_day_plan CASCADE;
    DROP TABLE IF EXISTS 60_day_plan CASCADE;
    DROP TABLE IF EXISTS 30_day_plan CASCADE;

    DROP TABLE IF EXISTS users_lessons CASCADE;
    DROP TABLE IF EXISTS lessons CASCADE;
    DROP TABLE IF EXISTS instructors CASCADE;

    DROP TABLE IF EXISTS sp_ladder CASCADE;
    DROP TABLE IF EXISTS sr_ladder CASCADE;
    DROP TABLE IF EXISTS ld_ladder CASCADE;
    DROP TABLE IF EXISTS user_sp_ladder CASCADE;
    DROP TABLE IF EXISTS user_sr_ladder CASCADE;
    DROP TABLE IF EXISTS user_ld_ladder CASCADE;

    DROP TABLE IF EXISTS goals CASCADE;
 
    DROP TABLE IF EXISTS users;
  `)
  } catch (error) {
    throw error; 
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");
    // create all tables...

    await  client.query(`
      CREATE TABLE users(
        user_id  SERIAL PRIMARY KEY, 
        email VARCHAR(255) UNIQUE NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL, 
        password VARCHAR(255) NOT NULL,
        firstname VARCHAR(255) NOT NULL,
        lastname VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        is_admin BOOLEAN NOT NULL
      );
    `)

    await  client.query(`
      CREATE TABLE goals(
        goal_id SERIAL PRIMARY KEY, 
        user_id INTEGER NOT NULL REFERENCES users(user_id),
        goal TEXT NOT NULL
      );
    `)

    await  client.query(`
      CREATE TABLE sp_ladder(
        ladder_id SERIAL PRIMARY KEY, 
        competency TEXT NOT NULL
      );
    `)

    await  client.query(`
      CREATE TABLE sr_ladder(
        ladder_id SERIAL PRIMARY KEY, 
        competency TEXT NOT NULL
      );
    `)

    await  client.query(`
      CREATE TABLE ld_ladder(
        ladder_id SERIAL PRIMARY KEY, 
        competency TEXT NOT NULL
      );
    `)

    await  client.query(`
      CREATE TABLE user_sp_ladder(
        user_ladder_id SERIAL PRIMARY KEY,
        ladder_id INTEGER NOT NULL REFERENCES sp_ladder(ladder_id), 
        user_id INTEGER NOT NULL REFERENCES users(user_id),
        status VARCHAR(255) NOT NULL
      );
    `)

    await  client.query(`
      CREATE TABLE user_sr_ladder(
        user_ladder_id SERIAL PRIMARY KEY,
        ladder_id INTEGER NOT NULL REFERENCES sr_ladder(ladder_id), 
        user_id INTEGER NOT NULL REFERENCES users(user_id),
        status VARCHAR(255) NOT NULL
      );
    `)

    await  client.query(`
      CREATE TABLE user_ld_ladder(
        user_ladder_id SERIAL PRIMARY KEY,
        ladder_id INTEGER NOT NULL REFERENCES ld_ladder(ladder_id), 
        user_id INTEGER NOT NULL REFERENCES users(user_id),
        status VARCHAR(255) NOT NULL
      );
    `)

    await  client.query(`
      CREATE TABLE lessons (
        lesson_id SERIAL PRIMARY KEY,
        lesson VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL
      );
    `)

    await  client.query(`
      CREATE TABLE instructors (
        instructor_id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL REFERENCES users(user_id),
        firstname VARCHAR(255) NOT NULL REFERENCES users(firstname),
        lastname VARCHAR(255) NOT NULL REFERENCES users(lastname)
      );
    `)

    await  client.query(`
      CREATE TABLE users_lessons (
        users_lessons_id SERIAL PRIMARY KEY,
        lesson_id INTEGER NOT NULL REFERENCES lessons(lesson_id),
        user_id INTEGER NOT NULL REFERENCES users(user_id),
        is_completed BOOLEAN NOT NULL,
        date_completed DATE,
        notes TEXT,
        instructor_name VARCHAR(255) REFERENCES instructors(firstname)
      );
    `)

    await client.query(`
      CREATE TABLE 30_day_plan (
        plan_id SERIAL PRIMARY KEY,
        competency TEXT NOT NULL,
        subcompetency TEXT NOT NULL
      );
    `)

    await client.query(`
      CREATE TABLE 60_day_plan (
        plan_id SERIAL PRIMARY KEY,
        competency TEXT NOT NULL,
        subcompetency TEXT NOT NULL
      );
    `)

    await client.query(`
      CREATE TABLE 90_day_plan (
        plan_id SERIAL PRIMARY KEY,
        competency TEXT NOT NULL,
        subcompetency TEXT NOT NULL
      );
    `)

    await client.query(`
      CREATE TABLE 6_month_plan (
        plan_id SERIAL PRIMARY KEY,
        competency TEXT NOT NULL,
        subcompetency TEXT NOT NULL
      );
    `)

    await client.query(`
      CREATE TABLE 1_year_plan (
        plan_id SERIAL PRIMARY KEY,
        competency TEXT NOT NULL,
        subcompetency TEXT NOT NULL
      );
    `)

    await client.query(`
      CREATE TABLE user_30_plan (
        user_plan_id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(user_id),
        plan_id INTEGER NOT NULL REFERENCES 30_day_plan(plan_id),
        status VARCHAR(255),
        notes TEXT
      );
    `)

    await client.query(`
      CREATE TABLE user_60_plan (
        user_plan_id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(user_id),
        plan_id INTEGER NOT NULL REFERENCES 60_day_plan(plan_id),
        status VARCHAR(255),
        notes TEXT
      );
    `)

    await client.query(`
      CREATE TABLE user_90_plan (
        user_plan_id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(user_id),
        plan_id INTEGER NOT NULL REFERENCES 90_day_plan(plan_id),
        status VARCHAR(255),
        notes TEXT
      );
    `)

    await client.query(`
      CREATE TABLE user_6mo_plan (
        user_plan_id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(user_id),
        plan_id INTEGER NOT NULL REFERENCES 6_month_plan(plan_id),
        status VARCHAR(255),
        notes TEXT
      );
    `)

    await client.query(`
      CREATE TABLE user_1yr_plan (
        user_plan_id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(user_id),
        plan_id INTEGER NOT NULL REFERENCES 1_year_plan(plan_id),
        status VARCHAR(255),
        notes TEXT
      );
    `)

    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function createInitialUsers() {
  console.log('Starting to create users...');
  try {

    const usersToCreate = [
      { email: 'zfexample@gmail.com', username: 'zfullmer', password: 'zfullmerrocks!', firstname: "Zach", lastname: "Fullmer", title: "Supervisor", is_admin: true },
      { email: 'batman@gmail.com', username: 'batmanrocks', password: 'batmanrocks!', firstname: "Bruce", lastname: "Wayne", title: "Data Structure Specialist", is_admin: false }
    ]
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!');
    throw error;
  }
}

async function createInitialGoals() {
  console.log('Starting to create goals...');
  try {

    const goalsToCreate = [
      { user_id: 1, goal: "Become an expert at creating Stored Procedures in MySQL." },
      { user_id: 1, goal: "Become a expert reliable troubleshooting resource." },
      { user_id: 2, goal: "Become a Sr. Data Specialist." }
    ]
    const goals = await Promise.all(goalsToCreate.map(createGoals));

    console.log('Goals created:');
    console.log(goals);
    console.log('Finished creating goals!');
  } catch (error) {
    console.error('Error creating goals!');
    throw error;
  }
}

async function createInitialLessons() {
  console.log('Starting to create lessons...');
  try {

    const lessonsToCreate = [
      { lesson: "Raw Data File Import", category: "Data Import" },
      { lesson: "Data Import Request", category: "Data Import" },
      { lesson: "Data-Only Structure", category: "Data Structure" },
      { lesson: "Image-Only Structure", category: "Data Structure" },
      { lesson: "Image and Data Update Structure", category: "Data Structure" },
      { lesson: "Additional Fields Structure", category: "Data Structure" },
      { lesson: "Standard Metadata", category: "Metadata" },
      { lesson: "French Metadata", category: "Metadata" },
      { lesson: "Standard Index Delivery", category: "Index Delivery" },
      { lesson: "French Index Delivery", category: "Index Delivery" },
      { lesson: "Fold3 Index Delivery", category: "Index Delivery" },
    ]
    const lessons = await Promise.all(lessonsToCreate.map(createLessons));

    console.log('Lessons created:');
    console.log(lessons);
    console.log('Finished creating lessons!');
  } catch (error) {
    console.error('Error creating lessons!');
    throw error;
  }
}

async function createInitialInstructors() {
  console.log('Starting to create instructors...');
  try {

    const instructorsToCreate = [
      { user_id: 1, firstname: "Zach", lastname: "Fullmer" },
      { user_id: 1, firstname: "Bruce", lastname: "Wayne" }
    ]
    const instructors = await Promise.all(instructorsToCreate.map(createInstructors));

    console.log('Instructors created:');
    console.log(instructors);
    console.log('Finished creating instructors!');
  } catch (error) {
    console.error('Error creating instructors!');
    throw error;
  }
}

async function createInitialUsersAndLessons() {
  console.log('Starting to create user lessons...');
  try {

    const userLessonsToCreate = [
      { lesson_id: 1, user_id: 1, is_completed: true, date_completed: "6-26-2021", notes: "He understood the task well and could successfully import data correctly.", instructor_name: "Bruce" },
      { lesson_id: 2, user_id: 1, is_completed: true, date_completed: "7-10-2021", notes: "He picked up this task fairly quickly because he has experience with the raw data imports.", instructor_name: "Bruce" },
      { lesson_id: 1, user_id: 2, is_completed: true, date_completed: "3-26-2024", notes: "He needs to spend more time on his batcomputer instead of his batphone so he can understand data imports.", instructor_name: "Zach" },
    ]
    const userLessons = await Promise.all(userLessonsToCreate.map(createUserLessons));

    console.log('User Lessons created:');
    console.log(userLessons);
    console.log('Finished creating user lessons!');
  } catch (error) {
    console.error('Error creating user lessons!');
    throw error;
  }
}

async function createInitialSPLadder() {
  console.log('Starting to create Specialist Ladder...');
  try {

    const spLadderToCreate = [
      { competency: "Ability to independently troubleshoot errors in SQL, Excel, etc. related to assigned tasks and requests." },
      { competency: "Basic understanding of our stored procedures and saved queries. Can successfully troubleshoot independently and occasionally assist others." },
      { competency: "Full-ownership of each task and request assigned to them." },
      { competency: `Knowledge of the "how" and "why" of team responsibilities and how that fits in with and effects the rest of publishing.` },
      { competency: "Completes mosts tasks and requests with little to no supervision or assistance from supervisor or team members." }
    ]
    const spLadder = await Promise.all(spLadderToCreate.map(createSPLadder));

    console.log('Specialist Ladder created:');
    console.log(spLadder);
    console.log('Finished creating Specialist Ladder!');
  } catch (error) {
    console.error('Error creating Specialist Ladder!');
    throw error;
  }
}

async function createInitialSrLadder() {
  console.log('Starting to create Sr. Specialist Ladder...');
  try {

    const srLadderToCreate = [
      { competency: "Ability to independently troubleshoot errors in SQL, Excel, and other technical areas outside the team's day to day scope." },
      { competency: "Ability to create new stored procedures and query templates (documentation) from scratch for new processes. Or improve existing processes." },
      { competency: "Assists supervisor with managing specific projects or processes required by the team through the entire pipeline (i.e. FSAPI, Web Crawl, Yearbooks, etc.)" },
      { competency: `Expert knowledge of the "how" and "why" of team responsibilities and how that fits in with and effects the rests of publishing and teams external to publishing.` },
      { competency: "Completes all tasks and requests with little to no supervision or assistance and often helps others to complete their tasks and requests; including volunteering to take over others' requests and tasks when needed." }
    ]
    const srLadder = await Promise.all(srLadderToCreate.map(createSrLadder));

    console.log('Sr. Specialist Ladder created:');
    console.log(srLadder);
    console.log('Finished creating Sr. Specialist Ladder!');
  } catch (error) {
    console.error('Error creating Sr. Specialist Ladder!');
    throw error;
  }
}

async function createInitialLDLadder() {
  console.log('Starting to create Leader Ladder...');
  try {

    const ldLadderToCreate = [
      { competency: "Ability to lead meetings." },
      { competency: "Ability to manage task queues." }
    ]
    const ldLadder = await Promise.all(ldLadderToCreate.map(createLDLadder));

    console.log('Leader Ladder created:');
    console.log(ldLadder);
    console.log('Finished creating Leader Ladder!');
  } catch (error) {
    console.error('Error creating Leader Ladder!');
    throw error;
  }
}

async function createInitialUserSPLadder() {
  console.log('Starting to create User Specialist Ladder...');
  try {

    const userSPLadderToCreate = [
      { user_id: 1, status: "Competent", ladder_id: 1 },
      { user_id: 1, status: "Competent", ladder_id: 2 },
      { user_id: 2, status: "In-Progress", ladder_id: 1 },
      { user_id: 2, status: "Stuck", ladder_id: 2 }
    ]
    const userSPLadder = await Promise.all(userSPLadderToCreate.map(createUserSPLadder));

    console.log('User Specialist Ladder created:');
    console.log(userSPLadder);
    console.log('Finished creating User Specialist Ladder!');
  } catch (error) {
    console.error('Error creating User Specialist Ladder!');
    throw error;
  }
}

async function createInitialUserSRLadder() {
  console.log('Starting to create User Sr Specialist Ladder...');
  try {

    const userSRLadderToCreate = [
      { user_id: 1, status: "Competent", ladder_id: 1 },
      { user_id: 1, status: "Competent", ladder_id: 2 },
      { user_id: 2, status: "In-Progress", ladder_id: 1 },
      { user_id: 2, status: "Stuck", ladder_id: 2 }
    ]
    const userSRLadder = await Promise.all(userSRLadderToCreate.map(createUserSRLadder));

    console.log('User Sr Specialist Ladder created:');
    console.log(userSRLadder);
    console.log('Finished creating User Sr Specialist Ladder!');
  } catch (error) {
    console.error('Error creating User Sr Specialist Ladder!');
    throw error;
  }
}

async function createInitialUserLDLadder() {
  console.log('Starting to create User Leader Ladder...');
  try {

    const userLDLadderToCreate = [
      { user_id: 1, status: "Competent", ladder_id: 1 },
      { user_id: 1, status: "Competent", ladder_id: 2 },
      { user_id: 2, status: "In-Progress", ladder_id: 1 },
      { user_id: 2, status: "Stuck", ladder_id: 2 }
    ]
    const userLDLadder = await Promise.all(userLDLadderToCreate.map(createUserLDLadder));

    console.log('User Leader Ladder created:');
    console.log(userLDLadder);
    console.log('Finished creating User Leader Ladder!');
  } catch (error) {
    console.error('Error creating User Leader Ladder!');
    throw error;
  }
}

async function createInitial30DayPlan() {
  console.log('Starting to create 30 Day Plan...');
  try {

    const thirtyDayPlanToCreate = [
      { plan_id: 1, competency: "Basic understanding of SQL.", subcompetency: "Able to navigate and understand our templates." },
      { plan_id: 1, competency: "Basic understanding of SQL.", subcompetency: "Run through SQL trainings." },
      { plan_id: 2, competency: "Basic understanding of team's processes.", subcompetency: "" },
      { plan_id: 3, competency: "Initial training on metadata and data structure tasks.", subcompetency: "Able to complete simple metadata and data structure tasks with help from team." },
      { plan_id: 3, competency: "Initial training on metadata and data structure tasks.", subcompetency: "General understanding of field authority and record model" },
    ]
    const thirtyDayPlan = await Promise.all(thirtyDayPlanToCreate.map(createThirtyDayPlan));

    console.log('30 Day Plan created:');
    console.log(thirtyDayPlan);
    console.log('Finished creating 30 Day Plan!');
  } catch (error) {
    console.error('Error creating 30 Day Plan!');
    throw error;
  }
} // Need to create a function for this



export async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialGoals();
    await createInitialLessons();
    await createInitialInstructors();
    await createInitialUsersAndLessons();
    await createInitialSPLadder();
    await createInitialSrLadder();
    await createInitialLDLadder();
    await createInitialUserSPLadder();
    await createInitialUserSRLadder();
    await createInitialUserLDLadder();
    await createInitial30DayPlan();

  } catch (error) {
    console.log('Error during rebuildDB')
    throw error;
  }
}

