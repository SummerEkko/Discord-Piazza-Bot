require("../models/InstructorData");

function loginSaved(mongoose, ServerID, InstructorID, InstructorPassword, NetworkID) {
    const InstructorData = mongoose.model("instructorData");

    InstructorData.find({ServerID: ServerID}, function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            InstructorData.updateOne({ServerID: ServerID}, {
                $set: {
                    InstructorID: InstructorID, InstructorPassword: InstructorPassword, NetworkID: NetworkID,
                },
            }, {upsert: true}, function (err, doc) {
                if (err) {
                    console.log(err);
                }
            });
        }
    });
}

exports.loginSaved = loginSaved;
