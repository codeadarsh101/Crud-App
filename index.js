// Create a Crud Application..........//

import express from 'express';

const app = express();
const port = 2000;

app.use(express.json());

let teaData = [];
let nextId = 1;

// Add a new tea
app.post('/teas', (req, res) => {
   // getting i/p from frontend side 
  const { name, price } = req.body; 
 const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(200).send(newTea);
});

// Get all teas
app.get('/teas', (req, res) => {
  res.status(200).send(teaData);
});

// Get a tea with id
app.get('/teas/:id', (req, res) => {
  const tea = teaData.find(t => t.id === parseInt(req.params.id));
  if (tea) {
    res.status(200).send(tea);
  } else {
    res.status(404).send('Tea not found');
  }
});

// Update tea
app.put('/teas/:id', (req, res) => {
  const tea = teaData.find(t => t.id === parseInt(req.params.id));

  if (!tea) {
    res.status(404).send('Tea not found');
  } else {
    const { name, price } = req.body;
    tea.name = name;
    tea.price = price;
    res.send(tea);
  }
});

// Delete tea with id
app.delete('/teas/:id', (req, res) => {
  const index = teaData.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) {
    res.status(404).send('Tea not found');
  } else {
    teaData.splice(index, 1); // Remove one element at the found index
    
    res.status(200).send(teaData);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
});
