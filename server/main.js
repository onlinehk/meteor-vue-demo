import { Meteor } from 'meteor/meteor';
import { Links } from '/lib/collections';

if (Meteor.isServer) {
	Meteor.publish('links', function () {
		return Links.find();
	});

	Meteor.methods({
		addData: function (title, url) {
			insertLink(title, url);
		},
		deleteData: function (_id) {
			Links.remove(_id);
		},
		editSubmit: function (_id, title, url) {
			Links.update({ _id: _id }, { $set: { title: title, url: url, updatedAt: new Date() } });
		},
	})

	function insertLink(title, url) {
		Links.insert({ title, url, createdAt: new Date() });
	}

	Meteor.startup(() => {
		__meteor_runtime_config__.meteorRelease = undefined;
	// // If the Links collection is empty, add some data.
		if (Links.find().count() === 0) {
			insertLink(
				'Do the Tutorial',
				'https://www.meteor.com/tutorials/react/creating-an-app'
			);

			insertLink(
				'Follow the Guide',
				'http://guide.meteor.com'
			);

			insertLink(
				'Read the Docs',
				'https://docs.meteor.com'
			);

			insertLink(
				'Discussions',
				'https://forums.meteor.com'
			);
		}
	});
}