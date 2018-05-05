import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Quests } from '/imports/api/quest/quest';

Template.search.onCreated(() => {
  const template = Template.instance();

  template.searchQuery = new ReactiveVar();
  template.searching = new ReactiveVar(false);

  template.autorun(() => {
    template.subscribe('quests', template.searchQuery.get(), () => {
      setTimeout(() => {
        template.searching.set(false);
      }, 300);
    });
  });
});

Template.search.helpers({
  searching() {
    return Template.instance().searching.get();
  },
  query() {
    return Template.instance().searchQuery.get();
  },
  quest() {
    const quest = Quests.find();
    if (quest) {
      return quest;
    }
    return quest;
  },
});

Template.search.helpers({
  searching() {
    return Template.instance().searching.get();
  },
  query() {
    return Template.instance().searchQuery.get();
  },
  quest() {
    const quest = Quests.find();
    if (quest) {
      return quest;
    }
    return quest;
  },
});
Template.search.events({
  'keyup [name="search"]'(event, instance) {
    const value = event.target.value.trim();

    if (value !== '' && event.keyCode === 13) {
      instance.searchQuery.set(value);
      instance.searching.set(true);
    }

    if (value === '') {
      instance.searchQuery.set(value);
    }
  },
});
