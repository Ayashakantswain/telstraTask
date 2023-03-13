module.exports = class find {
    static find(data, callback) {
        try {
            console.log(data);
            function replacePlaceholders(obj, replacements) {
                if (obj === null || obj === undefined) {
                    return obj;
                }

                if (typeof obj === 'string') {
                    return obj.replace(/\{([^}]+)\}/g, (match, key) => {
                        return replacements[key] || match;
                    });
                }

                if (Array.isArray(obj)) {
                    return obj.map(item => replacePlaceholders(item, replacements));
                }

                if (typeof obj === 'object') {
                    const result = {};
                    for (const key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            result[key] = replacePlaceholders(obj[key], replacements);
                        }
                    }
                    return result;
                }

                return obj;
            }

            const replacements = data.replacements
            const replacedPayload = replacePlaceholders(data.payloadObj, replacements);

            callback({
                "status": 0,
                "response": replacedPayload,
                "message": "successfull",
                "errorMessage": ""
            })

        } catch (error) {
            console.log("Error in (tryBlock)", error.message);
            callback({
                "status": 1,
                "channelOpted": "",
                "message": "Error in model (tryBlock)",
                "errorMessage": error.message
            })
        }
    }

}
