import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
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
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Quests.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all open quests */
Meteor.publish('Open', function publish() {
  return Quests.find({ status: 'open' });
});

/** This subscription publishes all open quests */
Meteor.publish('Pending', function publish() {
  return Quests.find({ status: 'pending' });
});

/** Search through quests */
Meteor.publish('quests', function (search) {
  check(search, Match.OneOf(String, null, undefined));

  let query = {};
  const projection = { limit: 10, sort: { title: 1 } };

  if (search) {
    const regex = new RegExp(search, 'i');

    query = {
      $or: [
        { title: regex },
        { skills: regex },
        { owner: regex },
      ],
    };

    projection.limit = 100;
  }

  return Quests.find(query, projection);
});
