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
      { user_id: 2, goal: "Become a Sr. Data Specialist." }
    ]
    const goals = await Promise.all(goalsToCreate.map(createGoals)); // Need to create a function for this.

    console.log('Goals created:');
    console.log(users);
    console.log('Finished creating goals!');
  } catch (error) {
    console.error('Error creating goals!');
    throw error;
  }
}



export async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialGoals();
    await createInitialCartsAndProducts();
    await createInitialOrdersAndItems();
  } catch (error) {
    console.log('Error during rebuildDB')
    throw error;
  }
}

