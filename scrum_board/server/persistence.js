Meteor.methods({

	'saveTask': function(pTask){

		if(pTask.tid == 0 )
		{
			Tasks.insert({
	      		name: pTask.tname,
	      		description: pTask.tdesc,
	      		type: pTaskttype,
	      		duration: pTask.tdur
	    	});
		}
		else 
		{
			Tasks.update( pTask.tid, {$set: {duration: this.tdur} } );
		}
	    

	}

});

Meteor.publish('theTasks', function(){
	return Tasks.find()
});
