document.addEventListener('DOMContentLoaded', () => {
  const savePDFButton = document.getElementById('save_pdf');
  savePDFButton.addEventListener('click', createPDF);

  function createPDF() {
    const content = document.querySelector('.property-listing');
    const element = content.cloneNode(true);

    html2pdf()
      .from(element)
      .toPdf()
      .save('estate_review.pdf');
  }
});
