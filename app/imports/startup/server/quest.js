import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Quests } from '../../api/quest/quest.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.title} (${data.owner})`);
  Quests.insert(data);
}

/** Initialize the collection if empty. */
if (Quests.find().count() === 0) {
  if (Meteor.settings.defaultQuests) {
    console.log('Creating default data.');
    Meteor.settings.defaultQuests.map(data => addData(data));
  }
}

/** This subscription publishes only the documents associated with the logged in Quest */
Meteor.publish('Quests', function publish() {
  return Quests.find();
});

