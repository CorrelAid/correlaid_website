import jsPDF from 'jspdf';

export function generatePDF(values, membership_application) {
  // Create a new jsPDF instance
  // eslint-disable-next-line new-cap
  const doc = new jsPDF();

  // Define the x and y coordinates for the first line of text
  const x = 10;
  let y = 10;

  // Loop through the form data and add it to   the PDF
  for (const group of membership_application) {
    // make text bigger
    doc.setFontSize(16);
    doc.text(`${group.title}`, x, y);
    y += 10;
    for (const field of group.fields) {
      doc.setFontSize(12);
      // Add the key-value pair to the PDF
      const value = values[field.name];
      if (value !== undefined) {
        doc.text(`${field.name}: ${value}`, x, y);
        y += 10;
      }

      // Increment the y coordinate for the next line
    }
  }

  // Return the data URL of the PDF
  const pdf = doc.output('pdfobjectnewwindow');
  return pdf;
}
