const PDFDocument = require("pdfkit");
const { PassThrough } = require("stream");

const generateClientPdf = (clientData) => {
  const doc = new PDFDocument();
  const stream = new PassThrough();

  doc.pipe(stream);
  doc
    .fontSize(20)
    .text("New Client Registered", { underline: true })
    .moveDown();

  Object.entries(clientData).forEach(([key, value]) => {
    doc.fontSize(12).text(`${key} : ${value}`);
  });
  doc.end();
  return stream;
};

module.exports = generateClientPdf;
