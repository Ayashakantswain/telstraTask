
const replacePlaceholdersModel = require('../models/model')


exports.replacePlaceholders = (req, res) => {

    try {
        console.log("request", req.body);

        var reqObj = {
            payloadObj: req.body.payload,
            replacements: req.body.referenceData
        }

        replacePlaceholdersModel.find(reqObj, callback => {
            console.log("Final callback ", JSON.stringify(callback));
            if (callback.status == 0) {

                res.status(200).json({
                    "status": 0,
                    "message": "successfully done.",
                    "response": callback.response
                })
            } else {

                res.status(400).json({
                    "status": 1,
                    "message": "error in find",
                    "errorInfo": callback.errorMessage
                })
            }
        })

    } catch (error) {
        res.status(400).json({
            "status": 1,
            "message": "unable to do the task(tryBlock)",
            "errorMessage": error.message

        })
    }

}
