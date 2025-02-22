/**
 * @param {import("..").Data} d
 */
module.exports = async d => {
    const data = d.util.aoiFunc(d);
    if (data.err) return d.error(data.err);

    const [guildID = d.guild?.id, userID, reason] = data.inside.splits;

    const guild = await d.util.getGuild(d, guildID);
    if (!guild) return d.aoiError.fnError(d, 'guild', {inside: data.inside});

    const member = await d.util.getMember(guild, userID);
    if (!member) return d.aoiError.fnError(d, 'member', {inside: data.inside});

    member.kick(reason?.addBrackets()).catch(e => {
        d.aoiError.fnError(d, 'custom', {}, 'Failed To Kick With Reason: ' + e)
    });

    return {
        code: d.util.setCode(data)
    }
}