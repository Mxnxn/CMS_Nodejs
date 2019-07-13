module.exports = {
    select : function(selected,options){
        // console.log('WORKS'+param)
        return options.fn(this).replace(new RegExp(' value=\"'+selected+'\"'),'$&selected="selected');
    }
}