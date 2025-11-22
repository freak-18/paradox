// Google Apps Script code (paste in script.google.com)
// This collects reviews from ALL devices into one Google Sheet

function doPost(e) {
  try {
    // Log the incoming request
    console.log('Received POST request:', e.postData.contents);
    
    // Get the review data
    const data = JSON.parse(e.postData.contents);
    
    // Open your Google Sheet
    const sheet = SpreadsheetApp.openById('118GKM9ex0ChReMt4KtqhY00wSO0-Lwzyy8nfhLlTTnU').getActiveSheet();
    
    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Rating', 'Message', 'Film']);
    }
    
    // Add the review data
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.email,
      data.rating,
      data.message,
      data.film
    ]);
    
    console.log('Review added to sheet successfully');
    
    // Return success with CORS headers
    const output = ContentService.createTextOutput('Success');
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
    
  } catch (error) {
    console.log('Error in doPost:', error.toString());
    const output = ContentService.createTextOutput('Error: ' + error.toString());
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
  }
}

function doGet() {
  return ContentService.createTextOutput('PãRãDOX Reviews Collector is running');
}