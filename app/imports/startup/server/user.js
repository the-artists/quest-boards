import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Users } from '../../api/user/user.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.lastName} (${data.owner})`);
  Users.insert(data);
}

/** Initialize the collection if empty. */
if (Users.find().count() === 0) {
  if (Meteor.settings.defaultUsers) {
    console.log('Creating default data.');
    Meteor.settings.defaultUsers.map(data => addData(data));
  }
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Users', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Users.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('UserAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Users.find();
  }
  return this.ready();
});
