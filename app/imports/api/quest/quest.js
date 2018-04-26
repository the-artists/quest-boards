import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Quests = new Mongo.Collection('Quests');

/** Create a schema to constrain the structure of documents associated with this collection. */
const QuestSchema = new SimpleSchema({
  title: String,
  pay: Number,
  deadline: String,
  location: String,
  contactInfo: String,
  skills: String,
  description: String,
  status: String,
  assignee: String,
  completed: String,
  owner: String,
}, { tracker: Tracker });
/** Attach this schema to the collection. */
Quests.attachSchema(QuestSchema);

/** Make the collection and schema available to other code. */
export { Quests, QuestSchema };
