
module.exports = function()
{
    return new Filter();
}

var Filter = function()
{
};

Filter.prototype.before = function(msg, session, next)
{
    if (msg.content.indexOf('fuck') !== -1)
    {
        session.__abuse__ = true;
        msg.content = msg.content.replace('fuck', '****');
    }
    next();
};

Filter.prototype.after = function(err, msg, session, resp, next)
{
    if (session.__abuse__)
    {
        var userInfo = session.uid.split('*');
        console.log('abuse:' + userInfo[0] + " at room " + userInfo[1]);
    }
    next(err);
};