function changeRoleTo(guild, userId, roleName) {
    let role = guild.roles.cache.find(role => role.name === roleName);
    if (!role) {
        console.log(`Role ${roleName} not found`);
        return;
    }
    guild.members.fetch(userId).then(member => {
        if (!member) {
            console.log(`${userId} not found in ${guild.name}`);
            return;
        }
        member.roles.set([role]).then(() => {
            console.log(`${member.displayName} has been given the role ${role.name}`);
        });
    });
}

exports.changeRoleTo = changeRoleTo;
