require("../models/InstructorData");

function loginSaved(mongoose, MemberID, InstructorID, InstructorPassword, NetworkID) {
    const InstructorData = mongoose.model("instructorData");

    InstructorData.find({MemberID: MemberID}, function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            InstructorData.updateOne(
                {MemberID: MemberID},
                {
                    $set: {
                        InstructorID: InstructorID,
                        InstructorPassword: InstructorPassword,
                        NetworkID: NetworkID,
                    },
                },
                {upsert: true},
                function (err, doc) {
                    if (!err) {
                        console.log(doc);
                    }
                }
            );
        }
    });
}

exports.loginSaved = loginSaved;
