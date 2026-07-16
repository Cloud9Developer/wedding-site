var TO_ADDRESS = "EMAIL@gmail.com"; // email to send the form data to

/**
 * This method is the entry point.
 */
function doPost(e) {

  try {
    Logger.log(e); // the Google Script version of console.log see: Class Logger
    
    var mailData = e.parameters; // just create a slightly nicer variable name for the data
    
    // if (mailData.invite_code != "06272026") { // validate invite code before saving data
    // var validBool = isValidCode(mailData.invite_code);
    if (!isValidCode(mailData.invite_code)) {
      Logger.log("Incorrect Invite Code");
      return ContentService
          .createTextOutput(JSON.stringify({"result":"error", "message": "Sorry, your invite code '" + mailData.invite_code + "' is incorrect."}))
          .setMimeType(ContentService.MimeType.JSON);
    }
    
    record_data(e);
    
    MailApp.sendEmail({
      to: TO_ADDRESS,
      subject: "A new guest RSVP'd for your wedding",
      replyTo: String(mailData.email), // This is optional and reliant on your form actually collecting a field named `email`
      htmlBody: formatMailBody(mailData)
    });

    return ContentService    // return json success results
          .createTextOutput(JSON.stringify({"result":"success","data": JSON.stringify(e.parameters) }))
          .setMimeType(ContentService.MimeType.JSON);
  } catch(error) { // if error return this
    Logger.log(error);
    return ContentService
          .createTextOutput(JSON.stringify({"result":"error", "message": "Sorry, there is an issue with the server."}))
          .setMimeType(ContentService.MimeType.JSON);
  }
}

function isValidCode(inv_code) {
  const inviteCodeArr = INVITE_CODES.map(item => item.code);
  return inviteCodeArr.includes(String(inv_code).trim());
}


/**
 * This method inserts the data received from the html form submission
 * into the sheet. e is the data received from the POST
 */
function record_data(e) {
  Logger.log(JSON.stringify(e)); // log the POST data in case we need to debug it
  try {
    var doc     = SpreadsheetApp.getActiveSpreadsheet();
    var sheet   = doc.getSheetByName('responses'); // select the responses sheet
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow()+1; // get next row
    var staticCSTFormula = `=DATEVALUE(MID(A${nextRow}, 6, 11)) + TIMEVALUE(MID(A${nextRow}, 18, 8)) - TIME(5, 0, 0)`;
    var row     = [ new Date().toUTCString(), staticCSTFormula]; // first element in the row should always be a timestamp
    // loop through the header columns
    for (var i = 2; i < headers.length; i++) { // start at 1 to avoid Timestamp column
      if(headers[i].length > 0) {
        row.push(e.parameter[headers[i]]); // add data to row
      }
    }
    // more efficient to set values as [][] array than individually
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
  }
  catch(error) {
    Logger.log(error);
    Logger.log(e);
    throw error;
  }
  finally {
    return;
  }
}


/**
 * This method is just to prettify the email.
 */
function formatMailBody(obj) { // function to spit out all the keys/values from the form in HTML
  var result = "<h4><a href='LINK_TO_RSVP_SHEET'>RSVP Tracker</a></h4>";
  for (var key in obj) { // loop over the object passed to the function
    result += "<h4 style='text-transform: capitalize; margin-bottom: 0'>" + key + "</h4><div>" + obj[key] + "</div>";
    // for every key, concatenate an `<h4 />`/`<div />` pairing of the key name and its value, 
    // and append it to the `result` string created at the start.
  }
  return result; // once the looping is done, `result` will be one long string to put in the email body
}