import jsPDF from 'jspdf';

export function generatePDF(values) {
  // Create a new jsPDF instance
  // eslint-disable-next-line new-cap
  const doc = new jsPDF();

  // Define the x and y coordinates for the first line of text
  const x = 10;
  let y = 10;

  // Loop through the form data and add it to the PDF
  for (const [key, value] of Object.entries(values)) {
    // Add the key-value pair to the PDF
    doc.text(`${key}: ${value}`, x, y);

    // Increment the y coordinate for the next line
    y += 10;
  }

  // Return the data URL of the PDF
  return doc.output('dataurl');
}
