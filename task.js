const https = require('https');
const fs = require('fs');

const accessToken = 'eyJ0dCI6InAiLCJhbGciOiJIUzI1NiIsInR2IjoiMSJ9.eyJkIjoie1wiYVwiOjY2MjIxMzIsXCJpXCI6OTIwNTg2OCxcImNcIjo0Njg4NjQwLFwidlwiOlwiXCIsXCJ1XCI6MjA1MjAzODUsXCJyXCI6XCJVU1wiLFwic1wiOltcIk5cIl0sXCJ6XCI6W10sXCJ0XCI6MTcyODM5NTE2ODAwMH0iLCJleHAiOjE3MjgzOTUxNjgsImlhdCI6MTcyODM5MTU2OH0.es14cya1SaCnRANO68Tpwjt9dhgks1X0lql62fvE9-E';

function getTasks() {
    const options = {
        hostname: 'www.wrike.com',
        path: '/api/v4/tasks',
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    };

    const req = https.request(options, (res) => {
        let data = '';

        
        res.on('data', (chunk) => {
            data += chunk;
        });

        
        res.on('end', () => {
            const tasks = JSON.parse(data).data; 
            const formattedTasks = tasks.map(task => ({
                "id":task.id,
                "title":task.name,
                "accountld":task.assignee,
                "importance":task.status,
                "parentlds":task.collections,
                "createdData":task.created_at,
                "updatedData":task.updated_at,
                "permalink":task.ticket_url



            }));

            console.log(formattedTasks);
            const jsonContent = JSON.stringify(formattedTasks, null, 2)
    fs.writeFile('tasks.json', jsonContent, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to file', err);
    } else {
      console.log('tasks.json has been created successfully!');
    }
  }); 
        });
    });

    req.on('error', (error) => {
        console.error('error:', error.message);
    });
   

    req.end(); 
}


getTasks(); 

