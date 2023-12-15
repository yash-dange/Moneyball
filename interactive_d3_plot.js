# interactive bar plot

fetch('data/.csv')
  .then(response => response.text())
  .then(text => {
    // 'text' is the content of the file
    console.log(text);
    // You can then convert this CSV text to an array of objects, for example, using a library like PapaParse or d3-dsv
  })
  .catch(error => console.error('Error fetching the CSV file:', error));
