




const mongoose = require('mongoose')

const delReportShema = new mongoose.Schema({
    userName: String,
    userEmail: String,
    issue: String,
    status: String
})

const delReportModel = mongoose.model("delIssues", delReportShema)
module.exports = delReportModel