require("../models/InstructorData");

function updateMetrics(mongoose, userID, p1, p2, p3, p4) {
    const Instructor = mongoose.model("instructorData");
    Instructor.updateOne(
        {MemberID: userID},
        {$set: {P1: p1, P2: p2, P3: p3, P4: p4}},
        {upsert: true},
        function (err, doc) {
            if (!err) {
                console.log(doc);
            }
        }
    );
}

exports.updateMetrics = updateMetrics;
