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

function getCurrentDate() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();

  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }

  today = `${mm}/${dd}/${yyyy}`;
  return today;
}

function updateStatus() {
  const Results = Quests.find({status: 'open'});
  const today = getCurrentDate();

  Results.forEach(function (quest) {
    let questDeadline = quest.deadline;
    if (questDeadline[1] === '/') questDeadline = `0${questDeadline}`;
    console.log(`Quest Deadline ${questDeadline}`);
    if (quest.assignee === 'none' || quest.assignee === 'None') console.log("Empty");
    else {
      Quests.update(
          { _id: `${quest._id}` },
          { $set: {
              status: 'pending',
            } },
      );
    }
    // Quest Deadline
    if (questDeadline < today) {
      Quests.update(
          { _id: `${quest._id}` },
          { $set: {
            status: 'closed',
          } },
      );
    }
  });
}

/** This subscription publishes all open quests */
Meteor.publish('Quests', function publish() {
  updateStatus();
  return Quests.find();
});

