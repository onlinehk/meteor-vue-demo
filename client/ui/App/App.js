import { Session } from 'meteor/session';
// import Test from '../Test.vue';
import { Links } from '/lib/collections';

Session.setDefault("counter", 0);

let labels = ['Click me!', 'Click me again!', 'Here! Click here!', 'Again! Again!',
    'Don\'t click me! No, I\'m just kidding. You can.', 'You like that?',
    'Can you stratch me in the back please?', 'You are soooo nice! Click!',
    'Hmmmm...', 'You know, you are wasting time clicking me.',
    'No really, you can click me as much as you want.', 'Click me to level up!'];

export default {
    data() {
        return {
            buttonLabel: 'Click me!',
            count: 0,
            editMode: [],
            newTitle: '',
            newURL: '',
            search: ''
        }
    },
    methods: {
        addOne() {
            Session.set('counter', this.count + 1);
            this.count = Session.get('counter');
            this.buttonLabel = labels[Math.round(Math.random() * (labels.length - 1))];
        },

        // Add / Edit DB
        addData() {
            if (this.newTitle && this.newURL) {
                Meteor.call('addData', this.newTitle.trim(), this.newURL.trim());
                this.newTitle = '';
                this.newURL = '';
            }
        },

        editData(_id) {
            this.$set(this.editMode, _id, true);
        },
        // End Add / Edit DB

        // Delete DB
        deleteData(_id) {
            Meteor.call('deleteData', _id);
            this.newTitle = '';
            this.newURL = '';
        },
        // End Delete DB

        // List DB Submit Buttn
        editSubmit(_id) {
            if (_id) {
                var $_id = 'form_' + _id;
                Meteor.call('editSubmit', _id, this.$refs[$_id][0].title.value.trim(), this.$refs[$_id][0].url.value.trim());
                this.$set(this.editMode, _id, false);
            }
        },

        cancelSubmit(_id) {
            this.$set(this.editMode, _id, false);
        },
        // End List DB Submit Buttn

        activate() {
            this.$startMeteor()
        },

        deactivate() {
            this.$stopMeteor()
        }
    },
    // components: {
    //     Test,
    // },
    metaInfo: {
        title: 'Meteor + Vue',
    },
    meteor: {
        // Subscriptions
        $subscribe: {
            // We subscribe to the 'links' publication
            'links': []
        },
        links() {
            if (this.search) {
                return Links.find({ "title": { $regex: new RegExp(this.search, "i") } }, { sort: { createdAt: -1 } }).fetch()
            } else {
                var rtn = Links.find({}, { sort: { createdAt: -1 } }).fetch();
                for (const key in rtn) {
                    if (rtn[key].createdAt) {
                        rtn[key].createdAt = this.formatDate(rtn[key].createdAt);
                    }
                    if (rtn[key].updatedAt) {
                        rtn[key].updatedAt = this.formatDate(rtn[key].updatedAt);
                    }
                }
                return rtn;
            }
        }
    },
    computed: {
        countLinks() {
            return this.links.length
        }
    }
};