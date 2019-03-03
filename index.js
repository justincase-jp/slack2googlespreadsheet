// POSTリクエストに対する処理
function doPost(e) {

    // get content
    const contents = e.postData.contents

    // parse
    const contents_re = /^.*team_domain=(.+)\&channel_id=.*channel_name=(.+)\&user_id=.*user_name=(.+)\&.*command=(.+)\&text=(.+)\&response_url=.*$/
    const match = contents.match(contents_re).map(function (value) { return decodeURIComponent(value) })
    const user_name = match[3]
    const text_match = match[5].replace(/\+/g, " ").match(/^(\S+)\s(.*)/)
    const candidate = text_match[1]
    const text = text_match[2]

    // get spread sheet object
    const spread_sheet = SpreadsheetApp.getActive()
    const sheets = spread_sheet.getSheets()
    const sheet = spread_sheet.getSheetByName(sheets[0].getName())

    // 日付、postDataオブジェクトを追記
    const row = [new Date(), user_name, candidate, text]
    sheet.appendRow(row);

    var output = ContentService.createTextOutput("Thank you for your feedback!!");
    output.setMimeType(ContentService.MimeType.TEXT);
    return output;
}

function doPostTest() {
    var e = new Object();
    e.postData = JSON.parse('{"type":"application/x-www-form-urlencoded","length":387,"contents":"token=eTLkfJgY8f6EZ**********&team_id=*********&team_domain=********&channel_id=********&channel_name=general&user_id=********&user_name=hiroga1030&command=%2Fsendtosheet&text=kento+he+is+great&response_url=https%3A%2F%2Fhooks.slack.com%2Fcommands%2F******","name":"postData"}');
    doPost(e);
}