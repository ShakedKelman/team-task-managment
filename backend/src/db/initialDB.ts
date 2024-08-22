import runQuery from "./dal";
//please note that in order to create the database before adding tables u need to run 
//in MariaDB:

//CREATE DATABASE company;

//USE company;



const createTeamTable = async () => {
    try {
      const Q = `
      CREATE TABLE IF NOT EXISTS team (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL
      );
      `;
      const result = await runQuery(Q);
      console.log(result);
    } catch (error) {
      console.error("Error selecting sample data:", error);
    }
  };
  
//   createTeamTable().then(() => {
//     console.log("Done creating team table");
//   })
  
    
  const insertSampleTeams = async () => {
    try {
      const Q = `
      INSERT INTO team (name) VALUES
      ('React Team'),
      ('Node.js Team'),
      ('Angular Team'),
      ('Vue.js Team'),
      ('TypeScript Team'),
      ('GraphQL Team'),
      ('Docker Team'),
      ('Kubernetes Team'),
      ('Microservices Team'),
      ('AI & ML Team');
      `;
      const result = await runQuery(Q);
      console.log(`Inserted ${result} rows into team table.`);
    } catch (error) {
      console.error("Error inserting sample teams:", error);
    }
  };
  
//   insertSampleTeams().then(() => {
//     console.log("Done creating meeting table");
// });
  
  const createMeetingTable = async () => {
    try {
      const Q = `
      CREATE TABLE IF NOT EXISTS meeting (
        id INT AUTO_INCREMENT PRIMARY KEY,
        team_id INT,
        meeting_start DATETIME NOT NULL,
        meeting_end DATETIME NOT NULL,
        duration INT, 
        description VARCHAR(255),
        room_name VARCHAR(255),
        FOREIGN KEY (team_id) REFERENCES team(id)
      );
      `;
      const result = await runQuery(Q);
      console.log(result);
    } catch (error) {
      console.error("Error creating meeting table:", error);
    }
  };
  
//   createMeetingTable().then(() => {
//       console.log("Done creating meeting table");
//   });
  


const insertSampleMeetings = async () => {
      try {
        const Q = `
        INSERT INTO meeting (team_id, meeting_start, meeting_end, duration, description, room_name) VALUES
        (1, '2024-08-21 10:00:00', '2024-08-21 11:00:00', 60, 'Sprint Planning', 'Blue Room'),
        (1, '2024-08-22 14:00:00', '2024-08-22 15:00:00', 60, 'Code Review', 'Conference Room'),
        (2, '2024-08-21 11:00:00', '2024-08-21 12:00:00', 60, 'Backend Architecture', 'Green Room'),
        (2, '2024-08-23 09:00:00', '2024-08-23 10:00:00', 60, 'API Design', 'Red Room'),
        (3, '2024-08-21 15:00:00', '2024-08-21 16:00:00', 60, 'Component Design', 'Blue Room'),
        (3, '2024-08-24 13:00:00', '2024-08-24 14:00:00', 60, 'UX Review', 'Conference Room'),
        (4, '2024-08-22 10:00:00', '2024-08-22 11:00:00', 60, 'Feature Brainstorming', 'Yellow Room'),
        (4, '2024-08-23 16:00:00', '2024-08-23 17:00:00', 60, 'Sprint Review', 'Orange Room'),
        (5, '2024-08-24 11:00:00', '2024-08-24 12:00:00', 60, 'TypeScript Tips', 'Blue Room'),
        (5, '2024-08-25 14:00:00', '2024-08-25 15:00:00', 60, 'Advanced TypeScript', 'Conference Room'),
        (6, '2024-08-25 09:00:00', '2024-08-25 10:00:00', 60, 'GraphQL Workshop', 'Green Room'),
        (6, '2024-08-26 15:00:00', '2024-08-26 16:00:00', 60, 'Schema Design', 'Red Room'),
        (7, '2024-08-26 10:00:00', '2024-08-26 11:00:00', 60, 'Docker Basics', 'Yellow Room'),
        (7, '2024-08-27 13:00:00', '2024-08-27 14:00:00', 60, 'Docker in Production', 'Orange Room'),
        (8, '2024-08-27 11:00:00', '2024-08-27 12:00:00', 60, 'Kubernetes Setup', 'Blue Room'),
        (8, '2024-08-28 14:00:00', '2024-08-28 15:00:00', 60, 'Kubernetes Scaling', 'Conference Room'),
        (9, '2024-08-28 09:00:00', '2024-08-28 10:00:00', 60, 'Microservices Architecture', 'Green Room'),
        (9, '2024-08-29 16:00:00', '2024-08-29 17:00:00', 60, 'Service Mesh', 'Red Room'),
        (10, '2024-08-29 11:00:00', '2024-08-29 12:00:00', 60, 'AI Research', 'Yellow Room'),
        (10, '2024-08-30 13:00:00', '2024-08-30 14:00:00', 60, 'ML Models', 'Orange Room');
        `;

        const result = await runQuery(Q);
        console.log(`Inserted ${result} rows into meeting table.`);
      } catch (error) {
        console.error("Error inserting sample meetings:", error);
      }
    };
    

//     insertSampleMeetings().then(() => {
//     console.log("Done creating meeting table");
// });