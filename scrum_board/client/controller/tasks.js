Meteor.subscribe('theTasks');

Template.taskList.helpers({

	'selectedClass': function(){
		var tId = this._id;
		var stId = Session.get('selectedTask');
		if(tId == stId){
			return "selected";
		}
	}

	'tasks': function(){

	return Tasks.find({}, {sort: {duration: -1}});

	},

	'otherHelperFunction': function(){
	return "Some other function"
	}

});

Template.taskList.events({

	'click': function(){

		console.log("You clicked something");

	}

	'click .ctasks': function(){
		var tId = this._id;
		Session.set('selectedTask', tId);
	}

	'blur tdurl': function(){
		var selectedTask = Session.get('selectedTask');
		var tdur = event.target.tdurl.value;

		var pTask = {
	    	this.tid = selectedTask;
	    	this.tdur = tdur;
	    }

	    Meteor.call('saveTask', pTask);

		//Tasks.update( selectedTask, {$set: {duration: 5} } );
		/*Tasks.update( selectedTask, {$inc: {duration: 5} } );*/
	}

	"submit .new-task": function (event) {
	// This function is called when the new task form is submitted
		event.preventDefault();

		var tname = event.target.tname.value;
	    var tdesc = event.target.tdesc.value;
	    var ttype = event.target.ttype.value;
	    var tdur = event.target.tdur.value;

	    var pTask = {
	    	this.tid = 0;
	    	this.tname = tname;
	    	this.tdesc = tdesc;
	    	this.ttype = ttype;
	    	this.tdur = tdur;
	    }

	    Meteor.call('saveTask', pTask);

		// Clear form
		event.target.tname.value = "";
		event.target.tdesc.value = "";
		event.target.ttype.value = "";
		event.target.tdur.value = "";

		// Prevent default form submit
		return false;
	}

});
