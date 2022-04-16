require("../models/InstructorData");

function updateMetrics(mongoose, ServerID, p1, p2, p3, p4) {
    const Instructor = mongoose.model("instructorData");
    Instructor.updateOne(
        {ServerID: ServerID},
        {$set: {P1: p1, P2: p2, P3: p3, P4: p4}},
        {upsert: true},
        function (err, doc) {
            if (err) {
                console.log(err);
            }
        }
    );
}

exports.updateMetrics = updateMetrics;
