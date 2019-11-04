<template>
<div class="app">
	<h1>Simple Meteor example using Vue 2.x</h1>
	<img src="images/human.jpg" width="200">
	<p>
		You pressed the button {{count}} time(s).
	</p>
	<my-button :label="buttonLabel" @click="addOne"></my-button>
	<p>
		Learn more about the vue integration <a href="https://github.com/Akryum/meteor-vue-component">on GitHub</a>.
	</p>
	<hr />
	<test2></test2>
	<hr />

	<h3>Start Stop Meteor</h3>
	<button class="btn btn-success" @click="activate">activate</button>
	<button class="btn btn-danger" @click="deactivate">deactivate</button>
	<hr />

	<h3>Links</h3>
	<p></p>
	<div class="form-group">
		Title: <input class="form-control" v-model="newTitle" />
	</div>
	<div class="form-group">
		URL: <input class="form-control" v-model="newURL" />
	</div>
	<button class="btn btn-primary" @click="addData">Add</button>
	<div class="float-right"><input class="form-control" placeholder="Search" v-model="search" /></div>

	<hr />
	<div v-if="links && links.length == 0 && search">Empty</div>
	<div v-else>
		<div v-for="link in links" :key="link._id">
			<div v-if="!editMode[link._id]">
				<p>Title: <b>{{link.title}}</b></p>
				<p>URL: <a :href="link.url">{{link.url}}</a></p>
				<p>Date: <span class="date">{{link.createdAt}}</span></p>
				<p v-if="link.updatedAt">Update Date: <span class="date">{{link.updatedAt}}</span></p>
				<button class="btn btn-primary" @click="editData(link._id)">Edit</button>
				<button class="btn btn-danger" @click="deleteData(link._id)">Delete</button>
			</div>
			<div v-if="editMode[link._id]">
				<form :ref="'form_'+link._id" @submit.prevent="editSubmit(link._id)">
					<div class="form-group">
						Title: <input class="form-control" name="title" :value="link.title" />
					</div>
					<div class="form-group">
						URL: <input class="form-control" name="url" :value="link.url" />
					</div>
					<button class="btn btn-success" type="submit">Edit Submit</button>
					<button class="btn btn-danger" @click="cancelSubmit(link._id)">Cancel Submit</button>
				</form>
			</div>
			<hr />
		</div>
	</div>
    <div v-if="!$subReady.links">Loading...</div>
    <div v-if="limit == links.length">
        <div class="text-center"><button class="btn btn-primary" @click="loadMore">Load More</button></div>
    </div>
	<p>Totals: {{countLinks}}</p>
</div>
</template>
<!--<script src="./App.js"></script>-->
<script>
import { Session } from 'meteor/session';
// import Test from '../Test.vue';
// import { Links } from '/lib/collections';
import { meteors } from '/imports/api/app';

Session.setDefault("counter", 0);

let labels = ['Click me!', 'Click me again!', 'Here! Click here!', 'Again! Again!',
    'Don\'t click me! No, I\'m just kidding. You can.', 'You like that?',
    'Can you stratch me in the back please?', 'You are soooo nice! Click!',
    'Hmmmm...', 'You know, you are wasting time clicking me.',
    'No really, you can click me as much as you want.', 'Click me to level up!'];

export default {
    mixins: [meteors],
    data() {
        return {
            buttonLabel: 'Click me!',
            count: 0,
            editMode: [],
            newTitle: 'Demo',
            newURL: 'http://www.test.com',
            search: '',
            perPage: 3,
            limit: 3
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
                Meteor.call('addData', this.newTitle, this.newURL);
                this.newTitle = '';
                this.newURL = 'http://www.test.com';
            }
        },

        editData(_id) {
            this.$set(this.editMode, _id, true);
        },
        // End Add / Edit DB

        // Delete DB
        deleteData(_id) {
            Meteor.call('deleteData', _id);
            this.newTitle = 'Demo';
            this.newURL = '';
        },
        // End Delete DB

        // List DB Submit Buttn
        editSubmit(_id) {
            if (_id) {
                const $_id = 'form_' + _id;
                Meteor.call('editSubmit', _id, this.$refs[$_id][0].title.value.trim(), this.$refs[$_id][0].url.value.trim());
                this.$set(this.editMode, _id, false);
            }
        },

        cancelSubmit(_id) {
            this.$set(this.editMode, _id, false);
        },
        // End List DB Submit Buttn

        loadMore() {
            this.limit += this.perPage;
        },

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
    computed: {
        countLinks() {
            return this.links ? this.links.length : 0;
        }
    },
};
</script>